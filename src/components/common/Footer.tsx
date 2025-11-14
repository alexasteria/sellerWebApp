import React, { FC } from "react";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  total: number;
}

const Footer: FC<FooterProps> = ({ total }) => {
  const navigate = useNavigate();
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
