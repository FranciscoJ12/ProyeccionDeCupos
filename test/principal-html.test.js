const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');

test('principal.html has coordination header and logout button', () => {
  const html = fs.readFileSync('principal.html', 'utf8');
  assert.match(html, /<h1>Asistente de Coordinacion<\/h1>/);
  assert.match(html, /<button id="logout"[^>]*>Log out<\/button>/);
});
