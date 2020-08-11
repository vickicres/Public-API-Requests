const body = document.querySelector('body');
const gallery = document.getElementById('gallery');
const card = document.querySelectorAll('.card');
const search = document.querySelector('.search-container');


/***
** ---------------
   Fetch API
** ---------------
***/

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Uh oh, something has gone wrong.', error))
}


fetchData('https://randomuser.me/api/?results=12&nat=us')
    .then(data => {
        generateProfiles(data.results);
        searchBar();
//        generateModal(data.results);

    });



/***
** ---------------
   Helper functions
** ---------------
***/

function checkStatus(response) {
    // checks the response from the promise
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

    //close all modal elements when the modal close button was click
function buttonX() {
    const closeModal = document.querySelector('.modal-container');
    closeModal.remove();
}



/*** 
** -----------------
   Create Gallery
** -----------------
***/

function generateProfiles(data) {
    const empolyeeLists = data.map(user =>
        `<div class="card">
            <div class="card-img-container">
            <img class="card-img" src="${user.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>`).join('');
    gallery.innerHTML = empolyeeLists;
}


/*** 
** ----------------
  Create Modal HTML
** ----------------
***/

function generateModal(data, i) {
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal-container';
    
    const date = new Date (user[i].dob.date); // create and formate the birthday date 
    const day = date.getDate (); // get the day
    const month = date.getMonth () + 1; // get the month
    const year = date.getFullYear (); // get the year
    const dob = `${month}/${day}/${year}`;
    body.insertBefore(modalDiv, script);
    modalDiv.innerHTML =
        `<div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                        <p class="modal-text">${data[i].email}</p>
                        <p class="modal-text cap">${data[i].location.city}</p>
                        <hr>
                        <p class="modal-text">${data[i].phone}</p>
                        <p class="modal-text">${data[i].location.street.number} ${data[i].location.street.name},</br>${data[i].location.city}, ${data[i].location.state} ${data[i].location.postcode}</p>
                        <p class="modal-text">Birthday: ${dob}</p>
                    </div>
                </div>`

    body.appendChild(modalDiv);
    
//    click next or prev to view different empolyee info
// let i = dataResults.indexOf(data);
//    const prevModal = document.querySelector('#modal-prev');
//    const nextModal = document.querySelector('#modal-next');
//
//    prevModal.addEventListener('click', e => {
//       if (dataResults[ i + 1 ]) {
//           generateModal(dataResults[ i + 1 ], dataResults);
//       }else {
//           generateModal(dataResults[0], dataResults);
//       }
//    });
//
//    nextModal.addEventListener('click', e => {
//        if (dataResults[ i - 1 ]) {
//           generateModal(dataResults[ i - 1 ], dataResults);
//       }else {
//           generateModal(dataResults.length - 1, dataResults);
//       }
//    });
//    


}



/***
** ----------------------
   Create Search function
** ----------------------
***/

function searchBar() {
    search.innerHTML =
        `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
      </form>
    `
};

/***
** ---------------
   Event Listeners
** ---------------
***/
//search.addEventListener('keyup', () => {
//
//});

//function createModal (index) {
//    for (let i = 0; i < card.length; i += 1) {
//        card[i].addEventListener ('click', () => {
//            generateModal (dataResults[i], dataResults);
//        });
//    }
//}