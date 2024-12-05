// Inputs:
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

// event listeners for dynamic validation:
document
  .querySelectorAll(
    "#productName, #productPrice, #productCategory, #productDescription"
  )
  .forEach((input) => {
    input.addEventListener("input", () => validationInputs(input));
  });

// will put all products Here:
var products = [];

// Global variable to store current image:
var currentImageBase64 = "";

// Condition to check local Storage:
if (localStorage.getItem("products") !== null) {
  products = JSON.parse(localStorage.getItem("products"));
  displayProducts(products);
}

// Set to local storage, for don't repeat my self in the code:
function SetToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

// Regex for validation Inputs:
var regex = {
  productName: /^[A-Z][a-z]{5,10}(?: [A-Z][a-z0-9]{1,10})*$/,
  productPrice: /^(10|[1-9][0-9]{1,4}|100000)$/,
  productDescription: /^[\s\S]{5,15}$/,
  productCategory: /^(Mobile|Laptop|TV|Screens)/i,
};

// Validation inputs function to Check each element:
function validationInputs(el) {
  var isValid = regex[el.id].test(el.value);
  el.nextElementSibling.classList.toggle("d-none", isValid);
  el.classList.toggle("is-valid", isValid);
  el.classList.toggle("is-invalid", !isValid);
  return isValid;
}

// check validation function:
// are all inputs valid?
function checkValidation() {
  var isNameValid = validationInputs(productName);
  var isPriceValid = validationInputs(productPrice);
  var isCategoryValid = validationInputs(productCategory);
  var isDescValid = validationInputs(productDescription);

  return isNameValid && isPriceValid && isCategoryValid && isDescValid;
}

// Check image validation:
function checkImageValidation() {
  return currentImageBase64 !== "";
}

// Searching about file Reader & base64:
// I want to upload a dynamic image and not from a static file.. How?

// Handle Image file Reader to dynamic upload image from any file:
function handleImageFileRead() {
  if (productImage.files[0]) {
    // Add file type and size validation
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(productImage.files[0].type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Please upload a JPEG, PNG, or GIF image.",
      });
      productImage.value = "";
      return;
    }

    if (productImage.files[0].size > maxSize) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Image must be less than 5MB.",
      });
      productImage.value = "";
      return;
    }
  }

  if (productImage.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(productImage.files[0]);
    reader.onload = function () {
      currentImageBase64 = reader.result;
    };
    reader.onerror = function (error) {
      console.error("Error reading file:", error);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "Unable to read the image file.",
      });
    };
  }
}

// Add event listener for image input:
productImage.addEventListener("change", handleImageFileRead);

// add product function:
function addProdcut() {
  if (!checkValidation() || !checkImageValidation()) {
    showValidationError();
    return;
  }
  var product = {
    id: products.length,
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDescription.value,
    image: currentImageBase64,
  };

  products.unshift(product);
  SetToLocalStorage();
  displayProducts(products);
  updateInputsValue();
  currentImageBase64 = "";

  Swal.fire({
    title: "Great work!",
    text: "You've successfully added a bookmark.",
    icon: "success",
    timer: 1200,
  });
}

// Display all products:
function displayProducts(list) {
  var box = ``;
  for (let i = 0; i < list.length; i++) {
    box += `<div class="product col-md-3 col-6 mb-3">
          <div class="p-3 bg-light rounded-3 shadow-sm ">
            <img src="${list[i].image}" class="w-100 mb-3" alt="${
      list[i].name
    }" />
            <h2 class="h6">${
              list[i].highlightedName ? list[i].highlightedName : list[i].name
            }</h2>
            <p class="text-secondary mb-2 fs-7">${list[i].desc}</p>
            <h3 class="h6 mb-2"><span class="fw-bolder">Price: </span>
            ${list[i].price}</h3>
            <h3 class="h6 mb-2"><span class="fw-bolder">Category:</span>
            ${
              list[i].highlightedCategory
                ? list[i].highlightedCategory
                : list[i].category
            }</h3>
            <div class="d-flex justify-content-between mt-3">
              <button onclick="deleteProduct(${
                list[i].id
              })" id="deleteBtn" class="btn btn-outline-danger btn-sm w-25 m7-2 d-flex justify-content-center align-content-center"><i class="fa-solid fa-trash"></i></button>
              <button id="updateBtn" onclick="setFormUpdate(${i})" class="btn btn-outline-warning btn-sm w-25 m7-2 d-flex justify-content-center align-content-center"><i class="fa-regular fa-pen-to-square"></i></button>
            </div>
          </div>
        </div>`;
  }
  document.getElementById("productsData").innerHTML = box;
}

