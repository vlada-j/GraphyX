import EventDispatcher from './EventDispatcher.js';
import Engine from './Engine.js';
import GraphicObject from './objects/GraphicObject.js';
import Circle from './objects/Circle.js';
import Rect from './objects/Rect.js';
import Line from './objects/Line.js';
import Polygon from './objects/Polygon.js';
import Image from './objects/Image.js';
import Physics from './Physics.js';
import utility from './utility.js';
import PhysicObject from './physicObjects/PhysicObject.js';
import PhCircle from './physicObjects/Circle.js';
import PhRect from './physicObjects/Rect.js';
import PhPolygon from './physicObjects/Polygon.js';


window.GraphyX = {
	VERSION: '0.1',
	EventDispatcher: EventDispatcher,
	Engine: Engine,
	objects: {
		GraphicObject: GraphicObject,
		Circle: Circle,
		Rect: Rect,
		Line: Line,
		Polygon: Polygon,
		Image: Image
	},
	Physics: Physics,
	physicObjects: {
		PhysicObject: PhysicObject,
		Circle: PhCircle,
		Rect: PhRect,
		Polygon: PhPolygon
	},
	utility: utility
};