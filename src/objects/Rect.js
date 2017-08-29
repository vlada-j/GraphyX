import GraphicObject from './GraphicObject.js';

/* *********************************************************************************************** *
 * Rect
 * =============================================================================================== *
 * REQUIRE: GraphicObject
 * *********************************************************************************************** */
export default Rect;


function Rect(settings) {
	settings = settings || {};
	this.width = settings.width || 20;
	this.height = settings.height || 10;

	GraphicObject.call(this, settings);
}

//--------------------------------------------------------------------------------------------------

Rect.prototype = Object.create(GraphicObject.prototype);

//--------------------------------------------------------------------------------------------------

Rect.prototype.constructor = Rect;

//--------------------------------------------------------------------------------------------------

Rect.prototype.shaped = function(sprite) {
	this.sprite = sprite || this.sprite;
	this.sprite.beginPath();
	this.sprite.rect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
	this.sprite.closePath();
};