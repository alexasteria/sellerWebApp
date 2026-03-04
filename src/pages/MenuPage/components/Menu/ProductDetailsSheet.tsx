import React, { FC, useState, useMemo } from 'react';
import { ModelsProduct, ModelsProductVariant } from '@/backendApi';
import { BottomSheet, Button } from '@/components/UiKit';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import styles from './ProductDetailsSheet.module.css';

interface ProductDetailsSheetProps {
    product: ModelsProduct | null;
    isOpen: boolean;
    onClose: () => void;
    variantState: Record<string, number>;
    onIncrement: (product: ModelsProduct, variantID: number | undefined) => void;
    onDecrement: (product: ModelsProduct, variantID: number | undefined) => void;
}

const PLACEHOLDER_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect fill='%23f2f2f7' width='400' height='300'/><text fill='%238e8e93' font-family='sans-serif' font-size='24' font-weight='500' x='50%' y='50%' text-anchor='middle'>Нет фото</text></svg>";

const ProductDetailsSheet: FC<ProductDetailsSheetProps> = ({
    product,
    isOpen,
    onClose,
    variantState,
    onIncrement,
    onDecrement,
}) => {
    // Keep a local copy of the product so the exit animation has content to render
    const [displayProduct, setDisplayProduct] = useState<ModelsProduct | null>(product);

    React.useEffect(() => {
        if (product) {
            setDisplayProduct(product);
        }
    }, [product]);

    const [selectedVariantId, setSelectedVariantId] = useState<number | undefined>(
        displayProduct?.variants?.[0]?.id
    );

    // Update selection if displayProduct changes
    React.useEffect(() => {
        if (displayProduct?.variants?.[0]?.id && !selectedVariantId) {
            setSelectedVariantId(displayProduct.variants[0].id);
        }
    }, [displayProduct, selectedVariantId]);

    const selectedVariant = displayProduct?.variants?.find(v => v.id === selectedVariantId) || displayProduct?.variants?.[0];
    const price = selectedVariant?.cost || 0;

    const discountPrice = useMemo(() => {
        if (!displayProduct?.discount) return price;
        return parseFloat((price * (1 - displayProduct.discount / 100)).toFixed(2));
    }, [price, displayProduct?.discount]);

    const quantity = selectedVariant?.id ? variantState[String(selectedVariant.id)] || 0 : 0;

    if (!displayProduct) return null;

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <div className={styles.container}>
                <div className={styles.imageWrapper}>
                    <img
                        src={displayProduct.img || PLACEHOLDER_IMAGE}
                        alt={displayProduct.title}
                        onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE; }}
                    />
                </div>

                <div className={styles.info}>
                    <h2 className={styles.title}>
                        {displayProduct.title}
                    </h2>
                    <p className={styles.description}>{displayProduct.description}</p>
                </div>

                {displayProduct.variants && displayProduct.variants.length > 1 && (
                    <div className={styles.variants}>
                        <h4 className={styles.sectionTitle}>Выбор варианта</h4>
                        <div className={styles.variantList}>
                            {displayProduct.variants.map((v) => (
                                <button
                                    key={v.id}
                                    className={`${styles.variantPill} ${v.id === selectedVariantId ? styles.activeVariant : ''}`}
                                    onClick={() => setSelectedVariantId(v.id)}
                                >
                                    <span className={styles.variantName}>
                                        {v.value}
                                        {variantState[String(v.id)] ? (
                                            <span style={{
                                                marginLeft: '8px',
                                                fontSize: '14px',
                                                color: 'var(--tg-button, #007aff)',
                                                fontWeight: 700,
                                                background: 'var(--tg-button-text, #ffffff)',
                                                padding: '2px 6px',
                                                borderRadius: '10px',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                            }}>
                                                {variantState[String(v.id)]} шт
                                            </span>
                                        ) : null}
                                    </span>
                                    <span className={styles.variantPrice}>{v.cost}₽</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className={styles.actionArea}>
                    {quantity > 0 ? (
                        <div className={styles.counterControl}>
                            <button
                                className={styles.iconBtn}
                                onClick={() => onDecrement(displayProduct, selectedVariant?.id)}
                            >
                                <Minus size={20} />
                            </button>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={quantity}
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 10, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className={styles.quantityNum}
                                >
                                    {quantity}
                                </motion.div>
                            </AnimatePresence>
                            <button
                                className={styles.iconBtn}
                                onClick={() => onIncrement(displayProduct, selectedVariant?.id)}
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    ) : (
                        <Button
                            fullWidth
                            size="lg"
                            onClick={() => onIncrement(displayProduct, selectedVariant?.id)}
                        >
                            В корзину за {discountPrice}₽ {displayProduct.discount ? <span className={styles.oldPrice}>{price}₽</span> : ''}
                        </Button>
                    )}
                </div>
            </div>
        </BottomSheet>
    );
};

export default ProductDetailsSheet;
