import GraphicObject from './GraphicObject.js';

/* *********************************************************************************************** *
 * Line
 * =============================================================================================== *
 * REQUIRE: GraphicObject
 * *********************************************************************************************** */
export default Line;


function Line(settings) {
	settings = settings || {};
	this.points = settings.points || [];

	GraphicObject.call(this, settings);
	this.fill = null;
}

//--------------------------------------------------------------------------------------------------

Line.prototype = Object.create(GraphicObject.prototype);

//--------------------------------------------------------------------------------------------------

Line.prototype.constructor = Line;

//--------------------------------------------------------------------------------------------------

Line.prototype.shaped = function(sprite) {
	this.sprite = sprite || this.sprite;
	var points = this.points;
	this.sprite.beginPath();
	this.sprite.moveTo((this.x + points[0].x), (this.y + points[0].y));
	for (var j = 1; j < points.length; j++) {
		this.sprite.lineTo((points[j].x + this.x), (points[j].y + this.y));
	}
};