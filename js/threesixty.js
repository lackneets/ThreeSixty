/*!
 * jQuery ThreeSixty - v 0.1.0 - 2014.02.23
 * http://lackneets.tw
 * Copyright 2014 Lackneets
 * Inspired by Apple, http://heartcode.robertpataki.com/360-image-slider
 */


 jQuery.fn.extend({
 	threeSixty: function(_options){

 		function zeroPadding(num,len){ return (String(num).length >= len) ? String(num) : zeroPadding('0'+String(num), len); }

 		var options = {
 			element: this,
 			filename: 'images/example_##.jpg',
 			frames: 26,
 			startFrame: -20,
 			reverse: false
 		}

 		var ready = false,
 		dragging = false,
 		pointerStartPosX = 0,
 		pointerEndPosX = 0,
 		pointerDistance = 0,
 		monitorStartTime = 0,
 		monitorInt = 10,
 		ticker = 0,
 		speedMultiplier = 10,
 		spinner,
 		currentFrame = 0,
 		frames = [],
 		endFrame = 0,
 		loadedImages = 0;

 		var wrapper = $('<div/>')
 		.css('cursor', 'col-resize')
 		.css('position', 'relative')
 		.addClass('threeSixty')
 		.appendTo(options.element);

 		var loading = $('<span/>')
 		.appendTo(wrapper)
 		.text('Loading...')
 		.addClass('loading')
 		.css({position: 'absolute', left: '50%', top: '50%', padding: '5px', 'border-radius': '5px', background: 'rgba(0,0,0,0.8)', color: '#CCC', 'font-size':'12px'}); 		

 		loading.css('margin-left', loading.width()/2*-1)
 		
 		
 		

 		$.extend(options, _options);

 		function endOfFrames(){
 			options.frames = loadedImages;
 			imageLoaded();
 		}

 		function loadImage() {
 			var li = document.createElement("li");
 			var numlen = (options.image.match(/[#]+/) || '').toString().length;
 			var num = zeroPadding(loadedImages + 1, numlen);
 			var imageName = options.image.replace(/[#]+/, num);


 			var image = $('<img/>').attr('src', imageName).hide()
 			frames.push(image);
 			$(wrapper).append(image);
 			$(image).load(function() {
 				imageLoaded();
 			});


 		};
 		function imageLoaded() {
 			loadedImages++;
 			loading.text('Loading... ' + Math.ceil(loadedImages/options.frames*100) + '%');
 			if (loadedImages == options.frames) {
 				frames[0].show();
 				$(wrapper).width(frames[0].width())
 				$(loading).fadeOut();
 				showThreesixty();
 			} else {
 				loadImage();
 			}
 		};

 		function showThreesixty () {
 			ready = true;
 			endFrame = options.startFrame;
 			refresh();
 		};
 		function render () {
 			if(currentFrame !== endFrame)
 			{	
 				var frameEasing = endFrame < currentFrame ? Math.floor((endFrame - currentFrame) * 0.1) : Math.ceil((endFrame - currentFrame) * 0.1) ;
 				hidePreviousFrame();
 				currentFrame += frameEasing;
 				showCurrentFrame();
 			} else {
 				window.clearInterval(ticker);
 				ticker = 0;
 			}
 		};

 		function refresh () {
 			if (ticker === 0) {
 				ticker = self.setInterval(render, Math.round(1000 / 60));
 			}
 		};

 		function hidePreviousFrame() {
 			frames[getNormalizedCurrentFrame()].hide();
 		};

 		function showCurrentFrame() {
 			frames[getNormalizedCurrentFrame()].show();
 		};

 		function getNormalizedCurrentFrame() {
 			var c = -Math.ceil(currentFrame % options.frames);
 			if (c < 0) c += (options.frames - 1);
 			return c;
 		};

 		function getPointerEvent(event) {
 			return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
 		};

 		$(wrapper).mousedown(function (event) {
 			event.preventDefault();
 			pointerStartPosX = getPointerEvent(event).pageX;
 			dragging = true;
 		});

 		$(document).mouseup(function (event){
 			event.preventDefault();
 			dragging = false;
 			$(wrapper).css('cursor', 'col-resize')
 		});

 		$(document).mousemove(function (event){
 			event.preventDefault();
 			trackPointer(event);
 		});

 		$(wrapper).on("touchstart", function (event) {
 			event.preventDefault();
 			pointerStartPosX = getPointerEvent(event).pageX;
 			dragging = true;
 		});

 		$(wrapper).on("touchmove", function (event) {
 			event.preventDefault();
 			trackPointer(event);

 		});

 		$(wrapper).on("touchend", function (event) {
 			event.preventDefault();
 			dragging = false;
 			$(wrapper).css('cursor', 'col-resize')
 		});

 		function trackPointer(event) {
 			if (ready && dragging) {

 				pointerEndPosX = getPointerEvent(event).pageX;
 				if(monitorStartTime < new Date().getTime() - monitorInt) {
 					pointerDistance = pointerEndPosX - pointerStartPosX;
 					endFrame = currentFrame + Math.ceil((options.frames - 1) * speedMultiplier * (pointerDistance / $(wrapper).width())) * (options.reverse ? -1 : 1);
 					refresh();
 					monitorStartTime = new Date().getTime();
 					pointerStartPosX = getPointerEvent(event).pageX;

 					(pointerDistance > 0) ? $(wrapper).css('cursor', 'e-resize') : $(wrapper).css('cursor', 'w-resize')

 				}
 			}
 		};

 		loadImage();
 		return this.each(function(){
 		})
 	}
 });