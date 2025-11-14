import { useEffect, useState } from "react";
import { WebApp } from "telegram-web-app";

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

export function useTheme() {
  const [themeParams, setThemeParams] = useState<any>(
    () => tg?.themeParams ?? {},
  );

  useEffect(() => {
    const handler = () => {
      safeTgCall(() => setThemeParams({ ...tg.themeParams }));
    };
    safeTgCall(() => tg.onEvent("themeChanged", handler));
    return () => {
      safeTgCall(() => tg.offEvent("themeChanged", handler));
    };
  }, []);

  return themeParams;
}
