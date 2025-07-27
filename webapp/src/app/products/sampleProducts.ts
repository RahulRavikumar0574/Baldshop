export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
};

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    image: "headphones.jpg",
  },
  {
    id: 2,
    name: "Coffee Maker",
    category: "Home Appliances",
    price: 49.99,
    image: "coffee.jpg",
  },
  {
    id: 3,
    name: "Yoga Mat",
    category: "Fitness",
    price: 19.99,
    image: "yoga.jpg",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 29.99,
    image: "speaker.jpg",
  },
  {
    id: 5,
    name: "Running Shoes",
    category: "Fitness",
    price: 59.99,
    image: "shoes.jpg",
  },
  {
    id: 6,
    name: "Blender",
    category: "Home Appliances",
    price: 39.99,
    image: "blender.jpg",
  },
]; 