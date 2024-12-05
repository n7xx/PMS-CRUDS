# Simple CRUDS System

A simple CRUD (Create, Read, Update, Delete, Search) web application for managing products. This system provides a user-friendly interface to manage product details with strict validation rules, including mandatory image upload.

---

## 🚀 Features

- **Add Products**:
  - Product Name (Starts with a capital letter, 5-10 characters).
  - Product Price (Between 10 and 100,000).
  - Product Category (Select from predefined categories).
  - Product Description (5-15 characters).
  - **Mandatory Product Image Upload**.
- **View Products**: Displays a list of all added products.
- **Update Products**: Modify product details (requires an image, either existing or newly uploaded).
- **Delete Products**: Remove products from the list.
- **Search Products**: Dynamically search by product name.
- **Form Validation**:
  - Real-time validation with visual indicators (green for valid, red for invalid).
  - Error alerts for missing or invalid data, including missing images.

---

## 🛠 Technologies Used

- **HTML5**: Structure and layout of the application.
- **CSS3**: Styling and responsiveness.
- **JavaScript**: Logic for CRUD operations, validation, and dynamic behavior.
- **Bootstrap**: Responsive design, pre-styled components, and UI interactions.
- **SweetAlert2**: User-friendly popups for error and success messages.

---

## 📂 Project Structure

````plaintext
simple-cruds-system/
│
├── index.html         # Main HTML file
├── main.js            # JavaScript logic for CRUD operations and validation
├── styles.css         # Custom CSS styles
├── /images            # Folder for product images
└── README.md          # Documentation file

````

## 🔧 Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/n7xx/PMS-CRUDS.git
2. **Navigate to the Project Folder:**
   ```bash
   cd PMS-CRUDS
3. **Run the Application: Open index.html in your browser to launch the app.**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request
---

## 🖱️ How to Use
- **Add a Product:**
  - Fill in all fields in the form (Product Name, Price, Category, Description, and optionally an Image).
  - Click Add Product to add the product to the list.
  - Missing or invalid inputs will trigger an error alert..


- **Update a Product:**
  - Click the Update button next to the product in the list.
  - Modify the fields and click Update Product to save changes.
  - Click Update Product to save changes.
  - Click Update Product to save changes.

- **Delete a Product:**
  - Click the Delete button to remove the product from the list.
  - A pop-up will appear is confirmation will be deleted if you click Cancel, the deletion will be canceled.

- **Search for Products:**
  - Type a product name & category in the search bar to dynamically filter the product list.


---
 ## 📜 License
This project is licensed under the MIT License. You are free to use, modify, and distribute this project as long as credit is given.

---
## 📬 Contact
For any issues or contributions, feel free to submit a pull request or open an issue in this repository!
[Nashaat Fathy]
- Email: [nashaatfathy878@gmail.com]
- Project Link: [https://github.com/n7xx/PMS-CRUDS]


#### Demo: https://n7xx.github.io/PMS-CRUDS/


