import React, { FC } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './GlassHeader.module.css';

interface GlassHeaderProps {
    title?: string;
    leftAccessory?: React.ReactNode;
    rightAccessory?: React.ReactNode;
}

export const GlassHeader: FC<GlassHeaderProps> = ({ title, leftAccessory, rightAccessory }) => {
    const { scrollY } = useScroll();

    // Creates a subtle background shadow effect when scrolling down
    const borderOpacity = useTransform(scrollY, [0, 20], [0, 1]);

    return (
        <motion.header
            className={styles.header}
        >
            <div className={styles.container}>
                <div className={styles.accessory}>{leftAccessory}</div>
                {title && <h1 className={styles.title}>{title}</h1>}
                <div className={styles.accessory} style={{ justifyContent: 'flex-end' }}>{rightAccessory}</div>
            </div>
        </motion.header>
    );
};
