export interface Product {
  id: string;
  tenantID: string;
  title: string;
  img?: string;
  description?: string;
  discount?: number;
  variants: ProductVariant[]; //вариации одного продукта, напр - обьем сока, минимум 1
  options?: ProductOption[]; //допы, например соус или сырный бортик к пицце
  tags?: ProductTags;
}
export type ProductVariant = {
  id: string;
  value: string;
  cost: number;
  stock: number;
};
type ProductOption = {
  id: string;
  value: string;
  priceModifier: number;
  isEnable: boolean;
};
type ProductTags = {
  name: string; //напр - Состав
  tags: string[]; // напр - [Моцарелла, горгонзола, пармезан, рикотта]
};
export interface MenuItem extends Product {
  // id: string;
  // title: string;
  // price: number;
  // img?: string;
  // description?: string;
  cardStyle?: "classic" | "premium";
  ingredients?: string[];
  spicy?: boolean;
  vegetarian?: boolean;
  popular?: boolean;
  // discount?: number;
  weight?: string;
  cookingTime?: string;
}

export type VariantState = Record<string, number>;
export type CartState = Record<string, VariantState>;

export type OrderItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  description?: string;
};

// export type OrderPayload = {
//   action: "checkout";
//   items: OrderItem[];
//   total: number;
//   currency: string;
//   delivery?: DeliveryInfo | null;
//   timestamp?: number;
//   user?: {
//     id?: number;
//     username?: string;
//     first_name?: string;
//     last_name?: string;
//   };
// };

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

export type OrderPayload = {
  userID: number;
  cart: {
    productID: string;
    variantID: string;
    quantity: number;
    price: number;
  }[];
};
