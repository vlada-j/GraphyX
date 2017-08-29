import GraphicObject from './GraphicObject.js';

/* *********************************************************************************************** *
 * Circle
 * =============================================================================================== *
 * REQUIRE: GraphicObject
 * *********************************************************************************************** */
export default Circle;


function Circle(settings) {
	settings = settings || {};
	this.radius = settings.radius || 10;

	GraphicObject.call(this, settings);
}

//--------------------------------------------------------------------------------------------------

Circle.prototype = Object.create(GraphicObject.prototype);

//--------------------------------------------------------------------------------------------------

Circle.prototype.constructor = Circle;

//--------------------------------------------------------------------------------------------------

Circle.prototype.shaped = function(sprite) {
	this.sprite = sprite || this.sprite;
	this.sprite.beginPath();
	this.sprite.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	this.sprite.closePath();
};