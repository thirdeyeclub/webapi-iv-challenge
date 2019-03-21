require('dotenv').config();
const server = require('./server.js');

yourName = 'Taylor';

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => console.log(`Welcome ${yourName}\n Server started on ${PORT}`));