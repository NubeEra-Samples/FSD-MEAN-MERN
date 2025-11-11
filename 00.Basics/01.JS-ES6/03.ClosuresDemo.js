// A closure is a function that "remembers" the variables
// from its outer scope even after the outer function has finished running.

function createCounter() {
  let count = 0; // this variable is private to the closure

  // Inner function (has access to 'count' even after createCounter returns)
  return function() {
    count++;
    return count;
  };
}

// Button click handler
document.getElementById("closureBtn").addEventListener("click", () => {
  const closureResult = document.getElementById("closureResult");

  // Create two independent counters using closures
  const counterA = createCounter();
  const counterB = createCounter();

  // Demonstrate how each counter maintains its own private 'count'
  let output = `
    Counter A: ${counterA()}<br>
    Counter A again: ${counterA()}<br>
    Counter B: ${counterB()}<br>
    Counter A once more: ${counterA()}
  `;

  closureResult.innerHTML = output;

  console.log("Closure demo executed.");
});
