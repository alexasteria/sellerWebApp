import React, { FC, useMemo, useState } from 'react';
import { SellerGoApiInternalApientProductResponse } from '@/backendApi';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import styles from './ProductCard.module.css';
import { getImageUrl } from '@/utils/getImageUrl';
import { animateFlyingToCart } from '@/utils/animations';

interface ProductCardProps {
    product: SellerGoApiInternalApientProductResponse;
    onClick: () => void;
    totalQuantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onClick, totalQuantity, onIncrement, onDecrement }) => {
    const [imgError, setImgError] = useState(false);
    const hasImage = !!product.img && !imgError;

    const price = useMemo(() => {
        return product.variants?.[0]?.cost || 0;
    }, [product]);

    return (
        <motion.div
            data-product-card="true"
            className={styles.card}
            onClick={onClick}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.imageContainer}>
                {hasImage ? (
                    <img
                        src={getImageUrl(product.img)}
                        alt={product.title}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 200">
                            <rect fill="var(--app-bg)" width="200" height="200"/>
                            <text fill="var(--app-text-muted)" fontFamily="sans-serif" fontSize="16" fontWeight="500" x="50%" y="50%" textAnchor="middle">Нет фото</text>
                        </svg>
                    </div>
                )}
                {product.discount ? (
                    <div className={styles.badge}>-{product.discount}%</div>
                ) : null}
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>
                    {product.title}
                </h3>
                {product.description && <p className={styles.description}>{product.description}</p>}

                <div className={styles.footer}>
                    <div className={styles.price}>{price.toFixed(2)}₽</div>

                    {totalQuantity > 0 ? (
                        <div className={styles.stepper} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.stepperBtn} onClick={onDecrement}>
                                <Minus size={16} />
                            </button>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={totalQuantity}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className={styles.quantityNum}
                                >
                                    {totalQuantity}
                                </motion.div>
                            </AnimatePresence>
                            <button 
                                className={styles.stepperBtn} 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (hasImage) {
                                        animateFlyingToCart(e as any, getImageUrl(product.img));
                                    }
                                    onIncrement();
                                }}
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    ) : (
                        <button
                            className={styles.addButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (hasImage) {
                                    animateFlyingToCart(e as any, getImageUrl(product.img));
                                }
                                onIncrement();
                            }}
                        >
                            <Plus size={18} />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
