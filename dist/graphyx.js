!function(){"use strict";function t(){this.addEventListener=function(t,i){void 0===this._listeners&&(this._listeners={});var e=this._listeners;void 0===e[t]&&(e[t]=[]),-1===e[t].indexOf(i)&&e[t].push(i)},this.hasEventListener=function(t,i){if(void 0===this._listeners)return!1;var e=this._listeners;return void 0!==e[t]&&-1!==e[t].indexOf(i)},this.removeEventListener=function(t,i){if(void 0!==this._listeners){var e=this._listeners[t];if(void 0!==e){var s=e.indexOf(i);-1!==s&&e.splice(s,1)}}},this.dispatchEvent=function(t){if(void 0!==this._listeners){var i=this._listeners[t.type];if(void 0!==i){t.target=this;for(var e=i.slice(0),s=0,n=e.length;s<n;s++)e[s].call(this,t)}}}}function i(t){this.sprite=t.sprite,this.fill=t.fill,this.stroke=t.stroke,this.line=t.line||1,this.x=t.x||0,this.y=t.y||0,this.r=t.r||0,this.opacity=t.opacity||1,this.shadow=t.shadow||!1}function e(i){t.call(this),this._settings=i,this._canvas=null,this._sprite=null,this.CANVAS_WIDTH=0,this.CANVAS_HEIGHT=0,this._zoom=1,this._pan={x:0,y:0},this._isRun=!1,this._lastTimestamp=0,this._fps=0,this._onUpdate=function(){},this.init(i)}function s(t){t=t||{},this.radius=t.radius||10,i.call(this,t)}function n(t){t=t||{},this.width=t.width||20,this.height=t.height||10,i.call(this,t)}function o(t){t=t||{},this.points=t.points||[],i.call(this,t),this.fill=null}function r(t){t=t||{},this.points=t.points||[],o.call(this,t),this.fill=t.fill}function h(t){t=t||{},this.width=t.width||10,this.height=t.height||10,i.call(this,t),t.src instanceof window.HTMLImageElement?this.img=t.src:(this.img=new window.Image(this.width,this.height),this.img.src=t.src||"")}function a(t,i){t=t||{},i=i||{};for(var e in i)i.hasOwnProperty(e)&&(t[e]=c(i[e])?a(t[e],i[e]):void 0===t[e]?i[e]:t[e]);return t}function c(t){return"object"==typeof t&&null!==t&&t.constructor===Object&&"[object Object]"===Object.prototype.toString.call(t)}function p(){_=Box2D.Common.Math.b2Vec2,m=Box2D.Dynamics.b2World,v=Box2D.Dynamics.b2DebugDraw,w=Box2D.Dynamics.b2Body,g=Box2D.Dynamics.b2BodyDef,b=Box2D.Dynamics.b2FixtureDef,x=Box2D.Collision.Shapes.b2PolygonShape,D=Box2D.Collision.Shapes.b2CircleShape,A=Box2D.Collision.b2AABB,S=Box2D.Dynamics.Joints.b2RevoluteJointDef}function u(i){p(),t.call(this),this.CANVAS_WIDTH,this.CANVAS_HEIGHT,this.SCALE,this._settings=a(i,u.default),this._isRun=!1,this._world,this._canvas,this._sprite,this._debugDraw,this._control,this.init(i)}function l(t,e,s){this.type=t.type,this.density=t.density,this.friction=t.friction,this.restitution=t.restitution,this.scale=s;var n=this;this.addToWorld=function(t){var i=n.scale,e={x:n.x/i,y:n.y/i,type:n.type},s=n.shape,o={density:n.density,friction:n.friction,restitution:n.restitution,shape:s},r=n.data;n.body=(t||n.physics).createBody(e,o,r)},this.draw=function(){i.prototype.draw.call(n),n.update()},this.update=function(){var t=e.getBodyDetails(n.body);n.x=t.x*s,n.y=t.y*s,n.r=t.a},e&&(this.physics=e,this.addToWorld(e))}function d(t,i,e){t=t||{},s.call(this,t),this.shape={type:"circle",r:t.radius/e},l.call(this,t,i,e)}function y(t,i,e){t=t||{},n.call(this,t),this.shape={type:"box",w:t.width/e,h:t.height/e},l.call(this,t,i,e)}function f(t,i,e){t=t||{},r.call(this,t),this.shape=this.points.map(function(t){return{x:t.x/e,y:t.y/e}}),l.call(this,t,i,e)}i.prototype={constructor:i,transform:function(t){this.sprite=t||this.sprite,this.sprite.translate(this.x,this.y),this.sprite.rotate(this.r),this.sprite.translate(-this.x,-this.y)},stylize:function(t){this.sprite=t||this.sprite,this.sprite.fillStyle=this.fill,this.sprite.strokeStyle=this.stroke,this.sprite.lineWidth=this.line,this.sprite.globalAlpha=this.opacity,this.shadow&&(this.sprite.shadowColor=this.shadow.color,this.sprite.shadowBlur=this.shadow.blur,this.sprite.shadowOffsetX=this.shadow.x,this.sprite.shadowOffsetY=this.shadow.y)},draw:function(t){this.sprite=t||this.sprite,null!==this.stroke&&this.sprite.stroke(),this.fill instanceof window.HTMLImageElement?(this.sprite.clip(),this.sprite.drawImage(this.fill,this.x-this.fill.width/2,this.y-this.fill.height/2)):null!==this.fill&&this.sprite.fill()},render:function(t){this.sprite=t||this.sprite,this.sprite.save(),this.transform(t),this.stylize(t),this.shaped(t),this.draw(t),this.sprite.restore()},shaped:function(){}},e.prototype={constructor:e,objects:[],init:function(){var t,i,e=this._settings;i=(t="string"==typeof e.canvas?document.querySelector(e.canvas):e.canvas).getContext("2d"),this.CANVAS_WIDTH=t.width,this.CANVAS_HEIGHT=t.height,this._zoom=e.zoom||this._zoom,this._pan={x:this.CANVAS_WIDTH/2,y:this.CANVAS_HEIGHT/2},this._settings=e,this._canvas=t,this._sprite=i,this._isRun=!1},resize:function(t,i){this._canvas.width=this.CANVAS_WIDTH=t,this._canvas.height=this.CANVAS_HEIGHT=i,this._pan={x:t/2,y:i/2}},start:function(){this._isRun||(this._isRun=!0,this._lastTimestamp=(new Date).getTime(),this.loop())},stop:function(){this._isRun=!1},loop:function(){var t=this,i=(new Date).getTime(),e=i-this._lastTimestamp;this._fps=parseInt(1e3/e),this._lastTimestamp=i,this._isRun&&window.requestAnimationFrame(function(){t.loop.call(t)}),this.refresh(e)},onUpdate:function(t){var i=this._onUpdate;this._onUpdate=function(){i(),"function"==typeof t&&t()}},draw:function(){var t=this;t.clear(),t.objects instanceof Array&&t.objects.forEach(function(e){e instanceof i&&e.render(t._sprite)})},clear:function(){this._sprite.setTransform(1,0,0,1,0,0),"number"==typeof this._fade?(this._sprite.fillStyle="rgba(0,0,0,"+this._fade+")",this._sprite.beginPath(),this._sprite.fillRect(0,0,this.CANVAS_WIDTH,this.CANVAS_WIDTH),this._sprite.closePath(),this._sprite.fill()):this._sprite.clearRect(0,0,this.CANVAS_WIDTH,this.CANVAS_WIDTH),this._sprite.translate(this._pan.x,this._pan.y),this._sprite.scale(this._zoom,this._zoom)},refresh:function(t){this.clear(),this.draw(),this.dispatchEvent({type:"update",target:this,delta:t,fps:this._fps})},scroll:function(t,i){if(void 0===t&&void 0===i)return this._pan;this._pan.x=t||this._pan.x,this._pan.y=i||this._pan.y,this._isRun||this.refresh()},zoom:function(t){if(void 0===t)return 100*this._zoom;this._zoom=t/100||this._zoom,this._isRun||this.refresh()},getCoordinateFrom:function(t,i){var e=this._zoom;return{x:(t-this._pan.x)/e,y:(i-this._pan.y)/e}}},s.prototype=Object.create(i.prototype),s.prototype.constructor=s,s.prototype.shaped=function(t){this.sprite=t||this.sprite,this.sprite.beginPath(),this.sprite.arc(this.x,this.y,this.radius,0,2*Math.PI),this.sprite.closePath()},n.prototype=Object.create(i.prototype),n.prototype.constructor=n,n.prototype.shaped=function(t){this.sprite=t||this.sprite,this.sprite.beginPath(),this.sprite.rect(this.x-this.width/2,this.y-this.height/2,this.width,this.height),this.sprite.closePath()},o.prototype=Object.create(i.prototype),o.prototype.constructor=o,o.prototype.shaped=function(t){this.sprite=t||this.sprite;var i=this.points;this.sprite.beginPath(),this.sprite.moveTo(this.x+i[0].x,this.y+i[0].y);for(var e=1;e<i.length;e++)this.sprite.lineTo(i[e].x+this.x,i[e].y+this.y)},r.prototype=Object.create(o.prototype),r.prototype.constructor=r,r.prototype.shaped=function(t){this.sprite=t||this.sprite,o.prototype.shaped.call(this),this.sprite.closePath()},(h.prototype=Object.create(i.prototype)).constructor=h,h.prototype.shaped=function(t){this.sprite=t||this.sprite,this.sprite.drawImage(this.img,this.x-this.img.width/2,this.y-this.img.height/2,this.width,this.height)};var _,m,v,w,g,b,x,D,A,S,B={extend:a,isPlainObject:c};u.prototype={constructor:u,init:function(t){var i,e,s;a(t,this._settings),s=(i="string"==typeof t.canvas?document.querySelector(t.canvas):t.canvas).getContext("2d"),e=t.gravity,e=new _((e="object"==typeof e?e:{x:0,y:e}).x,e.y),this.CANVAS_WIDTH=i.width,this.CANVAS_HEIGHT=i.height,this.SCALE=t.scale,this._settings=t,this._canvas=i,this._sprite=s,this._gravity=e,this._isRun=!1,this._debugDrawEnabled=!!t.debugDraw,this._control=this.setDirectControl(),this._control[t.directControl?"turnOn":"turnOff"]()},createWorld:function(){var t=this;this._world=new m(this._gravity,!0),this._debugDrawEnabled&&(this._debugDraw=this.createDebugDraw({sprite:t._sprite,scale:t.SCALE,alpha:.5,lineThickness:1}),this._world.SetDebugDraw(this._debugDraw))},createDebugDraw:function(t){var i=new v;return i.SetSprite(t.sprite),i.SetDrawScale(t.scale),i.SetFillAlpha(t.alpha),i.SetLineThickness(t.lineThickness),i.SetFlags(v.e_shapeBit|v.e_jointBit),this._debugDrawEnabled=!0,i},start:function(){this._isRun||(this._isRun=!0,this.update())},stop:function(){this._isRun=!1},update:function(t){var i=this;this._isRun&&window.requestAnimationFrame(function(){i.update.call(i)}),this._control.update(),t=t||1/30,this._world.Step(t,8,3),this._debugDrawEnabled&&this._world.DrawDebugData(),this._world.ClearForces()},setDirectControl:function(){function t(t){h=a._canvas.getBoundingClientRect(),o=!0,e(t),document.addEventListener("mousemove",e,!0),document.addEventListener("touchmove",e,!0)}function i(){document.removeEventListener("mousemove",e,!0),document.removeEventListener("touchmove",e,!0),o=!1,s=void 0,n=void 0}function e(t){var i,e,o;if(t.clientX)i=t.clientX,e=t.clientY;else{if(!(t.changedTouches&&t.changedTouches.length>0))return;var r=t.changedTouches[t.changedTouches.length-1];i=r.clientX,e=r.clientY}o=ge.getCoordinateFrom(i-h.left,e-h.top),s=o.x/a.SCALE,n=o.y/a.SCALE,t.preventDefault()}var s,n,o,r,h=this._canvas.getBoundingClientRect(),a=this;return{turnOn:function(){document.addEventListener("mousedown",t,!0),document.addEventListener("touchstart",t,!0),document.addEventListener("mouseup",i,!0),document.addEventListener("touchend",i,!0)},turnOff:function(){o=!1,document.removeEventListener("mousedown",t,!0),document.removeEventListener("touchstart",t,!0),document.removeEventListener("mouseup",i,!0),document.removeEventListener("touchend",i,!0)},update:function(){if(o&&!r){var t=a.getBodyAt(s,n);if(t){var i=new Box2D.Dynamics.Joints.b2MouseJointDef;i.bodyA=a._world.GetGroundBody(),i.bodyB=t,i.target.Set(s,n),i.collideConnected=!0,i.maxForce=300*t.GetMass(),r=a._world.CreateJoint(i),t.SetAwake(!0)}}r&&(o?r.SetTarget(new _(s,n)):(a._world.DestroyJoint(r),r=null))}}},getBodyList:function(){function t(e){e&&(i.push(e),t(e.GetNext()))}var i=[];return t(this._world.GetBodyList()),i},getBodyDetails:function(t){function i(t){if(t){var e=t.GetShape();n.push({type:t.GetType(),density:t.GetDensity(),friction:t.GetFriction(),shape:0===e.GetType()?{type:"circle",radius:e.GetRadius()}:{type:"polygon",points:e.GetVertices().map(function(t){return{x:t.x,y:t.y}})}}),i(t.GetNext())}}var e=["static","kinematic","dynamic"][t.GetType()],s=t.GetPosition(),n=[];return i(t.GetFixtureList()),{x:s.x,y:s.y,a:t.GetAngle(),type:e,data:t.GetUserData(),fixtures:n}},getBodyAt:function(t,i){var e=new _(t,i),s=new A;s.lowerBound.Set(t-.001,i-.001),s.upperBound.Set(t+.001,i+.001);var n=null;return this._world.QueryAABB(function(t){return t.GetBody().GetType()===w.b2_staticBody||!t.GetShape().TestPoint(t.GetBody().GetTransform(),e)||(n=t.GetBody(),!1)},s),n},createBody:function(t,i,e){var s=this,n={s:w.b2_staticBody,static:w.b2_staticBody,k:w.b2_kinematicBody,kinematic:w.b2_kinematicBody,d:w.b2_dynamicBody,dynamic:w.b2_dynamicBody};i=i||[];var o=new g;o.type=n[t.type],o.position.x=t.x,o.position.y=t.y,void 0!==e&&(o.userData=e),"object"!=typeof i||i instanceof Array||(i=[i]);var r=this._world.CreateBody(o);return i.forEach(function(t){r.CreateFixture(s.createFixture(t))}),r},createFixture:function(t){var i=new b;return i.density=t.density,i.friction=t.friction,i.restitution=t.restitution,i.shape=this.createShape(t.shape),i},createShape:function(t){var i=new x;switch(t.type){case"box":i.SetAsBox(t.w/2,t.h/2);break;case"edge":i.SetAsEdge(new _(t.x1,t.y1),new _(t.x2,t.y2));break;case"circle":i=new D(t.r);break;default:var e=[];t.forEach(function(t){e.push(new _(t.x,t.y))}),i.SetAsArray(e,e.length)}return i},addRevoluteJoint:function(t,i,e){var s=new S;s.Initialize(t,i,t.GetWorldCenter()),e&&e.motorSpeed&&(s.motorSpeed=e.motorSpeed,s.maxMotorTorque=e.maxMotorTorque,s.enableMotor=!0),this._world.CreateJoint(s)},applyImpulse:function(t,i,e){t.ApplyImpulse(new _(Math.cos(i*(Math.PI/180))*e,Math.sin(i*(Math.PI/180))*e),t.GetWorldCenter())}},u.default={scale:30,gravity:9.8},l.prototype=Object.create(i.prototype),l.prototype.constructor=l,(d.prototype=Object.create(s.prototype)).constructor=d,(y.prototype=Object.create(n.prototype)).constructor=y,(f.prototype=Object.create(r.prototype)).constructor=f,window.GraphyX={VERSION:"0.1",Engine:e,objects:{GraphicObject:i,Circle:s,Rect:n,Line:o,Polygon:r,Image:h},Physics:u,physicObjects:{PhysicObject:l,Circle:d,Rect:y,Polygon:f},utility:B}}();
