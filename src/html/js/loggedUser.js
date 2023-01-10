if (!document.cookie) {
  document.cookie = 'userToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
  window.location.replace('/src/html/index.html');
}

const logoutButton = document.getElementById('logout-button');

logoutButton.onclick = () => {
  document.cookie = 'userToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
  window.location.replace('/src/html/index.html');
};
