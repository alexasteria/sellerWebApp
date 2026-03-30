import React, { FC } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './ProfilePage.module.css';
import { Settings, HelpCircle, ShoppingBag, ChevronRight, MapPin } from 'lucide-react';
import { WebApp } from 'telegram-web-app';

const tg: WebApp = (window as any).Telegram?.WebApp;

const ProfilePage: FC = () => {
  const { user } = useAuth();

  const getInitials = () => {
    if (!user) return '?';
    const first = user.first_name ? user.first_name.charAt(0) : '';
    const last = user.last_name ? user.last_name.charAt(0) : '';
    return (first + last).toUpperCase() || '?';
  };

  const menuItems = [
    {
      title: 'Мои заказы',
      icon: <ShoppingBag size={18} />,
      onClick: () => tg?.showAlert?.('Раздел "Мои заказы" в разработке'),
    },
    {
      title: 'Адреса доставки',
      icon: <MapPin size={18} />,
      onClick: () => tg?.showAlert?.('Раздел "Адреса доставки" в разработке'),
    },
  ];

  const settingsItems = [
    {
      title: 'Настройки',
      icon: <Settings size={18} />,
      onClick: () => tg?.showAlert?.('Настройки приложения'),
    },
    {
      title: 'Помощь и поддержка',
      icon: <HelpCircle size={18} />,
      onClick: () => tg?.showAlert?.('Поддержка клиентов'),
    },
  ];

  const renderList = (items: typeof menuItems) => (
    <div className={styles.cardList}>
      {items.map((item, index) => (
        <button key={index} className={styles.listItem} onClick={item.onClick}>
          <div className={styles.iconWrapper}>{item.icon}</div>
          <span>{item.title}</span>
          <ChevronRight size={20} className={styles.chevron} />
        </button>
      ))}
    </div>
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.avatarContainer}>
          {user?.photo_url ? (
            <img src={user.photo_url} alt="Profile" className={styles.avatar} />
          ) : (
            getInitials()
          )}
        </div>
        <h1 className={styles.name}>
          {user?.first_name} {user?.last_name}
        </h1>
        {user?.username && <p className={styles.username}>@{user.username}</p>}
      </header>

      <div className={styles.listGroupTitle}>Основное</div>
      {renderList(menuItems)}

      <div className={styles.listGroupTitle}>Дополнительно</div>
      {renderList(settingsItems)}
    </div>
  );
};

export default ProfilePage;
