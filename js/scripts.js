const pageBody = document.querySelector('body');
const gallery = document.getElementById('gallery');
const search = document.querySelector('.search-container');


/***
** ---------------
   Fetch API
** ---------------
***/

function fetchData(url) {
    return fetch(url)
   .then(res => res.json())
   .then(data => data.results)
   .catch(error => console.log('Uh oh, something has gone wrong.', error))
}

Promise.all ([
    fetchData('https://randomuser.me/api/?results=12&nat=us,gb')
])
 .then(data => {
    const userList = data[0].results;
    generateProfiles(userList);
    userProfiles(userList);
    searchBar();
})

  


/*** 
** ----------------
  Create Modal HTML
** ----------------
***/

function generateModal(data) {
//    const originalDateOfBirth = new Date(data.dob.date);
//    //reformatted birth date
//    const formattedDateOfBirth = originalDateOfBirth.toLocaleDateString(); 
    const html =
        `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${data.picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                        <p class="modal-text">${data.email}</p>
                        <p class="modal-text cap">${data.location.city}</p>
                        <hr>
                        <p class="modal-text">${data.phone}</p>
                        <p class="modal-text">${data.location.street.number} ${data.location.street.name},</br>${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
                        <p class="modal-text">Birthday: ${formattedDateOfBirth}</p>
                    </div>
                </div>
            </div>`
    const divContainer = document.createElement('div');
    divContainer.innerHTML = empolyeeLists;
}


//close all modal elements when the modal close button was click
const buttonX = () => {
    const closeModal = document.getElementById('modal-close-btn');
    closeModal.remove();
}



//click next or prev to view different empolyee info
function nextPrevButton ()  {
    const prevProfile = document.querySelector('#modal-prev');
    const nextProfile = document.querySelector('#modal-next');

    prevProfile.addEventListener('click', e => {
        generateModal(data, i -1)
    });

    nextProfile.addEventListener('click', e => {
        generateModal(data, i +1)
    });
}

/*** 
** -----------------
   Create Gallery
** -----------------
***/
function userProfiles(data) {
    const card = document.querySelectorAll('.card');
    
    for(let i = 0; i < card.length; i += 1) {
        card[i].addEventListener('click', () => {
            console.log(data, 'data');
            pageBody.appendChild(generateModal(data, i));
        });
    }
}


function generateProfiles(data) {
    const cards = data.map(user =>
        `<div class="card">
            <div class="card-img-container">
            <img class="card-img" src="${user.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>
     `).join('');
    gallery.innerHTML = users;
}


/***
** ----------------
   Create Search function
** ----------------
***/

//function searchBar() {
//    const searchForm =
//        `<form action="#" method="get">
//        <input type="search" id="search-input" class="search-input" placeholder="Search...">
//        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
//      </form>
//    `
//    search.innerHTML = searchForm;
//}



/***
** ---------------
   Event Listeners
** ---------------
***/
search.addEventListener('keyup', ()=> {
    
});