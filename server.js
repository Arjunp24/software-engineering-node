const express = require('express');
const app = express();

app.get('/hello', (req, res) =>
    res.send('Hello Arjun!'));

const PORT = 4000;
app.listen(PORT);
