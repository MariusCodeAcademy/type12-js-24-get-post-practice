export class DInput {
  constructor({ type = 'text', pl, name, required = false, value, disabled }) {
    this.type = type;
    if (pl) this.placeholder = pl;
    if (name) this.name = name;
    if (required) this.required = required;

    if (value) this.value = value;
    if (disabled) this.disabled = disabled;
  }
}

/**
 * This fucntion takes inputs array and creates corresponding html elements
 *
 * @param {HTMLFormElement} formEl
 * @param {Object[]} arr
 */

export function makeAllInputElements(formEl, arr) {
  const inputShortcuts = {};
  arr.forEach((iObj) => {
    const inputEl = makeSingleInputElement(iObj);
    formEl.append(inputEl);
    if (iObj.name) inputShortcuts[iObj.name] = inputEl;
  });
  return inputShortcuts;
}

// { type: 'text', placeholder: 'Enter your name', name: 'username' },

function makeSingleInputElement(inputObj) {
  const inputEl = document.createElement(inputObj.type === 'textarea' ? 'textarea' : 'input');

  for (let key in inputObj) {
    if (key === 'type' && inputObj.type === 'textarea') continue;
    // inputEl.type = 'text'
    inputEl[key] = inputObj[key];
  }

  return inputEl;
}
