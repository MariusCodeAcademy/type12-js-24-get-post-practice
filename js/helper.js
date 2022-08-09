'use strict';
console.log('helper.js');

const baseUrl = 'https://dummyjson.com/posts';

async function initHeader() {
  // paimti layout/header.html
  const resp = await fetch('layout/header.html');
  const htmlHeader = await resp.text();
  // ideti i body pradzia
  document.body.insertAdjacentHTML('afterbegin', htmlHeader);
}
initHeader();
