const SCALE = 60,
	COLOR_FILL = '#313649', //'#313649',
	COLOR_STROKE = 'transparent'; //'#9ba5c5';

// var gx = new GraphyX.Engine( {canvas: '#MyCanvas'} );
var	physics = new GraphyX.Physics({
		canvas: '#MyCanvas',
		gravity: 9.8, // 9.8 or {x:0, y:9.8}
		scale: SCALE,
		directControl: true,
		debugDrawEnabled: false
	});
var gx = physics;
physics.createWorld();
physics.createWorldBoundaries();

/*makePolygon();
makePolygon();
makePolygon();
makePolygon();
makePolygon();
makePolygon();
makeBox();
makeCircle();
makeBox();
makeCircle();
makeBox();
makeCircle();
makeBox();
makeCircle();
makeBox();
makeCircle();
makeBox();
makeCircle();*/
Car();
gx.objects.push( new GraphyX.physicObjects.Line({
	x:0,
	y:0,
	type:'s',
	friction: 1,
	restitution: 0.1,
	stroke: COLOR_FILL,
	points: [
		{ x:-950, y:300 },
		{ x:-400, y:250 }
	]
}, physics, SCALE) );
gx.objects.push( new GraphyX.physicObjects.Line({
	x:0,
	y:0,
	type:'s',
	friction: 1,
	restitution: 0.1,
	stroke: COLOR_FILL,
	points: [
		{ x:-400, y:250 },
		{ x:0, y:150 }
	]
}, physics, SCALE) );
gx.objects.push( new GraphyX.physicObjects.Line({
	x:0,
	y:0,
	type:'s',
	friction: 1,
	restitution: 0.1,
	stroke: COLOR_FILL,
	points: [
		{ x:0, y:150 },
		{ x:400, y:200 }
	]
}, physics, SCALE) );
gx.objects.push( new GraphyX.physicObjects.Line({
	x:0,
	y:0,
	type:'s',
	friction: 1,
	restitution: 0.1,
	stroke: COLOR_FILL,
	points: [
		{ x:400, y:200 },
		{ x:950, y:400 }
	]
}, physics, SCALE) );

gx.following(0);
gx.addEventListener('update', onUpdate);
gx.start();





function onUpdate(ev) {
//	physics.update(ev.delta/1000);
	Info.innerText = 'FPS: ' + ev.fps;
}

function makeCircle(options) {
	options = GraphyX.utility.extend({}, {
		opacity: .5,
		x:Math.random() * 20-10,
		y:Math.random() * 20-10,
		radius:Math.random() * 20 + 10,
		type:'d',
		fill: COLOR_FILL,
		stroke: COLOR_STROKE,
		density:1.0,
		friction:Math.random(),
		restitution:Math.random()
	}, options);

	gx.objects.push( new GraphyX.physicObjects.Circle(options, physics, SCALE) );
}

function makeBox(options) {
	options = GraphyX.utility.extend({}, {
		x:Math.random() * 20-10,
		y:Math.random() * 20-10,
		width:Math.random() * 50 + 10,
		height:Math.random() * 50 + 10,
		type:'d',
		fill: COLOR_FILL,
		stroke: COLOR_STROKE,
		density:1.0,
		friction:Math.random(),
		restitution:Math.random()
	}, options);

	gx.objects.push( new GraphyX.physicObjects.Rect(options, physics, SCALE) );
}

function makePolygon(options) {
	options = GraphyX.utility.extend({}, {
		x:Math.random() * 20-10,
		y:Math.random() * 20-10,
		type:'d',
		fill: COLOR_FILL,
		stroke: COLOR_STROKE,
		shadow: {
			x: 5,
			y: 5,
			color: 'black',
			blur: 15,
		},
		density:1.0,
		friction:Math.random(),
		restitution:Math.random(),
		points: createPoints()
	}, options);

	gx.objects.push( new GraphyX.physicObjects.Polygon(options, physics, SCALE) );
}

function createPoints(n, r) {
	n = n || Math.round( Math.random() * 5 ) + 3;
	r = r || 30;
	let i, p = [], pr = Math.PI*2/n;
	for(i=0;i<n;i++) {
		p.push( { x:Math.cos(pr * i) * r, y: Math.sin(pr * i) * r } );
	}
	return p;
}

//--------------------------------------------------------------------------------------------------

function Car() {
	var wheel1 = new GraphyX.physicObjects.Circle(
		{
			x:70,
			y:115,
			type:'d',
			radius:12,
			fill: COLOR_FILL,
			stroke: COLOR_STROKE,
			density:1,
			friction:.99
		}, physics, SCALE);
	var wheel2 = new GraphyX.physicObjects.Circle(
		{
			x:130,
			y:115,
			type:'d',
			radius:12,
			fill: COLOR_FILL,
			stroke: COLOR_STROKE,
			density:1,
			friction:.99
		}, physics, SCALE);
	var chassis = new GraphyX.physicObjects.Polygon(
		{
			x:100,
			y:100,
			type:'d',
			fill: COLOR_FILL,
			stroke: COLOR_STROKE,
			density:1,
			friction:.5,
			restitution:.2,
			points: [
				{x:45, y:0},
				{x:45, y:15},
				{x:-45, y:15},
				{x:-45, y:-6},
				{x:-34.5, y:-27},
				{x:0, y:-27}
			]
		}, physics, SCALE);

	physics.addRevoluteJoint(wheel1.body, chassis.body, {motorSpeed:-4, maxMotorTorque:20});
	physics.addRevoluteJoint(wheel2.body, chassis.body, {motorSpeed:-4, maxMotorTorque:20});

	gx.objects.push(chassis);
	gx.objects.push(wheel1);
	gx.objects.push(wheel2);
}
