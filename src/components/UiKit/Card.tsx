import React, { FC } from 'react';
import styles from './Card.module.css';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Card: FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  fullWidth = false,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        styles.card,
        styles[`variant-${variant}`],
        styles[`padding-${padding}`],
        fullWidth && styles.fullWidth,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
