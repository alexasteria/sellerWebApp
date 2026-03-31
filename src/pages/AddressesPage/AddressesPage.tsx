import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/apiClient';
import { ModelsTgUserAddress } from '@/backendApi';
import { ArrowLeft, MapPin, Plus, Trash2 } from 'lucide-react';
import { useTelegramBackButton } from '@/hooks/useTelegramBackButton';
import { Button } from '@/components/UiKit';
import styles from './AddressesPage.module.css';

const AddressesPage: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useTelegramBackButton(() => navigate(-1));
  const [addresses, setAddresses] = useState<ModelsTgUserAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newAddressText, setNewAddressText] = useState('');

  const fetchAddresses = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const response = await apiClient.users.addressesList(user.id);
      setAddresses(response.data || []);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDelete = async (id?: number) => {
    if (!user?.id || !id) return;
    try {
      await apiClient.users.addressesDelete(user.id, id);
      setAddresses(addresses.filter(a => a.id !== id));
    } catch (error) {
      console.error('Failed to delete address:', error);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !newAddressText.trim()) return;

    try {
      await apiClient.users.addressesCreate(user.id, {
        address_text: newAddressText.trim(),
        is_default: addresses.length === 0,
      });
      setNewAddressText('');
      setIsAdding(false);
      fetchAddresses();
    } catch (error) {
      console.error('Failed to create address:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content} style={{ marginTop: '16px' }}>
        {isAdding ? (
          <form className={styles.form} onSubmit={handleAddSubmit}>
            <div className={styles.formGroup}>
              <label>Новый адрес доставки</label>
              <textarea
                value={newAddressText}
                onChange={(e) => setNewAddressText(e.target.value)}
                placeholder="Город, Улица, Дом, Квартира"
                className={styles.textarea}
                autoFocus
                rows={3}
              />
            </div>
            <div className={styles.formActions}>
              <Button type="button" className={styles.cancelBtn} onClick={() => setIsAdding(false)}>
                Отмена
              </Button>
              <Button type="submit" disabled={!newAddressText.trim()}>
                Сохранить
              </Button>
            </div>
          </form>
        ) : loading ? (
          <div className={styles.loading}>Загрузка...</div>
        ) : addresses.length === 0 ? (
          <div className={styles.emptyState}>
            <MapPin size={48} className={styles.emptyIcon} />
            <p className={styles.emptyText}>У вас пока нет сохраненных адресов</p>
            <Button onClick={() => setIsAdding(true)}>
              Добавить адрес
            </Button>
          </div>
        ) : (
          <div className={styles.addressList}>
            {addresses.map((address) => (
              <div key={address.id} className={styles.addressCard}>
                <div className={styles.addressInfo}>
                  <MapPin size={20} className={styles.addressIcon} />
                  <div className={styles.addressTextWrapper}>
                    <p className={styles.addressText}>{address.address_text}</p>
                    {address.is_default && <span className={styles.defaultBadge}>Основной</span>}
                  </div>
                </div>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(address.id)}
                  aria-label="Удалить адрес"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            
            <button className={styles.addNewBtn} onClick={() => setIsAdding(true)}>
              <Plus size={20} />
              Добавить еще один адрес
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressesPage;
