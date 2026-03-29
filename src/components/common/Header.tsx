import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Store } from "lucide-react";
import { useTenant } from "@/contexts/TenantContext";
import { BottomSheet } from "@/components/UiKit/BottomSheet";

const Header: FC = () => {
  const { activeTenant, availableTenants, changeTenant, isLoading } = useTenant();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  if (isLoading || !activeTenant) {
    return <div style={{ height: "60px", background: "var(--app-bg)" }} />;
  }

  return (
    <div style={{ padding: "16px 16px 8px", background: "var(--app-bg)", overflow: "hidden" }}>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
      >
        <div 
          onClick={() => setIsSheetOpen(true)}
          style={{ 
            display: "inline-block", 
            cursor: "pointer",
            padding: "4px 8px",
            margin: "0 -8px",
            borderRadius: "12px",
            transition: "background 0.2s"
          }}
          onPointerDown={(e) => (e.currentTarget.style.background = "var(--app-border)")}
          onPointerUp={(e) => (e.currentTarget.style.background = "transparent")}
          onPointerLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <h1 style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "var(--app-text-main)",
            margin: 0,
            letterSpacing: "-0.03em",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            {activeTenant.emoji} {activeTenant.name}
            <ChevronDown size={24} style={{ opacity: 0.5 }} />
          </h1>
          <p style={{
            fontSize: "15px",
            color: "var(--app-text-muted)",
            margin: "4px 0 0 0"
          }}>
            {activeTenant.subtitle}
          </p>
        </div>
      </motion.div>

      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="Демо-режим: Выбор Ресторана"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "16px 0" }}>
          <p style={{ margin: "0 0 8px 0", color: "var(--app-text-muted)", fontSize: "14px", lineHeight: "1.4" }}>
            Приложение работает в режиме демонстрации. Выберите заведение, чтобы посмотреть его ассортимент.
          </p>
          
          {availableTenants.map(tenant => (
            <div
              key={tenant.code}
              onClick={() => {
                setIsSheetOpen(false);
                if (tenant.code !== activeTenant.code) {
                  changeTenant(tenant.code);
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px",
                borderRadius: "16px",
                background: tenant.code === activeTenant.code ? "var(--app-card-bg)" : "var(--app-bg)",
                border: tenant.code === activeTenant.code ? "2px solid var(--app-primary)" : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: "32px", lineHeight: 1 }}>{tenant.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--app-text-main)", marginBottom: "4px" }}>
                  {tenant.name}
                </div>
                <div style={{ fontSize: "13px", color: "var(--app-text-muted)" }}>
                  {tenant.subtitle}
                </div>
              </div>
              <Store size={20} color={tenant.code === activeTenant.code ? "var(--app-primary)" : "var(--app-text-muted)"} />
            </div>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
};

export default Header;
