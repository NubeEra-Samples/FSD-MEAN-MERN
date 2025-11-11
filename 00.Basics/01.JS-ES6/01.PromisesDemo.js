// Function that returns a Promise
function fetchUserData() {
  return new Promise((resolve, reject) => {
    console.log("Fetching user data...");

    // Simulate async operation (like an API call)
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% chance to succeed
      if (success) {
        resolve({ name: "Alice", age: 25, city: "New York" });
      } else {
        reject("Failed to fetch user data 😞");
      }
    }, 2000);
  });
}

// Function to handle button click
document.getElementById("loadDataBtn").addEventListener("click", () => {
  const result = document.getElementById("result");
  result.textContent = "Loading...";

  fetchUserData()
    .then(user => {
      result.textContent = `Name: ${user.name}, Age: ${user.age}, City: ${user.city}`;
      console.log("User data loaded:", user);
    })
    .catch(error => {
      result.textContent = error;
      console.error(error);
    })
    .finally(() => {
      console.log("Promise completed.");
    });
});
