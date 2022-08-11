'use strict';
console.log('single-post.js');

const currentId = new URLSearchParams(window.location.search).get('postId');
console.log('currentId ===', currentId);

// Taikomes
const mainTitleEl = document.querySelector('.main-title');
const postReactionsEl = document.querySelector('.post__reactions span');
const postTextEl = document.querySelector('.post__text');
const postTagsEl = document.querySelector('.post-tags');
const imageEl = document.getElementById('image');
const deleteBtnEl = document.getElementById('delete');

async function init() {
  const postData = await getPostData(`${baseUrl}/${currentId}`);
  fillSinglePostHtml(postData);
}
init();

async function getPostData(url) {
  const resp = await fetch(url);
  const dataBack = await resp.json();
  const singlePostData = dataBack;
  console.log('singlePostData ===', singlePostData);
  return singlePostData;
}

function fillSinglePostHtml(postDataObj) {
  mainTitleEl.textContent = postDataObj.title;
  postReactionsEl.textContent = postDataObj.reactions;
  postTextEl.textContent = postDataObj.body;
  imageEl.src = postDataObj.image;
  imageEl.className = 'hero-img';
  imageEl.alt = postDataObj.title;
  postTagsEl.innerHTML = '';
  postDataObj.tags.forEach((tag) => postTagsEl.insertAdjacentHTML('afterbegin', `<li>${tag}</li>`));
}

// deleteBtnEl paspaudus mes siunciam PATCH uzklausa ir padarom archived = true,
// jei sekmingai, naviguojam i main page
