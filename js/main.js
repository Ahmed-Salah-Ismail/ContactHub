var nameInput = document.getElementById("contactName");
var phoneInput = document.getElementById("contactPhone");
var emailInput = document.getElementById("contactEmail");
var groupInput = document.getElementById("contactGroup");
var noteInput = document.getElementById("contactNotes");
var addressInput = document.getElementById("contactAddress");
var favInput = document.getElementById("contactFav");
var emgInput = document.getElementById("contactEmg");
var imageInput = document.getElementById("imageInput");
var searchInput = document.getElementById("searchInput");
var totalElement = document.getElementById("total");

var contactList = [];
var favList = [];
var emgList = [];

var index = 0;

function addContact() {
  var newContact = {
    name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    group: groupInput.value,
    notes: noteInput.value,
    address: addressInput.value,
    note: noteInput.value,
    fav: favInput.checked,
    emg: emgInput.checked,
    image:
      imageInput.files && imageInput.files[0]
        ? `./images/${imageInput.files[0].name}`
        : null,
  };
  contactList.push(newContact);
  console.log(contactList);
  clearForm();
  localStorage.setItem("contactList", JSON.stringify(contactList));
  showContacts();
}

function clearForm() {
  nameInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
  addressInput.value = "";
  groupInput.value = "";
  noteInput.value = "";
  favInput.checked = false;
  emgInput.checked = false;
}

function showContacts() {
  contactList = JSON.parse(localStorage.getItem("contactList")) || [];
  var box = "";

  for (var i = 0; i < contactList.length; i++) {
    var initials = contactList[i].name
      ? contactList[i].name.slice(0, 2).toUpperCase()
      : "AS";
    index = i;

    box += `
       <div class="contant-card">
              <div class="item-start">
                <div class="top-card">
                ${
                  contactList[i].image
                    ? `<div class="char image-avatar">
                       <img src="${contactList[i].image}" alt="${contactList[i].name}" style="width: 100%; height: 100%; border-radius: inherit; object-fit: cover; background-color: #ffffff;">
                      </div>`
                    : `<div class="char">
                        <h2>${initials}</h2>
                         </div>`
                }
                  
                  <div class="absolute">
                    <div class="icon-top">
                      <i class="fa-solid fa-star"></i>
                    </div>
                  </div>
                  <div class="absolute-2">
                    <div class="icon-bottom">
                      <i class="fa-solid fa-heart-pulse"></i>
                    </div>
                  </div>
                </div>

                <div class="flex-1">
                  <h2>${contactList[i].name}</h2>
                  <div class="flex-item">
                    <div class="icon"><i class="fa-solid fa-phone"></i></div>
                    <p>${contactList[i].phone}</p>
                  </div>
                </div>
              </div>

              <div class="contact-details">
                <div class="details-1">
                  <div class="icon-email">
                    <i class="fa-solid fa-envelope"></i>
                  </div>
                  <p>${contactList[i].email}</p>
                </div>

                <div class="details-1 details-2">
                  <div class="icon-email">
                    <i class="fa-solid fa-location-dot"></i>
                  </div>
                  <p>${contactList[i].address}</p>
                </div>
              </div>

                 <div class="end-card">
                      ${contactList[i].group ? `<span><h2>${contactList[i].group}</h2></span>` : ""}
                </div>
              <div class="footer">
                <div class="right-icons">
                  <div class="icon-email">
                    <a
                      href="mailto:${contactList[i].email || ""}"
                      class="action-btn email-btn"
                    >
                      <i class="fa-solid fa-envelope"></i>
                    </a>
                  </div>
                  <div class="icon-phone">
                    <div class="icon">
                      <a href="tel:${contactList[i].phone || ""}" class="action-btn call-btn">
                        <i class="fa-solid fa-phone"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="left-icon">
                  <div class="icon fav ${contactList[i].fav ? "active" : ""}" onclick="toggleFav(${i})">
                    <i class="${contactList[i].fav ? "fa-solid active" : "fa-regular"} fa-star"></i>
                  </div>
                  <div class="icon emg ${contactList[i].emg ? "active" : ""}" onclick="toggleEmg(${i})">
                    <i class="${contactList[i].emg ? "fa-solid active" : "fa-regular"} fa-heart-pulse"></i>
                  </div>
                  <div class="icon ed " data-bs-toggle="modal" data-bs-target="#contactModal" onclick="updateContact(${i})">
                    <i class="fa-solid fa-pen "></i>
                  </div>
                  <div class="icon delet">
                    <i class="fa-solid fa-trash" onclick="deleteContact(${i})"></i>
                  </div>
                </div>
              </div>
            </div>
    `;
  }

  var container = document.getElementById("group-contant");
  if (container) {
    container.innerHTML = box;
  }
  console.log(index);
  favPhone();
  emgPhone();
  updateTotal();
  updateFavTotal();
  updateEmgTotal();
}

