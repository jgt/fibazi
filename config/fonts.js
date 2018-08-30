const path =require("path");

module.exports = function fonts(){
		var font = {
			Roboto: {
				normal: path.join(__dirname, '..', 'config', 'fonts/Roboto-Regular.ttf'),
				bold: path.join(__dirname, '..', 'config', 'fonts/Roboto-Medium.ttf'),
				italics: path.join(__dirname, '..', 'config', 'fonts/Roboto-Italic.ttf'),
				bolditalics: path.join(__dirname, '..', 'config', 'fonts/Roboto-MediumItalic.ttf')
			}
		};	

		return font
}