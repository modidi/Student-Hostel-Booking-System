let hostels = JSON.parse(localStorage.getItem("hostels")) || [];
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// Save Data
function saveHostels() {
    localStorage.setItem("hostels", JSON.stringify(hostels));

}

// Add Hostel
let form = document.getElementById("hostelForm");

