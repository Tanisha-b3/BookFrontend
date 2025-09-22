# Car Wash Service 🚗💦

A modern web application to manage, track, and book car wash appointments efficiently. Built with React, ShadCN UI components, and Axios for API requests.

![Car Wash Service](https://img.shields.io/badge/React-18.2.0-blue) ![ShadCN-UI](https://img.shields.io/badge/ShadCN-UI-green) ![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 📋 Booking Management
- **View Bookings**: Responsive grid layout displaying all appointments
- **Create Bookings**: Intuitive form to add new car wash appointments
- **Edit Bookings**: Update existing booking details
- **Delete Bookings**: Secure deletion with confirmation dialogs

### 🔍 Advanced Search & Filtering
- **Real-time Search**: Instant search by customer name, car details, or service type
- **Status Filtering**: Filter by booking status (Pending, Confirmed, Completed, Cancelled)
- **Service Type Filter**: Filter by wash service type (Basic, Deluxe, Full Detailing)
- **Smart Sorting**: Sort by date, customer name, price, or duration

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Loading States**: Elegant skeleton loaders while fetching data
- **Pagination**: Efficient handling of large datasets
- **Toast Notifications**: User-friendly feedback for actions
- **Dark/Light Mode**: Ready for theme integration

### 📊 Dashboard Features
- **Booking Statistics**: Overview cards showing total, confirmed, pending, and completed bookings
- **Quick Actions**: Easy access to create new bookings and refresh data
- **Status Badges**: Visual indicators for booking status

## 🛠 Tech Stack

**Frontend Framework:**
- React 18.2.0
- React Router DOM

**UI Components:**
- ShadCN/UI - Modern component library
- TailwindCSS - Utility-first CSS framework

**Icons & Assets:**
- Lucide React - Beautiful icons
- Custom SVG illustrations

**API & State Management:**
- Axios - HTTP client for API requests
- React Hook Form - Form management and validation

**User Experience:**
- React Hot Toast - Notification system
- Date-fns (optional) - Date formatting

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API endpoint (update in `api/axios.js`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/car-wash-service.git
   cd car-wash-service
   ```
Install dependencies
```
bash
npm install
Configure API endpoint
```
# Update src/api/axios.js with your backend URL
const BASE_URL = "your-backend-api-url";
Start the development server
```
bash
npm start
Open your browser
Navigate to http://localhost:3000
```
Build for Production
```
# Create production build
bash
npm run build
```
# Creating a Booking
Click the "New Booking" button

Fill in customer details (name, phone, email)

Enter vehicle information (make, model, type)

Select service type and preferred date/time

Submit the form to create the booking

# Managing Bookings
Edit: Click the edit button on any booking card

Delete: Use the delete button with a confirmation dialog

Update Status: Change booking status from the edit form

# Search & Filters
Search: Type in the search bar for real-time results

Status Filter: Filter by booking status using the dropdown

Service Filter: Filter by service type

Sorting: Change sort order for better organization

#  API Integration
The application expects a RESTful API with the following endpoints:

# javascript
Base URL: /api/bookings

 GET    /              # Get all bookings (with pagination)
GET    /:id           # Get single booking
POST   /              # Create new booking
PUT    /:id           # Update booking
DELETE /:id           # Delete booking
GET    /search?q=     # Search bookings
# 🎨 Customization
Styling
Modify TailwindCSS classes in components

Update color scheme in tailwind.config.js

Customize ShadCN components as needed

# Common Issues
API Connection Failed

Check that the backend server is running

Verify API URL in axios.js

Check CORS settings on backend

Build Errors

Clear node_modules and reinstall dependencies

Check Node.js version compatibility

Verify all environment variables

Styling Issues

Ensure TailwindCSS is properly configured

Check class names for typos

Verify ShadCN components are installed correctly

# 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

#  Acknowledgments
ShadCN/UI for the beautiful component library

TailwindCSS for the utility-first CSS framework

Lucide for the elegant icons
The 
React community for excellent documentation and support

Troubleshooting guide

Professional footer with social links

You can customize the repository URLs, contact information, and add any specific deployment instructions based on your hosting platform.

