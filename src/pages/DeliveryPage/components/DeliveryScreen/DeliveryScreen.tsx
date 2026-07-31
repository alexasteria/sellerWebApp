import React, { FC, useState, useEffect } from "react";
import CartDisplay from "@/pages/DeliveryPage/components/CartDisplay/CartDisplay";
import styles from "./DeliveryScreen.module.css";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductContext";
import { useAuth } from "@/contexts/AuthContext";
import { useTenant } from "@/contexts/TenantContext";
import { WebApp } from "telegram-web-app";
import * as OrderService from "@/services/OrderService";
import { Button } from "@/components/UiKit";
import { useTelegramBackButton } from "@/hooks/useTelegramBackButton";
import { apiClient } from "@/apiClient";
import { SellerGoApiInternalApientTgUserAddressResponse } from "@/backendApi";
import { MapPin, Plus } from "lucide-react";
import { triggerNotification } from "@/hooks/useTelegram";

interface DeliveryScreenProps {
  subtotal: number;
  onBack: () => void;
}

const tg: WebApp = (window as any).Telegram?.WebApp;

const safeTgCall = (callback: () => void) => {
  try {
    if (tg) {
      callback();
    }
  } catch (error) {
    console.error("Telegram WebApp error:", error);
  }
};

const DeliveryScreen: FC<DeliveryScreenProps> = ({ subtotal, onBack }) => {
  const { cart } = useCart();
  const { products } = useProducts();
  const { user } = useAuth();
  const { activeTenant } = useTenant();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addresses, setAddresses] = useState<SellerGoApiInternalApientTgUserAddressResponse[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<SellerGoApiInternalApientTgUserAddressResponse | null>(null);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAddressText, setNewAddressText] = useState("");

  const deliveryCost = activeTenant?.delivery_cost || 0;
  const minOrderForFreeDelivery = activeTenant?.min_order_for_free_delivery || 0;
  const actualDeliveryCost = minOrderForFreeDelivery > 0 && subtotal >= minOrderForFreeDelivery ? 0 : deliveryCost;
  const total = subtotal + actualDeliveryCost;

  // Use native Telegram back button
  useTelegramBackButton(onBack);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user?.id) return;
      setLoadingAddresses(true);
      try {
        const res = await apiClient.tgUsers.addressesList(user.id);
        const fetchedAddresses = res.data || [];
        setAddresses(fetchedAddresses);
        
        // Select default or first address if available
        if (fetchedAddresses.length > 0) {
          const defaultAddr = fetchedAddresses.find((a: SellerGoApiInternalApientTgUserAddressResponse) => a.isDefault) || fetchedAddresses[0];
          setSelectedAddress(defaultAddr);
        } else {
            setIsAddingNew(true);
        }
      } catch (e) {
        console.error("Failed to load addresses", e);
      } finally {
        setLoadingAddresses(false);
      }
    };
    fetchAddresses();
  }, [user]);
  
  const handleAddNewAddress = async () => {
    if (!user?.id || !newAddressText.trim()) return;
    try {
        const res = await apiClient.tgUsers.addressesCreate(user.id, {
            addressText: newAddressText.trim(),
            isDefault: addresses.length === 0,
        });
        const createdAttr = res.data;
        if(createdAttr){
            setAddresses([...addresses, createdAttr]);
            setSelectedAddress(createdAttr);
        }
        setIsAddingNew(false);
        setNewAddressText('');
    } catch (e) {
        console.error("Failed to add address", e);
    }
  };

  const handleOrderSubmit = async () => {
    if (!user || isSubmitting) {
      return;
    }
    
    // Validate if an address is selected or entered
    if (!selectedAddress && !isAddingNew) {
      safeTgCall(() => {
        if (tg.showAlert) tg.showAlert("Пожалуйста, выберите адрес доставки");
      });
      return;
    }
    
    // If user is adding address but hasn't submitted
    if (isAddingNew && newAddressText.trim() === "") {
        safeTgCall(() => {
            if (tg.showAlert) tg.showAlert("Пожалуйста, укажите адрес доставки");
          });
          return;
    }
    
    let addressToUse = selectedAddress?.addressText || null;
    
    // If they filled the new address field but didn't click save, save it automatically or just use the text
    if (isAddingNew && newAddressText.trim() !== "") {
        addressToUse = newAddressText.trim();
        // optionally, we don't await save here to make checkout faster, it will just add address text to order
    }

    setIsSubmitting(true);
    safeTgCall(() => tg.MainButton.showProgress());

    const orderResult = await OrderService.submitOrder(cart, products, user.id!, addressToUse);

    safeTgCall(() => tg.MainButton.hideProgress());
    setIsSubmitting(false);

    if (orderResult) {
      triggerNotification("success");

      const paymentLink = orderResult.payment_link;
      if (paymentLink) {
        safeTgCall(() => {
          if (tg.openInvoice) {
            tg.openInvoice(paymentLink, (status) => {
              if (status === 'paid') {
                console.log("Invoice paid");
              }
              tg.close();
            });
          } else if (tg.openLink) {
            tg.openLink(paymentLink);
            tg.close();
          } else {
            window.open(paymentLink, "_blank");
            tg.close();
          }
        });
      } else {
        setTimeout(() => {
          safeTgCall(() => tg.close());
        }, 500);
      }
    } else {
      triggerNotification("error");
      safeTgCall(() => {
        if (tg.showAlert) {
          tg.showAlert("Ошибка отправки заказа. Попробуйте еще раз.");
        }
      });
    }
  };

  return (
    <div className={styles.deliveryScreen}>
      <div className={styles.scrollContent}>
        <CartDisplay cart={cart} />

        <div className={styles.addressSection}>
            <h3 className={styles.addressSectionTitle}>Адрес доставки*</h3>
            
            {loadingAddresses ? (
                <div className={styles.loadingAddress}>Загрузка адресов...</div>
            ) : addresses.length > 0 && !isAddingNew ? (
                <div className={styles.addressList}>
                    {addresses.map((address) => (
                        <div 
                            key={address.id} 
                            className={`${styles.addressCard} ${selectedAddress?.id === address.id ? styles.selected : ''}`}
                            onClick={() => setSelectedAddress(address)}
                        >
                            <MapPin size={20} className={styles.addressIcon} />
                            <div className={styles.addressTextWrapper}>
                                <span className={styles.addressText}>{address.addressText}</span>
                            </div>
                            <div className={styles.radioWrapper}>
                                <div className={`${styles.radioCircle} ${selectedAddress?.id === address.id ? styles.radioSelected : ''}`}></div>
                            </div>
                        </div>
                    ))}
                    <button className={styles.addAddressTrigger} onClick={() => setIsAddingNew(true)}>
                        <Plus size={18} />
                        Добавить другой адрес
                    </button>
                </div>
            ) : (
                <div className={styles.addAddressForm}>
                    <textarea 
                        className={styles.addressTextarea} 
                        placeholder={activeTenant?.business_type === 'ecommerce' 
                          ? "Страна, Индекс, Город, Улица/ПВЗ, Дом, Квартира" 
                          : "Город, Улица, Дом, Квартира"
                        }
                        rows={3}
                        value={newAddressText}
                        onChange={(e) => setNewAddressText(e.target.value)}
                    ></textarea>
                    {addresses.length > 0 && (
                        <div className={styles.formActions}>
                            <button className={styles.cancelAddressBtn} onClick={() => setIsAddingNew(false)}>Отмена</button>
                            <Button size="sm" onClick={handleAddNewAddress} disabled={!newAddressText.trim()}>Сохранить адрес</Button>
                        </div>
                    )}
                </div>
            )}
        </div>

        <div className={styles.orderConfirmationInfo}>
          <div className={styles.infoBox}>
            <p>Пожалуйста, внимательно проверьте ваш заказ.</p>
            <p>После подтверждения с вами свяжется менеджер для уточнения деталей по телефону.</p>
          </div>
        </div>
      </div>

      <footer className={styles.deliveryFooter}>
        <div className={styles.deliverySummary}>
          <div className={styles.summaryRow}>
            <span>Сумма заказа:</span>
            <span>{subtotal.toFixed(2)}₽</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Доставка курьером:</span>
            <span>{actualDeliveryCost > 0 ? `${actualDeliveryCost.toFixed(2)}₽` : 'Бесплатно'}</span>
          </div>
          {(!isAddingNew && selectedAddress) || (isAddingNew && newAddressText.trim()) ? (
            <div className={styles.summaryRow} style={{ color: '#64748B', fontSize: '0.85rem' }}>
              <span>По адресу:</span>
              <span style={{ textAlign: 'right', maxWidth: '65%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {isAddingNew ? newAddressText.trim() : selectedAddress?.addressText}
              </span>
            </div>
          ) : null}
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Итого к оплате:</span>
            <strong>{total.toFixed(2)}₽</strong>
          </div>
        </div>
        <Button
          fullWidth
          size="lg"
          onClick={handleOrderSubmit}
          isLoading={isSubmitting}
        >
          {isSubmitting ? "Отправка..." : "Оформить заказ"}
        </Button>
      </footer>
    </div>
  );
};

export default DeliveryScreen;
