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
});