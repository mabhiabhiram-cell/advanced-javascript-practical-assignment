const cart = [
  { id: 101, name: "Laptop", price: 50000, quantity: 1, category: "Electronics" },
  { id: 102, name: "Mouse", price: 800, quantity: 2, category: "Accessories" },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, category: "Accessories" },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, category: "Electronics" },
  { id: 105, name: "Headphones", price: 2500, quantity: 2, category: "Accessories" }
];

const namesWithTotals = cart.map((product) => ({
  name: product.name,
  totalPrice: product.price * product.quantity
}));

const productsAbove2000 = cart.filter((product) => product.price > 2000);
const totalCartValue = cart.reduce(
  (total, product) => total + product.price * product.quantity,
  0
);

cart.forEach(({ name, category, quantity }) => {
  console.log(`${name} | ${category} | Quantity: ${quantity}`);
});

const electronicsTotal = cart
  .filter(({ category }) => category === "Electronics")
  .reduce((total, product) => total + product.price * product.quantity, 0);

console.log({ namesWithTotals, productsAbove2000, totalCartValue, electronicsTotal });

const inventory = new Map();
cart.forEach((product) => inventory.set(product.id, { ...product }));

const laptopDetails = inventory.get(101);
inventory.set(101, { ...laptopDetails, quantity: 2 });
inventory.delete(103);

console.log("Inventory:");
for (const [productId, details] of inventory) {
  console.log(productId, details);
}

const duplicateEmails = [
  "rahul@gmail.com",
  "priya@gmail.com",
  "rahul@gmail.com",
  "arjun@gmail.com",
  "priya@gmail.com"
];
const uniqueEmails = [...new Set(duplicateEmails)];
console.log("Unique emails:", uniqueEmails);

const productConfig = { name: "Laptop", price: 50000, stock: 20 };
const frozenConfig = Object.freeze({ ...productConfig });
const sealedConfig = Object.seal({ ...productConfig });

try {
  frozenConfig.price = 45000;
  frozenConfig.color = "Silver";
  delete frozenConfig.stock;
} catch (error) {
  console.log("Frozen error:", error.message);
}

console.log("Freeze result:", frozenConfig);
sealedConfig.price = 45000;
sealedConfig.color = "Silver";
delete sealedConfig.stock;
console.log("Seal result:", sealedConfig);
