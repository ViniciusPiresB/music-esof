const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Frontend running on 3000 port.');
});

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

app.get('/logged', (req, res) => {
  res.sendFile(__dirname + '/loggedPage.html');
});
