/* *********************************************************************************************** *
 * GraphicObject
 * =============================================================================================== *
 * Base class for all graphic objects
 * *********************************************************************************************** */
export default GraphicObject;


function GraphicObject(settings) {

	this.sprite = settings.sprite;
	this.fill = settings.fill;
	this.stroke = settings.stroke;
	this.line = settings.line || 1;
	this.x = settings.x || 0;
	this.y = settings.y || 0;
	this.r = settings.r || 0;
	this.opacity = settings.opacity || 1;

	this.shadow = settings.shadow || false;
}

//--------------------------------------------------------------------------------------------------

GraphicObject.prototype = {


	constructor: GraphicObject,


	//--------------------------------------------------------------------------------------------------
	// Transforming (rotation)
	//--------------------------------------------------------------------------------------------------
	transform: function(sprite) {
		this.sprite = sprite || this.sprite;
		this.sprite.translate(this.x, this.y);
		this.sprite.rotate(this.r);
		this.sprite.translate(-this.x, -this.y);
	},


	//--------------------------------------------------------------------------------------------------
	// Set object style
	//--------------------------------------------------------------------------------------------------
	stylize: function(sprite) {
		this.sprite = sprite || this.sprite;
		this.sprite.fillStyle = this.fill;
		this.sprite.strokeStyle = this.stroke;
		this.sprite.lineWidth = this.line;
	//	this.sprite.lineJoin = 'miter|round|bevel';
	//	this.sprite.lineCap = 'butt|round|square';
		this.sprite.globalAlpha = this.opacity;

		if(this.shadow) {
			this.sprite.shadowColor = this.shadow.color;
			this.sprite.shadowBlur = this.shadow.blur;
			this.sprite.shadowOffsetX = this.shadow.x;
			this.sprite.shadowOffsetY = this.shadow.y;
		}
	},


	//--------------------------------------------------------------------------------------------------
	// Drawing method
	//--------------------------------------------------------------------------------------------------
	draw: function(sprite) {
		this.sprite = sprite || this.sprite;
		if (this.stroke !== null) { this.sprite.stroke(); }
		if (this.fill instanceof window.HTMLImageElement) {
			this.sprite.clip();
			this.sprite.drawImage(this.fill, this.x-this.fill.width/2, this.y-this.fill.height/2 );
		} else if (this.fill !== null) { this.sprite.fill(); }
	},


	//--------------------------------------------------------------------------------------------------
	// Drawing object
	//--------------------------------------------------------------------------------------------------
	render: function(sprite) {
		this.sprite = sprite || this.sprite;
		this.sprite.save();
		this.transform(sprite);
		this.stylize(sprite);
		this.shaped(sprite);
		this.draw(sprite);
		this.sprite.restore();
	},


	//--------------------------------------------------------------------------------------------------
	// Shaped method
	//--------------------------------------------------------------------------------------------------
	shaped: function() {}
};