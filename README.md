# YelpCamp

## Overview

YelpCamp offers a user-friendly platform for outdoor enthusiasts to explore and rate campgrounds across various locations. Registered users can add new campgrounds, upload images, and share reviews. Each campground is displayed with an interactive map, providing a visual exploration experience that’s both engaging and functional.

The project is built with a robust backend using Node.js, Express, and MongoDB, integrated with several third-party services to enhance the user experience, security, and performance.

## Deployment

The app is deployed and accessible at [https://yelp-camp-01ps.onrender.com](https://yelp-camp-01ps.onrender.com) **Please Note** that this deployment is on Render's free tier, which means the server goes to "sleep" after a period of inactivity. As a result, when you first visit the link after some time, there may be **down time of up to a minute** while the server restarts and reconnects to the database.

Please be patient during this process, as it is expected behavior for the free-tier hosting environment. Once the server is up, the website should function normally.

## Features

- **User Registration & Authentication**:

Secure user sign-up, login, and authentication powered by Passport.js, ensuring data protection and user privacy.

- **Create, Read, Update, Delete (CRUD) Functionality**:

Comprehensive CRUD functionality allows users to easily add, update, and delete campgrounds and reviews.

- **Image Upload & Storage**:

Integrated with Cloudinary for seamless image uploads and optimized storage, improving page load times and enhancing the browsing experience.

- **Interactive Map Display**:

Mapbox-powered cluster maps provide users with an intuitive way to explore campground locations, with clustering for enhanced readability and navigation.

- **Data Validation & Error Handling**:

Input validation using Joi, preventing invalid or malicious data, with custom error handling to maintain a stable user experience.

## Technology Stack

- **Front-End**: HTML, CSS, EJS, JavaScript

- **Back-End**: Node.js, Express.js, MongoDB

- **Authentication**: Passport.js

- **Image Hosting**: Cloudinary

- **Map Services**: Mapbox

- **Schema Data Validation**: Joi

- **Schema Data Validation**: Render

## Project Structure

```plaintext
YelpCamp/
│
├── index.js                 # Main server file to initialize and configure the app
├── node_modules             # Directory for all installed Node.js dependencies
├── package-lock.json        # Auto-generated file for locking dependencies versions
├── package.json             # Project metadata and dependencies list
├── README.md                # Project Documentation
├── schema.js                # Database schema validation with Joi
├── cloudinary/              # Configuration for Cloudinary (image hosting service)
|    ├--
|
├── controllers/             # Logic for handling API requests and responses
│   ├──
|
├── models/                  # Mongoose schema definitions for MongoDB collections
│   ├──
|
├── public/                  # Public assets like CSS and JavaScript
|   ├──
│
├── routes/                  # Defines routing logic for different app features
|   ├──
|
├── seeds/                   # Seed data to populate the database with initial data
|   ├──
|
├── uploads/                 # Temporary storage for uploaded images before Cloudinary upload
|   ├──
|
├── utils/                   # Utility functions for reusable code
|   ├──
|
├── views/                   EJS templates for rendering the app's frontend
|   ├──

```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
