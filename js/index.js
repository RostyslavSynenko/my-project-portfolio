'use strict';

document.querySelector('.show-github-info')
  .addEventListener('click', fetchGet);

function fetchGet() {
  fetch('my-data.json')
    
    .then(response => {
      const user = response.json();
      
      return user;
    })
  
    .then(user => {
      return fetch(`https://api.github.com/users/${user.name}`);
    })
    
    .then(response => {
        const githubUser = response.json();
        
        return githubUser;
    })

    .then(githubUser => {
      createCover(githubUser);
  
      setTimeout(() => {
          document.body.removeChild(document.querySelector('.cover-div')); 
      }, 3000);
    })
    .catch(error => {
        console.log('ERROR', error);
    });
}

function createCover(user) {
  const coverDiv = document.createElement('div');
  coverDiv.className = 'cover-div';
  
  const img = document.createElement('img');
  img.src = user.avatar_url;
  img.alt = 'GitHub avatar';
  img.style = 'height: 85%; margin: 5px;';
  coverDiv.appendChild(img);

  const parag = document.createElement('p');

  parag.innerHTML = `<b>Name:</b> ${user.name}<br>` + 
    `<b>Created:</b> ${new Date(user.created_at).toLocaleDateString()}<br>` +
    `<b>Location:</b> ${user.location}<br>` + 
    `<b>Public repositories:</b> ${user.public_repos}<br>` +
    `<b>Link:</b> <a href='${user.html_url}'>GitHub</a>`;
  coverDiv.appendChild(parag);

  document.body.appendChild(coverDiv);
}


const clock = document.createElement('div');
clock.className = 'clock';
document.querySelector('header').appendChild(clock);
setInterval( () => clock.innerText = (new Date().toLocaleTimeString()), 1000);
