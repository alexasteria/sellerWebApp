import React, { FC, useState } from "react";
import { DeliveryInfo } from "@/types";
import CartDisplay from "@/pages/DeliveryPage/components/CartDisplay/CartDisplay";
import styles from "./DeliveryScreen.module.css";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductContext";
import { useAuth } from "@/contexts/AuthContext";
import { WebApp } from "telegram-web-app";
import * as OrderService from "@/services/OrderService";
import { Button } from "@/components/UiKit";
import { useTelegramBackButton } from "@/hooks/useTelegramBackButton";

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
  const { cart, deliveryInfo } = useCart();
  const { products } = useProducts();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use native Telegram back button
  useTelegramBackButton(onBack);

  const handleOrderSubmit = async () => {
    if (!user || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    safeTgCall(() => tg.MainButton.showProgress());

    const orderResult = await OrderService.submitOrder(cart, products, user.id!, deliveryInfo);

    safeTgCall(() => tg.MainButton.hideProgress());
    setIsSubmitting(false);

    if (orderResult) {
      safeTgCall(() => tg.close());
    } else {
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
            <span>0.00₽</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Итого к оплате:</span>
            <strong>{subtotal.toFixed(2)}₽</strong>
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
