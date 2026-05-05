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
        <button onClick="addFavorite(${i})"> Favorite</button>
        `;

        list.appendChild(div);

        //Slideshow logic

        let index = 0;

        setInterval(() => {
            let img = document.getElementById(`img-${i}`);
            let label = document.getElementById(`label-${i}`);

            if (img && label) {
                img.src = h.images[index].src;
                label.innerText = h.images[index].label;

                img.onclick = () => {
                    openModal(h.images[index].src, h.images[index].label);
                };

                index = (index + 1) % h.images.length;

            }


        }, 3000);

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
function addFavorites(i){
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

 // Cancel Booking

 function cancel (i) {
    bookings.splice(i, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    displayBookings();
    toast("Booking Cancelled");

 }

 // Contact from
 function sendMessage(){
    let name = document.getElementById("contactName").value;
    let message = document.getElementById("message").value;

    if (! name || !message) {
        document.getElementById("contactError").innerText = "Fill all fields!";
        return;
    }

    toast("Message sent!")
    
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


