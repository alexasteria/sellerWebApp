import { useEffect } from 'react';
import { WebApp } from 'telegram-web-app';

const tg: WebApp = (window as any).Telegram?.WebApp;

/**
 * Хук для отображения и обработки нативной кнопки Назад в Telegram WebApp
 * @param onBack Callback функция при нажатии на кнопку Назад
 * @param isVisible Флаг видимости кнопки (по умолчанию true)
 */
export const useTelegramBackButton = (onBack: () => void, isVisible: boolean = true) => {
  useEffect(() => {
    if (!tg || !tg.BackButton) return;

    if (isVisible) {
      tg.BackButton.show();
      tg.BackButton.onClick(onBack);
    } else {
      tg.BackButton.hide();
    }

    return () => {
      tg.BackButton.offClick(onBack);
      tg.BackButton.hide();
    };
  }, [onBack, isVisible]);
};
