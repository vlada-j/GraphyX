import GraphicObject from './../objects/GraphicObject.js';

/* *********************************************************************************************** *
 * PhysicObject
 * =============================================================================================== *
 * Base class for all physics objects
 * REQUIRE: GraphicObject
 * *********************************************************************************************** */
export default PhysicObject;


function PhysicObject(settings, physics, scale) {
	this.type = settings.type;
	this.density = settings.density;
	this.friction = settings.friction;
	this.restitution = settings.restitution;
	this.scale = scale;

	var self = this;
	this.addToWorld = function(physics) {
		var scale = self.scale,
			options = {
				x: self.x/scale,
				y: self.y/scale,
				type: self.type
			},
			shape = self.shape,
			fixtures = {
				density: self.density,
				friction: self.friction,
				restitution: self.restitution,
				shape: shape
			},
			data = self.data;

		self.body = (physics || self.physics).createBody(options, fixtures, data);
	};

	this.draw = function() {
		GraphicObject.prototype.draw.call(self);
		self.update();
	};
	this.update = function() {
		var bd = physics.getBodyDetails( self.body );
		self.x = bd.x*scale;
		self.y = bd.y*scale;
		self.r = bd.a;
	};

	if(physics) {
		this.physics = physics;
		this.addToWorld(physics);
	}
}

//--------------------------------------------------------------------------------------------------

PhysicObject.prototype = Object.create( GraphicObject.prototype );

//--------------------------------------------------------------------------------------------------

PhysicObject.prototype.constructor = PhysicObject;