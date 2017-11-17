// IMPORTING
var  b2Vec2, b2World, b2DebugDraw, b2Body, b2BodyDef, b2FixtureDef, b2PolygonShape, b2CircleShape, b2AABB, b2RevoluteJointDef;

function importBox2D() {
	b2Vec2  			= Box2D.Common.Math.b2Vec2;
	b2World	        	= Box2D.Dynamics.b2World;
	b2DebugDraw     	= Box2D.Dynamics.b2DebugDraw;
	b2Body  			= Box2D.Dynamics.b2Body;
	b2BodyDef   		= Box2D.Dynamics.b2BodyDef;
	b2FixtureDef    	= Box2D.Dynamics.b2FixtureDef;
	b2PolygonShape  	= Box2D.Collision.Shapes.b2PolygonShape;
	b2CircleShape   	= Box2D.Collision.Shapes.b2CircleShape;
	b2AABB		    	= Box2D.Collision.b2AABB;
	b2RevoluteJointDef	= Box2D.Dynamics.Joints.b2RevoluteJointDef;
}


import Engine from './Engine.js';
import { extend } from './utility.js';

/* *********************************************************************************************** *
 * Physics engine
 * =============================================================================================== *
 * REQUIRE: Box2D, Engine
 * *********************************************************************************************** */
export default Physics;


function Physics(settings) {
	importBox2D();
	settings = extend({}, Physics.default, settings);
	Engine.call(this, settings);

	this.CANVAS_WIDTH;
	this.CANVAS_HEIGHT;
	this.SCALE;
	this._isRun = false;
	this._world;
	this._boundaries;
//	this._canvas;
//	this._sprite;
	this._debugDraw;
	this._control;

	this.init(settings);
}

//--------------------------------------------------------------------------------------------------
Physics.prototype = Object.create(Engine.prototype);