function toggleFav(index) {
  contactList[index].fav = !contactList[index].fav;
  localStorage.setItem("contactList", JSON.stringify(contactList));
  showContacts();
}

function toggleEmg(index) {
  contactList[index].emg = !contactList[index].emg;
  localStorage.setItem("contactList", JSON.stringify(contactList));
  showContacts();
}

showContacts();

function deleteContact(index) {
  contactList.splice(index, 1);
  localStorage.setItem("contactList", JSON.stringify(contactList));
  showContacts();
}

var currentIndex = 0;

function updateContact(index) {
  currentIndex = index;
  var contact = contactList[currentIndex];
  nameInput.value = contact.name;
  phoneInput.value = contact.phone;
  addressInput.value = contact.address;
  emailInput.value = contact.email;
  groupInput.value = contact.group;
  imageInput.files = contact.image;
  noteInput.value = contact.note || "";
  favInput.checked = contact.fav || false;
  emgInput.checked = contact.emg || false;
  document.getElementById("modalTitle").innerText = "Update Contact";
  document.getElementById("UpdateContactBtn").style.display = "inline-block";
  document.getElementById("saveContactBtn").style.display = "none";
}

function realUpdateContact() {
  var newContact = {
    name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    group: groupInput.value,
    notes: noteInput.value,
    address: addressInput.value,
    image:
      imageInput.files && imageInput.files[0]
        ? `./images/${imageInput.files[0].name}`
        : null,
    note: noteInput.value,
    fav: favInput.checked,
    emg: emgInput.checked,
  };
  contactList.splice(currentIndex, 1, newContact);
  document.getElementById("UpdateContactBtn").style.display = "none";
  document.getElementById("saveContactBtn").style.display = "inline-block";
  document.getElementById("modalTitle").innerText = "Add New Contact";
  localStorage.setItem("contactList", JSON.stringify(contactList));
  showContacts();
  clearForm();
}

function favPhone() {
  var boxFav = "";

  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].fav) {
      var initials = contactList[i].name
        ? contactList[i].name.slice(0, 2).toUpperCase()
        : "AS";

      boxFav += `
        <div class="side-item">
          <div class="avatar-box yellow-avatar">${initials}</div>
          <div class="item-info">
            <h4>${contactList[i].name}</h4>
            <p>${contactList[i].phone}</p>
          </div>
          <a href="tel:${contactList[i].phone || ""}" class="side-call-btn fav-call-btn">
            <i class="fa-solid fa-phone"></i>
          </a>
        </div>
      `;
    }
  }
  var container = document.getElementById("favoritesList");
  if (container) {
    container.innerHTML = boxFav;
  }
}

function emgPhone() {
  var boxEmg = "";

  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].emg) {
      var initials = contactList[i].name
        ? contactList[i].name.slice(0, 2).toUpperCase()
        : "AS";

      boxEmg += `<div class="side-item">
              <div class="avatar-box rose-avatar">${initials}</div>
              <div class="item-info">
                <h4>${contactList[i].name}</h4>
                <p>${contactList[i].phone}</p>
              </div>
              <a href="tel:${contactList[i].phone || ""}" class="side-call-btn emg-call-btn">
                <i class="fa-solid fa-phone"></i>
              </a>
            </div>`;
    }
  }
  var container = document.getElementById("emergencyList");
  if (container) {
    container.innerHTML = boxEmg;
  }
}

