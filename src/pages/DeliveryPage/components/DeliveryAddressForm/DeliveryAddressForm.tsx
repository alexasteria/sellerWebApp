import React, { FC, ChangeEvent } from 'react';
import { DeliveryAddress } from '@/types';
import styles from './DeliveryAddressForm.module.css';
import { Input } from '@/components/UiKit';

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
        <Input
          value={address.city}
          onChange={handleFieldChange('city')}
          placeholder="Город *"
          required
        />

        <Input
          value={address.street}
          onChange={handleFieldChange('street')}
          placeholder="Улица *"
          required
        />

        <div className={styles.row}>
          <Input
            value={address.house}
            onChange={handleFieldChange('house')}
            placeholder="Дом *"
            required
          />

          <Input
            value={address.apartment || ''}
            onChange={handleFieldChange('apartment')}
            placeholder="Квартира"
          />
        </div>

        <div className={styles.row}>
          <Input
            value={address.entrance || ''}
            onChange={handleFieldChange('entrance')}
            placeholder="Подъезд"
          />

          <Input
            value={address.floor || ''}
            onChange={handleFieldChange('floor')}
            placeholder="Этаж"
          />
        </div>

        <Input
          value={address.comment || ''}
          onChange={handleFieldChange('comment')}
          placeholder="Комментарий для курьера (необязательно)"
        />
      </div>
    </section>
  );
};

export default DeliveryAddressForm;
