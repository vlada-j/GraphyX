import gRect from './../objects/Rect.js';
import PhysicObject from './PhysicObject.js';

/* *********************************************************************************************** *
 * Rect
 * =============================================================================================== *
 * REQUIRE: PhysicObject, graphicObjects.Rect
 * *********************************************************************************************** */
export default Rect;


function Rect(settings, physics, scale) {
	settings = settings || {};

	gRect.call(this, settings);

	this.shape = {
		type:'box',
		w: settings.width/scale,
		h: settings.height/scale
	};

	PhysicObject.call(this, settings, physics, scale);

}

//--------------------------------------------------------------------------------------------------

Rect.prototype = Object.create( gRect.prototype );

//--------------------------------------------------------------------------------------------------

Rect.prototype.constructor = Rect;