const nodemailer = require("nodemailer");
const auth = require("../config/mailgun");
const mg = require("nodemailer-mailgun-transport");

exports.sendEmail = function(req, res){

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'jair.galvis30@gmail.com',
			pass: 'jgt3556792'
		}
	});

	const mailOptions = {
		from: "jair.galvis30@gmail.com",
		to: req.body.email,
		subject: 'Fibazi',
		text: "hola mundo"
	};

	transporter.sendMail(mailOptions, function(err, info){
		if(err) res.render("pug/pages/503-page");
		res.render("pug/pages/404-page");
	});
}