import React, { FC } from 'react';
import { CourierService } from '@/types';
import { COURIER_SERVICES } from '@/data/couriers';
import styles from '@/pages/DeliveryPage/components/CourierSelection/CourierSelection.module.css';
import { motion } from 'framer-motion';
import { Check, Clock } from 'lucide-react';

interface CourierSelectionProps {
  selectedCourier: CourierService | null;
  onSelect: (courier: CourierService) => void;
  subtotal: number;
}

const CourierSelection: FC<CourierSelectionProps> = ({ selectedCourier, onSelect, subtotal }) => {
  return (
    <div className={styles.courierSelection}>
      <h3 className={styles.sectionTitle}>Способ доставки</h3>

      <div className={styles.courierList}>
        {COURIER_SERVICES.map((courier) => {
          const isSelected = selectedCourier?.id === courier.id;
          const totalWithDelivery = subtotal + courier.price;

          return (
            <motion.div
              key={courier.id}
              className={`${styles.courierCard} ${isSelected ? styles.selected : ''}`}
              onClick={() => onSelect(courier)}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.courierInfo}>
                <div className={styles.courierName}>{courier.name}</div>
                <div className={styles.courierDescription}>{courier.description}</div>
                <div className={styles.courierTime}>
                  <Clock size={14} className={styles.timeIcon} />
                  {courier.time}
                </div>
              </div>

              <div className={styles.courierPriceBox}>
                <div className={styles.deliveryPrice}>
                  {courier.price === 0 ? 'Бесплатно' : `+${courier.price.toFixed(2)}₽`}
                </div>

                <div className={styles.radioWrapper}>
                  {isSelected && (
                    <motion.div
                      className={styles.radioChecked}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Check size={14} strokeWidth={3} />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CourierSelection;
