const express = require ('express');
const bodyParser = require ('body-parser');

const app = express();

app.use(bodyParser.json()); // entender req json
app.use(bodyParser.urlencoded({extended: false}));

require('../controllers/attControler')(app);

app.listen(3000);