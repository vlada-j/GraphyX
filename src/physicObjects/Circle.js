import gCircle from './../objects/Circle.js';
import PhysicObject from './PhysicObject.js';

/* *********************************************************************************************** *
 * Circle
 * =============================================================================================== *
 * REQUIRE: PhysicObject, graphicObjects.Circle
 * *********************************************************************************************** */
export default Circle;


function Circle(settings, physics, scale) {
	settings = settings || {};

	gCircle.call(this, settings);

	this.shape = {
		type:'circle',
		r: settings.radius/scale
	};

	PhysicObject.call(this, settings, physics, scale);

}

//--------------------------------------------------------------------------------------------------

Circle.prototype = Object.create( gCircle.prototype );

//--------------------------------------------------------------------------------------------------

Circle.prototype.constructor = Circle;