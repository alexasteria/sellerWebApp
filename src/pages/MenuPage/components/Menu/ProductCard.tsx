import React, { FC, useMemo, useState } from 'react';
import { ModelsProduct } from '@/backendApi';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: ModelsProduct;
    onClick: () => void;
    totalQuantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

const PLACEHOLDER_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><rect fill='%23f2f2f7' width='200' height='200'/><text fill='%238e8e93' font-family='sans-serif' font-size='16' font-weight='500' x='50%' y='50%' text-anchor='middle'>Нет фото</text></svg>";

const ProductCard: FC<ProductCardProps> = ({ product, onClick, totalQuantity, onIncrement, onDecrement }) => {
    const [imgSrc, setImgSrc] = useState(product.img || PLACEHOLDER_IMAGE);

    const price = useMemo(() => {
        return product.variants?.[0]?.cost || 0;
    }, [product]);

    return (
        <motion.div
            className={styles.card}
            onClick={onClick}
            whileTap={{ scale: 0.98 }}
        >
            <div className={styles.imageContainer}>
                <img
                    src={imgSrc}
                    alt={product.title}
                    onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
                />
                {product.discount ? (
                    <div className={styles.badge}>-{product.discount}%</div>
                ) : null}
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>
                    {product.title}
                </h3>
                <p className={styles.description}>{product.description}</p>

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
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 10, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className={styles.quantityNum}
                                >
                                    {totalQuantity}
                                </motion.div>
                            </AnimatePresence>
                            <button className={styles.stepperBtn} onClick={onIncrement}>
                                <Plus size={16} />
                            </button>
                        </div>
                    ) : (
                        <button
                            className={styles.addButton}
                            onClick={(e) => {
                                e.stopPropagation();
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
