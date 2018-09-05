const Level = require('../models/level');
const mongoose = require('mongoose');

mongoose.connect('mongodb://fibazi:jgt3556792@ds141641.mlab.com:41641/fibazi');

const level = [
	new Level({
		nombre: "1",
	}),
	new Level({
		nombre: "2",
	}),
	new Level({
		nombre: "3",
	}),
	new Level({
		nombre: "4"
	}),
	new Level({
		nombre: "5"
	})
];

var done = 0;
for (var i = 0;	i < level.length; i++) {
	level[i].save(function(err, result){
		done++;
		if(done === level.length){
			exit();
		}
	})
}

function exit(){
	mongoose.disconnect();
}