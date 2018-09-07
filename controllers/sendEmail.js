const nodemailer = require("nodemailer");

exports.sendEmail = function(req, res){
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'fibazi@guerrero.gob.mx',
			pass: '1974direccion'
		}
	});

	const mailOptions = {
		from: req.body.email,
		to: 'fibazi@guerrero.gob.mx',
		subject: 'Fibazi',
		text: "hola mundo"
	};

	transporter.sendMail(mailOptions, function(err, info){
		if(err) res.render("site/503-page.html");
		res.render("site/404-page.html");
	});
}