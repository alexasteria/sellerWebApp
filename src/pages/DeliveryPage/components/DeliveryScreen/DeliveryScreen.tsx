import React, { FC, useState } from "react";
import { DeliveryInfo } from "@/types";
import CartDisplay from "@/pages/DeliveryPage/components/CartDisplay/CartDisplay";
import styles from "./DeliveryScreen.module.css";
import { useUser } from "@/contexts/UserContext.tsx";
import { useAppSelector } from "@/store/hooks";
import { selectCart, selectDeliveryInfo } from "@/store/cartSlice";
import { WebApp } from "telegram-web-app";
import { orderService } from "@/services/OrderService";
import { GlassHeader, Button } from "@/components/UiKit";
import { ChevronLeft } from "lucide-react";

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
  const cart = useAppSelector(selectCart);
  const deliveryInfo = useAppSelector(selectDeliveryInfo);
  const { products } = useAppSelector((state) => state.products);
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrderSubmit = async () => {
    if (!user || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    safeTgCall(() => tg.MainButton.showProgress());

    const orderResult = await orderService.submitOrder(cart, products, user, deliveryInfo);

    safeTgCall(() => tg.MainButton.hideProgress());
    setIsSubmitting(false);

    if (orderResult) {
      safeTgCall(() => tg.close());
    } else {
      safeTgCall(() => tg.showAlert("Ошибка отправки заказа. Попробуйте еще раз."));
    }
  };

  const backAccessory = (
    <button className={styles.backBtn} onClick={onBack}>
      <ChevronLeft size={24} />
      <span>Назад</span>
    </button>
  );

  return (
    <div className={styles.deliveryScreen}>
      <GlassHeader title="Оформление заказа" leftAccessory={backAccessory} />

      {/* Spacer for GlassHeader */}
      <div style={{ height: 60 }} />

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
