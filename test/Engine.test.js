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

		gx.objects.push(new GraphyX.objects.Line({points:[{x:0, y:0}, {x:10, y:10}], stroke:'white'}));
		gx.refresh();
		expect( canvas.getContext('2d').isPointInStroke(position.x, position.y) ).toBe(true);
		gx.scroll(100,100);
		expect( canvas.getContext('2d').isPointInStroke(100, 100) ).toBe(true);

		gx.scroll(200);
		expect( canvas.getContext('2d').isPointInStroke(200, 100) ).toBe(true);

		gx.scroll(undefined, 300);
		expect( canvas.getContext('2d').isPointInStroke(200, 300) ).toBe(true);
	});

	//--------------------------------------------------------------------------------------------------

	it('Zooming', function(){
		let canvas = document.createElement('canvas');
		let gx = new GraphyX.Engine({canvas:canvas});
		let ctx = canvas.getContext('2d');

		gx.objects.push(new GraphyX.objects.Line({points:[{x:0, y:0}, {x:10, y:10}], stroke:'white'}));
		gx.refresh();
		expect( ctx.isPointInStroke(canvas.width / 2, canvas.height / 2) ).toBe(true);
		expect( ctx.isPointInStroke(canvas.width / 2 + 10, canvas.height / 2 + 10) ).toBe(true);

		gx.zoom(200);
		expect( ctx.isPointInStroke(canvas.width / 2, canvas.height / 2) ).toBe(true);
		expect( ctx.isPointInStroke(canvas.width / 2 + 20, canvas.height / 2 + 20) ).toBe(true);
	});
});