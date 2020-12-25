var cloud, balloon1, balloon2, n = 0,
	gx = new GraphyX.Engine( {canvas: '#MyCanvas'} ),
	resource = GraphyX.utility.imagesLoader( ['cloud.png', 'balloon-red.png', 'balloon-blue.png'], init );

gx.addEventListener('update', onUpdate);


function init() {
	balloon1 = new GraphyX.objects.Rect({
		x:0,
		y:400,
		width:94,
		height:148,
		fill: resource['balloon-red.png']
	});
	balloon2 = new GraphyX.objects.Rect({
		x:-550,
		y:300,
		width:94,
		height:148,
		fill: resource['balloon-blue.png']
	});
	cloud = new GraphyX.objects.Rect({
		x:500,
		y:180,
		width:2000,
		height:214,
		fill: resource['cloud.png']
	});

	gx.objects = [balloon1, balloon2, cloud];
	gx.start();
}


function onUpdate(){
	cloud.x = cloud.x <= -500 ? 500 : cloud.x - 1;

	balloon1.x = balloon1.x > 550 ? -550 : balloon1.x + .3;
	balloon1.y = Math.cos(n) * 150 + 70;

	balloon2.x = balloon2.x > 550 ? -550 : balloon2.x + .5;
	balloon2.y = Math.sin(n) * 130 + 80;

	n += 0.005;
}
