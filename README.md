MobileReadyFramework
====================

What is that?
-------------

MRF is a simple framework to make mobile ready websites. It's using CSS3 media-queries, JQuery, Lazy Loading, and is ready to be used with LESS (with few handy rules).


Usage : Html
------------

In order to prevent uneeded file loading, your html should only contain the Html elements needed for the mobile version. The elements used in the other version (Tablet, Desktop, Bigscreen, Hdtv) must be added between comments, see the demo.html file.


Usage : Css
-----------

All the files are separated and @imported in the style.css file. Of course it'll be a good idea to merge them when you're done.
The names of the files are pretty straight forward and most of them contain comments.

If Javascript is disabled, the mobile version will be served and with the mobile stylesheet, the responsive design to show HTML elements that can't be loaded with Lazy Loading. For simpler development, the base.css only contains import, but, as always, it's better to merge all the required files and minify them for production.


Usage : Less
------------

The /less folder contains the same files then the /css folder with some mixins already included.
For more informations see http://lesscss.org/

If you use Less.app ( http://incident57.com/less/ Mac only) the style.css will already be production ready due to the import. Highly recommended thought not necessary



Usage : JS
----------

The Html page by default includes JQuery from Google CDN (version needs to be updated) with a local fallback, Modernizr, LazyRender and lazy-functions.js

Lazy-functions.js is the important file here, it makes sure that the content of your Html files will be showed when needed. It's also contains an Interval, feel free to change the delay to whatever you want, default being to 5 secondes (5000ms). You can also disable to interval, this way the content will not be updated automatically if the user resizes his browser.


By default the lazy loading will uncomment element inherently so in the Desktop version, the element loaded in the Tablet version will be loaded too. If you want to avoid this behavior, a variable have been added in render-functions.js (var inheritence), just turn it to false.


To-do
-----


Credits
-------

Made by Justin Marsan ( www.justinmarsan.com )
Original idea form Kahlil Lechelt ( http://kahlillechelt.com/ )
Discussion on Forrst ( http://forrst.com/posts/Perfect_All_Around_Bullet_Proof_CSS_Framework_F-gj4 )
JQuery ( www.jquery.com )
LazyRender ( http://webbricks.org/bricks/jQuery.lazyRender/ )


License
-------

Copyright (C) 2011 by Justin Marsan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.