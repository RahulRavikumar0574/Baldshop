# BaldShop

A full-stack e-commerce demo app built with Next.js 13 (App Router), Tailwind CSS, and MongoDB. Features user authentication, product listing, product details with calculator, and a shopping cart—all with a modern UI.

## Features
- User registration and login (with password hashing)
- Product listing with search and filters
- Product detail page with live calculator (quantity, discount, tax)
- Shopping cart (add, update, remove items)
- MongoDB backend for users, products, and (optionally) cart
- Responsive, modern UI with Tailwind CSS

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/baldshop.git
cd baldshop/webapp
```

### 2. Install dependencies
```bash
npm install next react react-dom tailwindcss mongodb bcryptjs
npm install --save-dev typescript @types/node @types/react @types/react-dom eslint eslint-config-next postcss
```

### 3. Set up MongoDB
- Install [MongoDB Community Server](https://www.mongodb.com/try/download/community) and [MongoDB Compass](https://www.mongodb.com/try/download/compass) (GUI, optional).
- Start MongoDB locally (default: `mongodb://localhost:27017`).
- Create a database named `baldshop` with collections: `users`, `products`, and `cart`.
- Insert sample products into the `products` collection (see below).

### 4. Configure environment variables
Create a `.env.local` file in the `webapp` directory:
```
MONGODB_URI=mongodb://localhost:27017/baldshop
```

### 5. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Modules to Install
- next
- react
- react-dom
- tailwindcss
- mongodb
- bcryptjs

Install with:
```bash
npm install next react react-dom tailwindcss mongodb bcryptjs
```

## Sample Product JSON
Paste this in MongoDB Compass or use `insertMany` in mongosh:
```json
[
  { "name": "Wireless Headphones", "category": "Electronics", "price": 99.99, "image": "/headphones.jpg" },
  { "name": "Coffee Maker", "category": "Home Appliances", "price": 49.99, "image": "/coffeemaker.jpg" },
  { "name": "Yoga Mat", "category": "Fitness", "price": 19.99, "image": "/yogamat.jpg" },
  { "name": "Bluetooth Speaker", "category": "Electronics", "price": 29.99, "image": "/speaker.jpg" },
  { "name": "Running Shoes", "category": "Fitness", "price": 59.99, "image": "/shoes.jpg" },
  { "name": "Blender", "category": "Home Appliances", "price": 39.99, "image": "/blender.jpg" }
]
```
Place the corresponding images in the `public` directory.

## About This Project
BaldShop is a demo e-commerce platform for learning and prototyping. It demonstrates:
- Full-stack development with Next.js and MongoDB
- Modern authentication and CRUD patterns
- Responsive UI with Tailwind CSS

**Not for production use.**

---

Feel free to fork, modify, and use for your own learning or as a starter for your own projects!