extend( Physics.prototype, {


	constructor: Physics,


	/* ***************************** *
	 * INITIALIZE AND CREATE SECTION *
	 * ***************************** */

	// Initialize
	init: function(settings) {
		Engine.prototype.init.call(this, settings);
		var canvas, gravity, sprite;
		settings = extend(this._settings, settings);

		// canvas = typeof settings.canvas === 'string' ? document.querySelector(settings.canvas) : settings.canvas;
		// sprite = canvas.getContext('2d');

		gravity = settings.gravity;
		gravity = typeof gravity === 'object' ? gravity : {x:0, y:gravity};
		gravity = new b2Vec2(gravity.x, gravity.y);

		// this.CANVAS_WIDTH = canvas.width;
		// this.CANVAS_HEIGHT = canvas.height;
		this.SCALE = settings.scale;

		this._settings = settings;
		// this._canvas = canvas;
		// this._sprite = sprite;
		this._gravity = gravity;
		this._isRun = false;
		this._debugDrawEnabled = !!settings.debugDraw;

		this._control = this.setDirectControl();
		this._control[ settings.directControl ? 'turnOn' : 'turnOff' ]();
	},


	// Create Box2D world
	createWorld: function() {
		var self = this;
		this._world = new b2World(this._gravity, true);
		if(this._debugDrawEnabled) {
			this._debugDraw = this.createDebugDraw({
				sprite: self._sprite,
				scale: self.SCALE,
				alpha: .5,
				lineThickness: 1
			});
			this._world.SetDebugDraw(this._debugDraw);
		}
	},


	// World boundaries
	createWorldBoundaries: function(width, height) {
		width = (width || this._canvas.width) / this.SCALE;
		height = (height || this._canvas.height) / this.SCALE;

		this._boundaries = this.createBody(
			{ x: - width / 2, y: - height / 2, type:'s' },
			[
				{ friction: 1, shape: { type: 'edge', x1: 0,     y1: 0,      x2: width, y2: 0       } },
				{ friction: 1, shape: { type: 'edge', x1: 0,     y1: height, x2: width, y2: height  } },
				{ friction: 1, shape: { type: 'edge', x1: 0,     y1: 0,      x2: 0,     y2: height  } },
				{ friction: 1, shape: { type: 'edge', x1: width, y1: 0,      x2: width, y2: height  } }
			]
		);
	},


	//
	createDebugDraw: function(options) {
		var dd = new b2DebugDraw();
		dd.SetSprite(options.sprite);
		dd.SetDrawScale(options.scale);
		dd.SetFillAlpha(options.alpha);
		dd.SetLineThickness(options.lineThickness);
		dd.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		this._debugDrawEnabled = true;
		return dd;
	},


	//
	// start: function() {
	// 	if(this._isRun) { return; }
	// 	else {
	// 		this._isRun = true;
	// 		this.update();
	// 	}
	// },


	//
	// stop: function() {
	// 	this._isRun = false;
	// },

	refresh: function(dt) {
		Engine.prototype.refresh.call(this, dt);
		this.update(dt/1000);
	},


	//
	update: function(dt) {
		var self = this;

		/*		if(this._isRun) {
					// fix bug for Chrome
					window.requestAnimationFrame(function(){ self.update.call(self) });
				}*/

		this._control.update();

		dt = dt || 1/60;
		this._world.Step(dt, 4, 3); // deltaTime, velocityIterations, positionIterations
		if(this._debugDrawEnabled) { this._world.DrawDebugData(); }
		this._world.ClearForces();
	},



	/* ******************* *
	 * CONTROL SECTION     *
	 * =================== *
	 * Working in progress *
	 * ******************* */
	setDirectControl: function() {
		var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
		var canvasPosition = this._canvas.getBoundingClientRect();
		var self = this;

		return {
			turnOn:turnOn,
			turnOff:turnOff,
			update:update
		};

		function turnOn() {
			document.addEventListener('mousedown', handleMouseDown, true);
			document.addEventListener('touchstart', handleMouseDown, true);
			document.addEventListener('mouseup', handleMouseUp, true);
			document.addEventListener('touchend', handleMouseUp, true);
		}

		function turnOff() {
			isMouseDown = false;
			document.removeEventListener('mousedown', handleMouseDown, true);
			document.removeEventListener('touchstart', handleMouseDown, true);
			document.removeEventListener('mouseup', handleMouseUp, true);
			document.removeEventListener('touchend', handleMouseUp, true);
		}

		function handleMouseDown(e) {
			canvasPosition = self._canvas.getBoundingClientRect();
			isMouseDown = true;
			handleMouseMove(e);
			document.addEventListener('mousemove', handleMouseMove, true);
			document.addEventListener('touchmove', handleMouseMove, true);
		}

		function handleMouseUp() {
			document.removeEventListener('mousemove', handleMouseMove, true);
			document.removeEventListener('touchmove', handleMouseMove, true);
			isMouseDown = false;
			mouseX = undefined;
			mouseY = undefined;
		}

		function handleMouseMove(e) {
			var clientX, clientY, rp;
			if(e.clientX) {
				clientX = e.clientX;
				clientY = e.clientY;
			}
			else if(e.changedTouches && e.changedTouches.length > 0) {
				var touch = e.changedTouches[e.changedTouches.length - 1];
				clientX = touch.clientX;
				clientY = touch.clientY;
			}
			else {
				return;
			}
			rp = self.getCoordinateFrom(clientX - canvasPosition.left, clientY - canvasPosition.top);
			mouseX = rp.x / self.SCALE;
			mouseY = rp.y / self.SCALE;
			// mouseX = (clientX - canvasPosition.left) / self.SCALE;
			// mouseY = (clientY - canvasPosition.top) / self.SCALE;
			e.preventDefault();
		}

		function update() {
			if(isMouseDown && (!mouseJoint)) {
				var body = self.getBodyAt(mouseX, mouseY); //getBodyAtMouse();
				if(body) {
					var md = new Box2D.Dynamics.Joints.b2MouseJointDef();
					md.bodyA = self._world.GetGroundBody();
					md.bodyB = body;
					md.target.Set(mouseX, mouseY);
					md.collideConnected = true;
					md.maxForce = 300.0 * body.GetMass();
					mouseJoint = self._world.CreateJoint(md);
					body.SetAwake(true);
				}
			}

			if(mouseJoint) {
				if(isMouseDown) {
					mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
				} else {
					self._world.DestroyJoint(mouseJoint);
					mouseJoint = null;
				}
			}
		}
	},



	/* ************ *
	 * BODY SECTION *
	 * ************ */

	// Get list of all bodies
	getBodyList: function() {
		var list = [];

		getBody( this._world.GetBodyList() );
		return list;

		function getBody(body) {
			if(body) {
				list.push(body);
				getBody(body.GetNext());
			}
		}
	},


	// Get details of body
	getBodyDetails: function(body) {
		var type = ['static', 'kinematic', 'dynamic'][ body.GetType() ],
			position = body.GetPosition(),
			fixtures = [];

		getFixtures( body.GetFixtureList() );
		return {
			x: position.x,
			y: position.y,
			a: body.GetAngle(),
			type: type,
			data: body.GetUserData(),
			fixtures: fixtures
		};

		function getFixtures(fix) {
			if(fix) {
				var shape = fix.GetShape();
				fixtures.push({
					type: fix.GetType(),
					density: fix.GetDensity(),
					friction: fix.GetFriction(),
					shape: shape.GetType() === 0 ? {
						type:'circle',
						radius:shape.GetRadius()
					} : {
						type:'polygon',
						points:(function(vec){
							return vec.map(function(v){ return {x:v.x, y:v.y}; });
						})(shape.GetVertices())
					}
				});
				getFixtures(fix.GetNext());
			}
		}
	},


	//
	getBodyAt: function(x, y) {
		var mousePVec = new b2Vec2(x, y);
		var aabb = new b2AABB();
		aabb.lowerBound.Set(x - 0.001, y - 0.001);
		aabb.upperBound.Set(x + 0.001, y + 0.001);

		// Query the world for overlapping shapes
		var selectedBody = null;
		this._world.QueryAABB(getBodyCB, aabb);
		return selectedBody;

		function getBodyCB(fixture) {
			if(fixture.GetBody().GetType() !== b2Body.b2_staticBody) {
				if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
					selectedBody = fixture.GetBody();
					return false;
				}
			}
			return true;
		}
	},



	// Create body
	createBody: function(options, fixtures, data) {
		var self = this,
			TYPE = {
				s:b2Body.b2_staticBody,
				static:b2Body.b2_staticBody,
				k:b2Body.b2_kinematicBody,
				kinematic:b2Body.b2_kinematicBody,
				d:b2Body.b2_dynamicBody,
				dynamic:b2Body.b2_dynamicBody
			};
		fixtures = fixtures || [];

		var bodyDef = new b2BodyDef();
		bodyDef.type = TYPE[ options.type ]; //b2Body.b2_dynamicBody;
		bodyDef.position.x = options.x;
		bodyDef.position.y = options.y;
		if(data !== undefined) { bodyDef.userData = data; }

		if(typeof fixtures === 'object' && !(fixtures instanceof Array)) { fixtures = [fixtures]; }

		var b = this._world.CreateBody(bodyDef);
		fixtures.forEach(addFixtures);
		return b;

		function addFixtures(f) {
			b.CreateFixture( self.createFixture(f) );
		}
	},


	// Create fixture
	createFixture: function(options) {
		var fixture = new b2FixtureDef();
		fixture.density = options.density;
		fixture.friction = options.friction;
		fixture.restitution = options.restitution;
		fixture.shape = this.createShape(options.shape);
		return fixture;
	},


	// Create shape
	createShape: function(options) {
		var shape = new b2PolygonShape();

		switch(options.type) {
			case 'box':
				shape.SetAsBox(options.w/2, options.h/2);
				break;
			case 'edge':
				shape.SetAsEdge(new b2Vec2(options.x1, options.y1), new b2Vec2(options.x2, options.y2));
				break;
			case 'circle':
				shape = new b2CircleShape(options.r);
				break;
			default:
				var vectors = [];
				options.forEach(function(v) { vectors.push( new b2Vec2(v.x, v.y) ) });
				shape.SetAsArray(vectors, vectors.length);
		}
		return shape;
	},


	//
	addRevoluteJoint: function(body1, body2, params) {
		var joint = new b2RevoluteJointDef();
		joint.Initialize(body1, body2, body1.GetWorldCenter());
		if (params && params.motorSpeed) {
			joint.motorSpeed = params.motorSpeed;
			joint.maxMotorTorque = params.maxMotorTorque;
			joint.enableMotor = true;
		}
		this._world.CreateJoint(joint);
	},


	// Apply impulse to body
	applyImpulse: function(body, degrees, power) {
		body.ApplyImpulse(
			new b2Vec2(
				Math.cos(degrees * (Math.PI / 180)) * power,
				Math.sin(degrees * (Math.PI / 180)) * power
			),
			body.GetWorldCenter()
		);
	}
});


//--------------------------------------------------------------------------------------------------


// Default settings
Physics.default = {
	scale: 30,		// 30px = 1 meter
	gravity: 9.8	// Earth gravity
};