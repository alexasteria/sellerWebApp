import React, { FC } from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
    count?: number;
    type?: 'card' | 'text' | 'round';
    width?: string | number;
    height?: string | number;
    className?: string;
}

export const Skeleton: FC<SkeletonProps> = ({
    count = 1,
    type = 'card',
    width,
    height,
    className = ''
}) => {
    const elements = Array.from({ length: count }, (_, i) => i);

    return (
        <>
            {elements.map((idx) => (
                <div
                    key={idx}
                    className={`${styles.skeleton} ${styles[type]} ${className}`}
                    style={{ width, height }}
                />
            ))}
        </>
    );
};
