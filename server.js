var express = require('express.io'),
	swig = require('swig');
	_= require('underscore');

var mqtt = require('mqtt');

var server = express();
server.http().io();
var users = [];



// Configuracion para renderear vistas
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', './app/views');

//Cargar archivos estaticos

server.use(express.static('./public'));

// Agregamos post, cookie y sessiones

server.configure(function() {
	server.use(express.logger());
	server.use(express.cookieParser());
	server.use(express.bodyParser());
});

//Cliente MQTT

client = mqtt.createClient(1883, 'localhost');
client.subscribe('iduser');

server.get('/', function (req, res) {
	res.render('home', {
		digito : req.body.digito
	});


});



client.on('message', function (topic, message) { //enviamos user ID e imprimimos y encendemos bici

if (topic=='iduser'){
var temp = parseFloat(message);

if (temp>= 3)
{

console.log('prendido');

client.publish('auth', '12345');
	
}

else if (temp>= 2 && temp<3) {
console.log('blink');

client.publish('auth', '300:500');

}

else {

console.log(temp);
console.log('apagado');
client.publish('auth', '5432');

}



	}
  
});






var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});
