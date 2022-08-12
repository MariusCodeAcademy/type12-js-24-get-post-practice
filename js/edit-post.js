'use strict';

import { baseUrl, http } from './modules/helper.js';
import initHeader from './modules/init-header.js';

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

// supildyti formos reiksmes (values)
function fillOutTheFormPlease(data) {
  console.log('data ===', data);
  // TODO: supildyti ciklo metu (for in)

  for (let key in data) {
    console.log('key ===', key);
    const value = data[key];
    console.log('value ===', value);
    if (editFormEl.elements[key]) {
      editFormEl.elements[key].value = data[key];
    }
  }
}
