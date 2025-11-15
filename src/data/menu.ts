import { Product } from "../types";

const maxPizzaMenu: Product[] = [
  {
    id: "margherita",
    tenantID: "default_tenant_id",
    title: "Маргарита",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center",
    description:
      "Классическая итальянская пицца с ароматным томатным соусом и свежей моцареллой, украшенная листьями базилика.",
    discount: 15,
    variants: [
      { id: "25cm", value: "25 см", cost: 920, stock: 10 },
      { id: "30cm", value: "30 см", cost: 1145, stock: 8 },
      { id: "35cm", value: "35 см", cost: 1365, stock: 5 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      {
        id: "spicySauce",
        value: "Острый соус",
        priceModifier: 50,
        isEnable: true,
      },
    ],
    tags: {
      name: "Состав",
      tags: [
        "Томатный соус",
        "Моцарелла",
        "Базилик",
        "Оливковое масло",
        "Сухой орегано",
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
      { id: "25cm", value: "25 см", cost: 920, stock: 6 },
      { id: "30cm", value: "30 см", cost: 1145, stock: 5 },
      { id: "35cm", value: "35 см", cost: 1365, stock: 4 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      {
        id: "extraPepperoni",
        value: "Доп. пепперони",
        priceModifier: 200,
        isEnable: true,
      },
    ],
    tags: {
      name: "Состав",
      tags: [
        "Томатный соус",
        "Моцарелла",
        "Пепперони",
        "Чеснок",
        "Красный перец",
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
      { id: "25cm", value: "25 см", cost: 920, stock: 7 },
      { id: "30cm", value: "30 см", cost: 1145, stock: 6 },
      { id: "35cm", value: "35 см", cost: 1365, stock: 4 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      { id: "honey", value: "Мёд", priceModifier: 70, isEnable: true },
    ],
    tags: {
      name: "Состав",
      tags: [
        "Моцарелла",
        "Горгонзола",
        "Пармезан",
        "Рикотта",
        "Сливочный соус",
        "Мускатный орех",
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
    variants: [
      { id: "25cm", value: "25 см", cost: 920, stock: 10 },
      { id: "30cm", value: "30 см", cost: 1145, stock: 7 },
      { id: "35cm", value: "35 см", cost: 1365, stock: 5 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      {
        id: "extraPineapple",
        value: "Доп. ананас",
        priceModifier: 100,
        isEnable: true,
      },
    ],
    tags: {
      name: "Состав",
      tags: [
        "Томатный соус",
        "Моцарелла",
        "Ветчина",
        "Ананас",
        "Сладкий перец",
        "Сыр гауда",
      ],
    },
  },
  {
    id: "vegetarian",
    tenantID: "default_tenant_id",
    title: "Вегетарианская",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center",
    description: "Лёгкая пицца с большим количеством свежих овощей и трав.",
    variants: [
      { id: "25cm", value: "25 см", cost: 920, stock: 15 },
      { id: "30cm", value: "30 см", cost: 1145, stock: 10 },
      { id: "35cm", value: "35 см", cost: 1365, stock: 6 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      {
        id: "extraMushrooms",
        value: "Доп. грибы",
        priceModifier: 120,
        isEnable: true,
      },
    ],
    tags: {
      name: "Состав",
      tags: [
        "Томатный соус",
        "Моцарелла",
        "Перец",
        "Грибы",
        "Лук",
        "Кукуруза",
        "Оливки",
        "Петрушка",
      ],
    },
  },
  {
    id: "bbq-chicken",
    tenantID: "default_tenant_id",
    title: "Барбекю курица",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center",
    description:
      "Пицца с нежной курицей и соусом барбекю для любителей насыщенного вкуса.",
    variants: [
      { id: "25cm", value: "25 см", cost: 920, stock: 8 },
      { id: "30cm", value: "30 см", cost: 1145, stock: 6 },
      { id: "35cm", value: "35 см", cost: 1365, stock: 4 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      {
        id: "extraChicken",
        value: "Доп. курица",
        priceModifier: 180,
        isEnable: true,
      },
    ],
    tags: {
      name: "Состав",
      tags: [
        "Соус барбекю",
        "Моцарелла",
        "Курица",
        "Красный лук",
        "Кинза",
        "Чеддер",
        "Перец чили",
      ],
    },
  },
];

const pizzaMenu: Product[] = [
  {
    id: "margherita",
    tenantID: "default_tenant_id",
    title: "Маргарита",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center",
    description: "Томатный соус, моцарелла, базилик",
    discount: 15,
    variants: [
      { id: "25cm", value: "25 см", cost: 450, stock: 10 },
      { id: "30cm", value: "30 см", cost: 650, stock: 8 },
      { id: "35cm", value: "35 см", cost: 850, stock: 5 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      {
        id: "spicySauce",
        value: "Острый соус",
        priceModifier: 50,
        isEnable: true,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Томатный соус", "Моцарелла", "Базилик"],
    },
  },
  {
    id: "pepperoni",
    tenantID: "default_tenant_id",
    title: "Пепперони",
    img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center",
    description: "Томатный соус, моцарелла, пепперони",
    discount: 10,
    variants: [{ id: "35cm", value: "35 см", cost: 400, stock: 6 }],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      {
        id: "extraPepperoni",
        value: "Доп. пепперони",
        priceModifier: 200,
        isEnable: true,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Томатный соус", "Моцарелла", "Пепперони"],
    },
  },
  {
    id: "quattro-formaggi",
    tenantID: "default_tenant_id",
    title: "Четыре сыра",
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center",
    description: "Моцарелла, горгонзола, пармезан, рикотта",
    discount: 20,
    variants: [
      { id: "25cm", value: "25 см", cost: 0, stock: 7 },
      { id: "30cm", value: "30 см", cost: 200, stock: 6 },
      { id: "35cm", value: "35 см", cost: 400, stock: 4 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      { id: "honey", value: "Мёд", priceModifier: 70, isEnable: true },
    ],
    tags: {
      name: "Состав",
      tags: ["Моцарелла", "Горгонзола", "Пармезан", "Рикотта"],
    },
  },
  {
    id: "hawaiian",
    tenantID: "default_tenant_id",
    title: "Гавайская",
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center",
    description: "Томатный соус, моцарелла, ветчина, ананас",
    variants: [
      { id: "25cm", value: "25 см", cost: 0, stock: 10 },
      { id: "30cm", value: "30 см", cost: 200, stock: 7 },
      { id: "35cm", value: "35 см", cost: 400, stock: 5 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      {
        id: "extraPineapple",
        value: "Доп. ананас",
        priceModifier: 100,
        isEnable: true,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Томатный соус", "Моцарелла", "Ветчина", "Ананас"],
    },
  },
  {
    id: "vegetarian",
    tenantID: "default_tenant_id",
    title: "Вегетарианская",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center",
    description: "Томатный соус, моцарелла, перец, грибы, лук",
    variants: [
      { id: "25cm", value: "25 см", cost: 0, stock: 15 },
      { id: "30cm", value: "30 см", cost: 200, stock: 10 },
      { id: "35cm", value: "35 см", cost: 400, stock: 6 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      {
        id: "extraMushrooms",
        value: "Доп. грибы",
        priceModifier: 120,
        isEnable: true,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Томатный соус", "Моцарелла", "Перец", "Грибы", "Лук"],
    },
  },
  {
    id: "bbq-chicken",
    tenantID: "default_tenant_id",
    title: "Барбекю курица",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center",
    description: "Барбекю соус, моцарелла, курица, лук, кинза",
    variants: [
      { id: "25cm", value: "25 см", cost: 0, stock: 8 },
      { id: "30cm", value: "30 см", cost: 200, stock: 6 },
      { id: "35cm", value: "35 см", cost: 400, stock: 4 },
    ],
    options: [
      {
        id: "cheeseCrust",
        value: "Сырный бортик",
        priceModifier: 150,
        isEnable: true,
      },
      {
        id: "extraChicken",
        value: "Доп. курица",
        priceModifier: 180,
        isEnable: true,
      },
    ],
    tags: {
      name: "Состав",
      tags: ["Барбекю соус", "Моцарелла", "Курица", "Лук", "Кинза"],
    },
  },
];
const sushiMenu: Product[] = [
  {
    id: "spicy-tuna",
    tenantID: "default_tenant_id",
    title: "Spicy Tuna Roll",
    img: "https://sushihasi-nn.ru/assets/images/rolls/nabory/filoman25-2.jpg", //
    description: "Тунец, острый соус, огурец",
    discount: 12,
    variants: [
      { id: "8pcs", value: "8 шт.", cost: 500, stock: 7 },
      { id: "6pcs", value: "6 шт.", cost: 450, stock: 7 },
    ],
    options: [
      {
        id: "extraTuna",
        value: "Доп. тунец",
        priceModifier: 150,
        isEnable: true,
      },
    ],
    tags: { name: "Состав", tags: ["Тунец", "Соус", "Огурец"] },
  },
  {
    id: "vege-sushi",
    tenantID: "default_tenant_id",
    title: "Вегетарианский маки",
    img: "https://sushihasi-nn.ru/assets/images/rolls/nabory/filoman25-2.jpg", //
    description: "Огурец, авокадо, морковь",
    discount: 5,
    variants: [{ id: "8pcs", value: "8 шт.", cost: 360, stock: 10 }],
    options: [
      {
        id: "extraVeggies",
        value: "Доп. овощи",
        priceModifier: 80,
        isEnable: true,
      },
    ],
    tags: { name: "Состав", tags: ["Огурец", "Авокадо", "Морковь"] },
  },
  {
    id: "classic-maki",
    tenantID: "default_tenant_id",
    title: "Классический маки",
    img: "https://sushihasi-nn.ru/assets/images/rolls/nabory/filoman25-2.jpg", //
    description: "Рис, нори, классическая начинка",
    discount: 0,
    variants: [{ id: "6pcs", value: "6 шт.", cost: 300, stock: 15 }],
    options: [
      { id: "extraRice", value: "Доп. рис", priceModifier: 20, isEnable: true },
    ],
    tags: { name: "Состав", tags: ["Рис", "Нори", "Начинка"] },
  },
  // Ещё 4 — можно использовать те же изображения с разными id
  {
    id: "avocado-maki",
    tenantID: "default_tenant_id",
    title: "Авокадо маки",
    img: "https://sushihasi-nn.ru/assets/images/rolls/nabory/filoman25-2.jpg", // повтор
    description: "Авокадо и рис",
    discount: 5,
    variants: [{ id: "6pcs", value: "6 шт.", cost: 350, stock: 12 }],
    options: [
      {
        id: "extraAvocado",
        value: "Доп. авокадо",
        priceModifier: 100,
        isEnable: true,
      },
    ],
    tags: { name: "Состав", tags: ["Авокадо", "Рис"] },
  },
  {
    id: "mixed-nigiri",
    tenantID: "default_tenant_id",
    title: "Нигири ассорти",
    img: "https://sushihasi-nn.ru/assets/images/rolls/nabory/filoman25-2.jpg", // пример
    description: "Нигири с разной рыбой",
    discount: 10,
    variants: [{ id: "6pcs", value: "6 шт.", cost: 700, stock: 4 }],
    options: [
      {
        id: "extraFish",
        value: "Доп. рыба",
        priceModifier: 200,
        isEnable: true,
      },
    ],
    tags: { name: "Состав", tags: ["Рыба", "Рис"] },
  },
  {
    id: "futomaki",
    tenantID: "default_tenant_id",
    title: "Футомаки",
    img: "https://sushihasi-nn.ru/assets/images/rolls/nabory/filoman25-2.jpg", // повтор
    description: "Толстый ролл с несколькими начинками",
    discount: 5,
    variants: [{ id: "4pcs", value: "4 шт.", cost: 550, stock: 6 }],
    options: [
      {
        id: "extraFillings",
        value: "Доп. начинка",
        priceModifier: 150,
        isEnable: true,
      },
    ],
    tags: { name: "Состав", tags: ["Разные начинк", "Рис", "Нори"] },
  },
];
const ikeaMenu: Product[] = [
  {
    id: "billy-bookcase",
    tenantID: "default_tenant_id",
    title: "Стеллаж BILLY",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5tvuByN5oJZPdLXAcB3MUw5c39LUERvRVWg5Q5-lc0VX2eMZb8l7qQcyhh9PM2IzznXk&usqp=CAU", // интерьер с BILLY  [oai_citation:0‡IKEA](https://www.ikea.com/us/en/rooms/living-room/gallery/?utm_source=chatgpt.com)
    description: "Белый книжный стеллаж",
    discount: 10,
    variants: [
      { id: "small", value: "40×28×106 см", cost: 2999, stock: 5 },
      { id: "large", value: "80×28×202 см", cost: 5999, stock: 3 },
    ],
    options: [
      {
        id: "extraShelf",
        value: "Доп. полка",
        priceModifier: 500,
        isEnable: true,
      },
    ],
    tags: { name: "Материал", tags: ["ДСП", "Фанера", "Меламин"] },
  },
  {
    id: "sofa-stockholm",
    tenantID: "default_tenant_id",
    title: "Диван STOCKHOLM",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5tvuByN5oJZPdLXAcB3MUw5c39LUERvRVWg5Q5-lc0VX2eMZb8l7qQcyhh9PM2IzznXk&usqp=CAU", // интерьер с диваном  [oai_citation:1‡IKEA](https://www.ikea.com/us/en/rooms/living-room/gallery/?utm_source=chatgpt.com)
    description: "Сканди-диван светлого оттенка",
    discount: 5,
    variants: [
      { id: "2-seat", value: "2-местн.", cost: 5499, stock: 4 },
      { id: "3-seat", value: "3-местн.", cost: 6499, stock: 2 },
    ],
    options: [
      {
        id: "extraCushion",
        value: "Доп. подушка",
        priceModifier: 300,
        isEnable: true,
      },
    ],
    tags: { name: "Материал", tags: ["Ткань", "Поролон", "Дерево"] },
  },
  {
    id: "friheten-sofabed",
    tenantID: "default_tenant_id",
    title: "Диван-кровать FRIHETEN",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5tvuByN5oJZPdLXAcB3MUw5c39LUERvRVWg5Q5-lc0VX2eMZb8l7qQcyhh9PM2IzznXk&usqp=CAU", // интерьер с FRIHETEN  [oai_citation:2‡IKEA](https://www.ikea.com/us/en/rooms/living-room/gallery/?utm_source=chatgpt.com)
    description: "Удобный диван-кровать с хранилищем",
    discount: 12,
    variants: [{ id: "standard", value: "Стандарт", cost: 3999, stock: 3 }],
    options: [
      {
        id: "extraCushion",
        value: "Доп. подушка",
        priceModifier: 200,
        isEnable: true,
      },
    ],
    tags: { name: "Материал", tags: ["Ткань", "Панели", "Сталь"] },
  },
  {
    id: "sofa-soderhamn",
    tenantID: "default_tenant_id",
    title: "Модульный диван SÖDERHAMN",
    img: "https://www.ikea.com/us/en/rooms/living-room/gallery/", // интерьер  [oai_citation:3‡IKEA](https://www.ikea.com/us/en/rooms/living-room/gallery/?utm_source=chatgpt.com)
    description: "Модульный диван в красном цвете",
    discount: 8,
    variants: [{ id: "corner", value: "Угловой", cost: 7999, stock: 2 }],
    options: [
      {
        id: "extraModule",
        value: "Доп. модуль",
        priceModifier: 1500,
        isEnable: true,
      },
    ],
    tags: { name: "Материал", tags: ["Ткань", "Металл"] },
  },
  {
    id: "poang-chair",
    tenantID: "default_tenant_id",
    title: "Кресло POÄNG",
    img: "https://www.ikea.com/us/en/rooms/living-room/gallery/", // интерьер  [oai_citation:4‡IKEA](https://www.ikea.com/us/en/rooms/living-room/gallery/?utm_source=chatgpt.com)
    description: "Удобное кресло с деревянным каркасом",
    discount: 7,
    variants: [
      { id: "simple", value: "Базовое", cost: 2999, stock: 6 },
      { id: "with-cushion", value: "С подушкой", cost: 3499, stock: 4 },
    ],
    options: [
      {
        id: "extraCushion",
        value: "Доп. подушка",
        priceModifier: 400,
        isEnable: true,
      },
    ],
    tags: { name: "Материал", tags: ["Дерево", "Ткань"] },
  },
  {
    id: "kallax-shelf",
    tenantID: "default_tenant_id",
    title: "Стеллаж KALLAX",
    img: "https://www.ikea.com/us/en/rooms/living-room/gallery/", // интерьер  [oai_citation:5‡IKEA](https://www.ikea.com/us/en/rooms/living-room/gallery/?utm_source=chatgpt.com)
    description: "Функциональный куб-стеллаж",
    discount: 5,
    variants: [
      { id: "4-cubes", value: "4 куба", cost: 1999, stock: 10 },
      { id: "8-cubes", value: "8 кубов", cost: 3499, stock: 5 },
    ],
    options: [
      {
        id: "extraCube",
        value: "Доп. куб",
        priceModifier: 500,
        isEnable: true,
      },
    ],
    tags: { name: "Материал", tags: ["ДСП", "Картон"] },
  },
  {
    id: "tonstad-cabinet",
    tenantID: "default_tenant_id",
    title: "Шкаф TONSTAD",
    img: "https://www.ikea.com/us/en/rooms/living-room/gallery/", // интерьер  [oai_citation:6‡IKEA](https://www.ikea.com/us/en/rooms/living-room/gallery/?utm_source=chatgpt.com)
    description: "Шкаф с раздвижными стеклянными дверцами",
    discount: 10,
    variants: [{ id: "standard", value: "Стандарт", cost: 6499, stock: 2 }],
    options: [
      {
        id: "extraShelf",
        value: "Доп. полка",
        priceModifier: 600,
        isEnable: true,
      },
    ],
    tags: { name: "Материал", tags: ["ДСП", "Стекло"] },
  },
  {
    id: "tidtabell-rug",
    tenantID: "default_tenant_id",
    title: "Ковер TIDTABELL",
    img: "https://www.ikea.com/us/en/rooms/living-room/gallery/", // интерьер  [oai_citation:7‡IKEA](https://www.ikea.com/us/en/rooms/living-room/gallery/?utm_source=chatgpt.com)
    description: "Современный ковер с геометрическим узором",
    discount: 0,
    variants: [{ id: "140x200", value: "140×200 см", cost: 999, stock: 8 }],
    options: [
      {
        id: "extraCleaning",
        value: "Химчистка",
        priceModifier: 300,
        isEnable: true,
      },
    ],
    tags: { name: "Материал", tags: ["Ткань", "Синтетика"] },
  },
  {
    id: "kivik-armchair",
    tenantID: "default_tenant_id",
    title: "Кресло KIVIK",
    img: "https://www.ikea.com/us/en/rooms/living-room/gallery/", // интерьер  [oai_citation:8‡IKEA](https://www.ikea.com/us/en/rooms/living-room/gallery/?utm_source=chatgpt.com)
    description: "Удобное кресло-модуль",
    discount: 5,
    variants: [{ id: "standard", value: "Стандарт", cost: 3699, stock: 4 }],
    options: [
      {
        id: "extraCushion",
        value: "Доп. подушка",
        priceModifier: 250,
        isEnable: true,
      },
    ],
    tags: { name: "Материал", tags: ["Ткань", "Поролон"] },
  },
  {
    id: "stocksund-table",
    tenantID: "default_tenant_id",
    title: "Журнальный стол STOCKSUND",
    img: "https://www.ikea.com/us/en/rooms/living-room/gallery/", // интерьер  [oai_citation:9‡IKEA](https://www.ikea.com/us/en/rooms/living-room/gallery/?utm_source=chatgpt.com)
    description: "Элегантный журнальный столик",
    discount: 5,
    variants: [{ id: "90cm", value: "90 см", cost: 1999, stock: 7 }],
    options: [
      {
        id: "extraTray",
        value: "Доп. поднос",
        priceModifier: 150,
        isEnable: true,
      },
    ],
    tags: { name: "Материал", tags: ["Дерево", "Стекло"] },
  },
];
export const MENU = maxPizzaMenu;
