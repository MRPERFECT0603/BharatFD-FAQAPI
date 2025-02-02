
# BharatFD FAQ API

This project provides an **API** for managing Frequently Asked Questions (FAQs) for the BharatFD platform. It supports creating FAQs, retrieving them based on language, and saving them to a Redis cache for improved performance.

## Table of Contents

- [Assumptions](#assumptions)
- [Installation Steps](#installation-steps)
- [API Usage Examples](#api-usage-examples)
- [Contribution Guidelines](#contribution-guidelines)
- [Testing](#testing)


---

## Assumptions

The following assumptions have been made while creating this project:

1. **Modeling the Data**:
   - We are considering two ways to model the data for storing FAQs in different languages:
     - **First Approach** (to be used in case of many languages): 
       - Multiple documents, one for each language (e.g., English, Hindi, Urdu, Bengali). 
       - Each document contains a `FAQ ID`, `question`, and `answer`. The `FAQ ID` is referenced across all documents, ensuring that the same FAQ is shared across different language documents.
       - This approach is suited for a larger number of languages, as having all the languages in one document can be inefficient when the number of languages grows significantly.
     - **Second Approach** (Used in this Project): 
       - A single document contains all languages for each FAQ. Each FAQ has a `question`, `answer`, and a `language` field to specify which language it belongs to.
       - This approach is used for a smaller number of languages (e.g., 4-5 languages). However, if the number of languages increases, **we plan to switch to the first approach** for better scalability.

   For the current project, **the second approach** is used since there are only 4-5 languages. If the number of languages increases in the future, we will switch to the first approach.

2. **API Development**:
   - Two main APIs are implemented:
     - **GET API**: To retrieve all FAQs based on the specified language.
     - **POST API**: To add new FAQs to the database.
   - **Multi-language Support**: Multi-language support is provided using the **Google Translate API** to translate FAQ content.
   - **Redis Caching**: The project utilizes **Redis** for caching frequently requested FAQ data to enhance performance and reduce database load.

3. **Admin Panel**:
   - Since the project is developed using **TypeScript** and **Node.js**, **there is no built-in admin panel** within the project.
   - Instead, a separate **React.js-based admin panel** is provided, allowing for easier management of FAQs via a UI.

4. **Docker & Kubernetes Setup**:
   - A **Dockerfile** is provided to containerize the project and ensure consistency across different environments.
   - The project also includes **Kubernetes deployment** and **service files** to facilitate the deployment of the entire application (including the Node.js app and Redis) on a Kubernetes cluster.

These assumptions were taken into account while developing this project to ensure scalability, performance, and maintainability, and are relevant for the current scope of the project.


---

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/MRPERFECT0603/BharatFD-FAQAPI.git
cd BharatFD-FAQAPI
```

### 2. Install Dependencies

Make sure you have **Node.js** and **npm** installed on your machine. Then, install the required dependencies by running:

```bash
npm install
```

This will install all the necessary dependencies specified in the `package.json` file.

### 3. Set Up Environment Variables

Create a `.env` file at the root of the project and add the following environment variables:

```bash
PORT=8000
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_USERNAME=your_redis_username
REDIS_PASSWORD=your_redis_password
MONGODB_URI=your_mongodb_connection_string
```

- Replace `your_redis_host`, `your_redis_port`, `your_redis_username`, and `your_redis_password` with your **Redis** credentials.
- Replace `your_mongodb_connection_string` with your **MongoDB Atlas** connection string.

### 4. Run the Application

After setting up the environment variables, start the application:

```bash
npm run dev
```

This will start the server on port `8000` (or the port specified in your `.env` file). You can now access the API at `http://localhost:8000`.

---

## API Usage Examples

### 1. **Create a New FAQ (POST /api/faqs)**

**Endpoint**: `/api/faqs`  
**Method**: `POST`

**Request Body**:
```json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
}
```

**Response**:
```json
{
  "message": "FAQ created and saved successfully!"
}
```

### 2. **Get FAQs (GET /api/faqs)**

**Endpoint**: `/api/faqs`  
**Method**: `GET`  
**Query Parameters**:  
- `lang`: Language code (e.g., `en`, `hi`, `bn`) (default is `en`)

**Example**:
```bash
GET /api/faqs?lang=en
```

**Response**:
```json
[
  {
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
  },
  {
    "question": "What is Express?",
    "answer": "Express is a fast, unopinionated, minimalist web framework for Node.js."
  }
]
```

### 3. **Error Handling**

For invalid requests (e.g., missing required fields), the API will respond with appropriate error messages. For example:

**Request**:
```json
{
  "answer": "This is a test answer"
}
```

**Response**:
```json
{
  "error": "Invalid Question format. Must be of Length greater than 10 characters."
}
```

---

## Contribution Guidelines

We welcome contributions to this project! To ensure smooth collaboration, please follow these guidelines:

### 1. **Fork the Repository**
   - Create a fork of this repository on GitHub.
   - Clone the forked repository to your local machine.

### 2. **Create a New Branch**
   - Create a new branch for each feature or bug fix.
   - Branch name should be descriptive (e.g., `feature/add-faq-validation`).

```bash
git checkout -b feature/your-feature-name
```

### 3. **Make Changes**
   - Implement the feature or bug fix.
   - Write tests for your changes if applicable.

### 4. **Commit Your Changes**
   - Write clear and concise commit messages.
   - Use the following commit message format:

```bash
git commit -m "Your commit message"
```

### 5. **Push the Changes**
   - Push the changes to your forked repository.

```bash
git push origin feature/your-feature-name
```

### 6. **Create a Pull Request**
   - Open a pull request (PR) on the original repository with a detailed description of the changes.
   - Ensure your PR is based on the latest version of the `dev` branch.


### **Testing**:

- **Testing**: Unit tests are written using **Mocha** and **Chai**. Run the tests with:

  ```bash
  npm run test
  ```

- **Redis Caching**: The API caches the FAQs in **Redis** to improve performance for frequently accessed data. The cache expires after 1 hour.

---

## Contact Developer: Vivek Shaurya

You can reach out to Vivek Shaurya through the following channels:

### 📧 **Email**:
- [vivekshaurya@gmail.com](mailto:vivekshaurya62@gmail.com)

### 💻 **GitHub**:
- [Vivek's GitHub Profile](https://github.com/MRPERFECT0603)

### 🔗 **LinkedIn**:
- [Vivek's LinkedIn Profile](https://www.linkedin.com/in/vivek-shaurya/)

### 📱 **Phone**:
- Available upon request

Feel free to reach out for project collaborations, questions, or contributions to open-source projects!

---