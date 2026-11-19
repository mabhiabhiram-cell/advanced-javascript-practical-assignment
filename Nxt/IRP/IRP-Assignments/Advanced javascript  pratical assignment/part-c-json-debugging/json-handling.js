const order = {
  orderId: 501,
  customer: "Rahul",
  amount: 5000,
  deliveryDate: undefined,
  discount: null,
  calculateTax: function () {
    return 500;
  }
};

const orderJson = JSON.stringify(order);
const restoredOrder = JSON.parse(orderJson);
console.log("Stringified:", orderJson);
console.log("Parsed:", restoredOrder);
console.log("Lost properties: deliveryDate, calculateTax");

console.log("Q1:", JSON.stringify({ name: "Rahul", age: undefined }));
console.log("Q2:", JSON.stringify([10, undefined, 30]));
console.log("Q3:", JSON.stringify({ price: NaN, discount: Infinity }));

try {
  console.log("Q4:", JSON.parse("{name: 'Rahul', age: 25}"));
} catch (error) {
  console.log("Q4 error:", error.message);
}

const user = { name: "Rahul" };
user.self = user;
try {
  console.log("Q5:", JSON.stringify(user));
} catch (error) {
  console.log("Q5 error:", error.message);
}

console.log("Q6:", JSON.stringify({ createdAt: new Date("2026-01-01") }));
