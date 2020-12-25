//--------------------------------------------------------------------------------------------------
// Extend object
//--------------------------------------------------------------------------------------------------
export function extend(o1, o2, o3) {
	o1 = o1 || {};
	o2 = o2 || {};
	for(var key in o2) {
		if(o2.hasOwnProperty(key)) {
			o1[key] = isPlainObject(o2[key]) ? extend(o1[key], o2[key]) : o2[key] === undefined ? o1[key] : o2[key];
		}
	}
	if(o3) { extend(o1, o3); }
	return o1;
}


//--------------------------------------------------------------------------------------------------
// Test is a plain object
//--------------------------------------------------------------------------------------------------
export function isPlainObject(obj) {
	return	typeof obj === 'object'
		&& obj !== null
		&& obj.constructor === Object
		&& Object.prototype.toString.call(obj) === '[object Object]';
}


//--------------------------------------------------------------------------------------------------
// Load images
//--------------------------------------------------------------------------------------------------
export function imagesLoader(list, resolve, reject) {
	list = list || {};
	resolve = resolve || function() {};
	reject = reject || function() {};

	var resources = {}, len;

	if (list instanceof Array) {
		list.forEach(function(src) { resources[src] = src; });
		list = resources;
		resources = {};
	}

	len = Object.keys(list).length;
	Object.keys(list).forEach(function(key) {
		var img = new Image(),
			src = list[key];

		img.onload = function() { resources[key] = img; len -= 1; isDone(); };
		img.onerror = reject;
		img.src = src;
	});

	function isDone() {
		if(len === 0) { resolve( resources ); }
	}

	return resources;
}


export default {
	extend: extend,
	isPlainObject: isPlainObject,
	imagesLoader: imagesLoader
};