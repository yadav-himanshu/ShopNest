
// Function to fetch data from the API
function fetchData() {
    fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((data) => {
            // Map through the data and render the products
            let products = data.map((item) => {
                return `
                <div class="card">
                    <h1 class="title">${item.title}</h1>
                    <img src="${item.image}" alt="${item.title}" class="image">
                    <p class="description">${item.description}</p>
                    <p class="category">Category: ${item.category}</p>
                    <p class="price">Price: $${item.price}</p>
                    <button class="buy-button">Buy Now</button>
                </div>`;
            }).join(""); // Joining all product cards together
            
            // Injecting the rendered cards into the DOM
            document.getElementById("cards").innerHTML = products;
        })
        .catch((error) => {
            console.error("Error fetching the data:", error);
        });
}

// Call fetchData when the page loads
window.onload = fetchData;
