import Line from './Line.js';

/* *********************************************************************************************** *
 * Polygon
 * =============================================================================================== *
 * REQUIRE: Line
 * *********************************************************************************************** */
export default Polygon;


function Polygon(settings) {
	settings = settings || {};
	this.points = settings.points || [];

	Line.call(this, settings);
	this.fill = settings.fill;
}

//--------------------------------------------------------------------------------------------------

Polygon.prototype = Object.create(Line.prototype);

//--------------------------------------------------------------------------------------------------

Polygon.prototype.constructor = Polygon;

//--------------------------------------------------------------------------------------------------

Polygon.prototype.shaped = function(sprite) {
	this.sprite = sprite || this.sprite;
	Line.prototype.shaped.call(this);
	this.sprite.closePath();
};