// Delete product with id:
function deleteProduct(productId) {
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone.!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#9746cd",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      for (var i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
          products.splice(i, 1);
        }
      }
      SetToLocalStorage();
      displayProducts(products);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        timer: 1000,
      });
    }
  });
}

// if we have a 'value' parameter we will get it, if not we will receive an empty string:
// work Instead of ClearInputs() function:
function updateInputsValue(value) {
  productName.value = value ? value.name : "";
  productPrice.value = value ? value.price : "";
  productCategory.value = value ? value.category : "";
  productDescription.value = value ? value.desc : "";
  productImage.value = "";

  productName.classList.remove("is-valid", "is-invalid");
  productPrice.classList.remove("is-valid", "is-invalid");
  productCategory.classList.remove("is-valid", "is-invalid");
  productDescription.classList.remove("is-valid", "is-invalid");

  productName.nextElementSibling.classList.add("d-none");
  productPrice.nextElementSibling.classList.add("d-none");
  productCategory.nextElementSibling.classList.add("d-none");
  productDescription.nextElementSibling.classList.add("d-none");
}

// declar this variable for use it in updateProduct() function:
var indexUpdate;

// Prepare Form inputs to Update it with updateProduct() fucntion:
function setFormUpdate(index) {
  updateInputsValue(products[index]);
  updateBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");

  indexUpdate = index;
}

//  Update product:
function updateProduct() {
  if (!checkValidation()) {
    showValidationError();
    return;
  }
  var imageToUse = currentImageBase64 || products[indexUpdate].image;

  products[indexUpdate].name = productName.value;
  products[indexUpdate].price = productPrice.value;
  products[indexUpdate].category = productCategory.value;
  products[indexUpdate].desc = productDescription.value;
  products[indexUpdate].image = imageToUse;

  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");

  SetToLocalStorage();
  displayProducts(products);
  updateInputsValue();

  Swal.fire({
    title: "Updated!",
    text: "Bookmark has been updated successfully.",
    icon: "success",
    timer: 1000,
  });
}

// Search by product name function:
function searchPoducts(searchKey) {
  var searchProductsArr = [];
  var originalProducts = JSON.parse(localStorage.getItem("products"));
  var regex = new RegExp(`(${searchKey})`, `gi`);

  for (var i = 0; i < originalProducts.length; i++) {
    var item = originalProducts[i];
    if (regex.test(item.name)) {
      searchProductsArr.push(item);
    }
    // Highligh the Search key:
    item.highlightedName = item.name.replace(
      regex,
      (match) => `<span class="main-color">${match}</span>`
    );
  }

  displayProducts(searchProductsArr);
  // Save the updated products list back to localStorage
  localStorage.setItem("products", JSON.stringify(originalProducts));
}

// Search By category function:
function searchPoductsByCategory(searchKey) {
  var categoryProductsArr = [];
  var originalProducts = JSON.parse(localStorage.getItem("products"));
  var regex = new RegExp(`(${searchKey})`, `gi`);

  for (var i = 0; i < originalProducts.length; i++) {
    var item = originalProducts[i];
    if (regex.test(item.category)) {
      categoryProductsArr.push(item);
    }
    // Highligh the Search key:
    item.highlightedCategory = item.category.replace(
      regex,
      (match) => `<span class="main-color">${match}</span>`
    );
  }

  displayProducts(categoryProductsArr);
  // Save the updated products list back to localStorage
  localStorage.setItem("products", JSON.stringify(originalProducts));
}

function showValidationError() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "The Product Details is not valid.",
    footer: `<p class="text-start fw-semibold">
       <i class="fa-regular fa-circle-right text-danger"></i> Product name should Start with Captial letter.
       </p>
        <br>
        <p class="text-start fw-semibold">
       <i class="fa-regular fa-circle-right text-danger"></i> Product price should be from 10 to 100000.</p>
        <br>
        <p class="text-start fw-semibold">
       <i class="fa-regular fa-circle-right text-danger"></i> Product category should be from Categories list.</p>
          <br>
          <p class="text-start fw-semibold">
       <i class="fa-regular fa-circle-right text-danger"></i> Product Description should be From 5 to 15 letters.</p>
                 <br>
          <p class="text-start fw-semibold">
       <i class="fa-regular fa-circle-right text-danger"></i> Please upload an image for the product.</p>
       `,
  });
}
