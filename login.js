document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (user === 'tako511' && pass === '123456') {
    window.location.href = 'principal.html';
  } else {
    document.getElementById('error').textContent = 'Usuario o contraseña incorrectos';
  }
});
