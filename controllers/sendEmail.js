const nodemailer = require("nodemailer");

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
		if(err) res.render("site/503-page.html");
		res.render("site/404-page.html");
	});
}