const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://os08:os08@localhost:27017/os08', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const routes = require('./routes');

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(9000);