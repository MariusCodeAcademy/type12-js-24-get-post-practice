'use strict';
console.log('single-post.js');

const currentId = new URLSearchParams(window.location.search).get('postId');
console.log('currentId ===', currentId);

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

function fillSinglePostHtml(postDataObj) {}
