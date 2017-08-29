import gPolygon from './../objects/Polygon.js';
import PhysicObject from './PhysicObject.js';

/* *********************************************************************************************** *
 * Polygon
 * =============================================================================================== *
 * REQUIRE: PhysicObject, graphicObjects.Polygon
 * *********************************************************************************************** */
export default Polygon;


function Polygon(settings, physics, scale) {
	settings = settings || {};

	gPolygon.call(this, settings);

	this.shape = this.points.map(function(p) {return {x: p.x / scale, y: p.y / scale};});

	PhysicObject.call(this, settings, physics, scale);

}

//--------------------------------------------------------------------------------------------------

Polygon.prototype = Object.create( gPolygon.prototype );

//--------------------------------------------------------------------------------------------------

Polygon.prototype.constructor = Polygon;