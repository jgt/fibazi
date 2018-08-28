const Lider = require('../models/lideres');
const mongoose = require('mongoose');

mongoose.connect('mongodb://fibazi:jgt3556792@ds141641.mlab.com:41641/fibazi');

const lider = [
	new Lider({
		nombre: "jair",
		telefono: "7551138455",
		colonia: "del valle",
	}),
	new Lider({
		nombre: "monge",
		telefono: "7551138455",
		colonia: "del valle",
	}),
	new Lider({
		nombre: "brenda",
		telefono: "7551138455",
		colonia: "del valle",
	}),
	new Lider({
		nombre: "astrid",
		telefono: "7551138455",
		colonia: "del valle",
	})
];

var done = 0;
for (var i = 0;	i < lider.length; i++) {
	lider[i].save(function(err, result){
		done++;
		if(done === lider.length){
			exit();
		}
	})
}

function exit(){
	mongoose.disconnect();
}