export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number; // Naira
  category: CategoryId;
  signature?: boolean;
};

export type CategoryId = "rice" | "soups" | "grills" | "extras";

export const CATEGORIES: { id: CategoryId; name: string; blurb: string }[] = [
  {
    id: "rice",
    name: "Rice Dishes",
    blurb: "Smoky party-style pots, cooked fresh through the day.",
  },
  {
    id: "soups",
    name: "Soups & Swallow",
    blurb: "Big for dine-in, packed properly for delivery.",
  },
  {
    id: "grills",
    name: "Grills & Sides",
    blurb: "Off the fire, spiced the Minna way.",
  },
  {
    id: "extras",
    name: "Extras",
    blurb: "Small chops, cold drinks and something sweet to finish.",
  },
];

export const MENU: MenuItem[] = [
  {
    id: "jollof-chicken",
    name: "Jollof Rice + Chicken",
    description: "Our number one. Smoky party jollof with peppered chicken.",
    price: 4500,
    category: "rice",
    signature: true,
  },
  {
    id: "fried-rice",
    name: "Fried Rice + Chicken/Beef",
    description: "Vegetable fried rice with your choice of chicken or beef.",
    price: 4500,
    category: "rice",
  },
  {
    id: "coconut-rice",
    name: "Basmati Coconut Rice + Grilled Fish",
    description: "Fragrant basmati in coconut milk, served with grilled fish.",
    price: 6000,
    category: "rice",
  },
  {
    id: "banga-rice",
    name: "Banga Rice + Banga Stew + Chicken",
    description: "Palm-nut rice with rich banga stew and chicken.",
    price: 5500,
    category: "rice",
  },
  {
    id: "pepper-soup",
    name: "Pepper Soup",
    description: "Goat, chicken or fish. The late-night favourite.",
    price: 3500,
    category: "soups",
  },
  {
    id: "egusi-pounded-yam",
    name: "Egusi + Pounded Yam",
    description: "Melon seed soup with assorted meat and smooth pounded yam.",
    price: 5000,
    category: "soups",
  },
  {
    id: "ogbono-semovita",
    name: "Ogbono + Semovita",
    description: "Draw soup done right, with soft semovita.",
    price: 4800,
    category: "soups",
  },
  {
    id: "nsala-fufu",
    name: "Nsala + Fufu",
    description: "White soup with catfish and freshly turned fufu.",
    price: 5200,
    category: "soups",
  },
  {
    id: "suya-plantain",
    name: "Suya + Plantain + Sauce",
    description: "Charcoal suya with fried plantain and pepper sauce.",
    price: 4000,
    category: "grills",
  },
  {
    id: "grilled-chicken-chips",
    name: "Grilled Chicken + Chips",
    description: "Half grilled chicken with hand-cut chips.",
    price: 5500,
    category: "grills",
  },
  {
    id: "bbq-fish-yam",
    name: "BBQ Fish + Yam",
    description: "Whole barbecue fish with fried yam and sauce.",
    price: 7000,
    category: "grills",
  },
  {
    id: "small-chops",
    name: "Small Chops",
    description: "Puff puff, samosa, spring roll and peppered gizzard.",
    price: 3000,
    category: "extras",
  },
  {
    id: "drinks",
    name: "Drinks",
    description: "Chilled soft drinks, water, zobo and chapman.",
    price: 800,
    category: "extras",
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Cake slice, parfait or fruit bowl to finish.",
    price: 2000,
    category: "extras",
  },
];

export const MENU_BY_ID = Object.fromEntries(MENU.map((m) => [m.id, m])) as Record<
  string,
  MenuItem
>;

export const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export const BUSINESS = {
  name: "Ahmad's Kitchen",
  address: "Bosso Road, Minna, Niger State, Nigeria",
  city: "Minna, Niger State",
  phone: "+234 803 000 0000",
  whatsapp: "2348030000000",
  email: "hello@ahmadskitchen.ng",
  hours: [
    { days: "Monday – Thursday", time: "10:00am – 10:00pm" },
    { days: "Friday – Saturday", time: "10:00am – 12:00am" },
    { days: "Sunday", time: "12:00pm – 10:00pm" },
  ],
  deliveryFee: 1000,
};
