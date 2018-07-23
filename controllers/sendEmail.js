const nodemailer = require("nodemailer");
const auth = require("../config/mailgun");
const mg = require("nodemailer-mailgun-transport");

exports.sendEmail = function(req, res){

	const transporter = nodemailer.createTransport(mg(auth));

	const mailOptions = {
		from: "jgt08@hotmail.com",
		to: 'jair.galvis30@gmail.com',
		subject: 'Fibazi',
		text: "hola mundo"
	};

	transporter.sendMail(mailOptions, function(err, info){
		if(err) res.send(500, err.message);
		res.status(200).jsonp(info);
	});
}