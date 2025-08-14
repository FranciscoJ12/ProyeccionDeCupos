const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');

test('index.html contains coordination header and login form', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  assert.match(html, /<h1>Asistente de Coordinacion<\/h1>/);
  assert.match(html, /<form id="loginForm">/);
});
