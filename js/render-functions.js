var sizes = new Array();
var loaded_sizes = new Array();
var last_width = $(window).width();
var width;

// Configuration
var inherit = true; //set to false if you don't want inherited loading.

//Initialization function
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

//Set the rendering wiht inherit = true;
function inherit_render() {
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

//Set the rendering wiht inherit = false;
function specific_render() {
	if(width >= versions.tablet){
		sizes[0] = 'Tablet';
	}
	if(width >= versions.desktop){
		sizes[0] = 'Desktop';
	}
	if(width >= versions.bigscreen){
		sizes[0] = 'Bigscreen';
	}
	if(width >= versions.hdtv){
		sizes[0] = 'Hdtv';
	}
	renderFor(sizes);
}

function in_array(array, p_val) {
    for(var i = 0, l = array.length; i < l; i++) {
        if(array[i] == p_val) {
            rowid = i;
            return true;
        }
    }
    return false;
}

//Call the rendering
function renderFor(opt){
	for (var i in a = opt){
		if(!in_array(loaded_sizes,a[i])) {
			loaded_sizes.push(a[i]);
			$("body").lazyRender({label:a[i]});
		}
	}
}

//Does the whole process
function showContent(){
	renderInit();
	if(width != last_width) {
		last_width = width;
		(inherit == true) ? inherit_render() : specific_render();
	}
}

//Init an Interval
//Change the delay the way you want to, 10 seconds seems nice to me, little delay but it's okay
var renderInterval = setInterval("showContent()",1000);

//Show the content
renderInit();
(inherit == true) ? inherit_render() : specific_render();
last_width = width;