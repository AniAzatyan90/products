// import { ingredients } from "./modul.js";


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
// function btn(button) {
//     let list = button.nextElementSibling;
//     list.classList.toggle("hidden");
//     button.classList.add("hidden");
// }
let products = []
function read() {
    let containerIngridents = document.querySelector('.products')
    containerIngridents.innerHTML = ""

    for (let i = 0; i < products.length; i++) {
        createProduct(products[i])
    }
}

let containerIngridents = document.querySelector('.ingridents')

for (let i = 0; i < ingredients.length; i++) {

    let currentElement = document.createElement('div')
    currentElement.classList = 'ingrident'
    currentElement.innerHTML =
        `
       <input type="checkbox">
       <span>${ingredients[i].name}</span>
       <input type=" text" class="input1">
 
     `
    containerIngridents.append(currentElement)

}
function addProduct() {

    let product = {};
    let name = document.querySelector('.productName').value;
    let description = document.querySelector('.description').value;

    product.name = name;
    product.description = description;

    let ingredients = document.querySelectorAll('.ingrident');
    console.log(ingredients)
    let productIngredients = [];
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].children[0].checked) {
            let currentIngredient = {};
            currentIngredient.name = ingredients[i].children[1].innerText;
            // plyus@ nra hamara vor ekacac  arjeq@ dardzni numbert tipi
            let count = +ingredients[i].children[2].value;

            currentIngredient.count = count
            currentIngredient.price = calculetPrice(currentIngredient.name, count);
            productIngredients.push(currentIngredient);
        }
    }
    product.ingredients = productIngredients;
    let productPrice = 0;
    for (let j = 0; j < product.ingredients.length; j++) {

        productPrice = productPrice + product.ingredients[j].price;
    }
    let imageInput = document.querySelector('.product-image');
    let imageFile = imageInput.files[0];
    if (imageFile) {
        let reader = new FileReader();
        reader.onload = function (event) {
            let imageUrl = event.target.result;
            product.image = imageUrl;
        };
        reader.readAsDataURL(imageFile);
    }

    product.price = productPrice;
    products.push(product)
    read()
}


function createProduct(product) {
    let container = document.querySelector('.products');
    let productDiv = document.createElement('div');
    productDiv.classList.add('product');
    let ingredientsList = document.createElement('ul');
    product.ingredients.forEach(ingredient => {
        let listItem = document.createElement('li');
        listItem.textContent = ingredient.name + " " + ingredient.count + " gr";
        ingredientsList.append(listItem);
    });

    productDiv.innerHTML =
        `
        <img class="product-image" src="${product.image}">
        <h2 class="product-name">${product.name}</h2>
        <h3 class="product-description">${product.description}</h3>
        ${ingredientsList.innerHTML}
        <p class="product-price">${product.price} dram </p>
    `;
    container.appendChild(productDiv);
}

function calculetPrice(name, count) {
    let price = 0
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].name == name) {
            price = ingredients[i].price
            break
        }
    }
    let currentPrice = 0
    if (count > 1000) {
        currentPrice = price * (count / 1000)
    } else {
        currentPrice = price * (1000 / count)
    }
    return currentPrice
}

