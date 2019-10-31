var x = 0;

var spacedata;

function setup(){
	createCanvas(200, 200);
	loadJSON("C:\Users\Saloni\Downloads\100283146_00048.json",gotData,'jsonp')
}

function gotData(data)
{
	spacedata = data;
}

function draw(){
	background(0);
	if (spacedata){
		randomSeed(4);
	for(var i=0; i<spacedata.number; i++){
	fill(255);
	ellipse(random(width), random(height), 16, 16);

}
}
}