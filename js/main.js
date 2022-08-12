'use strict';

import { http, baseUrl } from './modules/helper.js';
import initHeader from './modules/init-header.js';

console.log('main.js');

// Taikomes
const postsContainerEl = document.querySelector('.posts-container');

// Eiga

const postsArr = await http(baseUrl + '?archived=false');
await makePostsList(postsArr);
setTimeout(checkPostCreateStatus, 500);

// Addeventlistenes

// Funcitons

async function makePostsList(arr) {
  return new Promise((resolve, reject) => {
    postsContainerEl.innerHTML = '';
    // generate one post in a loop
    const htmlElArr = arr.map((pObj) => makeOnePostHtml(pObj));
    postsContainerEl.append(...htmlElArr);
    resolve();
    // spread operator
    // ...[1, 2, 4] => 1, 2 ,3
  });
}

function makeOnePostHtml(postObj) {
  const divEl = document.createElement('div');
  divEl.className = 'post';
  divEl.innerHTML = `
  <ul class="post-tags">
  ${makeTagsHtml(postObj.tags)}  
  </ul>
  <img src="${postObj.image}" alt="paveikslelis" /> 
  <p class="post__reactions"><span>${postObj.reactions}</span> reactions</p>
  <h3>${postObj.title}</h3>
  <p class="post__text">${postObj.body.slice(0, 15)}...</p>
  <a class="post__link" href="single-post.html?postId=${postObj.id}">Read more > </a>
  `;
  return divEl;
}

function makeTagsHtml(arr) {
  return arr.map((tag) => `<li>${tag}</li>`).join('');
}

function checkPostCreateStatus() {
  const postCreated = new URLSearchParams(window.location.search).get('postCreated');
  console.log('postCreated ===', postCreated);
  if (postCreated !== null) {
    alert('post created successfully');
  }
}
