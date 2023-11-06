import { getLocalStorage, setLocalStorage, editLocalStorage, ingredients, deleteProductSetLocal } from "./database.js";


createAdmin();

function createAdmin() {
    const adminContainer = document.querySelector('.admin');
    adminContainer.appendChild(createFileInputEl());
    adminContainer.appendChild(createNamePanelEl());
    const productName = createProductNameEl()
    adminContainer.appendChild(productName)
    adminContainer.appendChild(createDescriptionPanel());
    adminContainer.appendChild(createTextArea());
    const ingredientH2 = document.createElement("h2");
    ingredientH2.textContent = "Ingredients";
    adminContainer.appendChild(ingredientH2);
    adminContainer.appendChild(createIngridientsEl());
    adminContainer.appendChild(createAddButton());
}

function createNamePanelEl() {
    const ingredientName = document.createElement("h2");
    ingredientName.textContent = "Name:";
    const labelName = document.createElement('label');
    labelName.appendChild(ingredientName)
    return labelName;
}

function createFileInputEl() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.className = "product-image";
    return fileInput;
}

function createProductNameEl() {
    const productNameInput = document.createElement("input");
    productNameInput.type = "text";
    productNameInput.className = "productName"
    productNameInput.placeholder = "Enter product name";
    return productNameInput;
}

function createAddButton() {
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Product';
    addButton.className = ('btn');
    addButton.addEventListener("click", addProduct);
    return addButton;
}

function createSaveButton(product) {
    const saveButton = document.createElement('button');
    saveButton.textContent = 'save';
    saveButton.className = ('btn');
    saveButton.addEventListener("click", (event) => {
        console.log("event.target")
        product.name = event.target.parentElement.querySelector(".productName").value
        product.description = event.target.parentElement.querySelector(".description").value
        fillIngrIdents(product, event.target.parentElement)
        editLocalStorage(product)
        let modal = document.querySelector(".modal");
        modal.remove()
        read()
    });
    return saveButton;
}
function fillIngrIdents(product, el) {
    let productIngredients = [];

    let boxs = el.querySelectorAll('.box');
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
}

function createDescriptionPanel() {
    const description = document.createElement("h2");
    description.textContent = "description";
    const labelDiscription = document.createElement("label");
    labelDiscription.appendChild(description)

    return labelDiscription;
}
function createIngridientsEl() {
    const containerIngridentsEl = document.createElement('div');
    containerIngridentsEl.classList = 'ingredients';

    for (let i = 0; i < ingredients.length; i++) {
        let ingredientEl = document.createElement('div');
        ingredientEl.classList = 'ingredient';
        ingredientEl.innerHTML = `
            <div class="left-column">
                <input type="checkbox" class="box">
                <span>${ingredients[i].name}</span>
            </div>
            <div class="right-column">
                <input type="text" class="input1">
            </div>
        `;
        containerIngridentsEl.appendChild(ingredientEl);
    }
    return containerIngridentsEl;
}

function createTextArea() {
    const textarea = document.createElement("textarea");
    textarea.className = "description";
    textarea.placeholder = "Enter product description";
    return textarea;
}

let products = getLocalStorage()

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


    fillIngrIdents(product, document)
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
        }
        product.price = productPrice;

    } catch (error) {
        F
        console.error('Error reading the image file:', error);
    }
    product.price = productPrice;


    let errorList = [];

    if (validation(product, errorList)) {
        setLocalStorage(product);
        cleanInfo();
    } else {
        for (let index = 0; index < errorList.length; index++) {
            alert(errorList[index]);
        }
    }
    read()

}
function validation(product, errorList) {
    if (product.name === "") {
        errorList.push("Product name cannot ");
    }

    if (product.count === "") {
        errorList.push("count count cannot ");
    }
    if (product.description === "") {
        errorList.push("description  cannot ");
    }

    if (errorList.length > 0) {
        return false;
    } else {
        return true;
    }
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
    const editButton = document.createElement("button");
    editButton.textContent = "Edit"
    editButton.classList = "btn"

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete"
    deleteButton.classList = "btn1"

    deleteButton.addEventListener("click", () => {
        deleteProduct(product)
    })
    editButton.addEventListener("click", () => {
        openEditPanel(product)
    })
    productDiv.append(deleteButton)
    productDiv.append(editButton)
    container.appendChild(productDiv);
}

function deleteProduct(product) {
    let productNameToDelete = product.name;
    let updatedProducts = deleteProductSetLocal({ name: productNameToDelete });
    products = updatedProducts;
    read();
};

function openEditPanel(product) {
    const body = document.querySelector('body')
    body.append(createModalPanel(product))
}

function createModalPanel(product) {
    const span = document.createElement('span')
    span.onclick = function () {
        modal.style.display = "none";
    }
    span.innerText = "X"
    span.classList = "close"

    const editPanel = createEditPanel(product)

    const modalContent = document.createElement('div')
    modalContent.classList = "modal-content"
    modalContent.append(span)
    modalContent.append(editPanel)

    const modal = document.createElement('div')
    modal.classList = "modal"
    modal.style.display = "block";
    modal.append(modalContent)

    return modal;
}

function createEditPanel(product) {

    const editPanel = document.createElement('div');
    editPanel.classList = "admin"

    editPanel.appendChild(createFileInputEl());

    editPanel.appendChild(createNamePanelEl());
    const productName = createProductNameEl()
    productName.value = product.name
    editPanel.appendChild(productName)

    editPanel.appendChild(createDescriptionPanel());
    editPanel.appendChild(createTextArea());

    const ingredientH2 = document.createElement("h2");
    ingredientH2.textContent = "Ingredients";
    editPanel.appendChild(ingredientH2);
    const createIngridients = createIngridientsEl()

    const ingredients = createIngridients.querySelectorAll(".ingredient")
    for (let i = 0; i < ingredients.length; i++) {
        for (let j = 0; j < product.ingredients.length; j++) {
            let currentIngrindent = ingredients[i]
            if (product.ingredients[j].name === currentIngrindent.querySelector("span").innerText) {
                currentIngrindent.querySelector('.box').checked = true
                currentIngrindent.querySelector('.input1').value = product.ingredients[j].count
            }
        }
    }
    editPanel.appendChild(createIngridients);
    editPanel.appendChild(createSaveButton(product));
    return editPanel;
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
        currentPrice = price * (count / 100)
    } else {
        currentPrice = price * (100 / count)
    }
    return currentPrice
}















