'use strict';

import { DInput, makeAllInputElements } from './modules/dynamicInputs.js';
import { baseUrl, commentsUrl, http } from './modules/helper.js';
import initHeader from './modules/init-header.js';

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
const editLinkEl = document.getElementById('editLink');
const commentsFormEl = document.forms.addComment;
const commCont = document.querySelector('.comments-container');

// query param for edit link
editLinkEl.href += '?postId=' + currentId;

async function init() {
  const postData = await http(`${baseUrl}/${currentId}`);
  fillSinglePostHtml(postData);
}
init();

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

// Comments form

const commentInputs = [
  new DInput({ pl: 'Your name', name: 'author', required: true }),
  new DInput({
    name: 'date',
    disabled: true,
    type: 'date',
    value: new Date().toLocaleString('lt-LT', { dateStyle: 'medium' }),
  }),
  new DInput({ type: 'textarea', pl: 'Your comment', name: 'text', required: true }),
  new DInput({ type: 'submit', value: 'Add comment' }),
];

const inputShortcuts = makeAllInputElements(commentsFormEl, commentInputs);
console.log('inputShortcuts ===', inputShortcuts);

commentsFormEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('Lifes goood');
  // surinkti visus inputus ir pagaminti objekta
  const newCommentObj = {
    text: inputShortcuts.text.value,
    date: inputShortcuts.date.value,
    author: inputShortcuts.author.value,
    postId: +currentId,
  };
  console.log('newCommentObj ===', newCommentObj);
  const resp = await sendNewPostRequest(newCommentObj);
  if (resp.status === 201) {
    commentsFormEl.reset();
    loadComments(+currentId);
  } else {
    console.warn(resp.status);
  }
});

async function sendNewPostRequest(newPost) {
  const resp = await fetch(commentsUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(newPost),
  });
  console.log('resp ===', resp);
  return resp;
}
loadComments(+currentId);
async function loadComments(postId) {
  // atvaizduoti visus komentarus

  // gauti komentarus
  const commentsArr = await http(`${commentsUrl}?postId=${postId}`);
  console.log('commentsArr ===', commentsArr);
  makeCommentsHtml(commentsArr);
}

/***
 * <div class="comment card">
    <h3>author</h3>
    <p>date</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, non.</p>
  </div>
 * 
  */
function makeCommentsHtml(commentArr) {
  commCont.innerHTML = '<h2>Our comments</h2>';
  commentArr.forEach((commObj) => {
    const divEl = document.createElement('div');
    divEl.className = 'comment card';
    divEl.innerHTML = `
    <h3>${commObj.author}</h3>
    <p>${commObj.date}</p>
    <p>${commObj.text}</p>
    `;
    commCont.append(divEl);
  });
}