function serach() {
  var box = "";
  var searchValuue = searchInput.value;

  for (var i = 0; i < contactList.length; i++) {
    if (
      contactList[i].name.toLowerCase().includes(searchValuue.toLowerCase()) ||
      contactList[i].phone.toLowerCase().includes(searchValuue) ||
      contactList[i].email.toLowerCase().includes(searchValuue)
    ) {
      var initials = contactList[i].name
        ? contactList[i].name.slice(0, 2).toUpperCase()
        : "AS";
      box += `
       <div class="contant-card">
              <div class="item-start">
                <div class="top-card">
                  <div class="char">
                    <h2>${initials}</h2>
                  </div>
                  <div class="absolute">
                    <div class="icon-top">
                      <i class="fa-solid fa-star"></i>
                    </div>
                  </div>
                  <div class="absolute-2">
                    <div class="icon-bottom">
                      <i class="fa-solid fa-heart-pulse"></i>
                    </div>
                  </div>
                </div>

                <div class="flex-1">
                  <h2>${contactList[i].name}</h2>
                  <div class="flex-item">
                    <div class="icon"><i class="fa-solid fa-phone"></i></div>
                    <p>${contactList[i].phone}</p>
                  </div>
                </div>
              </div>

              <div class="contact-details">
                <div class="details-1">
                  <div class="icon-email">
                    <i class="fa-solid fa-envelope"></i>
                  </div>
                  <p>${contactList[i].email}</p>
                </div>

                <div class="details-1 details-2">
                  <div class="icon-email">
                    <i class="fa-solid fa-location-dot"></i>
                  </div>
                  <p>${contactList[i].address}</p>
                </div>
              </div>

                 <div class="end-card">
                      ${contactList[i].group ? `<span><h2>${contactList[i].group}</h2></span>` : ""}
                </div>
              <div class="footer">
                <div class="right-icons">
                  <div class="icon-email">
                    <a
                      href="mailto:${contactList[i].email || ""}"
                      class="action-btn email-btn"
                    >
                      <i class="fa-solid fa-envelope"></i>
                    </a>
                  </div>
                  <div class="icon-phone">
                    <div class="icon">
                      <a href="tel:${contactList[i].phone || ""}" class="action-btn call-btn">
                        <i class="fa-solid fa-phone"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="left-icon">
                  <div class="icon fav ${contactList[i].fav ? "active" : ""}" onclick="toggleFav(${i})">
                    <i class="${contactList[i].fav ? "fa-solid active" : "fa-regular"} fa-star"></i>
                  </div>
                  <div class="icon emg ${contactList[i].emg ? "active" : ""}" onclick="toggleEmg(${i})">
                    <i class="${contactList[i].emg ? "fa-solid active" : "fa-regular"} fa-heart-pulse"></i>
                  </div>
                  <div class="icon ed " data-bs-toggle="modal" data-bs-target="#contactModal" onclick="updateContact(${i})">
                    <i class="fa-solid fa-pen "></i>
                  </div>
                  <div class="icon delet">
                    <i class="fa-solid fa-trash" onclick="deleteContact(${i})"></i>
                  </div>
                </div>
              </div>
            </div>
    `;
    }
  }
  document.getElementById("group-contant").innerHTML = box;
}

function updateTotal() {
  var totalElement = document.getElementById("totalElement");
  var totalCount = contactList.length;
  if (totalElement) {
    totalElement.innerText = totalCount;
  }
}

function updateFavTotal() {
  var totalElementFav = document.getElementById("totalFav");
  var numFav = 0;
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].fav) {
      numFav++;
    }
  }
  if (totalElementFav) {
    totalElementFav.innerText = numFav;
  }
}

function updateEmgTotal() {
  var totalElementEmg = document.getElementById("totalEmg");
  var numEmg = 0;
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].emg) {
      numEmg++;
    }
  }
  if (totalElementEmg) {
    totalElementEmg.innerText = numEmg;
  }
}
