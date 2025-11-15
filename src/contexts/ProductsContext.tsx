import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { ModelsProduct } from "@/backendApi";
import { productService } from "@/services/ProductService";
import { userService } from "@/services/UserService";
import { useUser } from "./UserContext";

// Hardcoded initial data (can be used for development or as a fallback)
const prod: ModelsProduct[] = [
  {
    id: "classic-maki",
    tenantID: "default_tenant_id",
    title: "Классический маки",
    img: "https://sushihasi-nn.ru/assets/images/rolls/nabory/filoman25-2.jpg",
    description: "Рис, нори, классическая начинка",
    discount: 0,
    variants: [
      {
        id: "6pcs",
        value: "6 шт.",
        cost: 300,
        stock: 15,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Начинка", "Нори", "Рис"],
    },
  },
  {
    id: "margherita",
    tenantID: "default_tenant_id",
    title: "Маргарита",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center",
    description:
      "Классическая итальянская пицца с ароматным томатным соусом и свежей моцареллой, украшенная листьями базилика.",
    discount: 15,
    variants: [
      {
        id: "25cm",
        value: "25 см",
        cost: 920,
        stock: 10,
      },
      {
        id: "30cm",
        value: "30 см",
        cost: 1145,
        stock: 8,
      },
      {
        id: "35cm",
        value: "35 см",
        cost: 1365,
        stock: 5,
      },
    ],
    tags: {
      name: "Состав",
      tags: [
        "Сухой орегано",
        "Оливковое масло",
        "Базилик",
        "Моцарелла",
        "Томатный соус",
      ],
    },
  },
  {
    id: "pepperoni",
    tenantID: "default_tenant_id",
    title: "Пепперони",
    img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center",
    description:
      "Популярная пицца с пикантной колбасой пепперони и тянущейся моцареллой на тонком тесте.",
    discount: 10,
    variants: [
      {
        id: "25cm",
        value: "25 см",
        cost: 920,
        stock: 6,
      },
      {
        id: "30cm",
        value: "30 см",
        cost: 1145,
        stock: 5,
      },
      {
        id: "35cm",
        value: "35 см",
        cost: 1365,
        stock: 4,
      },
    ],
    tags: {
      name: "Состав",
      tags: [
        "Красный перец",
        "Чеснок",
        "Пепперони",
        "Моцарелла",
        "Томатный соус",
      ],
    },
  },
  {
    id: "quattro-formaggi",
    tenantID: "default_tenant_id",
    title: "Четыре сыра",
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center",
    description:
      "Ароматная пицца с сочетанием четырёх видов сыра для настоящих гурманов.",
    discount: 20,
    variants: [
      {
        id: "25cm",
        value: "25 см",
        cost: 920,
        stock: 7,
      },
      {
        id: "30cm",
        value: "30 см",
        cost: 1145,
        stock: 6,
      },
      {
        id: "35cm",
        value: "35 см",
        cost: 1365,
        stock: 4,
      },
    ],
    tags: {
      name: "Состав",
      tags: [
        "Мускатный орех",
        "Сливочный соус",
        "Рикотта",
        "Пармезан",
        "Горгонзола",
        "Моцарелла",
      ],
    },
  },
  {
    id: "hawaiian",
    tenantID: "default_tenant_id",
    title: "Гавайская",
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center",
    description:
      "Сочетание нежной ветчины и сладких ананасов — яркий вкус Гавайев на вашем столе.",
    discount: 0,
    variants: [
      {
        id: "25cm",
        value: "25 см",
        cost: 920,
        stock: 10,
      },
      {
        id: "30cm",
        value: "30 см",
        cost: 1145,
        stock: 7,
      },
      {
        id: "35cm",
        value: "35 см",
        cost: 1365,
        stock: 5,
      },
    ],
    tags: {
      name: "Состав",
      tags: [
        "Сыр гауда",
        "Сладкий перец",
        "Ананас",
        "Ветчина",
        "Моцарелла",
        "Томатный соус",
      ],
    },
  },
  {
    id: "vegetarian",
    tenantID: "default_tenant_id",
    title: "Вегетарианская",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center",
    description: "Лёгкая пицца с большим количеством свежих овощей и трав.",
    discount: 0,
    variants: [
      {
        id: "25cm",
        value: "25 см",
        cost: 920,
        stock: 15,
      },
      {
        id: "30cm",
        value: "30 см",
        cost: 1145,
        stock: 10,
      },
      {
        id: "35cm",
        value: "35 см",
        cost: 1365,
        stock: 6,
      },
    ],
    tags: {
      name: "Состав",
      tags: [
        "Петрушка",
        "Оливки",
        "Кукуруза",
        "Лук",
        "Грибы",
        "Перец",
        "Моцарелла",
        "Томатный соус",
      ],
    },
  },
  {
    id: "vege-sushi",
    tenantID: "default_tenant_id",
    title: "Вегетарианский маки",
    img: "https://sushihasi-nn.ru/assets/images/rolls/nabory/filoman25-2.jpg",
    description: "Огурец, авокадо, морковь",
    discount: 5,
    variants: [
      {
        id: "8pcs",
        value: "8 шт.",
        cost: 360,
        stock: 10,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Морковь", "Авокадо", "Огурец"],
    },
  },
  {
    id: "bbq-chicken",
    tenantID: "default_tenant_id",
    title: "Барбекю курица",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center",
    description:
      "Пицца с нежной курицей и соусом барбекю для любителей насыщенного вкуса.",
    discount: 0,
    variants: [
      {
        id: "25cm",
        value: "25 см",
        cost: 920,
        stock: 8,
      },
      {
        id: "30cm",
        value: "30 см",
        cost: 1145,
        stock: 6,
      },
      {
        id: "35cm",
        value: "35 см",
        cost: 1365,
        stock: 4,
      },
    ],
    tags: {
      name: "Состав",
      tags: [
        "Перец чили",
        "Чеддер",
        "Кинза",
        "Красный лук",
        "Курица",
        "Моцарелла",
        "Соус барбекю",
      ],
    },
  },
  {
    id: "spicy-tuna",
    tenantID: "default_tenant_id",
    title: "Spicy Tuna Roll",
    img: "https://sushihasi-nn.ru/assets/images/rolls/nabory/filoman25-2.jpg",
    description: "Тунец, острый соус, огурец",
    discount: 12,
    variants: [
      {
        id: "8pcs",
        value: "8 шт.",
        cost: 500,
        stock: 7,
      },
      {
        id: "6pcs",
        value: "6 шт.",
        cost: 450,
        stock: 7,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Огурец", "Соус", "Тунец"],
    },
  },
  {
    id: "avocado-maki",
    tenantID: "default_tenant_id",
    title: "Авокадо маки",
    img: "https://sushihasi-nn.ru/assets/images/rolls/nabory/filoman25-2.jpg",
    description: "Авокадо и рис",
    discount: 5,
    variants: [
      {
        id: "6pcs",
        value: "6 шт.",
        cost: 350,
        stock: 12,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Рис", "Авокадо"],
    },
  },
  {
    id: "mixed-nigiri",
    tenantID: "default_tenant_id",
    title: "Нигири ассорти",
    img: "https://sushihasi-nn.ru/assets/images/rolls/nabory/filoman25-2.jpg",
    description: "Нигири с разной рыбой",
    discount: 10,
    variants: [
      {
        id: "6pcs",
        value: "6 шт.",
        cost: 700,
        stock: 4,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Рис", "Рыба"],
    },
  },
  {
    id: "futomaki",
    tenantID: "default_tenant_id",
    title: "Футомаки",
    img: "https://sushihasi-nn.ru/assets/images/rolls/nabory/filoman25-2.jpg",
    description: "Толстый ролл с несколькими начинками",
    discount: 5,
    variants: [
      {
        id: "4pcs",
        value: "4 шт.",
        cost: 550,
        stock: 6,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Нори", "Рис", "Разные начинк"],
    },
  },
];

interface ProductsContextType {
  products: ModelsProduct[];
  isLoading: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ModelsProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useUser();

  useEffect(() => {
    const loadProducts = async () => {
      //todo del mock products
      if (!user) return setProducts(prod); // Don't fetch until user is available

      setIsLoading(true);
      const tenantId = userService.getTenantId(user);
      const fetchedProducts = await productService.getProducts(tenantId);
      if (fetchedProducts.length > 0) {
        setProducts(fetchedProducts);
      }
      setIsLoading(false);
    };

    loadProducts();
  }, [user]); // Dependency on user ensures this runs after user is loaded

  const value = useMemo(
    () => ({
      products,
      isLoading,
    }),
    [products, isLoading],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
