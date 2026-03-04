import React, { FC, ChangeEvent } from 'react';
import { DeliveryAddress } from '@/types';
import styles from './DeliveryAddressForm.module.css';

interface DeliveryAddressFormProps {
  address: DeliveryAddress;
  onChange: (next: DeliveryAddress) => void;
}

const DeliveryAddressForm: FC<DeliveryAddressFormProps> = ({ address, onChange }) => {
  const handleFieldChange = (field: keyof DeliveryAddress) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange({ ...address, [field]: e.target.value });
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.sectionTitle}>Адрес доставки</h3>

      <div className={styles.formGroup}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.input}
            value={address.city}
            onChange={handleFieldChange('city')}
            placeholder="Город *"
            required
          />
        </div>

        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.input}
            value={address.street}
            onChange={handleFieldChange('street')}
            placeholder="Улица *"
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              value={address.house}
              onChange={handleFieldChange('house')}
              placeholder="Дом *"
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              value={address.apartment || ''}
              onChange={handleFieldChange('apartment')}
              placeholder="Квартира"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              value={address.entrance || ''}
              onChange={handleFieldChange('entrance')}
              placeholder="Подъезд"
            />
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              value={address.floor || ''}
              onChange={handleFieldChange('floor')}
              placeholder="Этаж"
            />
          </div>
        </div>

        <div className={styles.inputWrapper}>
          <textarea
            className={styles.textarea}
            value={address.comment || ''}
            onChange={handleFieldChange('comment')}
            placeholder="Комментарий для курьера (необязательно)"
            rows={2}
          />
        </div>
      </div>
    </section>
  );
};

export default DeliveryAddressForm;
