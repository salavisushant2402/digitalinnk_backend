require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/product.model');

const MONGO_URL = process.env.MONGO_URL;

const PRODUCTS = [
  {
    id: 'soup',
    name: 'Soup',
    price: 0.60,
    unit: 'tin',
    category: 'Pantry',
    description: 'Cream of tomato, per tin',
    image: 'https://sugarspunrun.com/wp-content/uploads/2024/12/Vegetable-soup-recipe-2-of-2.jpg',
  },
  {
    id: 'bread',
    name: 'Bread',
    price: 1.10,
    unit: 'loaf',
    category: 'Bakery',
    description: 'White sliced, per loaf',
    image: 'https://www.acouplecooks.com/wp-content/uploads/2025/01/Homemade-Sandwich-Bread-0008.jpg',
  },
  {
    id: 'milk',
    name: 'Milk',
    price: 0.50,
    unit: 'bottle',
    category: 'Dairy',
    description: 'Semi-skimmed, per bottle',
    image: 'https://dairynutrition.ca/sites/dairynutrition/files/image_file_browser/dn_article/2023-03/shutterstock_4305538_1182x788px.jpg',
  },
  {
    id: 'cheese',
    name: 'Cheese',
    price: 0.90,
    unit: 'block',
    category: 'Dairy',
    description: 'Mature cheddar, per block',
    image: 'https://blog.wisconsincheeseman.com/wp-content/uploads/2022/10/sharp-cheddar-baby-swiss-1-edited.jpg.webp',
  },
  {
    id: 'butter',
    name: 'Butter',
    price: 1.20,
    unit: 'pack',
    category: 'Dairy',
    description: 'Unsalted, per pack',
    image: 'https://cdn.britannica.com/27/122027-050-EAA86783/Butter.jpg',
  },
  {
    id: 'eggs',
    name: 'Eggs',
    price: 1.50,
    unit: 'dozen',
    category: 'Dairy',
    description: 'Free range, per dozen',
    image: 'https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg',
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    await Product.deleteMany();
    // Insert new data
    await Product.insertMany(PRODUCTS);
    console.log("Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedProducts();