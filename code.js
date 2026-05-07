//Data,Array holds all the hostel listings
let hostels = JSON.parse(localStorage.getItem("hostels")) || [
  // Hostel 1
  {
    name: "Blooming Hostel",
    location: "Nairobi CBD",
    price: 5000,
    description: "Affordable hostel near the city with good security.",
    rating: 0,

    images: [
      { src: "images/h1-1.jpg", label: "Hostel Exterior" },
      { src: "images/h1-2.jpg", label: "Reception Area" },
      { src: "images/h1-3.jpg", label: "Dorm Room (bunk beds)" },
      { src: "images/h1-4.jpg", label: "Lounge Area" },
      { src: "images/h1-5.jpg", label: "Study Area" },
    ],
  },

  // Hostel 2
  {
    name: "Olive View Hostel",
    location: "Westlands",
    price: 5800,
    description: "Budget friendly Hostel with warm and social vibes.",
    rating: 0,

    images: [
      { src: "images/h2-1.jpg", label: "Hostel Exterior" },
      { src: "images/h2-2.jpg", label: "Dorm Room Shared" },
      { src: "images/h2-3.jpg", label: "Kitchen Area" },
      { src: "images/h2-4.jpg", label: "Common social space" },
      { src: "images/h2-5.jpg", label: "Hostel Entrance" },
    ],
  },

  // Hostel 3
  {
    name: "Elite Stay Hostel",
    location: "Hurlingham",
    price: 6600,
    description: "Premium hostel with private rooms and study spaces.",
    rating: 0,

    images: [
      { src: "images/h3-1.jpg", label: "Luxury Exterior" },
      { src: "images/h3-2.webp", label: "Private Room Interior" },
      { src: "images/h3-3.webp", label: "Bathroom" },
      { src: "images/h3-4.jpg", label: "Rooftop" },
      { src: "images/h3-5.jpg", label: "Lounge" },
    ],
  },

  // Hostel 4
  {
    name: "Mo's Hostel",
    location: "Athi River",
    price: 7000,
    description: "Modern Hostel with stable wifi",
    rating: 0,

    images: [
      { src: "images/h4-1.jpg", label: "Exterior View" },
      { src: "images/h4-2.jpg", label: "Shared room" },
      { src: "images/h4-3.webp", label: "Lounge Area" },
      { src: "images/h4-4.jpg", label: "Kitchen Area" },
      { src: "images/h4-5.jpg", label: "Hallway" },
    ],
  },

  // Hostel 5
  {
    name: "The Fort Hostel",
    location: "Kamulu",
    price: 7800,
    description: "Ideal for students who love a quiet environment",
    rating: 0,

    images: [
      { src: "images/h5-1.jpg", label: "Building Exterior" },
      { src: "images/h5-2.jpg", label: "Dormitory Beds" },
      { src: "images/h5-3.jpg", label: "Reading Area" },
      { src: "images/h5-4.jpg", label: "Dining Space" },
      { src: "images/h5-5.webp", label: "Laundry area" },
    ],
  },

  // Hostel 6
  {
    name: "Make it Rain Hostel",
    location: "Karen",
    price: 9800,
    description: "Student Accommodation premium, private rooms and gym access.",
    rating: 0,

    images: [
      { src: "images/h6-1.jpg", label: "Front View" },
      { src: "images/h6-2.jpg", label: "Private Room" },
      { src: "images/h6-3.jpg", label: "Gym Area" },
      { src: "images/h6-4.jpg", label: "Study Hall" },
      { src: "images/h6-5.jpg", label: "Student Lounge" },
    ],
  },
];

// Image Modal
//Handles image zooming
let currentImages = [];
let currentIndex = 0;

// Opens image modal when user clicks a hostel image
function openModal(src, label, hostelIndex) {
  // Get images for selected hostel
  currentImages = hostels[hostelIndex].images;

  // Find clicked image index
  currentIndex = currentImages.findIndex((img) => img.src === src);
  if (currentIndex === -1) currentIndex = 0;

  showModalImage();

  document.getElementById("imageModal").style.display = "flex";
}

function showModalImage() {
  let img = document.getElementById("modalImg");
  let label = document.getElementById("modalLabel");

  if (!currentImages.length) return;

  img.src = currentImages[currentIndex].src;
  label.innerText = currentImages[currentIndex].label;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showModalImage();
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + currentImages.length) % currentImages.length;
  showModalImage();
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

