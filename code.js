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
    bookings.push(hostels[i]);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    alert("Booked Successfully!");

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

 }

 // Contact from
 function sendMessage(){
    let name = document.getElementById("contactName").value;
    let message = document.getElementById("message").value;

    if (! name || !message) {
        document.getElementById("contactError").innerText = "Fill all fields!";
        return;
    }

    alert("Message sent!")
    
 }

  displayHostels();
  displayBookings();


