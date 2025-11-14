import React, { FC, useState, useEffect } from "react";
import { DeliveryAddress, CourierService, DeliveryInfo } from "@/types";
import DeliveryAddressForm from "@/pages/DeliveryPage/components/DeliveryAddressForm/DeliveryAddressForm";
import CourierSelection from "@/pages/DeliveryPage/components/CourierSelection/CourierSelection";
import CartDisplay from "@/pages/DeliveryPage/components/CartDisplay/CartDisplay";
import { useCart } from "@/contexts/CartContext";
import styles from "@/pages/DeliveryPage/components/DeliveryScreen/DeliveryScreen.module.css";
import { Api, ModelsCreateOrderRequest } from "@/backendApi.ts";
import { useUser } from "@/contexts/UserContext.tsx";
import { useProducts } from "@/contexts/ProductsContext.tsx";
import { WebApp } from "telegram-web-app";

interface DeliveryScreenProps {
  subtotal: number;
  onBack: () => void;
  onConfirm: (deliveryInfo: DeliveryInfo) => void;
  onDeliveryInfoChange?: (deliveryInfo: DeliveryInfo | null) => void;
}
const tg: WebApp = (window as any).Telegram?.WebApp;
// Helper to safely execute Telegram API calls
const safeTgCall = (callback: () => void) => {
  try {
    if (tg) {
      callback();
    }
  } catch (error) {
    console.error("Telegram WebApp error:", error);
  }
};

const DeliveryScreen: FC<DeliveryScreenProps> = ({
  subtotal,
  onBack,
  onConfirm,
  onDeliveryInfoChange,
}) => {
  const { cartMap, cart } = useCart();
  const { products } = useProducts();
  const { user } = useUser();
  const createOrderPayload = (): ModelsCreateOrderRequest => {
    if (!user) throw new Error("User not found");

    const cartTemp: ModelsCreateOrderRequest["cart"] = [];
    Object.entries(cart).forEach(([productID, variantState]) => {
      const product = products.find((m) => m.id === productID);
      if (!product) return;

      Object.entries(variantState).forEach(([variantID, count]) => {
        if (count <= 0) return;
        const variant = product.variants?.find((v) => v.id === variantID);
        if (!variant) return;

        const discountedPrice = product.discount
          ? variant.cost * (1 - product.discount / 100)
          : variant.cost;

        cartTemp.push({
          productID: product.id,
          variantID: variant.id,
          quantity: count,
          price: discountedPrice,
        });
      });
    });

    return {
      userID: user.id,
      cart: cartTemp,
    };
  };
  const submitOrder = async (payload: ModelsCreateOrderRequest) => {
    try {
      const api = new Api({ baseURL: "/api" });
      await api.orders.ordersCreate({ tenant: "SELL_DEPARTMENT" }, payload);
      tg.close();
    } catch (error) {
      console.error("[DEBUG] API call failed:", error);
      safeTgCall(() =>
        tg.showAlert("Ошибка отправки заказа. Попробуйте еще раз."),
      );
    } finally {
      console.log(
        `[DEBUG] Reached finally block at ${new Date().toISOString()}. Setting isSubmitting to false.`,
      );
      safeTgCall(() => tg.MainButton.hideProgress());
    }
  };
  // const [address, setAddress] = useState<DeliveryAddress>({
  //   city: "",
  //   street: "",
  //   house: "",
  //   apartment: "",
  //   entrance: "",
  //   floor: "",
  //   comment: "",
  // });

  // const [selectedCourier, setSelectedCourier] = useState<CourierService | null>(
  //   null,
  // );
  //
  // const isFormValid =
  //   address.city.trim() &&
  //   address.street.trim() &&
  //   address.house.trim() &&
  //   selectedCourier;

  // Обновляем информацию о доставке для Telegram
  // useEffect(() => {
  //   if (isFormValid && selectedCourier && onDeliveryInfoChange) {
  //     const deliveryInfo: DeliveryInfo = {
  //       address,
  //       courier: selectedCourier,
  //       totalWithDelivery: subtotal + selectedCourier.price,
  //     };
  //     onDeliveryInfoChange(deliveryInfo);
  //   } else if (onDeliveryInfoChange) {
  //     onDeliveryInfoChange(null);
  //   }
  // }, [address, selectedCourier, subtotal, isFormValid, onDeliveryInfoChange]);

  // const handleConfirm = () => {
  //   if (!isFormValid || !selectedCourier) return;
  //
  //   const deliveryInfo: DeliveryInfo = {
  //     address,
  //     courier: selectedCourier,
  //     totalWithDelivery: subtotal + selectedCourier.price,
  //   };
  //
  //   onConfirm(deliveryInfo);
  // };

  return (
    <div className={styles.deliveryScreen}>
      <header className={styles.deliveryHeader}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Назад к меню
        </button>
        <h2>Доставка</h2>
      </header>

      <CartDisplay cart={cart} cartMap={cartMap} />

      <div className={styles.orderConfirmationInfo}>
        <p>Пожалуйста, внимательно проверьте ваш заказ.</p>
        <p>
          После подтверждения с вами свяжется менеджер для уточнения деталей по
          телефону.
        </p>
      </div>

      {/*<div className={styles.deliveryContent}>*/}
      {/*  <DeliveryAddressForm address={address} onChange={setAddress} />*/}

      {/*  /!*<CourierSelection*!/*/}
      {/*  /!*  selectedCourier={selectedCourier}*!/*/}
      {/*  /!*  onSelect={setSelectedCourier}*!/*/}
      {/*  /!*  subtotal={subtotal}*!/*/}
      {/*  /!*/
      /*/}
      {/*</div>*/}

      <footer className={styles.deliveryFooter}>
        <div className={styles.deliverySummary}>
          <div className={styles.summaryRow}>
            <span>Сумма заказа:</span>
            <span>{subtotal.toFixed(2)}₽</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Доставка курьером:</span>
            <span>0.00₽</span>
          </div>
          {/*{selectedCourier && (*/}
          {/*  <div className="summary-row">*/}
          {/*    <span>Доставка ({selectedCourier.name}):</span>*/}
          {/*    <span>+${selectedCourier.price.toFixed(2)}</span>*/}
          {/*  </div>*/}
          {/*)}*/}
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Итого к оплате:</span>
            <strong>
              {/*${(subtotal + (selectedCourier?.price || 0)).toFixed(2)}*/}
              {subtotal.toFixed(2)}₽
            </strong>
          </div>
        </div>
        <button
          className={styles.confirmBtn}
          onClick={async () => {
            const payload = createOrderPayload();
            await submitOrder(payload);
          }}
        >
          Оформить заказ
        </button>
        {/* <button
          className={`${styles.confirmBtn} ${isFormValid ? styles.active : styles.disabled}`}
          onClick={handleConfirm}
          disabled={!isFormValid}
        >
          Перейти к оплате
        </button> */}
      </footer>
    </div>
  );
};

export default DeliveryScreen;
