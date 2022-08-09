'use strict';
console.log('add-post.js');

// Taikomes

const formEl = document.forms[0];

// Event Listeners

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const { title, reactions, userId, body, tags } = formEl.elements;
  console.log('tags ===', tags);
  const tagsArray = tags.value.split(',').map((tag) => tag.trim());

  const newPost = {
    title: title.value,
    reactions: reactions.valueAsNumber,
    userId: userId.valueAsNumber,
    body: body.value,
    tags: tagsArray,
  };
  console.log('newPost ===', newPost);
  formEl.reset();
});

// siusti post requesta i backend
