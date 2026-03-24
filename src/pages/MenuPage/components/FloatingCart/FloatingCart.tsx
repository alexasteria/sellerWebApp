import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectCartItemCount, selectCartTotal } from '@/store/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import styles from './FloatingCart.module.css';

const FloatingCart: FC = () => {
    const navigate = useNavigate();
    const count = useAppSelector(selectCartItemCount);
    const total = useAppSelector(selectCartTotal);

    return (
        <AnimatePresence>
            {count > 0 && (
                <motion.div
                    className={styles.wrapper}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                    <button className={styles.button} onClick={() => navigate('/delivery')}>
                        <div className={styles.left}>
                            <div className={styles.iconBox}>
                                <ShoppingBag size={20} />
                                <span className={styles.badge}>{count}</span>
                            </div>
                            <span className={styles.title}>Корзина</span>
                        </div>
                        <div className={styles.right}>
                            <span className={styles.total}>{total.toFixed(2)}₽</span>
                            <ChevronRight size={20} />
                        </div>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingCart;
