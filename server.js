require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

//express setup
const app = express();
app.use(bodyParser.json());

//static setup
app.use(express.static('dist/e-mon'));

app.get('/test', async (req, res) => {
	res.json({test: true});
});

//---

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
