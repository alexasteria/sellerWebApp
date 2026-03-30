import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/apiClient';
import { ModelsOrder } from '@/backendApi';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import styles from './OrdersHistoryPage.module.css';

const OrdersHistoryPage: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<ModelsOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await apiClient.users.ordersList(user.id);
        setOrders(response.data || []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusDisplay = (status?: string) => {
    switch (status) {
      case 'PENDING_PAYMENT':
        return { text: 'Ожидает оплаты', icon: <Clock size={16} />, color: '#F59E0B' };
      case 'PAID':
        return { text: 'Оплачен', icon: <CheckCircle size={16} />, color: '#10B981' };
      case 'PREPARING':
        return { text: 'Готовится', icon: <Package size={16} />, color: '#3B82F6' };
      case 'DELIVERING':
        return { text: 'В пути', icon: <Package size={16} />, color: '#8B5CF6' };
      case 'COMPLETED':
        return { text: 'Выполнен', icon: <CheckCircle size={16} />, color: '#10B981' };
      case 'CANCELLED':
        return { text: 'Отменен', icon: <XCircle size={16} />, color: '#EF4444' };
      default:
        return { text: status || 'Неизвестно', icon: <Clock size={16} />, color: '#6B7280' };
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className={styles.title}>Мои заказы</h1>
        <div style={{ width: 24 }}></div>
      </header>

      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>Загрузка заказов...</div>
        ) : orders.length === 0 ? (
          <div className={styles.emptyState}>
            <Package size={48} className={styles.emptyIcon} />
            <p className={styles.emptyText}>У вас пока нет заказов</p>
            <button className={styles.shopBtn} onClick={() => navigate('/')}>Перейти к меню</button>
          </div>
        ) : (
          <div className={styles.orderList}>
            {orders.map((order) => {
              const statusDisplay = getStatusDisplay(order.status);
              return (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <span className={styles.orderNumber}>Заказ #{order.id}</span>
                    <span className={styles.orderDate}>{formatDate(order.created_at)}</span>
                  </div>
                  
                  <div className={styles.orderBody}>
                    <div className={styles.orderStatus} style={{ color: statusDisplay.color }}>
                      {statusDisplay.icon}
                      <span>{statusDisplay.text}</span>
                    </div>
                    <div className={styles.orderTotal}>
                      Итого: <strong>{order.total_amount?.toLocaleString('ru-RU')} ₽</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersHistoryPage;
