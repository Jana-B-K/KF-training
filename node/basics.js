// Basic callback pattern
function fetchData(callback) {
  setTimeout(() => {
    callback("Data loaded");
  }, 1000);
}

fetchData((data) => {
  console.log(data); // "Data loaded"
});

// Promise creation and handling
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Success!");
  } else {
    reject("Failed!");
  }
});

myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error));

  // Clean async/await syntax
async function getUserData() {
  try {
    const response = await fetch('https://api.example.com/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Demonstrates sync vs async execution
console.log('1 - Sync');

setTimeout(() => console.log('2 - Timeout'), 0);

Promise.resolve().then(() => console.log('3 - Promise'));

process.nextTick(() => console.log('4 - NextTick'));

console.log('5 - Sync');

// Output: 1, 5, 4, 3, 2

// Inside I/O callback
const fs = require('fs');

fs.readFile('/file', () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});

// Output: immediate, timeout

// Ensures variable initialization
let value = null;

process.nextTick(() => {
  console.log(value); // 1
});

value = 1;

// Stop after condition met
let count = 0;

const intervalId = setInterval(() => {
  count++;
  console.log(`Count: ${count}`);
  
  if (count === 5) {
    clearInterval(intervalId);
    console.log('Stopped!');
  }
}, 1000);

// Sequential (slower)
async function sequential() {
  const result1 = await operation1(); // waits
  const result2 = await operation2(); // waits
  return [result1, result2];
}

// Parallel (faster)
async function parallel() {
  const [result1, result2] = await Promise.all([
    operation1(),
    operation2()
  ]);
  return [result1, result2];
}  