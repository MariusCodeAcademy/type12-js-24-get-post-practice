'use strict';
console.log('main.js');

// Taikomes

// Eiga
async function init() {
  const postsArr = await getPostsFromApi(baseUrl);
  makePostsList(postsArr);
}
init();

// Addeventlistenes

// Funcitons

async function getPostsFromApi(url) {
  const resp = await fetch(url);
  const dataBack = await resp.json();
  const posts = dataBack.posts;
  console.log('posts ===', posts);
  return posts;
}

function makePostsList(arr) {
  // generate one post in a loop
}

function makeOnePostHtml(postObj) {
  const divEl = document.createElement('div');
  divEl.className = 'post';
  divEl.innerHTML = `
  <ul class="post-tags">
    <li>red</li>
    <li>green</li>
  </ul>
  <p class="post__reactions"><span>${postObj.reactions}</span> reactions</p>
  <h3>${postObj.title}</h3>
  <p class="post__text">${postObj.body.slice(0, 15)}...</p>
  <a class="post__link" href="single-post.html">Read more > </a>
  `;
  return divEl;
}
