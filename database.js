
const ingredients = [
    { id: 1, name: "Flour", price: 500 },
    { id: 2, name: "Sugar", price: 400 },
    { id: 3, name: "Eggs", price: 300 },
    { id: 4, name: "Butter", price: 600 },
    { id: 5, name: "Milk", price: 350 },
    { id: 6, name: "Yeast", price: 200 },
    { id: 7, name: "Salt", price: 150 },
    { id: 8, name: "Baking Powder", price: 250 },
    { id: 9, name: "Vanilla Extract", price: 700 },
    { id: 10, name: "Cocoa Powder", price: 450 },
    { id: 11, name: "Oil", price: 300 },
    { id: 12, name: "Honey", price: 750 },
    { id: 13, name: "Nuts", price: 550 },
    { id: 14, name: "Raisins", price: 400 },
    { id: 15, name: "Cinnamon", price: 200 },
    { id: 16, name: "Chocolate Chips", price: 600 },
    { id: 17, name: "Lemon Zest", price: 300 },
    { id: 18, name: "Berries", price: 700 },
    { id: 19, name: "Cream Cheese", price: 650 },
    { id: 20, name: "Powdered Sugar", price: 350 },
    { id: 21, name: "Almond Extract", price: 800 },
    { id: 22, name: "Whipped Cream", price: 500 },
    { id: 23, name: "Food Coloring", price: 250 },
    { id: 24, name: "Coconut Flakes", price: 400 },
    { id: 25, name: "Pumpkin Puree", price: 300 }
];
function setLocalStorage(product) {
    let existingObjects = JSON.parse(localStorage.getItem('products')) || [];
    generateId(product)
    existingObjects.push(product);
    localStorage.setItem('products', JSON.stringify(existingObjects));
}

function editLocalStorage(product) {

    console.log(product)
    let existingProducts = JSON.parse(localStorage.getItem('products')) || [];

    const updatedProducts = existingProducts.filter(pr => pr.id !== product.id);

    updatedProducts.push(product);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
}

function generateId(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    if (products == null || products.length === 0) {
        product.id = 1;
    } else {
        let max = Math.max(...products.map(x => x.id));
        product.id = max + 1;
    }
}

function getLocalStorage() {
    let storedData = localStorage.getItem('products');
    return JSON.parse(storedData);
}

function deleteProductSetLocal(productToDelete) {
    let existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = existingProducts.filter(product => product.name !== productToDelete.name);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return existingProducts;
}


export { deleteProductSetLocal, setLocalStorage, editLocalStorage, getLocalStorage, ingredients };
