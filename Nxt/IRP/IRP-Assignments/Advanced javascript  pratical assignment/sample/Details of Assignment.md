# Advanced JavaScript Practical Assignment — Project and Interview Guide

## Project overview

**QuickCart** is a set of small, runnable exercises that demonstrate modern JavaScript concepts in the context of an online shopping cart and order. The work is organized by topic: object-oriented JavaScript, array and collection operations, JSON, asynchronous flows, browser performance and events, and a final integration example.

The goal was to keep each concept visible and easy to run, then use the final section to show how the same ideas fit together in a simple order workflow. The examples use in-memory sample data; they do not connect to a real store, payment provider, or server.

## Project structure

- [`part-a-objects-classes/products.js`](../part-a-objects-classes/products.js) — constructors, prototypes, classes, inheritance, and ES6 syntax.
- [`part-b-array-methods/shopping-cart.js`](../part-b-array-methods/shopping-cart.js) — cart calculations, `Map`, `Set`, `Object.freeze`, and `Object.seal`.
- [`part-c-json-debugging/json-handling.js`](../part-c-json-debugging/json-handling.js) — JSON serialization, parsing, and edge cases.
- [`part-d-asynchronous/order-processing.js`](../part-d-asynchronous/order-processing.js) — event loop, callbacks, promises, `async`/`await`, and promise combinators.
- [`part-e-optimization-events/index.html`](../part-e-optimization-events/index.html), [`part-e-optimization-events/script.js`](../part-e-optimization-events/script.js), and [`part-e-optimization-events/style.css`](../part-e-optimization-events/style.css) — browser demo for debounce, throttle, memoization, and DOM events.
- [`part-f-integration/quickcart.js`](../part-f-integration/quickcart.js) — combined order-summary example.

## Part A — Objects, constructors, classes, and ES6 syntax

### Constructor functions and prototypes

The `Product` constructor creates product objects with a name, price, and category. `displayProduct` is assigned to `Product.prototype`, so instances share the same method instead of each receiving a separate copy.

**Why it matters:** This demonstrates the prototype-based inheritance model underneath JavaScript objects and shows a traditional way to create multiple instances with shared behavior.

### ES6 classes and inheritance

`ESProduct` uses a class constructor and an instance method to represent a product. `ElectronicProduct` and `ClothingProduct` extend it, call `super(...)` to initialize inherited product fields, and add their own data and methods:

- Electronics add warranty years and a warranty description.
- Clothing adds a size and a size description.

**Why it matters:** Inheritance can share common fields and behavior while keeping subtype-specific details with the subtype. JavaScript classes provide cleaner syntax for the same prototype-based mechanism; they do not introduce a separate classical object model.

### Template literals, arrow functions, destructuring, rest, and spread

- **Template literals** interpolate values into readable product and greeting strings.
- **Arrow functions** provide concise functions for calculations and totals.
- **Destructuring** extracts `name` and `email` from a customer object.
- **Rest parameters** collect any number of prices so `calculateTotal(...prices)` can sum them.
- **Spread syntax** copies the original product into a new object with an updated price. This avoids changing the original object in that example.

**Interview point:** Spread makes a shallow copy. Nested objects are still shared unless they too are copied.

## Part B — Array methods and collections

The shopping cart contains products with an ID, name, unit price, quantity, and category.

### Array methods

- **`map`** creates a new list with each product's name and line total (`price * quantity`).
- **`filter`** selects products whose unit price is greater than 2,000. The condition checks the unit price, not the line total.
- **`reduce`** calculates the cart value by accumulating `price * quantity` for each product. With the provided data, the total is **₹70,100**.
- **`forEach`** prints each product's name, category, and quantity; it is used for a side effect rather than to create a returned array.
- A second **`filter` + `reduce`** combination calculates the electronics line total, **₹62,000**.

These methods avoid manual index management and make the transformation or selection intent explicit.

### `Map`

The inventory is keyed by product ID. The example:

1. Adds product records to a `Map`.
2. Reads the laptop entry with `get`.
3. Writes an updated quantity with `set`.
4. Removes the keyboard entry with `delete`.
5. Iterates through the remaining ID/value pairs.

`Map` is useful when keys are identifiers or other non-string values and when explicit map operations and iteration are helpful.

### `Set`

A `Set` removes duplicate email addresses. Converting the sample list to a `Set` and then spreading it into an array gives a unique-email list while preserving insertion order.

### `Object.freeze` and `Object.seal`

