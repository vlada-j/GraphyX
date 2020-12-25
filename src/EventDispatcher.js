/* *********************************************************************************************** *
 * EVENT DISPATCHER
 * =============================================================================================== *
 * JavaScript events for custom objects by mrdoob
 * https://github.com/mrdoob/eventdispatcher.js/
 * *********************************************************************************************** */

class EventDispatcher {

	constructor() {
		this._listeners = {};
		// this.addEventListener = addEventListener;
		// this.hasEventListener = hasEventListener;
		// this.removeEventListener = removeEventListener;
		// this.dispatchEvent = dispatchEvent;
	}

//--------------------------------------------------------------------------------------------------

	addEventListener(type, listener) {
		if (this._listeners[type] === undefined) {
			this._listeners[type] = [];
		}

		if (this._listeners[type].indexOf(listener) === -1) {
			this._listeners[type].push(listener);
		}
	}

//--------------------------------------------------------------------------------------------------

	hasEventListener(type, listener) {
		return this._listeners[type] !== undefined && this._listeners[type].indexOf(listener) !== -1;
	}

//--------------------------------------------------------------------------------------------------

	removeEventListener(type, listener) {
		let listenerArray = this._listeners[type];

		if(listenerArray !== undefined) {
			let index = listenerArray.indexOf(listener);
			if (index !== -1) { listenerArray.splice(index, 1); }
		}
	}

//--------------------------------------------------------------------------------------------------

	dispatchEvent(event) {
		let listenerArray = this._listeners[event.type];

		if (listenerArray !== undefined) {
			event.target = this;
			let array = listenerArray.slice(0);
			for (let i = 0, l = array.length; i < l; i++) {
				array[i].call(this, event);
			}
		}
	}

}

export default EventDispatcher;
