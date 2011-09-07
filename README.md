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

The JS probably is the only *really* new thing this framework provides... To put it simply, it brings media-queries to HTML.

I know what you're thinking : "It's possible to show and hide content with CSS so what the point of it ?" Well the thing is, lots of browsers wil load content even if it's hidden in CSS, if it's a big image you wanted to use on desktop, chances are mobiles will load it too even if it doesn't appear, and this really sucks because mobile phones don't always have good internet connection, and it's useless bandwidth used.

So what mrf-functions.js does is allow you to make some code visible depending on the size of the screen, like I said, media-queries for HTML. To make it simpler, it's using the sizes already set in the CSS media-queries and some keywords so that you don't need to remember the numbers.

*(longer explanations will be there soon)*



Usage : Design
--------------

The framework by default comes with pre-set media-queries and uses sizes from 978.gs for mobile.less tablet.less desktop.less and bigscreen.less... Unfortunately nothing was provided for bigger than that so I made hdtv.less's size myself.

You can download templates for those layouts on www.978.gs


To-do
-----

* Make a great example showing how awesome this framework is

Credits
-------

Made by Justin Marsan ( www.justinmarsan.com )
Original idea form Kahlil Lechelt ( http://kahlillechelt.com/ )
Discussion on Forrst ( http://forrst.com/posts/Perfect_All_Around_Bullet_Proof_CSS_Framework_F-gj4 )
JQuery ( www.jquery.com )
LazyRender ( http://webbricks.org/bricks/jQuery.lazyRender/ ) *this isn't used anymore but have been a good ressource to help me code the actual (raw) JS lazy loading functions*


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