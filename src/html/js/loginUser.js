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

loginButton.onclick = async () => {
  const email = document.getElementById('email-field').value;
  const password = document.getElementById('password-field').value;

  const tokenRes = await getAccessToken(email, password);
  const tokenCookie = `userToken=${tokenRes.token}`;

  document.cookie = tokenCookie;

  window.location.replace('/logged');
};
