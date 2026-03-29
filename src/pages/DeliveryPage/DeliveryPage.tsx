import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryScreen from "@/pages/DeliveryPage/components/DeliveryScreen/DeliveryScreen";
import { useTheme } from "@/hooks/useTelegram";
import { useThemeSync } from "@/hooks/useThemeSync";
import { DeliveryInfo } from "@/types"; // Import DeliveryInfo
import { useCart } from "@/contexts/CartContext";

const DeliveryPage: FC = () => {
  const navigate = useNavigate();
  const { cartTotal: total, setDeliveryInfo } = useCart();
  const theme = useTheme();

  useThemeSync(theme);

  const handleBack = () => {
    navigate("/");
  };

  const handleSetDeliveryInfo = (info: DeliveryInfo | null) => {
    setDeliveryInfo(info);
  };

  return (
    <DeliveryScreen
      subtotal={total}
      onBack={handleBack}
    />
  );
};

export default DeliveryPage;
