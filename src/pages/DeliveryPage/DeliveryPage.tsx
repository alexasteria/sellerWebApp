import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryScreen from "@/pages/DeliveryPage/components/DeliveryScreen/DeliveryScreen";
import { useTheme } from "@/hooks/useTelegram";
import { useThemeSync } from "@/hooks/useThemeSync";
import { DeliveryInfo } from "@/types"; // Import DeliveryInfo
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCartTotal, setDeliveryInfo } from "@/store/cartSlice";

const DeliveryPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const total = useAppSelector(selectCartTotal);
  const theme = useTheme();

  useThemeSync(theme);

  const handleBack = () => {
    navigate("/");
  };

  const handleSetDeliveryInfo = (info: DeliveryInfo | null) => {
    dispatch(setDeliveryInfo(info));
  };

  return (
    <DeliveryScreen
      subtotal={total}
      onBack={handleBack}
    />
  );
};

export default DeliveryPage;
