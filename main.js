const express = require('express')
const app = express()
const port = 5000
const path = require('path');
const fs = require('fs');



var kaomoji = fs.readFileSync("kaomoji.txt").toString().split("\n").map(s => s.trim());
var messages = fs.readFileSync("messages.txt").toString().split("\n").map(s => s.trim());
function randomElem(array) {
	return array[Math.floor(Math.random()*array.length)];
}


app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/randomNotif', (req, res) => {
	var responseObj = {
		kaomoji: randomElem(kaomoji),
		message: randomElem(messages)
	}
    res.json(responseObj);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))