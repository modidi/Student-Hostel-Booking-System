//load Data
let hostels = JSON.parse(localStorage.getItem("hostels")) || [

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

},

// Hostel 2
{
   name: "Olive View Hostel",
   location: "Westlands",
   price: 7500,
   description: "Budget friendly Hostel with warm and social vibes.",

   images: [
    { src: "images/h2-1.jpg", label: "Hostel Exterior" },
    { src: "images/h2-2.jpg", label: "Dorm Room Shared" },
    { src: "images/h2-3.jpg", label: "Kitchen Area" },
    { src: "images/h2-4.jpg", label: "Common social space" },
    { src: "images/h2-5.jpg", label: "Hostel Entrance" },

   ]

},

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

}
];


// Bookings
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// Favorites
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Add Hostel Form Functionality 
// Handles saving new hostel data
document.addEventListener("DOMContentLoaded", function() {

    let form = document.getElementById("hostelForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            let newHostel = {
                name: document.getElementById("name").value,
                location: document.getElementById("location").value,
                price: document.getElementById("price").value,
                description: document.getElementById("description").value,
                images: [
                    { src: "images/default.jpg", label: "New Hostel"}
                ]
            };
            
            hostels.push(newHostel);
            localStorage.setItem("hostels", JSON.stringify(hostels));

            toast("Hostel added successfully")
            document.getElementById("formMsg").innerText = "Hostel added successfully!"

            showPreview(newHostel);

            form.reset ();

            displayHostels();
            displayAdminHostels();
            updateStats();

            document.getElementById("adminHostelList").scrollIntoView({
                behavior: "smooth"
            });
        });
    }
});

// preview function
function showPreview(hostel) {
    let preview = document.getElementById("preview");

    if(!preview) return;

    preview.innerHTML = `
      <div class="card">
      <h3>${hostel.name}</h3>
      <p>${hostel.location}</p>
      <p>${hostel.price}</p>
      <p>${hostel.description}</p>
      </div>
    
    `;
}


// Image Modal
function openModal(src, label) {
    document.getElementById("imageModal").style.display = "flex";
    document.getElementById("modalImg").src = src;
    document.getElementById("modalLabel").innerText = label;

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

        <button onClick="book(${i})">Book</button>
        <button onClick="addFavorite(${i})">❤️ Favorite</button>
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
                    openModal(currentImg.src, currentImg.label);
                };

                currentIndex = (currentIndex + 1) % h.images.length;

            }


        }
        updateSlide();
        setInterval(updateSlide, 5000);
        
    });
}

//Admin: Display Hostels
function displayAdminHostels() {

    let list = document.getElementById("adminHostelList");
    if (!list) return;

    list.innerHTML = "";

    hostels.forEach((h, i) => {

        let div = document.createElement("div");
        div.classList.add("card")

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
    
    //Search
 function searchHostels() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.getElementsByClassName("card");

    for (let card of cards) {
        card.style.display = 
            card.innerText.toLowerCase().includes(input)
             ? "block"
             :"none"
        }

    }

    //Book Hostel
 function book(i) {
    
    let checkIn = prompt("Enter Check-in Date (YYYY-MM-DD)");
    let checkOut = prompt("Enter Check-out Date (YYYY-MM-DD)");

    bookings.push({
        ...hostels[i],
        checkIn,
        checkOut
    })

    localStorage.setItem("bookings", JSON.stringify(bookings));

    toast("Booking Confirmed!");

}

// favorites
function addFavorite(i){
    favorites.push(hostels[i]);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    toast("Added to favorites");
}

    //Display Bookings
 function displayBookings() {

    let list = document.getElementById("bookingList");
    if (!list) return;

    list.innerHTML = "";

    bookings.forEach((b, i) =>{
        let div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
        <h3>${b.name}</h3>
        <p>Ksh ${b.price}</p>
        <p><strong>Check-in:</strong> ${b.checkIn}</p>
        <p><strong>Check-out:</strong> ${b.checkOut}</p>
        <button onClick="cancel(${i})">cancel</button>

        `;

        list.appendChild(div);

    })

 }

//  Update Stats
function updateStats() {
    let hostelCount = document.getElementById("totalHostels");
    let bookingCount = document.getElementById("totalBookings");

    if (hostelCount) hostelCount.innerText = hostels.length;
    if (bookingCount) bookingCount.innerText = bookings.length;
}

 // Cancel Booking
 function cancel (i) {
    bookings.splice(i, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    displayBookings();
    toast("Booking Cancelled");

 }

 // Contact from
 function sendMessage(){
    let name = document.getElementById("contactName").value.trim();
    let message = document.getElementById("message").value.trim();
    let error = document.getElementById("contactError");

    if (! name || !message) {
        error.innerText = " Please fill all fields!";
        error.style.color = "red"
        return;
    }

    error.innerText = "";

    toast("Message sent successfully !")

    document.getElementById("contactName").value = "";
    document.getElementById("message").value = "";

    
 }

//  Price Filter
function filterPrice(max) {
    document.getElementById("priceValue").innerText = max;
    
    let cards = document.getElementsByClassName("card");

    hostels.forEach((h, i) => {
        if (cards[i]) {
            cards[i].style.display = (h.price <= max) ? "block" : "none";

        }
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

// toast notification
function toast(msg) {
    let t = document.createElement("div");
    t.innerText = msg;

    t.style.position = "fixed";
    t.style.bottom = "20px";
    t.style.right = "20px";
    t.style.background = "#111827";
    t.style.color = "white";
    t.style.padding = "10px";
    t.style.borderRadius = "6px";

    document.body.appendChild(t);

    setTimeout(() => t.remove(), 2000);
}

  displayHostels();
  displayBookings();
  displayAdminHostels()
  updateStats();


