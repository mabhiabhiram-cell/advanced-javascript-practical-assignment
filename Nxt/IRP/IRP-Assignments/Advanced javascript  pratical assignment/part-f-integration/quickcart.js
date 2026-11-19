class Product {
  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

const products = [
  new Product(1, "Laptop", 50000, 1),
  new Product(2, "Mouse", 1000, 2),
  new Product(3, "Monitor", 15000, 1),
  new Product(4, "Keyboard", 2000, 1)
];

const customer = "Rahul";
const productTotals = products.map((product) => ({
  name: product.name,
  total: product.price * product.quantity
}));
const productsAbove5000 = productTotals.filter(({ total }) => total > 5000);
const orderTotal = productTotals.reduce((total, product) => total + product.total, 0);
const uniqueProductIds = new Set(products.map(({ id }) => id));

const inventory = new Map(
  products.map((product) => [product.id, { ...product }])
);

const orderConfig = Object.freeze({
  customer,
  currency: "₹",
  status: "Processing..."
});

const order = {
  customer: orderConfig.customer,
  products: productTotals,
  total: orderTotal,
  uniqueProductIds: uniqueProductIds.size,
  inventory: [...inventory.entries()],
  status: orderConfig.status
};
const orderJson = JSON.stringify(order);

function confirmOrder() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Confirmed Successfully!"), 500);
  });
}

async function placeOrder() {
  try {
    console.log("====== QUICKCART ORDER SUMMARY ======");
    console.log(`Customer: ${orderConfig.customer}`);
    console.log("Products:");
    productTotals.forEach(({ name, total }) => {
      console.log(`${name}    - ₹${total}`);
    });
    console.log(`Total Order Amount: ₹${orderTotal}`);
    console.log(`Unique Products: ${uniqueProductIds.size}`);
    console.log(`Order Status: ${orderConfig.status}`);
    console.log(`Serialized Order: ${orderJson}`);
    console.log(`High-value products: ${productsAbove5000.map(({ name }) => name).join(", ")}`);

    const status = await confirmOrder();
    const finalMessage = `Order Status: ${status}`;
    console.log(finalMessage);
    console.log("=====================================");
  } catch (error) {
    console.error("Order confirmation failed:", error);
  }
}

placeOrder();
