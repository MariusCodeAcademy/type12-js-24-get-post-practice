'use strict';
console.log('main.js');

// Taikomes

// Eiga
function init() {
  getPostsFromApi(baseUrl);
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
