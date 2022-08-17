'use strict';
console.log('helper.js');

export const baseUrl = 'http://localhost:8001/posts';
export const commentsUrl = 'http://localhost:8001/comments';

// Functions

export async function http(url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok)
      throw new Error(`fetch fail: ${resp.status} ${resp.statusText} trying to fetch ${resp.url}`);
    const dataInJs = await resp.json();
    console.log('http:', dataInJs);
    return dataInJs;
  } catch (error) {
    console.warn('klaida http ', error.message);
    console.warn('error.stack ', error.stack);
  }
}
