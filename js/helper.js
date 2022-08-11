'use strict';
console.log('helper.js');

const baseUrl = 'http://localhost:8001/posts';

async function initHeader() {
  // paimti layout/header.html
  const resp = await fetch('layout/header.html');
  const htmlHeader = await resp.text();
  // ideti i body pradzia
  document.body.insertAdjacentHTML('afterbegin', htmlHeader);
}
initHeader();

// Functions

function http(url) {
  return fetch(url)
    .then((resp) => {
      if (!resp.ok)
        throw new Error(
          'there was error: ' + resp.status + ' ' + resp.statusText + ' geting ' + url
        );
      return resp.json();
    })
    .then((data) => {
      console.log('http data ===', data);
      return data;
    })
    .catch((err) => console.warn(err));
}
