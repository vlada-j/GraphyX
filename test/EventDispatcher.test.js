describe('GraphyX.EventDispatcher tests', function(){

	//--------------------------------------------------------------------------------------------------

	it('Definition', function(){
		expect(typeof GraphyX.EventDispatcher).toBe('function');

		let ev = new GraphyX.EventDispatcher();
		expect(typeof ev).toBe('object');
		expect(ev instanceof GraphyX.EventDispatcher).toBe(true);


		expect(typeof ev.addEventListener).toBe('function');
		expect(typeof ev.removeEventListener).toBe('function');
		expect(typeof ev.hasEventListener).toBe('function');
		expect(typeof ev.dispatchEvent).toBe('function');
	});

	//--------------------------------------------------------------------------------------------------

	it('Add and remove event', function() {
		let ev = new GraphyX.EventDispatcher();

		expect( ev.hasEventListener('some_event', handler) ).toBe(false);
		ev.addEventListener('some_event', handler);
		expect( ev.hasEventListener('some_event', handler) ).toBe(true);
		ev.removeEventListener('some_event', handler);
		expect( ev.hasEventListener('some_event', handler) ).toBe(false);

		function handler() {}
	});

	//--------------------------------------------------------------------------------------------------

	it('Trigger event', function() {
		let ev = new GraphyX.EventDispatcher();
		let scope = {
			handler: function() {}
		};

		ev.addEventListener('some_event', scope.handler);
		spyOn(scope, 'handler');
		ev.dispatchEvent({type:'some_event'});

	});

	//--------------------------------------------------------------------------------------------------

	it('Inheritance', function() {

		class TestObject extends GraphyX.EventDispatcher {
			constructor() {
				super();
				this.handler = function() {};
			}
		}

		let to = new TestObject();

		expect(typeof to.addEventListener).toBe('function');
		expect(typeof to.removeEventListener).toBe('function');
		expect(typeof to.hasEventListener).toBe('function');
		expect(typeof to.dispatchEvent).toBe('function');

		to.addEventListener('some_event', to.handler);
		spyOn(to, 'handler');
		to.dispatchEvent({type:'some_event'});

	});
});
