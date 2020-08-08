/*** 
** ----------------
  Create Modal
** ----------------
***/
const pageBody = document.querySelector('body');

function modal(data) {
    const empolyeeLists =
        `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">name</h3>
                        <p class="modal-text">email</p>
                        <p class="modal-text cap">city</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div>

           <div class="modal-btn-container">
              <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
              <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
    `
}







/*** 
** -----------------
   Create Gallery
** -----------------
***/
const gallery = document.getElementById('gallery');

function generateProfiles(data) {
    const users = data.map(item =>
        `<div class="card">
            <div class="card-img-container">
            <img class="card-img" src="${item.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
            <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
            <p class="card-text">${item.email}</p>
            <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
            </div>
        </div>
     `).join('');
    gallery.innerHTML = users;
}


/***
** ----------------
   Create Search
** ----------------
***/

const search = document.querySelector('.search-container');

function searchBar() {
    const searchForm =
        `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
      </form>
    `
    search.innerHTML = searchForm;
}



/***
** ---------------
   Fetch Function
** ---------------
***/

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Uh oh, something has gone wrong.', error))
}

Promise.all([
    fetchData('https://randomuser.me/api/?results=12')
])
    .then(data => {
        const profileLists = data[0].results;
        generateProfiles(profileLists);
    })






/***
** ---------------
   Helper functions
** ---------------
***/

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}






/***
** ---------------
   Event Listeners
** ---------------
***/
