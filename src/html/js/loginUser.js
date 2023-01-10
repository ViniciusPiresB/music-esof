const getAccessToken = async (email, password) => {
  const res = await fetch('http://localhost:8000/auth/login', {
    method: 'POST',
    headers: { 'Content-type': 'application/json;charset=UTF-8' },
    body: JSON.stringify({ email, password }),
  });

  if (res.status == 401) {
    document.getElementById('error-message').innerHTML =
      'Email ou senha inválido';

    return;
  }

  return res.json();
};

const userToken = document.cookie.replace('userToken=', '');

if (userToken) window.location.replace('/logged');

const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');

loginButton.onclick = async () => {
  const email = document.getElementById('login-email-field').value;
  const password = document.getElementById('login-password-field').value;

  const tokenRes = await getAccessToken(email, password);
  const tokenCookie = `userToken=${tokenRes.token}`;

  document.cookie = tokenCookie;

  window.location.replace('/logged');
};

registerButton.onclick = async () => {
  const firstName = document.getElementById('first-name-field').value;
  const lastName = document.getElementById('last-name-field').value;
  const email = document.getElementById('register-email-field').value;
  const password = document.getElementById('register-password-field').value;

  const res = await fetch('http://localhost:8000/user', {
    method: 'POST',
    headers: { 'Content-type': 'application/json;charset=UTF-8' },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });

  if (res.status == 409) {
    document.getElementById('error-message').innerHTML = 'Email já cadastrado';

    return;
  }

  if (res.status != 201) {
    console.log(res.status);
    document.getElementById('error-message').innerHTML =
      'Algo errado, tente novamente mais tarde';

    return;
  }

  const tokenRes = await getAccessToken(email, password);
  const tokenCookie = `userToken=${tokenRes.token}`;

  document.cookie = tokenCookie;

  window.location.replace('/logged');
};
