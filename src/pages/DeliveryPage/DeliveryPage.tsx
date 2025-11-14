import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryScreen from "@/pages/DeliveryPage/components/DeliveryScreen/DeliveryScreen";
import { useCart } from "@/contexts/CartContext";
import { useTheme } from "@/hooks/useTelegram";
import { useThemeSync } from "@/hooks/useThemeSync";
import { DeliveryInfo } from "@/types";

const DeliveryPage: FC = () => {
  const navigate = useNavigate();
  const { total, setDeliveryInfo } = useCart();
  const theme = useTheme();

  useThemeSync(theme);

  const handleBack = () => {
    navigate("/");
  };

  const handleConfirm = (info: DeliveryInfo) => {
    setDeliveryInfo(info);
  };

  return (
    <DeliveryScreen
      subtotal={total}
      onBack={handleBack}
      onConfirm={handleConfirm}
      onDeliveryInfoChange={setDeliveryInfo}
    />
  );
};

export default DeliveryPage;
