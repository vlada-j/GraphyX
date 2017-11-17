describe('GraphyX.utility tests', function() {

	//--------------------------------------------------------------------------------------------------

	it('Utility definition', function() {
		expect(typeof GraphyX.utility).toBe('object');
	});

	//--------------------------------------------------------------------------------------------------

	it('isPlainObject', function() {
		expect(typeof GraphyX.utility.isPlainObject).toBe('function');
		expect( GraphyX.utility.isPlainObject( {} ) ).toBe(true);
		expect( GraphyX.utility.isPlainObject( { a:132 } ) ).toBe(true);
		expect( GraphyX.utility.isPlainObject( { a:[1,3,2] } ) ).toBe(true);

		expect( GraphyX.utility.isPlainObject( null ) ).toBe(false);
		expect( GraphyX.utility.isPlainObject( [] ) ).toBe(false);
		expect( GraphyX.utility.isPlainObject( 0 ) ).toBe(false);
		expect( GraphyX.utility.isPlainObject( '' ) ).toBe(false);
		expect( GraphyX.utility.isPlainObject( true ) ).toBe(false);
		expect( GraphyX.utility.isPlainObject( false ) ).toBe(false);
		expect( GraphyX.utility.isPlainObject( Infinity ) ).toBe(false);
		expect( GraphyX.utility.isPlainObject( NaN ) ).toBe(false);
		expect( GraphyX.utility.isPlainObject( 'foo' ) ).toBe(false);
		expect( GraphyX.utility.isPlainObject( function(){} ) ).toBe(false);
		expect( GraphyX.utility.isPlainObject( new function foo(){} ) ).toBe(false);
		expect( GraphyX.utility.isPlainObject( document.createElement('div') ) ).toBe(false);
	});

	//--------------------------------------------------------------------------------------------------

	it('extend - basic', function() {
		expect(typeof GraphyX.utility.extend).toBe('function');

		var a = { a: 123, c: 'foo', bool:true, n:false },
			b = { b: 456, c: 'boo', bool:false, n:null },
			ab = GraphyX.utility.extend({}, a, b);

		expect(ab === a).toBe(false);
		expect(ab.a).toBe(123);
		expect(ab.b).toBe(456);
		expect(ab.c).toBe('boo');
		expect(ab.bool).toBe(false);
		expect(ab.n).toBe(null);
	});

	//--------------------------------------------------------------------------------------------------

	it('extend - deep', function() {
		expect(typeof GraphyX.utility.extend).toBe('function');

		var a = { ob: { a:11, c:33 } },
			b = { ob: { b:22, c:44 } },
			ab = GraphyX.utility.extend(a, b);

		expect(ab === a).toBe(true);
		expect(typeof ab.ob).toBe('object');
		expect(ab.ob.a).toBe(11);
		expect(ab.ob.b).toBe(22);
		expect(ab.ob.c).toBe(44);
	});

	//--------------------------------------------------------------------------------------------------

	it('images loader', function() {
		var list = ['./a.png', './b.png', './c.png', './wrong.png'],
			callbacks = {
				ok: function() {console.log('ok');},
				nok: function() {console.log('nok');}
			};

		expect(typeof GraphyX.utility.imagesLoader).toBe('function');
		spyOn(callbacks, 'ok');
		spyOn(callbacks, 'nok');

		var res = GraphyX.utility.imagesLoader(list);
		expect(typeof res).toBe('object');
	});
});