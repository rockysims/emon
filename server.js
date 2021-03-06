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
	const { code } = req.query;

	try {
		const params = new URLSearchParams();
		params.append('grant_type', 'authorization_code');
		params.append('code', code);
		const result = await axios.post(`https://login.eveonline.com/v2/oauth/token`, params, {
			headers: {
				Authorization: `Basic ${Buffer.from(`${process.env.SSO_CLIENT_ID}:${process.env.SSO_SECRET_KEY}`).toString('base64')}`,
				'Content-Type': 'application/x-www-form-urlencoded',
				Host: 'login.eveonline.com'
			}
		});
		const accessToken = result.data.access_token;
		console.log({result});

		res.json({accessToken});
	} catch (reason) {
		res.json({reason});
	}
});

//---

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
