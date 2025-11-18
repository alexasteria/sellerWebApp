import React, { FC, useState } from "react";
import { DeliveryInfo } from "@/types";
import CartDisplay from "@/pages/DeliveryPage/components/CartDisplay/CartDisplay";
import { useCart } from "@/contexts/CartContext";
import styles from "./DeliveryScreen.module.css";
import { useUser } from "@/contexts/UserContext.tsx";
import { useProducts } from "@/contexts/ProductsContext.tsx";
import { WebApp } from "telegram-web-app";
import { orderService } from "@/services/OrderService";

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
}) => {
  const { cart } = useCart();
  const { products } = useProducts();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const tenantCode = import.meta.env.VITE_TENANT_CODE;

  const handleOrderSubmit = async () => {
    if (!user || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    safeTgCall(() => tg.MainButton.showProgress());

    const orderResult = await orderService.submitOrder(cart, products, user);

    safeTgCall(() => tg.MainButton.hideProgress());
    setIsSubmitting(false);

    if (orderResult) {
      // Order was successful
      safeTgCall(() => tg.close());
    } else {
      // Order failed
      safeTgCall(() =>
        tg.showAlert("Ошибка отправки заказа. Попробуйте еще раз.")
      );
    }
  };

  return (
    <div className={styles.deliveryScreen}>
      <header className={styles.deliveryHeader}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Назад к меню
        </button>
        <h2>Доставка</h2>
      </header>

      <CartDisplay cart={cart} />

      <div className={styles.orderConfirmationInfo}>
        <p>Пожалуйста, внимательно проверьте ваш заказ.</p>
        <p>
          После подтверждения с вами свяжется менеджер для уточнения деталей по
          телефону.
        </p>
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
            <strong>
              {subtotal.toFixed(2)}₽
            </strong>
          </div>
        </div>
        <button
          className={styles.confirmBtn}
          onClick={handleOrderSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Отправка..." : "Оформить заказ"}
        </button>
      </footer>
    </div>
  );
};

export default DeliveryScreen;