- The frozen configuration disallows changing, adding, or deleting its own properties. In this non-strict script, attempted writes fail silently, so the original values remain.
- The sealed configuration allows an existing property such as `price` to change, but does not allow new properties to be added or existing ones to be deleted.

**Interview point:** Both operations are shallow. They do not recursively freeze or seal nested objects. For deeply nested data, a separate deep-immutability strategy is needed.

## Part C — JSON and debugging

The order example is passed through `JSON.stringify` and then `JSON.parse` to show the conversion between JavaScript values and JSON text.

The exercise highlights these serialization rules:

- An object property whose value is `undefined` or a function is omitted from JSON.
- An `undefined` array element becomes `null` in the serialized array.
- `NaN` and `Infinity` become `null`.
- `Date` is serialized as an ISO date string; parsing that JSON produces a string, not a `Date` instance.
- JSON requires quoted property names and double-quoted strings. JavaScript object-literal shorthand with single quotes is not valid JSON.
- A circular reference cannot be serialized by `JSON.stringify` and throws an error.

The examples use `try`/`catch` around invalid parsing and circular serialization so execution can continue and the failure can be inspected.

**Interview point:** JSON is a data interchange format, not a complete snapshot of a JavaScript object. It does not preserve functions, `undefined`, object identity, or special object types automatically.

## Part D — Asynchronous JavaScript and order processing

### Event loop ordering

The first example logs synchronous statements, queues a resolved Promise reaction, and schedules a zero-delay timer. The synchronous work runs first; Promise reactions (microtasks) run before timer callbacks (tasks) once the current call stack is empty. A zero-delay timer means “not before a later event-loop turn,” not “run immediately.”

### Callback flow

Three timer-based operations validate an order, process payment, and send confirmation. Each operation calls the next one from its callback, ensuring this sequence:

1. Order validated.
2. Payment completed.
3. Confirmation sent.

Nesting callbacks like this can become difficult to follow as more steps and error cases are added; this is commonly called callback nesting or “callback hell.”

### Promise chaining

Promise-returning versions of the same operations are chained with `.then(...)`. Returning the next promise from each handler lets the chain wait for each operation in order. `.catch(...)` handles a rejection from the chain.

### `async` / `await`

`placeOrder` uses `await` to express the same sequential workflow in a more direct, readable style. Its `try`/`catch` block handles failures from awaited operations.

### Promise combinators

Three simulated service requests are used to compare:

- **`Promise.all`** — fulfills with all results if all fulfill; rejects as soon as one rejects. In the example, the simulated payment service fails.
- **`Promise.allSettled`** — waits for every request and reports each as fulfilled or rejected, so successful results remain observable alongside a failure.
- **`Promise.race`** — settles with the first request to settle, whether that outcome is fulfillment or rejection.
- **`Promise.any`** — fulfills with the first fulfilled request; it rejects with an `AggregateError` only if all inputs reject.

The example's services use timers and fixed sample outcomes. They demonstrate control flow, not actual network requests.

**Interview point:** Use `all` when every result is required, `allSettled` when every outcome must be inspected, `race` for the first settled outcome (for example, a timeout pattern), and `any` when any successful result is acceptable.

## Part E — Performance concepts and DOM events

The browser exercise is a small page with a search input, a product list, remove buttons, and a scroll area.

### Debouncing

`debounce` resets a timer whenever another input event arrives. The search status is updated only after the user pauses typing for 500 ms. This reduces repeated work during a burst of input.

In this demo, the delayed action updates the status text to show the entered query; it does **not** filter the product list or call a search API. A production search could use the same debounce pattern and then filter or fetch results.

### Throttling

`throttle` allows the scroll callback to run at most once per 1,000 ms. This limits how often scroll work is performed during frequent scroll events.

### Memoization

`memoize` stores calculation results in a `Map`, using the JSON representation of the arguments as the cache key. Repeated calls to calculate the same discount reuse the stored result.

**Trade-off:** Memoization is most useful for pure, repeatable calculations with expensive work. A production cache may also need a size limit or invalidation policy; this small example has neither.

### Bubbling, propagation, and event delegation

- Each initial remove button has a direct click listener to demonstrate a child handler.
- A click also bubbles to the product-list listener, which logs `event.target` (the element that originated the event) and `event.currentTarget` (the element whose listener is running).
- Another listener on the product-list uses `event.target.closest(".remove-button")` to identify a remove action and remove its containing row.
- Delegation lets the parent handle matching buttons without attaching a separate removal listener to every button; it also works for matching rows added later.

