import React, { FC } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) => {
    const baseClass = styles.button;
    const variantClass = styles[`variant-${variant}`];
    const sizeClass = styles[`size-${size}`];
    const widthClass = fullWidth ? styles.fullWidth : '';
    const loadingClass = isLoading ? styles.loading : '';
    const classes = [baseClass, variantClass, sizeClass, widthClass, loadingClass, className].filter(Boolean).join(' ');

    return (
        <motion.button
            className={classes}
            disabled={disabled || isLoading}
            whileTap={{ scale: disabled || isLoading ? 1 : 0.96 }}
            whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            {...(props as any)}
        >
            {isLoading ? <div className={styles.spinner} /> : children}
        </motion.button>
    );
};
