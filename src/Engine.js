import EventDispatcher from './EventDispatcher.js';
import GraphicObject from './objects/GraphicObject.js';

/* *********************************************************************************************** *
 * Graphic engine
 * =============================================================================================== *
 * REQUIRE: EventDispatcher
 * *********************************************************************************************** */
export default Engine;


function Engine(settings) {
	EventDispatcher.call(this);

	this._settings = settings;
	this._canvas = null;
	this._sprite = null;
	this.CANVAS_WIDTH = 0;
	this.CANVAS_HEIGHT = 0;
	this._zoom = 1;
	this._pan = { x:0, y:0 };
	this._isRun = false;
	this._lastTimestamp = 0;
	this._fps = 0;
	this._followingTarget = null;
	this._onUpdate = function() {};

	// List of objects who will be plotted
	this.objects = [];

	this.init(settings);
}

//--------------------------------------------------------------------------------------------------

Engine.prototype = {


	constructor: Engine,


	//--------------------------------------------------------------------------------------------------
	// Initialize
	//--------------------------------------------------------------------------------------------------
	init: function() {
		var canvas, sprite,
			settings = this._settings;

		canvas = typeof settings.canvas === 'string' ? document.querySelector(settings.canvas) : settings.canvas;
		sprite = canvas.getContext('2d');

		this.CANVAS_WIDTH = canvas.width;
		this.CANVAS_HEIGHT = canvas.height;
		this._zoom = settings.zoom || this._zoom;
		this._pan = {
			x: this.CANVAS_WIDTH / 2,
			y: this.CANVAS_HEIGHT / 2
		};

		this._settings = settings;
		this._canvas = canvas;
		this._sprite = sprite;
		this._isRun = false;
	},


	//--------------------------------------------------------------------------------------------------
	// Resizing canvas
	//--------------------------------------------------------------------------------------------------
	resize: function(w, h) {
		this._canvas.width = this.CANVAS_WIDTH = w;
		this._canvas.height = this.CANVAS_HEIGHT = h;
		this._pan = {
			x: w / 2,
			y: h / 2
		};
	},


	//--------------------------------------------------------------------------------------------------
	// Start engine
	//--------------------------------------------------------------------------------------------------
	start: function() {
		if(!this._isRun) {
			this._isRun = true;
			this._lastTimestamp = new Date().getTime();
			this.loop();
		}
	},


	//--------------------------------------------------------------------------------------------------
	// Stop engine
	//--------------------------------------------------------------------------------------------------
	stop: function() {
		this._isRun = false;
	},


	//--------------------------------------------------------------------------------------------------
	// Looping
	//--------------------------------------------------------------------------------------------------
	loop: function() {
		var self = this,
			now = new Date().getTime(),
			dt = now - this._lastTimestamp;

		this._fps = parseInt(1000 / dt);
		this._lastTimestamp = now;

		if(this._isRun) {
			// fix bug for Chrome
			window.requestAnimationFrame(function(){ self.loop.call(self) });
		}
		this.refresh(dt);
	},


	//--------------------------------------------------------------------------------------------------
	//
	//--------------------------------------------------------------------------------------------------
	onUpdate: function( fn ) {
		var old = this._onUpdate;
		this._onUpdate = function() { old(); if(typeof fn === 'function') { fn(); } };
	},


	//--------------------------------------------------------------------------------------------------
	// Drawing objects
	//--------------------------------------------------------------------------------------------------
	draw: function() {
		var self = this;

		if(self.objects instanceof Array) {
			self.objects.forEach(drawObject);
		}

		function drawObject(obj) {
			if(obj instanceof GraphicObject) {
				obj.render(self._sprite);
			}
		}
	},


	//--------------------------------------------------------------------------------------------------
	// Clear canvas
	//--------------------------------------------------------------------------------------------------
	clear: function() {
		this._sprite.setTransform(1,0,0,1,0,0);

		if(typeof this._fade === 'number') {
			this._sprite.fillStyle = 'rgba(0,0,0,'+this._fade+')';
			this._sprite.beginPath();
			this._sprite.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_WIDTH);
			this._sprite.closePath();
			this._sprite.fill();
		} else {
			this._sprite.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_WIDTH);
		}

		if(this._followingTarget) {
			this._pan.x = this._canvas.width / 2 - this._followingTarget.x * this._zoom;
			this._pan.y = this._canvas.height / 2 - this._followingTarget.y * this._zoom;
		}
		this._sprite.translate(this._pan.x, this._pan.y);
		this._sprite.scale(this._zoom, this._zoom);
	},


	//--------------------------------------------------------------------------------------------------
	// Redraw one frame
	//--------------------------------------------------------------------------------------------------
	refresh: function(dt) {
		this.clear();
		this.draw();
		this.dispatchEvent({
			type:'update',
			target:this,
			delta:dt,
			fps:this._fps
		});
	},


	//--------------------------------------------------------------------------------------------------
	// Scrolling position of viewport
	//--------------------------------------------------------------------------------------------------
	scroll: function(x, y) {
		if(x === undefined && y === undefined) { return this._pan; }

		if (x !== undefined && x !== null) { this._pan.x = x; }
		if (y !== undefined && y !== null) { this._pan.y = y; }

		if(!this._isRun) { this.refresh(); }
	},


	//--------------------------------------------------------------------------------------------------
	// Following object - Scrolling view to keep target object in center of the view
	//--------------------------------------------------------------------------------------------------
	following: function(target) {
		if(target === null) { this._followingTarget = null; }

		if( !(target instanceof GraphicObject) && typeof target !== 'number') { return this._followingTarget; }

		if(typeof target === 'number') { target = this.objects[ target ]; }

		this._followingTarget = target;
	},


	//--------------------------------------------------------------------------------------------------
	// Zooming
	//--------------------------------------------------------------------------------------------------
	zoom: function(z) {
		if(z === undefined) { return this._zoom * 100; }

		this._zoom = z/100 || this._zoom;

		if(!this._isRun) { this.refresh(); }
	},


	//--------------------------------------------------------------------------------------------------
	// Get real coordinate of some pixel on canvas
	//--------------------------------------------------------------------------------------------------
	getCoordinateFrom: function(x, y) {
		var z = this._zoom,
			px = this._pan.x,
			py = this._pan.y;

		return {
			x: (x - px) / z,
			y: (y - py) / z
		};
	},


	//--------------------------------------------------------------------------------------------------
	// Get pixel color from coordinate
	//--------------------------------------------------------------------------------------------------
	getPixel: function(x, y) {
		var pixel = this._sprite.getImageData(x, y, 1, 1).data;

		return {
			r: pixel[0],
			g: pixel[1],
			b: pixel[2],
			a: pixel[3],
		};
	}
};