// Get the width of the screen
var sizes = new Array();
var width;
function renderInit(){
	width = $(window).width();
}

//Set an array for the available versions
var versions = {
	tablet: 667,
	desktop: 985,
	bigscreen: 1304,
	hdtv: 1938
};

//Set the rendering
function render() {
	if(width >= versions.tablet){
		sizes.push('Tablet');
	}
	if(width >= versions.desktop){
		sizes.push('Desktop');
	}
	if(width >= versions.bigscreen){
		sizes.push('Bigscreen');
	}
	if(width >= versions.hdtv){
		sizes.push('Hdtv');
	}
	renderFor(sizes);
}

//Call the rendering
function renderFor(opt){
	for (var i in a = opt){
		$("body").lazyRender({label:a[i]});
	}
}

//Does the whole process
function showContent(){
	renderInit();
	render();
}

//Init an Interval
var renderInterval = setInterval("showContent()",500);

//Show the content
showContent();