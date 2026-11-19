function waitOneSecond() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

console.log("Event loop output:");
console.log("Order Started");
setTimeout(() => console.log("Payment Processing"), 0);
Promise.resolve().then(() => console.log("Payment Successful"));
console.log("Order Completed");

function validateOrder(callback) {
  setTimeout(() => {
    console.log("Order Validated");
    callback();
  }, 1000);
}

function processPayment(callback) {
  setTimeout(() => {
    console.log("Payment Completed");
    callback();
  }, 1000);
}

function sendConfirmation(callback) {
  setTimeout(() => {
    console.log("Confirmation Sent");
    callback();
  }, 1000);
}

validateOrder(() => {
  processPayment(() => {
    sendConfirmation(() => {
      console.log("Callback order flow complete");
    });
  });
});

const validateOrderPromise = () =>
  waitOneSecond().then(() => console.log("Order Validated"));
const processPaymentPromise = () =>
  waitOneSecond().then(() => console.log("Payment Completed"));
const sendConfirmationPromise = () =>
  waitOneSecond().then(() => console.log("Confirmation Sent"));

setTimeout(() => {
  validateOrderPromise()
    .then(processPaymentPromise)
    .then(sendConfirmationPromise)
    .then(() => console.log("Promise order flow complete"))
    .catch((error) => console.error("Promise flow failed:", error));
}, 4000);

async function placeOrder() {
  try {
    await validateOrderPromise();
    await processPaymentPromise();
    await sendConfirmationPromise();
    console.log("Order confirmed successfully");
  } catch (error) {
    console.error("Order failed:", error);
  }
}

setTimeout(placeOrder, 8000);

const productsAPI = () =>
  new Promise((resolve) => setTimeout(() => resolve("Products Loaded"), 1000));
const paymentAPI = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject("Payment Service Failed"), 1500)
  );
const deliveryAPI = () =>
  new Promise((resolve) => setTimeout(() => resolve("Delivery Loaded"), 2000));

setTimeout(async () => {
  const requests = [productsAPI(), paymentAPI(), deliveryAPI()];

  Promise.all(requests)
    .then((results) => console.log("Promise.all:", results))
    .catch((error) => console.log("Promise.all error:", error));

  Promise.allSettled(requests.map((request) => Promise.resolve(request))).then(
    (results) => console.log("Promise.allSettled:", results)
  );

  Promise.race(requests.map((request) => Promise.resolve(request))).then(
    (result) => console.log("Promise.race:", result),
    (error) => console.log("Promise.race error:", error)
  );

  Promise.any(requests.map((request) => Promise.resolve(request))).then(
    (result) => console.log("Promise.any:", result),
    (error) => console.log("Promise.any error:", error.errors)
  );
}, 14000);
