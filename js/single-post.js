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

deleteBtnEl.addEventListener('click', async () => {
  if (confirm('Ar tikrai nori istrinti?')) {
    console.log('delete', currentId);
    const resp = await deleteSinglePost(currentId);
    if (resp.ok) {
      console.log('istrinta sekmingai');
      window.location.href = 'index.html';
    }
  } else {
    console.log('apsigalvojai');
  }
});

async function deleteSinglePost(id) {
  const resp = await fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      archived: true,
    }),
  });
  console.log('resp ===', resp);
  return resp;
}
