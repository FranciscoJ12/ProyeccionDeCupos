const test = require('node:test');
const assert = require('node:assert');

function setupLoginDom() {
  const elements = {
    loginForm: {
      addEventListener: (event, handler) => {
        if (event === 'submit') elements.loginForm.submitHandler = handler;
      }
    },
    username: { value: '' },
    password: { value: '' },
    error: { textContent: '' }
  };
  global.document = { getElementById: (id) => elements[id] };
  global.window = { location: { href: '' } };
  return elements;
}

test('redirects on correct credentials', { concurrency: false }, () => {
  const elements = setupLoginDom();
  delete require.cache[require.resolve('../login.js')];
  require('../login.js');
  elements.username.value = 'tako511';
  elements.password.value = '123456';
  elements.loginForm.submitHandler({ preventDefault() {} });
  assert.strictEqual(global.window.location.href, 'principal.html');
  delete global.document;
  delete global.window;
});

test('shows error on incorrect credentials', { concurrency: false }, () => {
  const elements = setupLoginDom();
  delete require.cache[require.resolve('../login.js')];
  require('../login.js');
  elements.username.value = 'user';
  elements.password.value = 'wrong';
  elements.loginForm.submitHandler({ preventDefault() {} });
  assert.strictEqual(elements.error.textContent, 'Usuario o contraseña incorrectos');
  delete global.document;
  delete global.window;
});
