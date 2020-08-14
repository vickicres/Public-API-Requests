const body = document.querySelector('body');
const gallery = document.getElementById('gallery');
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
        changeBG();
        changeText();
        generateProfiles(data.results);
        createSearch();
        createModalEvents(data.results);
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


function styleCard() {
    document.querySelectorAll('.card').style.background = 'rgb(255, 255, 255, 0.9)';
}

/*** 
** ----------------
  Create Modal HTML
** ----------------
***/

const containerDiv = document.createElement('div');

function generateModal(data, index) {

    //formatted the birthday date
    const dob = new Date(data[index].dob.date);

    let html = `
             <div class="modal-container">
            <div class="modal">
                <button onclick="closeModel()" type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=${data[index].picture.large} alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data[index].name.first} ${data[index].name.last}</h3>
                    <p class="modal-text">${data[index].email}</p>
                    <p class="modal-text cap">${data[index].location.city}</p>
                    <hr>
                    <p class="modal-text">${data[index].phone}</p>
                    <p class="modal-text">${data[index].location.street.number} ${data[index].location.street.name}, ${data[index].location.city}, ${data[index].location.state} ${data[index].location.postcode}</p>
                    <p class="modal-text">Birthday ${dob.toLocaleDateString()}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>`
    containerDiv.innerHTML = html;
    nextPrevBtn(data, index);
    return containerDiv;
}

/*** 
** ----------------
  Create next and prev button when the button was clicked
** ----------------
***/

function nextPrevBtn(data, index) {
    const prevBtn = containerDiv.querySelector('.modal-prev');
    const nextBtn = containerDiv.querySelector('.modal-next');


    prevBtn.addEventListener('click', (e) => {
        generateModal(data, index - 1)

    });

    nextBtn.addEventListener('click', (e) => {
        generateModal(data, index + 1)
    });

}

/*** 
** ----------------
  Add event listener when the card was clicked
** ----------------
***/

function createModalEvents(data) {
    const card = document.querySelectorAll('.card');
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener('click', () => {
            body.appendChild(generateModal(data, i));
        });
    }
}

/*** 
** ----------------
  Closed modal button
** ----------------
***/

function closeModel() {
    const modalWindow = document.querySelector('.modal-container');
    modalWindow.remove();
}

/***
** ----------------------
   Create Search function
** ----------------------
***/

function createSearch() {
    const searchField =
        `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
      </form>
    `
    search.innerHTML = searchField;

    // add event listener to search input
    const searchInput = document.querySelector('#search-input');
    searchInput.addEventListener('keyup', (e) => {
        const searchResult = searchInput.value.toLowerCase();
        filterNames(searchResult);

    });

    // add event listener to search  submit
    const submit = document.querySelector('#search-submit');
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        filterNames();

    });
    
}

/***
** ---------------
   Event Listeners
** ---------------
***/


// create a function to search by name
function filterNames(input) {
    const results = [];
    const empolyeeCard = document.querySelectorAll('.card');

    //using for loop to loop though the random empolyee cards to find the match one
    for (let i = 0; i < empolyeeCard.length; i += 1) {
        const name = empolyeeCard[i].querySelector('h3').textContent.toLowerCase();
        if (name.includes(input)) {
            empolyeeCard[i].style.display = '';

        } else {
            empolyeeCard[i].style.display = 'none';

        }
    }

    //     create error message when is no search result found 
        /** ** conflict with regular search ** */

    let noFound = false;
    if (results.length !== '') {
        if(!noFound) {
        gallery.innerHTML = '<h2 class="no-result">No Match Found</h2>';
        const showResults = document.querySelector('.no-result');
        showResults.style.color = '#E25A53';  
        noFound = true;
        }
   
    } 

   
}
 
/***
** ---------------------------------------
   change background color and text color
** ---------------------------------------
***/

function changeBG() {
    document.body.style.background = 'rgba(173, 220, 202)';
}

function changeText() {
    document.querySelector('h1').style.color = 'darkblue';

}


//click anywhere outside of the container to close modal
window.addEventListener('click', (e) => {
    const modalWindow = document.querySelector('.modal-container');

    if (e.target == modalWindow) {
        modalWindow.remove();
    }
});