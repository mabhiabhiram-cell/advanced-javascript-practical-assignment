function debounce(callback, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

function throttle(callback, delay) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
}

const searchInput = document.querySelector("#searchInput");
const searchStatus = document.querySelector("#searchStatus");
const searchProducts = debounce((query) => {
  searchStatus.textContent = query
    ? `Searching for: ${query}`
    : "Enter a product name";
}, 500);

searchInput.addEventListener("input", (event) => {
  searchProducts(event.target.value.trim());
});

const handleScroll = throttle(() => {
  console.log(`Scroll position: ${window.scrollY}px`);
}, 1000);
window.addEventListener("scroll", handleScroll);

function calculateDiscount(price, percentage) {
  return price - (price * percentage) / 100;
}

function memoize(callback) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("Result came from cache:", key);
      return cache.get(key);
    }

    const result = callback(...args);
    cache.set(key, result);
    console.log("Fresh calculation:", key);
    return result;
  };
}

const memoizedDiscount = memoize(calculateDiscount);
console.log(memoizedDiscount(5000, 10));
console.log(memoizedDiscount(5000, 10));
console.log(memoizedDiscount(2000, 25));

// Bubbling demonstration
const productList = document.querySelector("#productList");
productList.querySelectorAll(".remove-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    console.log("Button handler:", event.target.textContent);
  });
});

productList.addEventListener("click", (event) => {
  console.log("List handler reached:");
  console.log("target:", event.target);
  console.log("currentTarget:", event.currentTarget);

  if (event.target.closest(".remove-button")) {
    event.stopPropagation();
  }
});

// Event delegation: the parent handles dynamically removable products.
productList.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-button");
  if (!removeButton || !productList.contains(removeButton)) {
    return;
  }

  const productItem = removeButton.closest("li");
  productItem.remove();
});
