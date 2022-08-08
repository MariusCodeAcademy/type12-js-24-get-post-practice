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
