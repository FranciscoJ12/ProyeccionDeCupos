const test = require('node:test');
const assert = require('node:assert');

function setupPrincipalDom() {
  const elements = {
    logout: {
      addEventListener: (event, handler) => {
        if (event === 'click') elements.logout.clickHandler = handler;
      }
    }
  };
  global.document = { getElementById: (id) => elements[id] };
  global.window = { location: { href: 'principal.html' } };
  return elements;
}

test('logout redirects to index.html', { concurrency: false }, () => {
  const elements = setupPrincipalDom();
  delete require.cache[require.resolve('../principal.js')];
  require('../principal.js');
  elements.logout.clickHandler();
  assert.strictEqual(global.window.location.href, 'index.html');
  delete global.document;
  delete global.window;
});
