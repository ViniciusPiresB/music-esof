if (!document.cookie) {
  document.cookie = 'userToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
  window.location.replace('/');
}

const logoutButton = document.getElementById('logout-button');
const musicsTable = document.getElementById('musics-table');
const debugMoviesButton = document.getElementById('debug-movies');
const userToken = document.cookie.replace('userToken=', '');

const insertButton = document.getElementById('insert-button');
const removeButton = document.getElementById('remove-button');

logoutButton.onclick = () => {
  document.cookie = 'userToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
  window.location.replace('/');
};

const getMovies = async () => {
  const res = await fetch('http://localhost:8000/music', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return res.json();
};

const generateTable = async (musics) => {
  const keys = ['id', 'name', 'author', 'duration', 'genre'];

  const tbl = document.getElementById('table');
  const tblBody = document.createElement('tbody');

  for (let i = 0; i < musics.length; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 5; j++) {
      const cell = document.createElement('td');
      const cellText = document.createTextNode(musics[i][keys[j]]);

      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    tblBody.appendChild(row);
  }

  tbl.appendChild(tblBody);
  musicsTable.appendChild(tbl);

  tbl.setAttribute('border', '2px');
};

(async () => {
  const musics = getMovies();
  generateTable(await musics);
})();

insertButton.onclick = async () => {
  const name = document.getElementById('name-of-track-field').value;
  const author = document.getElementById('author-field').value;
  const duration = document.getElementById('duration-field').value;
  const genre = document.getElementById('genre-field').value;

  if (!name || !author || !duration || !genre) {
    document.getElementById('error-message').innerHTML = 'Há campos vazios.';
    return;
  }

  await fetch('http://localhost:8000/music', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + userToken,
    },
    body: JSON.stringify({ name, author, duration, genre }),
  });

  location.reload();
};

removeButton.onclick = async () => {
  const id = document.getElementById('id-field').value;

  if (!id) {
    document.getElementById('error-message').innerHTML = 'Campo id está vazio.';
    return;
  }

  res = await fetch(`http://localhost:8000/music/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + userToken,
    },
  });

  if (res.status == 400) {
    document.getElementById('error-message').innerHTML =
      'Id de musica inválido';

    return;
  }

  location.reload();
};
