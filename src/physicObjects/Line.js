import GLine from './../objects/Line.js';
import PhysicObject from './PhysicObject.js';

/* *********************************************************************************************** *
 * Line
 * =============================================================================================== *
 * REQUIRE: PhysicObject, graphicObjects.Line
 * *********************************************************************************************** */
export default Line;


function Line(settings, physics, scale) {
	settings = settings || {};

	GLine.call(this, settings);

/*	var lastPoint, shape = [];

	this.points.forEach(function(point) {
		if (lastPoint) {
			shape.push({
			//	type: 'edge',
				x1: lastPoint.x,
				y1: lastPoint.y,
				x2: point.x,
				y2: point.y
			});
		}
		lastPoint = point;
	});*/

	this.shape = this.points.map(function(p) {return {x: p.x / scale, y: p.y / scale};});

	PhysicObject.call(this, settings, physics, scale);

}

//--------------------------------------------------------------------------------------------------

Line.prototype = Object.create( GLine.prototype );

//--------------------------------------------------------------------------------------------------

Line.prototype.constructor = Line;