// Display Hostels
function displayHostels() {
  let list = document.getElementById("hostelList");
  if (!list) return;

  list.innerHTML = "";

  hostels.forEach((h, i) => {
    // Create hostel card container
    let div = document.createElement("div");
    div.classList.add("card");

    // create card structure
    div.innerHTML = `
        <div class="slideshow">
            <img id="img-${i}">
            <p id="label-${i}"></p>
        </div>

        <h3>${h.name}</h3>
        <p><strong>Location:</strong> ${h.location}</p>
        <p><strong>Price:</strong> Ksh ${h.price}</p>
        <p>${h.description}</p>

        <button onclick="gotoBooking(${i})">Book</button>

        <p> Rating: ${h.rating || 0}/5</p>
        <button onclick="rateHostel(${i})"> Rate</button>
        `;

    list.appendChild(div);

    //Slideshow logic
    let currentIndex = 0;

    function updateSlide() {
      let img = document.getElementById(`img-${i}`);
      let label = document.getElementById(`label-${i}`);

      if (img && label && h.images.length > 0) {
        let currentImg = h.images[currentIndex];

        img.src = currentImg.src;
        label.innerText = currentImg.label;

        img.onclick = () => {
          openModal(currentImg.src, currentImg.label, i);
        };

        currentIndex = (currentIndex + 1) % h.images.length;
      }
    }
    updateSlide();
    setInterval(updateSlide, 5000); //Auto-change images every 5 seconds
  });
}

// Booking Direct
window.gotoBooking = function (index) {
  localStorage.setItem("selectedHostel", index);
  window.location.href = "bookings.html";
};

// Rate
function rateHostel(i) {
  let rating = prompt("Rate this hostel from 1 to 5");

  rating = Number(rating);

  if (rating >= 1 && rating <= 5) {
    hostels[i].rating = rating;

    localStorage.setItem("hostels", JSON.stringify(hostels));

    toast("Thanks for rating!");

    setTimeout(() => {
      displayHostels();
    }, 500);
  } else {
    alert("Please enter a number between 1 and 5");
  }
}

//  Price Filter
function filterPrice(max) {
  document.getElementById("priceValue").innerText = max;

  let cards = document.getElementsByClassName("card");

  hostels.forEach((h, i) => {
    if (cards[i]) {
      cards[i].style.display = h.price <= max ? "block" : "none";
    }
  });
}

//Search Dropdown
function loadHostelDropdown() {
  let select = document.getElementById("hostelSelect");
  if (!select) return;

  select.innerHTML = `<option value="">---Select Hostel---</option>`;
  hostels.forEach((h, i) => {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = h.name;
    select.appendChild(option);
  });
}

// Handles selection
function selectHostel(index) {
  if (index === "") return;
  let hostel = hostels[index];

  let cards = document.getElementsByClassName("card");

  if (cards[index]) {
    cards[index].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    cards[index].style.border = "2px solid #2563EB";
    cards[index].style.transform = "scale(1.03)";
  }

  toast(`Viewing ${hostel.name}`);
}

//Book Hostel
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

document.addEventListener("DOMContentLoaded", function () {
  let bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      //Prevent page reload
      e.preventDefault();

      // Get form values
      let name = document.getElementById("userName").value.trim();
      let email = document.getElementById("email").value.trim();
      let phone = document.getElementById("phone").value.trim();
      let checkIn = document.getElementById("checkIn").value;
      let checkOut = document.getElementById("checkOut").value;

      // Validate required fields
      if (!name || !email || !phone || !checkIn || !checkOut) {
        toast("Please fill all fields");
        return;
      }

      let inDate = new Date(checkIn);
      let outDate = new Date(checkOut);
      let today = new Date();
      today.setHours(0, 0, 0, 0);

      if (inDate < today) {
        toast("Check-in cannot be in the past");
        return;
      }

      if (inDate >= outDate) {
        toast("Check-out must be after check-in");
        return;
      }

      let index = localStorage.getItem("selectedHostel");
      let hostel = hostels[index];

      bookings.push({
        hostelName: hostel ? hostel.name : "Unknown Hostel",
        userName: name,
        email,
        phone,
        checkIn,
        checkOut,
      });

      localStorage.setItem("bookings", JSON.stringify(bookings));

      displayBookings();

      toast(`Booked successfully!`);
    });
  }
});

