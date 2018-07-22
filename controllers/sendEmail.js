const nodemailer = require("nodemailer");

exports.sendEmail = function(req, res){
	const transporter = nodemailer.createTransport({
		service: 'Hotmail',
		auth: {
			user: 'jgt08@hotmail.com',
			pass: 'jgt3556792'
		}
	});

	const mailOptions = {
		from: req.body.email,
		to: 'jair.galvis30@gmail.com',
		subject: 'Fibazi',
		text: req.body.name
	};

	transporter.sendMail(mailOptions, function(err, info){
		if(err) res.send(500, err.message);
		res.status(200).send("el correo ha sido enviado");
	});
}