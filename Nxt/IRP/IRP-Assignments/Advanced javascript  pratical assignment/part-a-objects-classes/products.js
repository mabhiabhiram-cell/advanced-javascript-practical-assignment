// Constructor-based implementation
function Product(productName, price, category) {
  this.productName = productName;
  this.price = price;
  this.category = category;
}

Product.prototype.displayProduct = function () {
  return `${this.productName} | ₹${this.price} | ${this.category}`;
};

const laptop = new Product("Laptop", 50000, "Electronics");
const mouse = new Product("Mouse", 800, "Accessories");
const keyboard = new Product("Keyboard", 1500, "Accessories");

console.log(laptop.displayProduct());
console.log(mouse.displayProduct());
console.log(keyboard.displayProduct());

// ES6 class implementation
class ESProduct {
  constructor(productName, price, category) {
    this.productName = productName;
    this.price = price;
    this.category = category;
  }

  getProductDetails() {
    return `${this.productName} costs ₹${this.price} (${this.category})`;
  }
}

class ElectronicProduct extends ESProduct {
  constructor(productName, price, warrantyYears) {
    super(productName, price, "Electronics");
    this.warrantyYears = warrantyYears;
  }

  getWarranty() {
    return `${this.warrantyYears}-year warranty`;
  }
}

class ClothingProduct extends ESProduct {
  constructor(productName, price, size) {
    super(productName, price, "Clothing");
    this.size = size;
  }

  getSize() {
    return `Size: ${this.size}`;
  }
}

const electronic = new ElectronicProduct("Laptop", 50000, 2);
const clothing = new ClothingProduct("T-Shirt", 1200, "L");
console.log(electronic.getProductDetails(), electronic.getWarranty());
console.log(clothing.getProductDetails(), clothing.getSize());

// ES6 syntax examples
const finalPrice = (price, discount) => price - (price * discount) / 100;
const customer = { name: "Rahul", email: "rahul@gmail.com", city: "Mumbai" };
const { name, email } = customer;
const calculateTotal = (...prices) => prices.reduce((sum, price) => sum + price, 0);
const originalProduct = { id: 1, name: "Laptop", price: 50000 };
const updatedProduct = { ...originalProduct, price: 48000 };

console.log(`Hello ${name}, your order of Laptop is confirmed. Total: ₹${finalPrice(50000, 0)}`);
console.log({ name, email });
console.log(`Total: ₹${calculateTotal(50000, 800, 1500)}`);
console.log({ originalProduct, updatedProduct });
