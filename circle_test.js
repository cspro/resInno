(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.circle_test = function() {
	this.initialize();

	// Layer 1
	this.tfOut = new cjs.Text("Text.", "15px Helvetica", "#666666");
	this.tfOut.lineHeight = 17;
	this.tfOut.lineWidth = 267;
	this.tfOut.setTransform(600,100);

	this.mcCircle = new lib.Circle();
	this.mcCircle.setTransform(300,300);
	this.mcCircle.onClick = function(e) {
		Tween.get( this ).to( { rotation : 120 }, 1000 );
		window.update = true;
	};


	this.addChild(this.mcCircle,this.tfOut);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(80,80,791,440);


// symbols:
(lib.Section3 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#66CC66").s().p("As3GbQAAnJDZlwQBri1CeifQHinjKsAAIAAZwIgBAAI2WM7QjZlwAAnLg");
	this.shape.setTransform(-82.4,-41.1);
	this.shape.cursor = "pointer";

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D6E33").s().p("AxKIkQgBphEjnsQCOjwDTjUIABgBQKCqEOQAAIAAD6QsoAAo5I7Qi8C8h+DWQkCGxAAIeQAAIeECGzIjZB+QkjnrABpkg");
	this.shape_1.setTransform(-109.9,-54.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#339933").s().p("AvOHmQAAocECm0QB+jVC8i8QI5o7MoAAIAAEsQqsAAniHjQieCfhrC1QjZFuAAHLQAAHLDZFwIkECWQkCmzAAoeg");
	this.shape_2.setTransform(-97.4,-48.5);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-219.9,-219.9,220,330.3);


(lib.Section2 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#004386").s().p("AJQX2QECm0AAoeQAAoekCmxQh+jWi8i8Qo5o7soAAIAAj6QOQAAKCKEQDUDUCODxQEjHsgBJhQAAJjkiHsg");
	this.shape.setTransform(110,-54.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3299CC").s().p("As3GbIgBAAIABAAIAA5wQKrAAHhHjQCfCfBqC2QDWFtAFHLIAAAQIAAAFQgKHBjRFlg");
	this.shape_1.setTransform(82.5,-41.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#336699").s().p("AHIUgQDRllAJnAIAAgGIAAgPQgEnNjWlsQhri2ieieQnhnjqsAAIAAksQMoAAI5I7QC8C8B+DWQECGzAAIcQAAIekCGzg");
	this.shape_2.setTransform(97.5,-48.5);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,-219.9,220,330.3);


(lib.Section1 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#783200").s().p("A4SggQjUjTiOjxIDZh+QB+DWC8C7QI7I6MmAAQMnAAI7o5IABgBIADgCQC5i7B9jUIDZB+QiODwjUDUQqEKDuPAAQuOAAqEqDg");
	this.shape.setTransform(0,158.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CC6666").s().p("AyNFVQififhri1IWXs4IAAAAIWYM4QhrC2ieCeIgBAAIgCADQniHgqqAAQqqAAnjnjg");
	this.shape_1.setTransform(0,82.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#993300").s().p("A1hgIQi8i8h+jWIEEiWQBrC1CeCfQHkHhKqAAQKpAAHineIADgDIABAAQCeieBqi2IEFCXQh9DTi5C7IgEADIAAAAQo7I5snAAQsmAAo7o5gAWOhyIAAABIAAgBgARihyIABAAIAAgBg");
	this.shape_2.setTransform(0,138.8);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-190.9,0.1,382,220);


(lib.Circle = function() {
	this.initialize();

	// Section1
	this.mcSection1 = new lib.Section1();

	// Section2
	this.mcSection2 = new lib.Section2();

	// Section3
	this.mcSection3 = new lib.Section3();

	this.addChild(this.mcSection3,this.mcSection2,this.mcSection1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-219.9,-219.9,440,440);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;