// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';
// import path from 'path';
// import {createServer} from "http";
// import {Server, Socket} from "socket.io";

// const puertoApp = 3000;
// const puertoSocket = 3001;
// const httpServer = createServer();
// const ioToc = new Server(httpServer);
// ioToc.on("connection", (socket: Socket)=>{
//   console.log("Conexión entrante de algún cliente");
// })
// const app = express();

// // Middleware
// app.use(morgan('tiny'));
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
// console.log(path.join(__dirname, "public"));
// // Rutas
// // app.get('/', (req, res) => {
// //   res.send('Hello World!');
// // });

// // Middleware para Vue.js router modo history
// const history = require('connect-history-api-fallback');
// app.use(history());
// app.use(express.static(path.join(__dirname, 'public')));

// app.set('puerto', puertoApp);
// app.listen(app.get('puerto'), () => {
//   console.log('Example app listening on port '+ app.get('puerto'));
// });
// httpServer.listen(puertoSocket);
// export {app}
import express from 'express';
const io = require("socket.io-client");
import cors from "cors";
import path from "path";

const bp = require('body-parser')
const app = express();

const http = require('http').Server(app);
const ioToc = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:8081" //poner 8080, era un cambio temporal
  }
});
const port = 8082;

const history = require('connect-history-api-fallback');
app.use(cors());
app.use(history());


var servidor: string;

// if(process.argv[2] == 'test')
// {
//     servidor = 'http://localhost:8080';
// }
// else
// {
//     servidor =  'http://54.74.52.150:8080';
// }
servidor = 'http://localhost:8080';

var socketSanPedro = io(servidor);


app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.post("/lolaso", (req, res)=>{
  console.log("Hey: ", req.body);
});
ioToc.on('connection', function(socket) {
    socket.on('test', (data) => {
        console.log(data);
    });
 });

http.listen(port, function() {
   console.log(`Server: http://localhost:${port}`);
});

console.log(socketSanPedro);
export {express, app, http, ioToc, port, socketSanPedro}