describe('GraphyX.Engine tests', function(){

	//--------------------------------------------------------------------------------------------------

	it('Definition', function(){
		expect(typeof GraphyX.Engine).toBe('function');

		let gx = new GraphyX.Engine({canvas: document.createElement('canvas')});

		expect(typeof gx).toBe('object');
		expect(gx instanceof GraphyX.Engine).toBe(true);

		expect(typeof gx.addEventListener).toBe('function');
		expect(typeof gx.removeEventListener).toBe('function');
		expect(typeof gx.hasEventListener).toBe('function');
		expect(typeof gx.dispatchEvent).toBe('function');
	});

	//--------------------------------------------------------------------------------------------------

	it('Creation - with canvas from DOM', function(){
		let canvas = document.createElement('canvas');
		canvas.id = 'MyCanvas';
		document.body.appendChild(canvas);

		let gx = new GraphyX.Engine({canvas:'#MyCanvas'});
		expect(gx._canvas).toBe(canvas);
	});

	//--------------------------------------------------------------------------------------------------

	it('Creation - from canvas element', function(){
		let canvas = document.createElement('canvas');

		let gx = new GraphyX.Engine({canvas:canvas});
		expect(gx._canvas).toBe(canvas);
	});

	//--------------------------------------------------------------------------------------------------

	it('Resize', function(){
		let canvas = document.createElement('canvas');
		let gx = new GraphyX.Engine({canvas:canvas});
		gx.resize(800, 600);
		expect(canvas.width).toBe(800);
		expect(canvas.height).toBe(600);
	});

	//--------------------------------------------------------------------------------------------------

	it('Object list', function(){
		let gx = new GraphyX.Engine({canvas:document.createElement('canvas')});
		expect(gx.objects instanceof Array).toBe(true);
		expect(gx.objects.length).toBe(0);
	});

	//--------------------------------------------------------------------------------------------------

	it('Drawing', function(){
		let canvas = document.createElement('canvas');
		let gx = new GraphyX.Engine({canvas:canvas});

		spyOn(gx, 'clear');
		spyOn(gx, 'draw');
		gx.refresh();
	});

	//--------------------------------------------------------------------------------------------------

	it('Scrolling', function(){
		let canvas = document.createElement('canvas');
		let gx = new GraphyX.Engine({canvas:canvas});
		let position = gx.scroll();

		gx.objects.push(new GraphyX.objects.Line({points:[{x:0, y:0}, {x:10, y:0}], line:2, stroke:'white'}));
		gx.refresh();
		expect( canvas.getContext('2d').isPointInPath(position.x, position.y) ).toBe(true);

		gx.scroll(100,100);
		expect( canvas.getContext('2d').isPointInPath(100, 100) ).toBe(true);

		gx.scroll(200);
		expect( canvas.getContext('2d').isPointInPath(200, 100) ).toBe(true);

		gx.scroll(null, 300);
		expect( canvas.getContext('2d').isPointInPath(200, 300) ).toBe(true);
	});

	//--------------------------------------------------------------------------------------------------

	it('Zooming', function(){
		let canvas = document.createElement('canvas');
		let gx = new GraphyX.Engine({canvas:canvas});
		let ctx = canvas.getContext('2d');

		gx.objects.push(new GraphyX.objects.Line({points:[{x:0, y:0}, {x:10, y:10}], stroke:'white'}));
		gx.refresh();
		expect( ctx.isPointInPath(canvas.width / 2, canvas.height / 2) ).toBe(true);
		expect( ctx.isPointInPath(canvas.width / 2 + 10, canvas.height / 2 + 10) ).toBe(true);

		gx.zoom(200);
		expect( ctx.isPointInPath(canvas.width / 2, canvas.height / 2) ).toBe(true);
		expect( ctx.isPointInPath(canvas.width / 2 + 20, canvas.height / 2 + 20) ).toBe(true);
	});

	//--------------------------------------------------------------------------------------------------

	it('Get real coordinate', function(){
		let canvas = document.createElement('canvas');
		let gx = new GraphyX.Engine({canvas:canvas});

		gx.resize(100, 100);
		let cord = gx.getCoordinateFrom(0, 0);
		expect(cord.x).toBe(-50);
		expect(cord.y).toBe(-50);

		cord = gx.getCoordinateFrom(100, 100);
		expect(cord.x).toBe(50);
		expect(cord.y).toBe(50);

		gx.zoom(200);
		cord = gx.getCoordinateFrom(0, 0);
		expect(cord.x).toBe(-25);
		expect(cord.y).toBe(-25);
		cord = gx.getCoordinateFrom(100, 100);
		expect(cord.x).toBe(25);
		expect(cord.y).toBe(25);

		gx.zoom(50);
		cord = gx.getCoordinateFrom(0, 0);
		expect(cord.x).toBe(-100);
		expect(cord.y).toBe(-100);

		gx.zoom(100);
		gx.scroll(0,0);
		cord = gx.getCoordinateFrom(0, 0);
		expect(cord.x).toBe(0);
		expect(cord.y).toBe(0);

		gx.scroll(50,50);
		cord = gx.getCoordinateFrom(0, 0);
		expect(cord.x).toBe(-50);
		expect(cord.y).toBe(-50);

		gx.scroll(20,-30);
		gx.zoom(200);
		cord = gx.getCoordinateFrom(0, 0);
		expect(cord.x).toBe(-10);
		expect(cord.y).toBe(15);
	});

	//--------------------------------------------------------------------------------------------------

	it('Following', function(){
		let canvas = document.createElement('canvas');
		canvas.width = 100;
		canvas.height = 100;
		let gx = new GraphyX.Engine({canvas:canvas});

		let position = {x: gx.scroll().x, y: gx.scroll().y };
		let rect = new GraphyX.objects.Rect({x:0, y:0, width:10, height:10, fill: 'royalblue', stroke: 'cyan'});
		gx.objects.push(rect);

		expect(typeof gx.following).toBe('function');
		expect(gx.following()).toBe(null);

		gx.following(0);
		gx.refresh();

		expect(gx.following()).toBe(rect);
		expect(gx.scroll()).toEqual(position);

		gx.zoom(50);
		rect.x = 100;
		rect.y = 200;
		gx.refresh();

		expect(gx.scroll()).toEqual( {x: position.x - 50, y: position.y - 100} );
	});
});