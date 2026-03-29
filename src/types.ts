

export type VariantState = Record<string, number>;
export type CartState = Record<string, VariantState>;



export type DeliveryAddress = {
  city: string;
  street: string;
  house: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
  comment?: string;
};

export type CourierService = {
  id: string;
  name: string;
  price: number;
  time: string;
  description: string;
};

export type DeliveryInfo = {
  address: DeliveryAddress;
  courier: CourierService;
  totalWithDelivery: number;
};

