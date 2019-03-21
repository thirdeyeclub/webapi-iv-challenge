const server = require('./server.js');

server.get('/',(req, res)=>{
    res.send(`<div>API 2</div>`);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`\n Server started on ${PORT}`));