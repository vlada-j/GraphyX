export function extend(o1, o2) {
	o1 = o1 || {};
	o2 = o2 || {};
	for(var key in o2) {
		if(o2.hasOwnProperty(key)) {
			o1[key] = isPlainObject(o2[key]) ? extend(o1[key], o2[key]) : o1[key] === undefined ? o2[key] : o1[key];
		}
	}
	return o1;
}

export function isPlainObject(obj) {
	return	typeof obj === 'object'
		&& obj !== null
		&& obj.constructor === Object
		&& Object.prototype.toString.call(obj) === '[object Object]';
}

export default {
	extend: extend,
	isPlainObject: isPlainObject
};