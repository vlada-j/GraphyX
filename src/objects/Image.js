import GraphicObject from './GraphicObject.js';

/* *********************************************************************************************** *
 * Image
 * =============================================================================================== *
 * REQUIRE: GraphicObject
 * *********************************************************************************************** */
export default Image;


function Image(settings) {
	settings = settings || {};
	this.width = settings.width || 10;
	this.height = settings.height || 10;

	GraphicObject.call(this, settings);
	if (settings.src instanceof window.HTMLImageElement) {
		this.img = settings.src;
	} else {
		this.img = new window.Image(this.width, this.height);
		this.img.src = settings.src || '';
	}
}

//--------------------------------------------------------------------------------------------------

Image.prototype = Object.create(GraphicObject.prototype);

//--------------------------------------------------------------------------------------------------

Image.prototype.constructor = Image;

//--------------------------------------------------------------------------------------------------

Image.prototype.shaped = function(sprite) {
	this.sprite = sprite || this.sprite;
	this.sprite.drawImage(this.img, this.x-this.img.width/2, this.y-this.img.height/2, this.width, this.height);
};