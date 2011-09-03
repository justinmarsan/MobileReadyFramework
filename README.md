MobileReadyFramework
====================

What is it?
-----------

So far, MRF has been a (dead project) uhm, an experiment, I was searching for a way to make cross devices websites with performances in mind... The result is a "big" framework, Javascript and CSS powered that will allow you (if you give it a try) to make websites loading content depending on the browser's size to avoid big files loading on mobile devices and poor quality graphics on bigger screens.

The issue right now is that I feel it is too difficult to use, and does more than it should resulting in a huge pile of code. I'm now in the process of making it cleaner and simpler to use, and as soon as I'm happy with the result, I'll be working on a demo website to show it's power (assuming it has some...).


Usage : Html
------------

These are classic HTML files, the only "new" thing is the code written in comments. This will be un-commented in JS so that only content you want to show is loaded in the visitor's device.


Usage : Css
-----------

I decided that trying to make it easy to use in "bare" CSS and LESS was simply too much work, and a bit pointless so thses files will simply be the raw exports LESS creates. If you want to use those, the only files you will have to work in are base.css and style.css

base.css is the file loaded "by default", it contains the reset, the mobile style and some more code such as third-party libraries.

style.css is the complete one with media-queries, and all the device-specific styles.


Usage : Less
------------

If (like me) you like LESS, than you'll have the benefit of using separated files to code (while they will be exported in base.css and style.css automatically when compiling). The file names are pretty straight-forward, but here is a short list :

base.less imports all the files needed for the base style loaded if JS isn't enabled, including reset, mobile and plugins.

style.less imports all the files of the project including reset, plugin and all the size-specific stylesheets

mobile.less tablet.less desktop.less bigscreen.less and hdtv.less are size-specific stylesheets and contains the media-queries to target the specified sizes.

plugin.less contains the styles you may have to/want to use for third-party scripts such as a JQuery plugin.

For more informations about LESS see http://lesscss.org/

If you're on Mac and like GUI applications more than commande line tools, I recommend Less.app ( http://incident57.com/less/ Mac only) which is great and will allow you to use LESS simply without remembering command line stuff (cman, we all know designers prefer pretty simple things that work rather than the Terminal :p ).



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