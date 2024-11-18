# Vroomzyy

Vroomzyy is an innovative platform designed to provide on-demand emergency driver services. It enables customers to quickly request professional drivers and offers a seamless experience for both customers and drivers. The platform prioritizes efficiency, security, and scalability, leveraging modern technologies.

---

## Features

- **Emergency Driver Requests**: Customers can request drivers with specified preferences (e.g., gender, location).
- **Driver Matching Algorithm**: Efficiently matches customers with nearby drivers based on availability and preferences.
- **Dynamic Pricing**: Calculates charges dynamically based on factors like time, location, and demand.
- **Real-time Driver Tracking**: Allows customers to track drivers in real-time.
- **Document Verification**: Uses OCR (Optical Character Recognition) to validate driver licenses and other documents.
- **Drowsiness Detection**: Includes a driver drowsiness detection system powered by deep learning to ensure driver safety.
- **Secure Payments**: Integration with payment gateways for secure transactions.
- **Admin Dashboard**: Manage customer requests, drivers, and other platform operations efficiently.

---

## Tech Stack

### Frontend
- **React.js**: For building the user interface.
- **Redux**: For state management.
- **HTML5/CSS3**: For responsive design.

### Backend
- **Node.js**: Server-side runtime.
- **Express.js**: For building RESTful APIs.
- **Mongoose**: For interacting with MongoDB.

### Database
- **MongoDB Atlas**: A NoSQL database for scalable and flexible data management.

### Other Technologies
- **Mediapipe**: For face detection in drowsiness detection.
- **TensorFlow**: For the driver drowsiness detection model.
- **Docker**: For containerized deployment.
- **Multer**: For file uploads (e.g., driver photos and documents).
- **Stripe/Razorpay**: For secure payment integration.

---

## Installation

### Prerequisites
- **Node.js** and **npm** installed
- **MongoDB Atlas** or a local MongoDB instance
- **Docker** (optional, for containerized deployment)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vroomzyy.git
   cd vroomzyy/server
