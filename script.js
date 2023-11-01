import { getLocalStorage, setLocalStorage, ingredients } from "./database.js";
let containerIngridents = document.querySelector('.ingridents')

for (let i = 0; i < ingredients.length; i++) {
    let currentElement = document.createElement('div')
    currentElement.classList = 'ingrident'
    currentElement.innerHTML =
        `
       <div class="left-column">
          <input type="checkbox"  class="box" >
          <span >${ingredients[i].name}</span>
       </div>
       <div class="right-column">
          <input type="text" class="input1">
       </div>
     `
    containerIngridents.append(currentElement)

}
let products = getLocalStorage()
var btn = document.querySelector(".btn")

btn.addEventListener("click", addProduct)

for (let i = 0; i < products.length; i++) {
    createProduct(products[i]);
}

function read() {
    let containerIngridents = document.querySelector('.products');
    containerIngridents.innerHTML = "";
    products = getLocalStorage()

    for (let i = 0; i < products.length; i++) {
        createProduct(products[i]);
    }
    console.log(products[i]);
}


function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = function (event) {
            resolve(event.target.result);
        };
        reader.onerror = function (event) {
            reject(event.target.error);
        };
        reader.readAsDataURL(file);
    });
}

async function addProduct() {
    let product = {};
    let name = document.querySelector('.productName').value;
    let description = document.querySelector('.description').value;

    product.name = name;
    product.description = description;

    let productIngredients = [];
    let boxs = document.querySelectorAll('.box');
    for (let i = 0; i < boxs.length; i++) {
        if (boxs[i].checked) {
            let currentIngredient = {};
            let ingredientDiv = boxs[i].parentElement.parentElement
            currentIngredient.name = ingredientDiv.querySelector('span').textContent;
            let count = +ingredientDiv.querySelector('.input1').value;
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

    try {
        if (imageFile) {
            let imageUrl = await readFileAsync(imageFile);
            product.image = imageUrl;
            console.log(product);
        }

        product.price = productPrice;

    } catch (error) {
        console.error('Error reading the image file:', error);
    }
    product.price = productPrice;
    setLocalStorage(product);
    cleanInfo()
    read()

}

function cleanInfo() {
    let name = document.querySelector('.productName')
    name.value = "";
    let description = document.querySelector('.description')
    description.value = "";

    let boxs = document.querySelectorAll('.box');

    let inputs = document.querySelectorAll('.input1');
    boxs.forEach(x => x.checked = false)
    inputs.forEach(x => x.value = "")

}

function createProduct(product) {
    let container = document.querySelector('.products');
    let productDiv = document.createElement('div');
    productDiv.classList.add('product');
    let ingredientsList = document.createElement('ul');
    ingredientsList.classList = "product-ingridient"
    product.ingredients.forEach(ingredient => {
        let listItem = document.createElement('li');
        listItem.textContent = ingredient.name + " " + ingredient.count + " gr";
        ingredientsList.append(listItem);
    });

    productDiv.innerHTML =
        `
        <img class="product-image" src="${product.image}">
        <p class="product-name">${product.name}</p>
        <p class="product-description">${product.description}</p>
        ${ingredientsList.outerHTML} 
        <p class="product-price">${product.price} dram </p>
    `;
    console.log(product.image);
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

