'use strict';
console.log('edit-post.js');

// pasiiimti query param reiksme
const currentId = new URLSearchParams(window.location.search).get('postId');
console.log('currentId ===', currentId);

//Taikomes
const editFormEl = document.forms[0];

// parsisiusti posto informacija
async function init() {
  const postData = await http(`${baseUrl}/${currentId}`);
  fillOutTheFormPlease(postData);
}
init();

// EVENT listener
editFormEl.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('put http to update the form');
});

async function getPostData(url) {
  const resp = await fetch(url);
  const dataBack = await resp.json();
  const singlePostData = dataBack;
  console.log('singlePostData ===', singlePostData);
  return singlePostData;
}

// supildyti formos reiksmes (values)
function fillOutTheFormPlease(data) {
  console.log('data ===', data);
  // TODO: supildyti ciklo metu (for in)
  editFormEl.elements.title.value = data.title;
  editFormEl.elements.reactions.value = data.reactions;
  editFormEl.elements.image.value = data.image;
}
