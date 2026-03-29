import React, { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import styles from './BottomNav.module.css';
import clsx from 'clsx';

const BottomNav: FC<{}> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItemCount } = useCart();

  const tabs = [
    { path: '/', icon: Home, label: 'Меню' },
    { path: '/delivery', icon: ShoppingCart, label: 'Корзина', badge: cartItemCount },
    { path: '/profile', icon: User, label: 'Профиль' },
  ];

  return (
    <nav className={clsx(styles.nav, 'glass', 'safe-area-bottom')}>
      <div className={styles.navContainer}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path || (tab.path === '/delivery' && location.pathname.startsWith('/delivery'));
          
          return (
            <button
              key={tab.path}
              className={clsx(styles.navItem, isActive && styles.active)}
              onClick={() => navigate(tab.path)}
            >
              <div className={styles.iconContainer}>
                <Icon size={24} />
                {tab.badge ? <span className={styles.badge}>{tab.badge}</span> : null}
              </div>
              <span className={styles.label}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
