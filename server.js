require('dotenv').config();
const axios = require('axios');
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

app.get('/callback', async (req, res) => {
	const { code, state } = req.query;
	console.log({code, state});

	const result = await axios.post(`https://login.eveonline.com/v2/oauth/token`, {code});
	console.log({result});

	// res.json(result);
	res.json({done: true});
});

//---

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
