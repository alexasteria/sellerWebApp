import React, { FC } from "react";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";
import {useAppSelector} from "@/store/hooks.ts";
import {selectCartTotal} from "@/store/cartSlice.ts";

const Footer: FC = () => {
  const navigate = useNavigate();
  const total = useAppSelector(selectCartTotal);
  return (
    <footer className={styles.footer}>
      <div className={styles.summary}>
        <span>Итого</span>
        <strong>{total.toFixed(2)}₽</strong>
      </div>
      {total > 0 && (
        <button
          className={styles.button}
          onClick={() => navigate("/delivery")}
        >{`Перейти к доставке · ${total.toFixed(2)}₽`}</button>
      )}
    </footer>
  );
};

export default Footer;