//Display Bookings
function displayBookings() {
  let list = document.getElementById("bookingList");
  if (!list) return;

  list.innerHTML = "";

  if (bookings.length === 0) {
    list.innerHTML = "<p>No bookings yet.</p>";
  }

  bookings.forEach((b, i) => {
    let div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
        <h3>${b.hostelName}</h3>

        <p><strong>Name:</strong> ${b.userName}</p>
        <p><strong>Email:</strong> ${b.email}</p>
        <p><strong>Phone:</strong> ${b.phone}</p>

        <hr>

        <p><strong>Check-in:</strong> ${b.checkIn}</p>
        <p><strong>Check-out:</strong> ${b.checkOut}</p>

        <button onClick="cancel(${i})">cancel Booking</button>

        `;

    list.appendChild(div);
  });
}

//Admin Access Control
// Restricts access to add.html page using simple password system
const isAdmin = localStorage.getItem("isAdmin");

if (document.getElementById("adminHostelList")) {
  if (isAdmin !== "true") {
    let pass = prompt("Enter admin password:");

    if (pass === "admin123") {
      localStorage.setItem("isAdmin", "true");
    } else {
      alert("Access denied");
      window.location.href = "index.html"; //Redirect if password is wrong
    }
  }
}

function logout() {
  localStorage.removeItem("isAdmin");
  window.location.href = "index.html";
}

//Admin: Display Hostels
function displayAdminHostels() {
  let list = document.getElementById("adminHostelList");
  if (!list) return;

  list.innerHTML = "";

  hostels.forEach((h, i) => {
    let div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
           <h3>${h.name}</h3>
           <p><strong>Location:</strong>${h.location}</p>
           <p><strong>Price:</strong>${h.price}</p>
           <p>${h.description}</p>
           <button onClick="deleteHostel(${i})">🗑 Delete</button>
 
        `;
    list.appendChild(div);
  });
}

// Delete Hostel
function deleteHostel(index) {
  if (confirm("Are you sure you want to delete this hostel?")) {
    hostels.splice(index, 1);
    localStorage.setItem("hostels", JSON.stringify(hostels));

    toast("🗑 Hostel removed successfully");

    displayHostels();
    displayAdminHostels();
    updateStats();
  }
}

// preview function
function showPreview(hostel) {
  let preview = document.getElementById("preview");

  if (!preview) return;

  preview.innerHTML = `
      <div class="card">
      <h3>${hostel.name}</h3>
      <p>${hostel.location}</p>
      <p>${hostel.price}</p>
      <p>${hostel.description}</p>
      </div>
    
    `;
}

// Add Hostel Form Functionality
// Handles saving new hostel data
document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("hostelForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let newHostel = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        price: document.getElementById("price").value,
        description: document.getElementById("description").value,
        images: [{ src: "images/default.jpg", label: "New Hostel" }],
      };

      hostels.push(newHostel);
      localStorage.setItem("hostels", JSON.stringify(hostels));

      toast("Hostel added successfully");
      document.getElementById("formMsg").innerText =
        "Hostel added successfully!";

      showPreview(newHostel);

      form.reset();

      displayHostels();
      displayAdminHostels();
      updateStats();

      document.getElementById("adminHostelList").scrollIntoView({
        behavior: "smooth",
      });
    });
  }
});

// Contact from
function sendMessage() {
  let name = document.getElementById("contactName").value.trim();
  let message = document.getElementById("message").value.trim();
  let error = document.getElementById("contactError");

  // Validate contact form fields
  if (!name || !message) {
    error.innerText = " Please fill all fields!";
    error.style.color = "red";
    return;
  }

  error.innerText = "";

  toast("Message sent successfully !");

  // Clear form after successful submission
  document.getElementById("contactName").value = "";
  document.getElementById("message").value = "";
}

//  Update total hostels and bookings count
function updateStats() {
  let hostelCount = document.getElementById("totalHostels");
  let bookingCount = document.getElementById("totalBookings");

  if (hostelCount) hostelCount.innerText = hostels.length;
  if (bookingCount) bookingCount.innerText = bookings.length;
}

// Cancel Booking
function cancel(i) {
  bookings.splice(i, 1);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  displayBookings();
  toast("Booking Cancelled");
}

// Toast notification
// Displays temporary popup messages for user actions
function toast(msg) {
  let t = document.createElement("div");
  t.innerText = msg;

  t.style.position = "fixed";
  t.style.top = "50%";
  t.style.left = "50%";
  t.style.transform = "translate(-50%, -50%) scale(0.8)";
  t.style.background = "#111827";
  t.style.color = "white";
  t.style.padding = "20px 30px";
  t.style.borderRadius = "10px";
  t.style.fontSize = "18px";
  t.style.fontWeight = "bold";
  t.style.zIndex = "1000";
  t.style.opacity = 0;
  t.style.transition = "all 0.3s ease";

  document.body.appendChild(t);

  setTimeout(() => {
    t.style.opacity = "1";
    t.style.transform = "translate(-50%, -50%) scale(1)";
  }, 50);

  setTimeout(() => {
    t.style.opacity = "0";
    setTimeout(() => t.remove(), 300);
  }, 2500);
}

// Intial Function Calls
// Runs all required functions when page loads
displayHostels();
displayBookings();
displayAdminHostels();
updateStats();
loadHostelDropdown();
