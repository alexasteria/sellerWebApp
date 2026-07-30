import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { apiClient } from '@/apiClient';
import { SellerGoApiInternalApientOrderResponse } from '@/backendApi';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useTelegramBackButton } from '@/hooks/useTelegramBackButton';
import styles from './OrdersHistoryPage.module.css';

const OrdersHistoryPage: FC = () => {
  const { user } = useAuth();
  const { clearCart, increment } = useCart();
  const navigate = useNavigate();
  useTelegramBackButton(() => navigate(-1));
  const [orders, setOrders] = useState<SellerGoApiInternalApientOrderResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await apiClient.instance.get(`/orders?tg_user_id=${user.id}`);
        setOrders((response.data.items || []) || []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleRepeatOrder = (order: SellerGoApiInternalApientOrderResponse) => {
    if (!order.order_items || order.order_items.length === 0) return;
    
    clearCart();
    
    order.order_items.forEach((item) => {
      if (item.product) {
        const qty = item.quantity || 1;
        for (let i = 0; i < qty; i++) {
          increment(item.product as any, item.variant?.id);
        }
      }
    });

    setTimeout(() => {
      navigate('/delivery');
    }, 50);
  };

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
      <div className={styles.content} style={{ marginTop: '16px' }}>
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

                  {order.order_items && order.order_items.length > 0 && (
                    <button 
                      className={styles.repeatBtn} 
                      onClick={() => handleRepeatOrder(order)}
                    >
                      <RotateCcw size={16} /> Повторить заказ
                    </button>
                  )}
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
