---

<p align="center">Manage providers registered on the Oasis.ai API with ease using Oasis Bot!</p>

---

## 🚀 **About the Bot**

Oasis Bot is a powerful script designed to manage providers on the **Oasis.ai API**. With this bot, you can:

- Read tokens from the `tokens.txt` file.
- Retrieve a list of available providers.
- Automatically delete providers based on their ID.

This script is built using **Node.js** and leverages **Axios** as the HTTP request library.

---

## 📥 **Installation Guide**

Follow these steps to install and run the script:

### 1️⃣ **Set Up Your Project**

1. Create a new folder to store the script files.
2. Navigate to the project folder in your terminal:
   ```bash
   cd [your-project-folder]
   ```

---

### 2️⃣ **Create the `delete.js` File**

1. Inside your project folder, create a new file named `delete.js`.
2. Copy the `delete.js` script provided in this repository into your file.

---

### 3️⃣ **Install Dependencies**

1. Initialize a new Node.js project:
   ```bash
   npm init -y
   ```
2. Install the required libraries (**Axios, fs, path, chalk**):
   ```bash
   npm install fs path axios chalk
   ```

---

### 4️⃣ **Ensure `tokens.txt` Contains Your Oasis API Token**

If `tokens.txt` is missing or empty, generate a new token by running:

```bash
npm run setup
```

---

### 5️⃣ **Run the Script**

1. Execute the script using Node.js:
   ```bash
   node delete.js
   ```
2. The script will read the token from `tokens.txt`, fetch the provider list, and delete providers automatically.

---

## ⚠️ **Important Notes**

- **Valid Token Required**: Ensure your API token is active and valid for Oasis.ai.
- **Modify If Necessary**: Adjust API URLs or parameters as needed if Oasis.ai updates its endpoints.

---

## 🛠️ **Contributing**

Want to add new features or report issues? Feel free to create a pull request or open an issue in the repository.

Happy coding! 🚀

<div align="center">
  <a href="https://t.me/livexordsscript" target="_blank">
    <img src="https://img.shields.io/static/v1?message=Livexords&logo=telegram&label=&color=2CA5E0&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="telegram logo" />
  </a>
</div>
