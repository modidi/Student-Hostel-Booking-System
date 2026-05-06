# Student Hostel Booking System

## Project Description
The Student Hostel Booking System is a web application that helps students easily search, compare and book hostels based on location and price. It is designed to simplify the process of finding accommodation by providing a centralized platform where users can browse hostel listings, view images, check details and make bookings.

The system also includes an admin section where new hostels can be added or deleted. All booking and hostel data is stored using localStorage.

## How It Works
- The user visits the homepage and views available hostels.
- Each hostel displays images, price, location and description
- Users can filter hostels by price or select from a dropdown menu.
- Clicking "Book" redirects the user to the bookings page.
- The user fills in booking details(name,email,phone,check-in,check-out).
- Booking information is saved using localStorage.
- All bookings are displayed instantly on the bookings page.

For administrators:
- The admin can add new hostels via the Add Hostel page.
- Hostels are stored in localStorage and displayed dynamically.
- Admin can also delete hostel listings.

## Author Information
Name: Maureen Mutua.
Github: https://github.com/modidi/Student-Hostel-Booking-System

## Setup Instructions
### Prerequisites
- A modern web browser (Chrome, FireFox, Edge)
- A code editor (optional, for viewing/editing)
### Installation
- Clone or download the project

```
git clone https://github.com/modidi/student-hostel-booking-system.git
cd student-hostel-booking-system
```

- Running the Application
1. Open index.html in your browser
2. No server or installation required

- Using the System
1. Browse available hostels on the homepage.
2. Use filters to refine results.
3. Click Book to proceed to booking page
4. Fill in booking form and submit
5. View all bookings on the bookings page
6. Admin can add hostels from add.html

## BDD (Behavior-Driven Development)
### Feature: User Can book a hostel
1. Scenario 1: User books a hostel successfully
- Given: The user is on homepage
- When: The user selects a hostel and clicks "Book"
- Then: The user is redirected to the booking page

2. Scenario 2: User submits booking form correctly
- Given: The user is on the bookings page
- When: The user fills all fields and submits
- Then: The booking is saved and displayed

3. Scenario 3: User submits incomplete form
- Given: The user is on the booking page
- When: The user submits without filling all fields
Then: An error message is shown

4. Scenario 4: Admin adds a new hostel
- Given: Admin is on Add Hostel page
- When: Admin fills and submits hostel form
- Then: New hostel is added to listings

## Technologies Used
- HTML - Page Structure and layout
- CSS - Styling and responsive design
- JavaScript - Application logic
- localStorage - Data storage (hostels & bookings)
- DOM Manipulation - Dynamic updates
- Event Listeners - Form handling and interactions

## Project Structure
```
student-hostel-booking-system/
│
├── index.html        # Homepage
├── add.html          # Admin page
├── bookings.html     # Booking form, booked hostels
├── about.html        # About page
├── contact.html      # Contact page
├── style.css         # Styling file
├── code.js           # Main JavaScript logic
├── images/           # Hostel images
└── README.md         # Project documentation
```
## Key Features
- View hostel listings dynamically
- Filter by price and search options
- Image slideshow for each hostel
- Booking system with validation
- Data stored using localStorage
- Admin hostel management (add/delete)
- Responsive layout design

## Contact Information
- GitHub: https://github.com/modidi

## License