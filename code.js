//load from localStorage
let hostels = JSON.parse(localStorage.getItem("hostels")) || [];

// Hostel 1
{
    name: "Blooming Hostel",
    location: "Nairobi CBD",
    price: 5500,
    description: "Affordable hostel near the city with good security.",

    images: [
        { src: "images/h1-1.jpg", label: "Hostel Exterior" },
        { src: "images/h1-2.jpg", label: "Reception Area" },
        { src: "images/h1-3.jpg", label: "Dorm Room (bunk beds)" },
        { src: "images/h1-4.jpg", label: "Lounge Area" },
        { src: "images/h1-5.jpg", label: "Study Area" },
    ]

};

// Hostel 2
{
   name: "Olive View Hostel",
   location: "Westlands",
   price: "7500",
   description: "Budget friendly Hostel with warm and social vibes.",

   images: [
    { src: "images/h2-1.jpg", label: "Hostel Exterior" },
    { src: "images/h2-2.jpg", label: "Dorm Room Shared" },
    { src: "images/h2-3.jpg", label: "Kitchen Area" },
    { src: "images/h2-4.jpg", label: "Common social space" },
    { src: "images/h2-5.jpg", label: "Hostel Entrance" },

   ]

};

// Hostel 3
{
    name: "Elite Stay Hostel",
    location: "Hurlingham",
    price: 10000,
    description: "Premium hostel with private rooms and study spaces.",

    images: [
        { src: "images/h3-1.jpg", label: "Luxury Exterior" },
        { src: "images/h3-2.webp", label: "Private Room Interior" },
        { src: "images/h3-3.webp", label: "Bathroom" },
        { src: "images/h3-4.jpg", label: "Rooftop" },
        { src: "images/h3-5.jpg", label: "Lounge" },
    ]
};


// Bookings
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// Display Hostels
function displayHostels() {

    let list = document.getElementById("hostelList");
    if (!list) return;

    list.innerHTML = "";

    



}
