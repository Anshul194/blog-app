# Blog App Backend

The Blog App Backend is a Node.js application built using Express.js, designed to manage and serve blog posts to users. It provides an interactive platform where users can create, read, update, and delete blog posts, as well as retrieve posts based on geographical locations.

## Features

### Blog Management
- **Create, Update, Delete Posts:** Users can manage their blog posts, create new ones, or update and delete existing ones.

### User Authentication
- Secure registration and login functionalities are implemented to ensure user data privacy and access control.

### Geolocation-Based Posts
- **Get Posts by Location:** Users can retrieve posts based on specified latitude, longitude, and maximum distance, offering a geospatial aspect to blog post retrieval.

### Post Counts
- **Get Post Counts:** Users can view the count of active and inactive posts through a dashboard feature.

## Technologies Used
- **Node.js:** Server-side runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing blog posts and user data.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
- **JWT:** JSON Web Token for secure authentication.
- **Bcrypt:** Password hashing for enhanced security.
- **GeoJSON:** For geospatial data representation and querying.

# Installation and Setup

To set up the application locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Anshul194/blog-app.git
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file based on the provided `.env.example` file and configure necessary environment variables such as database connection URI, JWT secret key, etc.

4. **Run the application:**
    ```bash
    npm run dev
    ```

5. **Access the application in your web browser:**
    ```bash
    http://localhost:5001
    ```

## NOTE

If you encounter any issues or have suggestions for improvements, please create an issue or reach out to me on [LinkedIn](https://www.linkedin.com/in/YourLinkedInProfile/).

## Requests

- If you find any bugs, please create an issue; I would love to solve them.
- If you have suggestions or want new features, feel free to create an issue with the "feature" label.