`stopPropagation()` prevents a bubbling event from continuing to other ancestors. It does **not** prevent other listeners attached to the same parent from running. The demonstration's two list listeners are both on the same list, so both can run for the same click.

**Interview point:** Use `stopPropagation` only when stopping propagation is intentional. `preventDefault` is different: it cancels a browser default action but does not stop propagation.

## Part F — Integrated QuickCart order summary

The final script combines the concepts in a single flow:

1. A `Product` class creates sample product instances with IDs, prices, and quantities.
2. `map` calculates each product's line total.
3. `filter` identifies products with a line total greater than ₹5,000.
4. `reduce` calculates an order total of **₹69,000**.
5. `Set` counts unique product IDs.
6. `Map` stores inventory entries keyed by product ID.
7. `Object.freeze` keeps the sample order configuration from being changed.
8. `JSON.stringify` serializes an order summary for display or transfer.
9. A Promise simulates order confirmation after a short delay, and `async`/`await` controls the final status output.

The result is a simple console order summary showing the customer, line items, total, unique product count, status, and serialized data.

**Important scope:** The products, inventory, and confirmation are sample data and in-memory logic. The project does not persist orders, validate real stock, or charge a payment method.

## Overall project approach

1. **Separate concepts:** Each assignment part has its own file or browser page so a learner can run and discuss one topic at a time.
2. **Use a familiar domain:** Products, cart totals, inventory, and order status give the JavaScript concepts a consistent context.
3. **Show input and output:** Sample values and console messages make it easy to inspect the behavior without a server or database.
4. **Build from basics to integration:** The early parts focus on individual techniques; the final part combines several into one order summary.
5. **Keep the browser example small:** It demonstrates event and performance patterns without adding a frontend framework or build system.

## Interview-ready explanation

> “I built QuickCart as a set of focused JavaScript exercises and an integrated order-summary demo. I started by modeling products with constructor functions and prototypes, then rewrote the model using ES6 classes and inheritance. I used array methods to transform cart items and calculate totals, and `Map` and `Set` for inventory and uniqueness. I also explored how JSON handles values such as `undefined`, functions, dates, and circular references. For asynchronous processing, I implemented the same order sequence with callbacks, Promises, and `async`/`await`, then compared the Promise combinators. In the browser demo, I used debounce for input, throttle for scroll events, memoization for repeated calculations, and event delegation for product removal. Finally, I combined the concepts into a sample QuickCart order summary. The project is intentionally frontend-only and uses mock data rather than a backend or real payment service.”

## Likely interview questions

### Why use `reduce` for the cart total?

`reduce` accumulates one value from a collection. Here it adds each item's price multiplied by its quantity. It expresses the total calculation directly and takes an initial value of zero.

### What is the difference between `map` and `forEach`?

`map` returns a new array containing the callback results. `forEach` is used for side effects and does not build a transformed array.

### How are `Map` and `Set` different from objects and arrays?

`Map` stores key/value pairs and can use values other than strings as keys. `Set` stores unique values. Objects are commonly used for named properties; arrays preserve ordered sequences and allow duplicates.

### What is the difference between `Promise.all` and `Promise.allSettled`?

`all` rejects when one input rejects and is useful when every result is required. `allSettled` waits for every input and returns each outcome, which is useful when partial success should still be reported.

### Why debounce search and throttle scroll?

Debouncing waits for a pause in a burst of events, which suits typing. Throttling limits the rate of repeated work while events continue, which suits scroll handling.

### What is event delegation, and why is `closest` useful?

Event delegation handles child interactions at a common ancestor. `closest` finds the matching action element even when the click originated on a nested element inside the button.

### What would you improve for production?

- Connect the UI to real product data and implement actual filtering and loading/error states.
- Move order and inventory operations to a backend and validate stock and prices server-side.
- Integrate a trusted payment provider rather than treating a timer as payment.
- Add input validation, user-facing error handling, automated tests, and persistence.
- Add cache invalidation or a size bound where memoization is used for long-lived or unbounded inputs.
- Consider accessibility, loading feedback, and responsive behavior when expanding the page.

## Running the examples

Run the console files with Node.js from the project root:

```bash
node part-a-objects-classes/products.js
node part-b-array-methods/shopping-cart.js
node part-c-json-debugging/json-handling.js
node part-d-asynchronous/order-processing.js
node part-f-integration/quickcart.js
```

Open `part-e-optimization-events/index.html` in a browser to try the DOM example. Browser developer tools show its console output.
