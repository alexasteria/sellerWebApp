import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks.ts";
import { selectCartTotal } from "@/store/cartSlice.ts";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import styles from "./Footer.module.css";

const Footer: FC = () => {
  const navigate = useNavigate();
  const total = useAppSelector(selectCartTotal);

  return (
    <AnimatePresence>
      {total > 0 && (
        <motion.div
          className={styles.floatingFooter}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.button
            className={styles.cartButton}
            onClick={() => navigate("/delivery")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.cartIconContainer}>
              <ShoppingBag size={20} />
            </div>
            <span className={styles.cartText}>Корзина</span>
            <span className={styles.cartTotal}>{total.toFixed(2)}₽</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Footer;
