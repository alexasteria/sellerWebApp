import React, { FC } from "react";
import { motion } from "framer-motion";

const Header: FC = () => {
  return (
    <div style={{ padding: "20px 16px 8px", background: "var(--tg-bg, #ffffff)", overflow: "hidden" }}>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
      >
        <h1 style={{
          fontSize: "28px",
          fontWeight: 800,
          color: "var(--tg-text, #000)",
          margin: 0,
          letterSpacing: "-0.03em"
        }}>
          🍕 БоБо Пицца
        </h1>
        <p style={{
          fontSize: "15px",
          color: "var(--tg-hint, #8e8e93)",
          margin: "4px 0 0 0"
        }}>
          Доставим быстро и вкусно
        </p>
      </motion.div>
    </div>
  );
};

export default Header;
