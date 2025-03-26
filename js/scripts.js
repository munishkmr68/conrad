	
$(document).ready(function() {
	
	"use strict";
	
	PageLoad();
	ScrollEffects();
	FirstLoad();
	PageLoadActions();
	Showcase();
	ShowcaseWebgl();
	ShowcaseWebglCore();
	ShowcaseCarousel();
	FloatingLists();
	Portfolio();
	FitThumbScreen();
	Shortcodes();
	Sliders();	
	AjaxLoad();
	JustifiedGrid();
	Lightbox();	
	ContactForm();
	PlayVideo();
	ContactMap();
});



/*--------------------------------------------------
Function Page Load
---------------------------------------------------*/

	function PageLoad() {	
		
		if ($('#page-content').hasClass("light-content")) {
			$('.preloader-wrap').addClass('light-content');			
		}
		
		TweenMax.set($(".menu-timeline .before-span"), {y: 120, opacity:0});
		
		// Page Navigation Events
		$(".preloader-wrap").on('mouseenter', function() {	
			var $this = $(this);			
			TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
			$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );				
		});
							
		$(".preloader-wrap").on('mouseleave', function() {					
			TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
			$('#ball p').remove();				
		});		
		
		$('body').removeClass('hidden').removeClass('hidden-ball');
		TweenMax.to($(".preloader-marquee-wrapper"), 1, {force3D:true, opacity:1, y: 0, delay:0.2, ease:Power3.easeOut});
		TweenMax.to($("#header-container"), 0.5, {force3D:true, opacity:1, delay:0.2, ease:Power2.easeOut}); //modified time
		var width = 0,
			perfData = window.performance.timing, 
			EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
			time = ((EstimatedTime/100)%500) * 10
			
		// Loadbar Animation
		$(".loadbar").animate({
			width: width + "%"
		}, time  );	
		
		
		// Percentage Increment Animation
		var PercentageID = $("#precent"),
				start = 0,
				end = 100,
				durataion = time + 0;
				animateValue(PercentageID, start, end, durataion);
				
		function animateValue(id, start, end, duration) {
		  
			var range = end - start,
			  current = start,
			  increment = end > start? 1 : -1,
			  stepTime = Math.abs(Math.floor(duration / range)),
			  obj = $(id);
			
			var timer = setInterval(function() {
				current += increment;
				$(obj).text(current);
			  //obj.innerHTML = current;
				if (current == end) {
					clearInterval(timer);
				}
			}, stepTime);
		}
		
		// Fading Out Loadbar on Finised
		setTimeout(function(){
			$('.loadbar').append('<span class="hold-progress-bar"></span>');
			
			TweenMax.to($('.hold-progress-bar'), 0.3, {force3D:true,width:'100%', delay:0, ease:Power2.easeOut, onComplete:function(){  //modified time 2019 nov
				
				$('body').waitForImages({
						finished: function() {
							TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
							TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
							$('#ball p').remove();
							TweenMax.to($(" .trackbar, .percentage-intro, .percentage"),0.3, {force3D:true, opacity:0, y:-10, delay:0, ease:Power2.easeIn});						
							TweenMax.to($(".preloader-wrap"),1, {force3D:true, yPercent: -101, delay:0.6, ease:Power2.easeInOut});
							TweenMax.set($(".preloader-wrap"), {visibility:'hidden', delay:1.7, opacity:0});
							TweenMax.to($("#header-container"), 0.5, {force3D:true, opacity:1, delay:1.4, ease:Power2.easeOut}); //modified time
							setTimeout(function(){
							
								$('body').waitForImages({
									finished: function() {
										TweenMax.to($(".header-middle, #footer-container, .showcase-counter, .swiper-pagination-bullet-active .counter"), 1, {force3D:true, opacity:1, delay:0, ease:Power2.easeOut}); 
												
									},
									waitForAll: true
								});
								
								if( $('.hero-video-wrapper').length > 0 ){
									$('#hero-image-wrapper').find('video').each(function() {
										$(this).get(0).play();
									}); 
								}
								
								TweenMax.to($("#main"), 0, {opacity:1, delay:0, ease:Power2.easeOut});//modified time
								if( $('#hero').hasClass("has-image")) {	
									TweenMax.to($("#hero-bg-image, #hero-fg-image"), 1, {force3D:true, scale:1 , opacity:1, delay:0.2, ease:Power2.easeOut});
									TweenMax.to($(".hero-title span"), 1, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
									TweenMax.to($(".hero-subtitle span"), 1, {force3D:true, y:0, opacity:1, rotation:0, delay:0.8, ease:Power2.easeOut});
									TweenMax.to($(".hero-footer-left"), 1, {force3D:true, y: 0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});
									TweenMax.to($(".hero-footer-right"), 1, {force3D:true, y:0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});
									TweenMax.to($(".scroll-down-wrap"), 1, {force3D:true, scale:1, opacity:1, delay:1.2, ease: Elastic.easeOut});														
									TweenMax.to($("#main-page-content"), 0.4, {opacity:1, delay:1.15, ease:Power2.easeOut});
								} else {
									// Fading In Small Carousel elements on Finised
									var tlHerospan = new TimelineLite();
									tlHerospan.set($("#hero .hero-title span"), {y: 120, opacity:0});
									$("#hero .hero-title span").each(function(index, element) {
										tlHerospan.to(element, 0.7, {y:0, opacity:1, delay:0.6, ease:Power3.easeOut}, index * 0.05)
									});
									TweenMax.to($(".hero-subtitle span"), 0.4, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.8, ease:Power2.easeOut});
									TweenMax.to($(".hero-footer-left"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});
									TweenMax.to($(".hero-footer-right"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});									
									TweenMax.to($("#main-page-content"), 0.7, {opacity:1, delay:1.3, ease:Power2.easeOut});				
								}	
								
								
								// Fading In Showcase elements on Finised
								TweenMax.set($("#showcase-slider-holder"), {opacity:0});
								TweenMax.set($("#showcase-slider-webgl-holder, #showcase-carousel-holder, #vp-portfolio-wrapper"), {opacity:0});
								TweenMax.set($(".swiper-prev, .swiper-next, .swiper-pagination-bullet, .arrows-wrap, .carousel-allprojects-wrapper"), {opacity:0});								
								TweenMax.to($("#showcase-slider-holder, #showcase-carousel-holder, #showcase-slider-webgl-holder, #vp-portfolio-wrapper"), 0.7, {opacity:1, delay:0.6, ease:Power2.easeOut});
								
								TweenMax.to($("#showcase-slider-holder .swiper-slide .slide-title span"), 1, {force3D:true, y: 0, opacity:1, delay:0.8, ease:Power2.easeOut});
								TweenMax.to($("#showcase-slider-holder .swiper-slide .subtitle span"), 0.7, {force3D:true, y: 0, opacity:1, delay:1.2, ease:Power2.easeOut});
								
								TweenMax.set($("#showcase-slider-webgl-holder .swiper-slide-active .slide-title span"), {y: 160, opacity:0});
								TweenMax.set($("#showcase-slider-webgl-holder .swiper-slide-active .subtitle span"), {y: 30, opacity:0});
								TweenMax.to($("#showcase-slider-webgl-holder .swiper-slide-active .slide-title span"), 1, {force3D:true, y: 0, opacity:1, delay:0.6, ease:Power2.easeOut});
								TweenMax.to($("#showcase-slider-webgl-holder .swiper-slide-active .subtitle span"),1, {force3D:true, y: 0, opacity:1, delay:1, ease:Power2.easeOut});
								TweenMax.to($("#showcase-slider-webgl-holder .swiper-slide .slide-title span"), 0.5, {force3D:true, y: 0, opacity:1, delay:1, ease:Power2.easeOut});
								TweenMax.to($("#showcase-slider-webgl-holder .swiper-slide .subtitle span"), 0.5, {force3D:true, y: 0, opacity:1, delay:1, ease:Power2.easeOut});
								
								
								
								TweenMax.to($(".swiper-prev"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});
								TweenMax.to($(".swiper-pagination-bullet, .arrows-wrap, .carousel-allprojects-wrapper"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});
								TweenMax.to($(".swiper-next"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});
								setTimeout( function(){	
									$('#showcase-slider-holder, #showcase-carousel-holder, #showcase-slider-webgl-holder, .showcase-list-holder').addClass("loaded");
								} , 1500 );
								var tlSmallTitles = new TimelineLite();					
								$(".slide-small-title span").each(function(index, element) {
									tlSmallTitles.to(element, 0.5, {force3D:true, y:0, opacity:1, delay:1, ease:Power2.easeOut}, index * 0.05)
								});
								
								if ($("#showcase-carousel-holder").hasClass("columns-carousel")) {
									TweenMax.set($("#showcase-carousel-holder #showcase-slider .swiper-slide"), {x:0, scale:0.9, opacity:0});								
									TweenMax.to($("#showcase-carousel-holder #showcase-slider .swiper-slide-active"), 1, {force3D:true, x:0, scale:1, delay:0.7, opacity:1, ease:Power3.easeOut});
									TweenMax.to($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").next(), 1, {force3D:true, x:0, scale:1, delay:0.6, opacity:1, ease:Power3.easeOut});
									TweenMax.to($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").next().next(), 1, {force3D:true, x:0, scale:1, delay:0.7, opacity:1, ease:Power3.easeOut});
									TweenMax.set($("#showcase-carousel-holder #showcase-slider .swiper-slide"), {x:0, scale:1, delay:1.8, opacity:1});
									TweenMax.to($("#showcase-carousel-holder.columns-carousel .swiper-slide .slide-title span"), 0.5, {force3D:true, y: 0, opacity:1, delay:0.8, ease:Power2.easeOut});		
								} else {
									var slideWidth = $("#showcase-carousel-holder #showcase-slider .swiper-slide").width();
									TweenMax.set($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").prev(), {x:slideWidth, scale:0.8, opacity:0});
									TweenMax.set($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").next(), {x:-slideWidth, scale:0.8, opacity:0});								
									TweenMax.to($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").prev(), 2, {force3D:true, x:0, scale:1, delay:0.2, opacity:1, ease:Power3.easeInOut});
									TweenMax.to($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").next(), 2, {force3D:true, x:0, scale:1, delay:0.2, opacity:1, ease:Power3.easeInOut});
								}
								
								
								TweenMax.to($(".showcase-list-intro span, .split-slider-intro span"), 1, {force3D:true, y:0, opacity:1, rotation:0, delay:0.3, ease:Power2.easeOut});
								var SlideListTitle = new TimelineLite();					
								$(".sl-title span, .split-title span").each(function(index, element) {
									SlideListTitle.to(element, 0.7, {force3D:true, y:0, opacity:1, delay:0.5, ease:Power2.easeOut}, index * 0.05)
								});
								
								var SlideListSubtitle = new TimelineLite();					
								$(".sl-subtitle span, .split-subtitle span").each(function(index, element) {
									SlideListSubtitle.to(element, 0.7, {force3D:true, y:0, opacity:1, delay:0.6, ease:Power2.easeOut}, index * 0.05)
								});
									
								TweenMax.set($(".intro-timeline"), {opacity:0, y:30});
								var introTitles = new TimelineLite();					
								$(".intro-timeline").each(function(index, element) {
									introTitles.to(element, 0.5, {force3D:true, y:0, opacity:1, delay:0.65, ease:Power2.easeOut}, index * 0.05)
								});	
											
									
								setTimeout( function(){	
									$('body').removeClass("load-project-page").removeClass("load-project-page-carousel");
								} , 600 );
								
								setTimeout( function(){	
									$('body').removeClass("load-next-project");
									$('body').addClass("header-visible");
									$('#showcase-holder').removeClass("disabled");
								} , 1600 );
								
								setTimeout( function(){	
									$('body').removeClass("show-loader")
								} , 800 );	
								
							} , 600 );
						},
					waitForAll: true
				});
				
			}});
	  
		}, time);
		
		
		
	}// End Page Load




/*--------------------------------------------------
Function Scroll Effects
---------------------------------------------------*/

function ScrollEffects() {
		
		
		setTimeout(function(){
			var threeapp = document.getElementById("app");
			threeapp.className += "active"; 
			$("body").append(threeapp)
		} , 1500 );
		
		if( $('#showcase-slider-webgl-holder').length > 0 ){
			setTimeout(function(){
				var threeSlider = document.getElementById("canvas-slider");
				threeSlider.className += " active"; 
				$("body").append(threeSlider)
			} , 1500 );
		}
		
		if ($(window).width() < 1025) {			
				
			var winHeight = $(window).height();
			var footer_height = $('footer').height();						
			$('nav, #canvas-slider, #showcase-slider-holder, #showcase-carousel-holder, #showcase-slider-webgl-holder, #slider-webgl .swiper-slide, .vp-portfolio-images .vp-slide, .vp-img, #hero.has-image, #hero.has-image #hero-styles, #hero-image-wrapper, #project-nav').css({'height': winHeight});			
			$('#main-page-content.project-page').css({'margin-bottom': winHeight-footer_height});
			$('#project-nav').css({'bottom': -winHeight});
			$(".icon-wrap").removeClass("parallax-wrap");
			
			var resizeTime;
			$(window).resize(function() {
				clearTimeout(resizeTime);
				resizeTime = setTimeout(doneResizing, 100);
			});
			
			function doneResizing(){
				var winHeight = $(window).height();	
				var footer_height = $('footer').height();					
				$('nav, #canvas-slider, #showcase-slider-holder, #showcase-carousel-holder, #showcase-slider-webgl-holder, #slider-webgl .swiper-slide, .vp-portfolio-images .vp-slide, .vp-img, #hero.has-image, #hero.has-image #hero-styles, #hero-image-wrapper, #project-nav').css({'height': winHeight});			
				$('#main-page-content.project-page').css({'margin-bottom': winHeight-footer_height});
				$(".icon-wrap").removeClass("parallax-wrap");
			}
			
		}
		
		
		if ($("body").hasClass("smooth-scroll")) {
			const ScrollArea = document.querySelector('#content-scroll');
			var scrollbar = window.Scrollbar;
			// Use plugins
			// import { ScrollbarPlugin } from 'smooth-scrollbar';
			var __extends = (this && this.__extends) || (function () {
				var extendStatics = Object.setPrototypeOf ||
					({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
					function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
				return function (d, b) {
					extendStatics(d, b);
					function __() { this.constructor = d; }
					d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
				};
			})();
			var EdgeEasingPlugin = /** @class */ (function (_super) {
				__extends(EdgeEasingPlugin, _super);
				function EdgeEasingPlugin() {
					var _this = _super !== null && _super.apply(this, arguments) || this;
					_this._remainMomentum = {
						x: 0,
						y: 0
					};
					return _this;
				}
				EdgeEasingPlugin.prototype.transformDelta = function (delta) {
					var _a = this.scrollbar, limit = _a.limit, offset = _a.offset;
					var x = this._remainMomentum.x + delta.x;
					var y = this._remainMomentum.y + delta.y;
					// clamps momentum within [-offset, limit - offset]
					this.scrollbar.setMomentum(Math.max(-offset.x, Math.min(x, limit.x - offset.x)), Math.max(-offset.y, Math.min(y, limit.y - offset.y)));
					return { x: 0, y: 0 };
				};
				EdgeEasingPlugin.prototype.onRender = function (remainMomentum) {
					Object.assign(this._remainMomentum, remainMomentum);
				};
				EdgeEasingPlugin.pluginName = 'edgeEasing';
				return EdgeEasingPlugin;
			}(Scrollbar.ScrollbarPlugin));
			Scrollbar.use(EdgeEasingPlugin);
			// Config
			var ScrollbarOptions = {
				damping:0.1,
				renderByPixel: true,
				continuousScrolling: true,
				syncCallbacks: true,
			};

			// Initialise
			var scrollbar = Scrollbar.init(ScrollArea, ScrollbarOptions);
			
			if ($(window).width() > 1024) {
			
				if ($("body").hasClass("drag-scroll")) {
				
					setTimeout(function(){
						
						var rcBounds = scrollbar.getSize().content;
						var rcBoundsContainer = scrollbar.getSize().container;
						console.log("container height is: " +  rcBoundsContainer.height);
						console.log("scrollbar limit is: " +  scrollbar.limit.y);
						var draggable = Draggable.create(".scroll-content", {
							
							type: "y",
							bounds: {minX:0, maxX:0, minY:0, maxY:(rcBoundsContainer.height-rcBounds.height) },
							autoScroll:2,
							dragResistance:-2,
							edgeResistance:1,
							onPress:function(e) {
								console.log("Draggable - on press");
								// disable drag on resolutions less than 1024px
								if( window.innerWidth <= 1024 ){
		
									e.dragCancelled = true;
									this.endDrag(e);
									return;
								}
		
								if( e.button == 2 ){
		
									//we need to disable the drag if the right mouse button is pressed
									e.dragCancelled = true;
									this.endDrag(e);
									return;
								}
								else if( e.target != null ){
		
									if( $(e.target).parents('.disable-drag').length )
									{
										//we need to disable the drag if the area is marked as such
										e.dragCancelled = true;
										this.endDrag(e);
										return;
									}
		
								}
		
								// update the UI to show dragging arrows
								$('body').addClass('scale-up');
								TweenMax.to('#ball', 0.2,{borderWidth: '2px', borderColor:'#999', scale: 1});
							},
							onClick:function() {
								console.log("Draggable - on click");
							},
							onDragStart:function() {
								console.log("Draggable - drag start");
								if( this.minY != -scrollbar.limit.y ){
									var rcNewBounds = scrollbar.getSize().content;
									var rcNewBoundsContainer = scrollbar.getSize().container;
									this.applyBounds( {minX:0, maxX:0, minY:0, maxY:-scrollbar.limit.y } );
								}
							},
							onDrag:function() {
								console.log("Draggable - drag, y value: " + this.y + ", scrollbar offset: " + scrollbar.scrollTop  + ", minY: " + this.minY  + ", maxY: " + this.maxY );
								TweenLite.to(scrollbar, 1, {scrollTo:-this.y, ease:Power4.easeOut});
								
		
							},
							onDragEnd:function( e ) {
								console.log("Draggable - drag end");
		
								if( e.dragCancelled ){
		
									console.log("Draggable - drag cancelled");
									return;
								}
								document.getElementById("content-scroll").addEventListener("wheel", myFunction);
		
								function myFunction() {
								  TweenLite.set(scrollbar, {scrollTo:-this.y});
								}
		
								
							},
							onRelease:function( e ) {
								console.log("Draggable - release");
								if( e.dragCancelled ){
		
									return;
								}
								$('body').removeClass('scale-up');
								TweenMax.to('#ball', 1,{borderWidth: '4px', scale:0.5, borderColor:'#999999', ease: Elastic.easeOut});
							}
						});
						scrollbar.addListener( function( status ) {
							TweenLite.set(draggable[0].target, {x:0, y:-scrollbar.scrollTop});
						});
		
						
						
					} , 1000 );
					
				}
				
			}

		}
			
		/*Scrollbar.destroyAll();
		$("body").removeClass("smooth-scroll")*/
		
		// Hero AutoScroll On Page Load
		if ($('#hero.has-image').hasClass('autoscroll')) {		
			if ($("body").hasClass("smooth-scroll")) {
				TweenMax.to(scrollbar, 1.5, {scrollTo:120, delay:0.7, ease:Power4.easeInOut});
			} else {                    
				TweenMax.to(window, 1.5, {scrollTo:120, delay:0.7, ease:Power4.easeInOut});           
			}	
		}
		
		
		
		
		// Slider Center on click
		$('.autocenter').on('click', function() {				
			var $window = $(window),
				$element = $(this),
				elementTop = $element.offset().top,
				elementHeight = $element.height(),
				viewportHeight = $window.height(),
				scrollIt = elementTop - ((viewportHeight - elementHeight) / 2);	
			if ($("body").hasClass("smooth-scroll")) {					
				var scrollOffset = scrollbar.offset.y + (elementTop - scrollbar.getSize().container.height/2);                    
				TweenLite.to(scrollbar, 0.8, {scrollTo:scrollOffset + elementHeight/2, ease:Power4.easeInOut});                    
			}
			else{                    
				$("html, body").animate({ scrollTop: scrollIt }, 350);                
			}				
		});
		
		
		// Back To Top
		$('#backtotop').on('click', function() {	
			if ($("body").hasClass("smooth-scroll")) {
				TweenLite.to(scrollbar, 1.5, {scrollTop:0, delay:0.1, ease:Power4.easeInOut});
				TweenMax.to('#ball', 0.3,{borderWidth: '4px', scale:0.5, borderColor:'#999999', delay:0.15});
			} else {
				$("html,body").animate({scrollTop: 0}, 800);
				TweenMax.to('#ball', 0.3,{borderWidth: '4px', scale:0.5, borderColor:'#999999', delay:0.15});
			}
		});
		
		//Scroll Down
		$('.scroll-down').on('click', function() {	
			var heroheight = $("#hero").height();			
			if ($("body").hasClass("smooth-scroll")) {
				TweenLite.to(scrollbar, 1.5, {scrollTop:heroheight, ease:Power4.easeInOut});
				TweenMax.to('#ball', 0.3,{borderWidth: '4px', scale:0.5, borderColor:'#999999', delay:0.15});
			} else {
				$("html,body").animate({scrollTop: heroheight}, 800);
				TweenMax.to('#ball', 0.3,{borderWidth: '4px', scale:0.5, borderColor:'#999999', delay:0.15});
			}
		});
		
		
		//Hero Parallax
		var heroparallax = TweenMax.to('.parallax-scroll-effect', 1, {top:"5%", scale:1.1, opacity:1, ease:Linear.easeNone});
		var captionParallax = TweenMax.to('#hero-caption.parallax-onscroll', 0.5, {yPercent:10, opacity:0, ease:Linear.easeNone});
		var reverseCaptionParallax = TweenMax.to('#hero-caption.reverse-parallax-onscroll', 0.5, {yPercent:10, opacity:0.5, ease:Linear.easeNone});
		var bottomParallax = TweenMax.to('#hero-footer', 0.5, {yPercent:15, opacity:0, ease:Linear.easeNone});
		
		var bottomProjectParallax = TweenMax.to('.next-project-image', 1, {top:"0",  scale:1, opacity:0.8, ease:Linear.easeNone});
		var bottomProjectCaptionParallax = TweenMax.to('.next-project-wrap', 0.5, {top:"0", scale:1, opacity:1, ease:Linear.easeNone});
		var bottomPageCaptionParallax = TweenMax.to('.next-page-title', 0.5, {top:"0", scale:1, opacity:1, ease:Linear.easeNone});
		
		var controller = new ScrollMagic.Controller();
		
		var heroScene = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration:'120%'
		})
		.setTween(heroparallax)
		.addTo(controller);
		  
		var captionScene = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration:'50%'
		})
		.setTween(captionParallax)
		.addTo(controller);
		
		var reverseCaptionScene = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration:'100%'
		})
		.setTween(reverseCaptionParallax)
		.addTo(controller);
		
		var bottomScene = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration:'30%'
		})
		.setTween(bottomParallax)
		.addTo(controller);
		
				
		
		var bottomProjectScene = new ScrollMagic.Scene({
			triggerElement: '#project-nav',
			triggerHook: 1,
			duration:'100%'
		})
		.setTween(bottomProjectParallax)
		.addTo(controller);
		  
		var bottomProjectCaptionScene = new ScrollMagic.Scene({
			triggerElement: '#project-nav',
			triggerHook: 1,
			duration:'99%'
		})
		.setTween(bottomProjectCaptionParallax)
		.addTo(controller);
		
		
		var $PageNavHeight = $('#page-nav').outerHeight() + $('footer').outerHeight();
		var bottomPageCaptionScene = new ScrollMagic.Scene({
			triggerElement: '#page-nav',
			triggerHook: 1,
			duration:$PageNavHeight
		})
		.setTween(bottomPageCaptionParallax)
		.addTo(controller);
				
		if ($("body").hasClass("smooth-scroll")) {
			scrollbar.addListener(() => {
				heroScene.refresh()
				captionScene.refresh()
				reverseCaptionScene.refresh()
				bottomScene.refresh()
				bottomProjectScene.refresh()
				bottomProjectCaptionScene.refresh()
				bottomPageCaptionScene.refresh()
			});
		}
		
		// 	Content Parallax Image 
		$(".has-parallax").each( function () {
			var $this = $(this);
			var $thisHeight = window.innerHeight*2;
			var bg = $this.find("img");
			
			// Add tweenmax for backgroundParallax
			var parallax = TweenMax.fromTo( bg, 1, {y: '-20%'}, {y: '20%', ease:Linear.easeNone});
			
			// Create scrollmagic scene
			var parallaxScene = new ScrollMagic.Scene({
				triggerElement: this, // <-- Use this to select current element
				triggerHook: 1,
				duration:$thisHeight
			})
			.setTween(parallax)
			.addTo(controller);
			
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					parallaxScene.refresh()
				});
			}
			
		});
		
		// Elements Animation
		$('.has-animation').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).height();
			
			var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
				.addTo(controller);
			
			scene.triggerHook(1)
			
			scene.on('enter', function(){
				$this.delay($this.attr('data-delay')).queue(function(next){
					TweenMax.to($this, 0.6, {force3D:true, opacity:1, y:0, scale:1, delay:0, ease:Power2.easeOut});
					next();
					$this.addClass('animated')
				});
			});
			
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})
		
		$("body").find(".has-scale").each(function(i) {				
			$(this).wrap( "<div class='figure-wrapper'></div>" );
		});
		
		$('.has-mask').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index]));
			}
		});
		
		$('.has-mask span').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index]));
			}
		});
		
		$('.has-mask').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).height();
			
			var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
				.addTo(controller);
			
			scene.triggerHook(1)
			
			scene.on('enter', function(){				
				$this.delay($this.attr('data-delay')).queue(function(next){
					var tl = new TimelineLite();
						
					$this.find('span > span').each(function(index, element) {
						tl.to(element, 0.6, {y:0, opacity:1, delay:0.1, ease:Power2.easeOut}, index * 0)
					});
					next();
				});				
			});
			
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})
		
		
		
		
		
		//Row Options
		$(".white-section").each(function(i) {				
			if ($(this).hasClass("large")) {
				$(this).wrap( "<div class='white-section-wrapper large'><div class='white-section-container'></div></div>" );
			} else {
				$(this).wrap( "<div class='white-section-wrapper'><div class='white-section-container'></div></div>" );
			}
			$("body").find(".white-section-wrapper").each(function(i) {				
				$(this).css('background-color', function () {
					return $(this).children().children().data('bgcolor')
				});
			});
		});
		
		$(".half-white-section").each(function(i) {				
			$(this).wrap( "<div class='half-white-section-wrapper section-wrapper'></div>" );
			if ($(this).hasClass("first")) {
				$(this).parent('.half-white-section-wrapper').addClass('first');
			} else if ($(this).hasClass("second")) {
				$(this).parent('.half-white-section-wrapper').addClass('second');
			}
			$("body").find(".half-white-section-wrapper").each(function(i) {				
				$(this).css('background-color', function () {
					return $(this).children().data('bgcolor')
				});
			});
		});
		
		$(".dark-section").each(function(i) {				
			if ($(this).hasClass("large")) {
				$(this).wrap( "<div class='dark-section-wrapper large'><div class='dark-section-container'></div></div>" );
			} else {
				$(this).wrap( "<div class='dark-section-wrapper'><div class='dark-section-container'></div></div>" );
			}			
			$("body").find(".dark-section-wrapper").each(function(i) {				
				$(this).css('background-color', function () {
					return $(this).children().children().data('bgcolor')
				});
			});
		});
		
		$(".half-dark-section").each(function(i) {				
			$(this).wrap( "<div class='half-dark-section-wrapper section-wrapper'></div>" );
			if ($(this).hasClass("first")) {
				$(this).parent('.half-dark-section-wrapper').addClass('first');
			} else if ($(this).hasClass("second")) {
				$(this).parent('.half-dark-section-wrapper').addClass('second');
			}
			$("body").find(".half-dark-section-wrapper").each(function(i) {				
				$(this).css('background-color', function () {
					return $(this).children().data('bgcolor')
				});
			});
		});
		
		
		$('#project-nav.change-header').each(function(){
			const contentu = $('#page-content');
			var $this = $(this);
			var $thisHeight = $(this).outerHeight(true);
			
			var whiteScene = new ScrollMagic.Scene({triggerElement:this,duration: $thisHeight})
				.addTo(controller)
				
			
			whiteScene.triggerHook(0.08)
			
			whiteScene.on('enter', function(){
				contentu.removeClass('light-content');
			});
			
			whiteScene.on('leave', function(){
			  	contentu.addClass('light-content');
		  	});
			
					
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					whiteScene.refresh()
				});
			}
		})
		
		if (!$('#page-content').hasClass("light-content")) {
			if (!$('#project-nav').hasClass("change-header")) {
				$('#project-nav').each(function(){
					const contentu = $('#page-content');
					var $this = $(this);
					var $thisHeight = $(this).outerHeight(true);
					
					var whiteScene = new ScrollMagic.Scene({triggerElement:this,duration: $thisHeight})
						.addTo(controller)							
					
					whiteScene.triggerHook(0.08)
					
					whiteScene.on('enter', function(){
						contentu.addClass('light-content');							
					});
					
					whiteScene.on('leave', function(){
						contentu.removeClass('light-content');
					});
							
					if ($("body").hasClass("smooth-scroll")) {
						scrollbar.addListener(() => {
							whiteScene.refresh()
						});
					}
				})
			}
		}
		
		
		if( $('.change-header-color').length > 0 ){	
			$('body').waitForImages({
				finished: function() {
			
					$('.change-header-color').each(function(){
						const headeru = $('header');
						var $this = $(this);
						var $thisHeight = $(this).outerHeight(true);
						
						var whiteScene = new ScrollMagic.Scene({triggerElement:this,duration: $thisHeight})
							.addTo(controller)
						
						whiteScene.triggerHook(0.08)
						
						whiteScene.on('enter', function(){
							setTimeout( function(){
								headeru.addClass('white-header');
							} , 10 );
						});
						
						whiteScene.on('leave', function(){
							headeru.removeClass('white-header');
						});
						
						if ($("body").hasClass("smooth-scroll")) {
							scrollbar.addListener(() => {
								whiteScene.refresh()
							});
						}
					})
			
				},
				waitForAll: true
			});	
		
		}
		
		$('header').removeClass('white-header');
		
		
		
		
		var $elheight = window.innerHeight;
		
		//Portfolio Items Appear
		$('.portfolio .item').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).height();
			
			var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
				.addTo(controller);
			
			scene.triggerHook(0.9)
			
			scene.on('enter', function(){				
				$this.addClass('active');
			});
			
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})	
		
		$(".item").each( function () {
			var $this = $(this);
			var $thisheight = $(this).height() + $elheight;
			var bg = $this.find(".item-parallax.enabled");
			
			var parallax = TweenMax.fromTo( bg, 1, {y: '20%'}, {y: '-20%', ease:Linear.easeNone});
			
			var parallaxScene = new ScrollMagic.Scene({
				triggerElement: this, // <-- Use this to select current element
				triggerHook: 1,
				duration:$thisheight
			})
			.setTween(parallax)
			.addTo(controller);
			
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					parallaxScene.refresh()
				});
			}
			
		});
		
		$(".sided-grid .item").each( function () {
			var $this = $(this);
			var $thisheight = $(this).height() + $elheight;
			var paralaxCaption = $this.find(".item-caption-wrapper");
			
			var parallax = TweenMax.fromTo( paralaxCaption, 1, {y: '40%'}, {y: '-40%', ease:Linear.easeNone});
			
			var parallaxScene = new ScrollMagic.Scene({
				triggerElement: this, // <-- Use this to select current element
				triggerHook: 1,
				duration:$thisheight
			})
			.setTween(parallax)
			.addTo(controller);
			
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					parallaxScene.refresh()
				});
			}
			
		});
		
		
		$('.content-carousel').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).outerHeight(true);
			var tlCarousel = new TimelineLite();
			tlCarousel.set($(".content-carousel .swiper-slide"), {x: 800, opacity:0});
			
			var scene = new ScrollMagic.Scene({triggerElement:this,duration: $thisHeight})
				.addTo(controller);
			
			scene.triggerHook(1)
			
			scene.on('enter', function(){				
				$this.find(".swiper-slide").each(function(index, element) {
					tlCarousel.to(element, 1.4, {x:0, opacity:1, delay:0.1, ease:Power3.easeOut}, index * 0.1)
				});
				
			});
					
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})
		
		
		if( $('#vp-portfolio-wrapper').length > 0 ){
			
			$('body').waitForImages({
				finished: function() {
					var vp_slides_count = $('.vp-portfolio-images .vp-slide').length;
					for( i = 0; i < vp_slides_count; i++ ) { $('.vp-portfolio-images .vp-slide').eq( i ).css( 'z-index', vp_slides_count - i );	}				
				
					if ($("body").hasClass("smooth-scroll")) {
						var fixedElem = document.getElementById('fixed');
						var fixedBorders = document.getElementById('fixed-borders');
						var heroHeight = $("#hero").outerHeight()
						var halfheroHeight = (window.innerHeight/2) - $("#hero").outerHeight()
						TweenMax.set(fixedElem, {y:-heroHeight});
						TweenMax.set(fixedBorders, {y:halfheroHeight});
						
						scrollbar.addListener(function(status) {
						   var offset = status.offset;
						  
						  fixedElem.style.top = offset.y + 'px';
						  fixedElem.style.left = offset.x + 'px';
						  fixedBorders.style.top = offset.y + 'px';
						  fixedBorders.style.left = offset.x + 'px';
						});
					} else {
						var $thisHeight = $(".vp-portfolio-captions").outerHeight() - window.innerHeight;
						
						var pinImageScene = new ScrollMagic.Scene({
						  triggerElement: "#vp-portfolio-wrapper",
						  duration: $thisHeight,
						  triggerHook: 0,
						})
						.setPin("#fixed")
						.addTo(controller);
					}
				
					// 	Content Parallax Image 
					$("#vp-portfolio").each( function () {
						var $this = $(this);
						
						
						var $thisHeight = $(".vp-portfolio-captions").outerHeight() -  window.innerHeight + $(".vp-portfolio-captions .vp-slide").outerHeight();
						var $thisMove = $(".vp-portfolio-images .vp-slide").outerHeight()
						var bg = $this.find(".vp-portfolio-images");
						
						// Add tweenmax for backgroundParallax
						var $particles = $(".vp-portfolio-images .vp-slide");
						var parallax = new TimelineMax();
						
						$particles.each(function() {      
						  parallax.add(TweenMax.to($(this), 10, {   scale: 1.1, opacity:0, ease:Power2.easeInOut }))
						});
						
						// Create scrollmagic scene
						var parallaxScene = new ScrollMagic.Scene({
							triggerElement: this, 
							triggerHook: 0,
							duration:$thisHeight
						})
						.setTween(parallax)
						.addTo(controller);
						
						if ($("body").hasClass("smooth-scroll")) {
							scrollbar.addListener(() => {
								parallaxScene.refresh()
							});
						}
						
					});
				
				
					$('.vp-portfolio-captions').each(function(){
						var $this = $(this);
						var $thisHeight = $(this).height() - window.innerHeight;
						var $thisHeight1 = $(this).height() - window.innerHeight;
						
						
						var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
							.addTo(controller);
						
						scene.triggerHook(0)
						
						scene.on('enter', function(){				
							$this.removeClass('not-in-view');
							$(".vp-portfolio-images").removeClass('not-in-view');
								
						});
						
						scene.on('leave', function(){				
							$this.addClass('not-in-view');
							$(".vp-portfolio-images").addClass('not-in-view');
						});
						
						var scene1 = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight1})
							.addTo(controller);
						
						scene1.triggerHook(0.05)
						
						scene1.on('enter', function(){				
							$("#fixed-borders").addClass('view-borders');
								
						});
						
						scene1.on('leave', function(){				
							$("#fixed-borders").removeClass('view-borders');
						});
						
						if ($("body").hasClass("smooth-scroll")) {
							scrollbar.addListener(() => {
								scene.refresh()
								scene1.refresh()
							});
						}
					})
					
					
					$('.vp-portfolio-captions .vp-slide').each(function(){
						var $this = $(this);
						var $thisHeight = $(this).height();
						var carouselWidth = $('.vp-portfolio-captions').width();
						var lineWidth = carouselWidth / 2 - 120
						
						var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
							.addTo(controller);
						
						scene.triggerHook(0.5)
						
						var aux = $this.data('aux'),
						selectedimage = $('.vp-img-mask[data-aux="' + aux + '"]');
							
						
						scene.on('enter', function(){				
							$this.addClass('active');
							$(".caption-border.left").css({
								'width': lineWidth - $this.width()/2 + 'px',
								'opacity': 1,
							});				
							$(".caption-border.right").css({
								'width': lineWidth - $this.width()/2 + 'px',
								'opacity': 1,
							});
							
							if ($this.hasClass("change-header")) {							
								setTimeout( function(){
									$('header').addClass('white-header');
								} , 10 );
								
								$this.addClass('white-title');					
							} 
							
							selectedimage.addClass("active");
							selectedimage.find('video').each(function() {
								$(this).get(0).play();
							});
							
						});
						
						scene.on('leave', function(){				
							$this.removeClass('active');
							$this.removeClass('white-title');
							$('header').removeClass('white-header');
							selectedimage.removeClass("active");
							selectedimage.find('video').each(function() {
								$(this).get(0).pause();
							});
						});
						
						if ($("body").hasClass("smooth-scroll")) {
							scrollbar.addListener(() => {
								scene.refresh()
							});
						}
					})
					
					if ($(window).width() >= 1024) {
					
						$(".vp-portfolio-captions .vp-title").on('mouseenter', function() {	
							var $this = $(this);			
							TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
							TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
							$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );				
						});
											
						$(".vp-portfolio-captions .vp-title").on('mouseleave', function() {					
							TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
							TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
							$('#ball p').remove();				
						});
					
					}
					
					if (!$("body").hasClass("load-no-ajax")) {
						$('.vp-portfolio-captions .vp-title').on('click', function() {
							let parent_slide = $(this).closest( '.vp-slide' );
							parent_slide.addClass('above');
							
							$("body").addClass("show-loader");
							if ($(this).parents('.vp-slide').hasClass("change-header")) {
								$("body").append('<div class="temporary-hero"><div class="outer"><div class="inner"></div></div></div>');
							} else {
								$("body").append('<div class="temporary-hero light-content"><div class="outer"><div class="inner"></div></div></div>');
							}
							
							TweenMax.to($(".vp-slide.above").prevAll(), 0.3, {force3D:true, y:-100, delay:0.3, opacity:0, ease:Power2.easeInOut  });
							TweenMax.to($(".vp-slide.above").nextAll(), 0.3, {force3D:true, y:100, delay:0.3, opacity:0, ease:Power2.easeInOut  });				
							TweenMax.to('#fixed-borders', 0.3,{opacity:0, ease:Power2.easeInOut});
							
							TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
							TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
							$("#ball").removeClass("with-icon");
							$('#ball p').remove();
							$('#ball i').remove();
							
							setTimeout( function(){
								parent_slide.find('.vp-title').clone().appendTo('.temporary-hero .inner');
								parent_slide.find('.vp-cat').clone().appendTo('.temporary-hero .inner');
								var aux = parent_slide.data('aux'),
								selectedimage = $('.vp-img-mask[data-aux="' + aux + '"]');
								selectedimage.addClass("temporary").clone().appendTo('.temporary-hero');
								$("body").addClass("load-project-thumb-with-title");
								$(this).delay(100).queue(function() {
									var link = $(".above").find('a');
									link.trigger('click');
								});	
							} , 600 );
											
						});
					}
				},				
				waitForAll: true
			});	
		
		}
			
	
	}// End Scroll Effects



/*--------------------------------------------------
Function First Load
---------------------------------------------------*/	

	function FirstLoad() {
		
		if( $('#project-nav').length > 0 ){
			$('#main-content').addClass('solid-color');
			$('#main-page-content').addClass('project-page');					
		}
		
		if( $('.portfolio').length > 0 ){			
			$('#main-page-content').addClass('portfolio-page');				
		}
		
		if ($("#page-content").hasClass("light-content")) {
			$("nav").css('background-color', '#141414');
			$("main, #main-content.solid-color").css('background-color', function () {
				return $("#page-content").data('bgcolor')
			});
			$('#magic-cursor').addClass('light-content');
			if( $('#hero').length > 0 ){						
				if( $('#hero').hasClass("has-image")) {	
					$("header").css('background-color', 'transparent');
				} else {
					$("header").css('background-color', 'transparent');
				}
			} else {
				$("header").css('background-color', 'transparent');
			}
		} else {			
			$("nav").css('background-color', '#141414');
			$("main, #main-content.solid-color").css('background-color', function () {
				return $("#page-content").data('bgcolor')
			});
			$('#magic-cursor').removeClass('light-content');
			if( $('#hero').length > 0 ){	
				if( $('#hero').hasClass("has-image")) {	
					$("header").css('background-color', 'transparent');
				} else {
					$("header").css('background-color', 'transparent');
				}
			} else {
				$("header").css('background-color', 'transparent');
			}
		}
		
		
		$(".hero-subtitle, .next-hero-subtitle, .light-content .hero-subtitle, .light-content .next-hero-subtitle, .item-cat, .vp-cat, .showcase-list-intro, .sl-subtitle, .subtitle, li.split-slider-intro, .split-subtitle, .primary-color").css('color', function () {
			return $("body").data('primary-color')
		});
		
		
		
		$('.video-cover').each(function() {
			var image = $(this).data('src');	
			$(this).css({'background-image': 'url(' + image + ')'});
		});
		
		//Load Default Page
		$('a.ajax-link').on('click', function() {
			$("body").addClass("show-loader");	
			$(".flexnav").removeClass("flexnav-show");
			$('#menu-burger').removeClass("open");
			$('header').removeClass('white-header');
			$("#app").remove();
			setTimeout(function(){
				$("#canvas-slider.active").remove();						
			} , 300 );
			$(".temporary-hero").remove();	
			var tlMenu = new TimelineLite();
			$(".fullscreen-menu .menu-timeline").each(function(index, element) {
				tlMenu.to(element, 0.25, {y:-30, opacity:0, ease:Power2.easeIn}, index * 0.03)
			});	
			TweenMax.to('#ball', 0.3,{borderWidth:"4px",scale:0.5,backgroundColor:"rgba(0, 0, 0, 0)",opacity:1});			
			TweenMax.to($("#main, #hero-image-wrapper, #project-nav, .next-project-image, #app, #canvas-slider, #showcase-slider-webgl-holder, #quickmenu-scroll"), 0.3, {opacity:0, delay:0, ease:Power0.ease});					
			TweenMax.to($("#footer-container, .header-middle"), 0.3, {opacity:0, ease:Power0.ease});			
			TweenMax.to('#show-filters, #counter-wrap', 0.2,{opacity:0});
		});
		
		
		//Load Page From Menu
		$('nav .ajax-link').on('click', function() {
			$(this).parents('.flexnav').addClass('hover');
			$(this).parents('.item-with-ul').addClass('hover');
			TweenMax.set($(this).find('span'),{yPercent:0});
			var tl = new TimelineLite();
			$(".menu-timeline .before-span").each(function(index, element) {
				tl.to(element, 0.5, {force3D:true, y:-120, opacity:0, delay:0, ease:Power2.easeIn}, index * 0.05)
			});
			$('header').removeClass('white-header');
			$("#app").remove();
			$(".big-title-caption").remove();	
		});
		
		
		
		$('#burger-wrapper, .menu .button-text').on('click', function() {
			$('#menu-burger, nav').toggleClass('open');			
			setTimeout( function(){			
				if ($('#menu-burger').hasClass("open")) {
					$('header').addClass('over-sidebar').addClass('over-white-section');
					if (!$('#page-content').hasClass("light-content")) {	
						$('#magic-cursor').addClass('light-content');
						$('#header-container').addClass('light-content');
					}
					TweenMax.set($("nav ul ul li"), {y: 0, opacity:1});
					//Fade In Navigation Lists
					var tlMenu = new TimelineLite();
					tlMenu.set($(".menu-timeline .before-span"), {y: 120, opacity:0});
					//TweenMax.staggerTo($(".menu-timeline"), 0,{cycle:{x: ["50", "-50"]}, opacity:0});
					$(".menu-timeline .before-span").each(function(index, element) {
						tlMenu.to(element, 0.7, {force3D:true, y:0, opacity:1, delay:0.4, ease:Power2.easeOut}, index * 0.1)
					});
					  
					  
					$('.touch-button').click(function(e, bIndirect) {
						
						if( bIndirect == true ){
							return;
						}
						
						let currentItem = $(this);						
						
						$('.touch-button.active').each( function() {							
							if( currentItem.get(0) !== $(this).get(0) ) { 							
								$(this).trigger('click', true); 
							}  
						});
						
					});
					
				
						
				} else {	
					//Fade Out Navigation Lists	
					var tlMenu = new TimelineLite();					
					$(".menu-timeline .before-span").each(function(index, element) {
						tlMenu.to(element, 0.5, {force3D:true, y:-120, opacity:0, delay:0, ease:Power2.easeIn}, index * 0.05)
					});
					
					var tlSubMenu = new TimelineLite();					
					$("nav ul ul li").each(function(index, element) {
						tlSubMenu.to(element, 0.5, {force3D:true, y:-120, opacity:0, delay:0, ease:Power2.easeIn}, index * 0.03)
					});
					
					if (!$('#page-content').hasClass("light-content")) {	
						setTimeout( function(){
							$('#magic-cursor').removeClass('light-content');
							$('#header-container').removeClass('light-content');
						} , 500 );
					}
					setTimeout( function(){
						$(".touch-button.active").trigger("click");
						$('header').removeClass('over-sidebar')
						setTimeout( function(){
							$('header').removeClass('over-white-section');
						} , 350 );
					} , 500 );
				}							
			} , 20 );
		});
		
		
		var viewportWidth = $(window).width();
		if (viewportWidth < 1024) {				
			$('.hero-video-wrapper').remove();							 
		}
		
		
		
	}// End First Load
	
	
/*--------------------------------------------------
Page Load Actions
---------------------------------------------------*/	
	
	function PageLoadActions() {
		
		
		// Default Page Navigation Load Events
		$(".next-ajax-link-page").on('mouseenter', function() {	
			var $this = $(this);			
			TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
			$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );				
		});
							
		$(".next-ajax-link-page").on('mouseleave', function() {					
			TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
			$('#ball p').remove();				
		});				
		
		
		$('.next-ajax-link-page').on('click', function() {					
			$("body").addClass("load-next-page");
			$("body").addClass("show-loader");
			$('header').removeClass('white-header');
			$("#app").remove();
			$(".big-title-caption").remove();	
				
			TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball p').remove();
			$('#ball i').remove();	
			
			if ($('#project-nav').hasClass("light-content")) {				
				setTimeout(function(){
					$('body').addClass('light-content');								
				} , 300 );
			}
			if ($("body").hasClass("smooth-scroll")) {
				var navmove = $("#content-scroll").height() - $("#page-nav").height() - $("footer").height() 			
			} else {
				var navmove = window.innerHeight - $("#page-nav").height() - $("footer").height()	   
			}
			
			TweenMax.to($(".subtitle-info"), 0.3, {force3D:true, opacity:0, delay:0, y: -20, ease:Power2.easeOut});
			TweenMax.to($(".subtitle-name"), 0.3, {force3D:true, opacity:1, y: 0, delay:0.15, ease:Power2.easeOut});
			
			TweenMax.to($("#main-page-content, #hero"), 0.3, {opacity:0});		
			TweenMax.to($("#page-nav"), 0.7, {y: - navmove, delay:0, ease:Power2.easeInOut});
			TweenMax.to($("footer"), 0.3, {opacity:0, delay:0, ease:Power2.easeInOut});
		});
		
		
		// Project Page Navigation Load Events
		$("#project-nav .next-ajax-link-project").mouseenter(function(e) {	
			var $this = $(this);		
			$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
			TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});			
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});			
		});
						
		$("#project-nav .next-ajax-link-project").mouseleave(function(e) {
			TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
			$('#ball p').remove();
		});	
		
		$('.next-ajax-link-project').on('click', function() {					
			$("body").addClass("load-project-thumb-with-title").addClass("show-loader");
			$('header').removeClass('white-header');
			$("#app").remove();
			$('.next-project-image').addClass("temporary").appendTo('body');
			if ($(this).parents('#project-nav').hasClass("change-header")) {
				$("body").append('<div class="temporary-hero"><div class="outer"><div class="inner"></div></div></div>');
			} else {
				$("body").append('<div class="temporary-hero light-content"><div class="outer"><div class="inner"></div></div></div>');
			}
			$('.next-caption').appendTo('.temporary-hero .inner');	
				
			TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball p').remove();
			$('#ball i').remove();
			
			TweenMax.to($("#main-page-content"), 0.3, {opacity:0});			
			TweenMax.to($(".next-project-image"), 0.6, {scale:1, opacity: 1, ease:Power2.easeOut,onComplete: function() {
			  $('.next-project-image').addClass("visible")
			}});
			TweenMax.to($("footer"), 0.3, {opacity:0, ease:Power2.easeInOut});
				
		});
		
	}// Page Load Actions
	
	

	
/*--------------------------------------------------
Function Lazy Load
---------------------------------------------------*/

	function LazyLoad() {	
		
		TweenMax.set($("#show-filters, #counter-wrap"), {opacity:0, delay:0});
		
		$('body').waitForImages({
			finished: function() {
				$('body').removeClass('loading')
				setTimeout( function(){	
					$('body').removeClass('hidden').removeClass('scale-up').removeClass('scale-none');
				} , 1500 );
			},
			waitForAll: true
		});	
		
		$('body').waitForImages({
			finished: function() {
				TweenMax.to($("#header-container, .header-middle"), 1, {force3D:true, opacity:1, ease:Power2.easeOut});				
			},
			waitForAll: true
		});
		
		if( !$('#canvas-slider').hasClass("active")) {	
			TweenMax.set($('#canvas-slider'), {opacity:0, scale:1.1});
			TweenMax.to($('#canvas-slider'), 1, {force3D:true, opacity:1, scale:1, delay:0.3, ease:Power2.easeOut});
		}
		
		TweenMax.to($("#main"), 0.3, {opacity:1, delay:0.1, ease:Power2.easeOut});
		TweenMax.to($("#footer-container"), 1, {force3D:true, opacity:1, delay:0.4, ease:Power2.easeOut});		
		
		if( $('#hero').hasClass("has-image")) {	
			if( $('body').hasClass("load-project-thumb-with-title")) {
				TweenMax.to($("#hero-bg-image"), 0, {force3D:true, scale:1 , opacity:1, delay:0, ease:Power2.easeOut});				
				TweenMax.to($(".hero-title span"), 0, {force3D:true, y: 0, opacity:1, delay:0, ease:Power2.easeOut});
				TweenMax.to($(".hero-subtitle span"), 0, {force3D:true, y:0, opacity:1, delay:0, ease:Power2.easeOut});
				TweenMax.to($(".hero-footer-left"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
				TweenMax.to($(".hero-footer-right"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});		
			} else if( $('body').hasClass("load-project-thumb-with-title-and-scale")) {
				TweenMax.to($("#hero-bg-image"), 0, {force3D:true, scale:1.02, opacity:1, delay:0, ease:Power2.easeOut});				
				TweenMax.to($(".hero-title span"), 0, {force3D:true, y: 0, opacity:1, delay:0, ease:Power2.easeOut});
				TweenMax.to($(".hero-subtitle span"), 0, {force3D:true, y:0, opacity:1, delay:0, ease:Power2.easeOut});
				TweenMax.to($(".hero-footer-left"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
				TweenMax.to($(".hero-footer-right"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});		
			} else if( $('body').hasClass("load-project-thumb")) {
				TweenMax.to($("#hero-bg-image"), 0, {force3D:true, scale:1.02 , opacity:1, delay:0, ease:Power2.easeOut});				
				TweenMax.to($(".hero-title span"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
				TweenMax.to($(".hero-subtitle span"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
				TweenMax.to($(".hero-footer-left"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});
				TweenMax.to($(".hero-footer-right"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});			
			} else {
				TweenMax.to($("#hero-bg-image"), 0, {force3D:true, scale:1 , opacity:1, delay:0, ease:Power2.easeOut});
				TweenMax.to($(".hero-title span"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
				TweenMax.to($(".hero-subtitle span"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
				TweenMax.to($(".hero-footer-left"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});
				TweenMax.to($(".hero-footer-right"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});	
			}
			TweenMax.to($("#main-page-content"), 0.4, {opacity:1, delay:0.95, ease:Power2.easeOut});
		} else {
			var tlHerospan = new TimelineLite();
			tlHerospan.set($("#hero .hero-title span"), {y: 120, opacity:0});
			$("#hero .hero-title span").each(function(index, element) {
				tlHerospan.to(element, 0.7, {y:0, opacity:1, delay:0.1, ease:Power3.easeOut}, index * 0)
			});
			TweenMax.to($(".hero-subtitle span"), 0.4, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.25, ease:Power2.easeOut});
			TweenMax.to($(".hero-footer-left"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:0.5, ease:Power2.easeOut});
			TweenMax.to($(".hero-footer-right"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
			TweenMax.to($("#main-page-content"), 0.5, {opacity:1, delay:0.15, ease:Power2.easeOut});
		}	
		
		// Fading In Showcase elements on Finised
		TweenMax.set($("#showcase-slider-holder"), {opacity:0, scale:1});
		TweenMax.set($("#showcase-carousel-holder, #showcase-slider-webgl-holder, #vp-portfolio-wrapper"), {opacity:0});
		TweenMax.to($("#showcase-slider-holder, #showcase-carousel-holder, #showcase-slider-webgl-holder, #vp-portfolio-wrapper"), 0.7, {opacity:1, delay:0.6, ease:Power2.easeOut});
		TweenMax.set($(".swiper-prev, .swiper-next, .swiper-pagination-bullet, .arrows-wrap, .carousel-allprojects-wrapper"), {opacity:0});		
		TweenMax.to($(".swiper-prev"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});
		TweenMax.to($(".swiper-pagination-bullet, .arrows-wrap, .carousel-allprojects-wrapper"), 0.7, {force3D:true, y:0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});
		TweenMax.to($(".swiper-next"), 0.7, {force3D:true, y: 0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});
		// Fading In Showcase WebGl
		TweenMax.set($("#showcase-slider-webgl-holder .swiper-slide-active .slide-title span"), {y: 160, opacity:0});
		TweenMax.set($("#showcase-slider-webgl-holder .swiper-slide-active .subtitle span"), {y: 30, opacity:0});
		TweenMax.to($("#showcase-slider-webgl-holder .swiper-slide-active .slide-title span"), 1, {force3D:true, y: 0, opacity:1, delay:0.6, ease:Power2.easeOut});
		TweenMax.to($("#showcase-slider-webgl-holder .swiper-slide-active .subtitle span"),1, {force3D:true, y: 0, opacity:1, delay:1, ease:Power2.easeOut});
		TweenMax.to($("#showcase-slider-webgl-holder .swiper-slide .slide-title span"), 0.5, {force3D:true, y: 0, opacity:1, delay:1, ease:Power2.easeOut});
		TweenMax.to($("#showcase-slider-webgl-holder .swiper-slide .subtitle span"), 0.5, {force3D:true, y: 0, opacity:1, delay:1, ease:Power2.easeOut});
		// Fading In Showcase Parallax Slider						
		TweenMax.to($("#showcase-slider-holder .swiper-slide .slide-title span"), 1, {force3D:true, y: 0, opacity:1, delay:0.8, ease:Power2.easeOut});
		TweenMax.to($("#showcase-slider-holder .swiper-slide .subtitle span"), 0.7, {force3D:true, y: 0, opacity:1, delay:1.2, ease:Power2.easeOut});
		var tlSmallTitles = new TimelineLite();					
		$(".slide-small-title span").each(function(index, element) {
			tlSmallTitles.to(element, 0.5, {force3D:true, y:0, opacity:1, delay:1, ease:Power2.easeOut}, index * 0.05)
		});
		// Fading In Floating Lists and Split WebGL
		TweenMax.to($(".showcase-list-intro span, .split-slider-intro span"), 1, {force3D:true, y:0, opacity:1, rotation:0, delay:0.3, ease:Power2.easeOut});
		var SlideListTitle = new TimelineLite();					
		$(".sl-title span, .split-title span").each(function(index, element) {
			SlideListTitle.to(element, 0.7, {force3D:true, y:0, opacity:1, delay:0.5, ease:Power2.easeOut}, index * 0.05)
		});		
		var SlideListSubtitle = new TimelineLite();					
		$(".sl-subtitle span, .split-subtitle span").each(function(index, element) {
			SlideListSubtitle.to(element, 0.7, {force3D:true, y:0, opacity:1, delay:0.6, ease:Power2.easeOut}, index * 0.05)
		});											
		// Fading In Floating Lists and Split WebGL
		if ($("#showcase-carousel-holder").hasClass("columns-carousel")) {
			TweenMax.set($("#showcase-carousel-holder #showcase-slider .swiper-slide"), {x:0, scale:0.9, opacity:0});								
			TweenMax.to($("#showcase-carousel-holder #showcase-slider .swiper-slide-active"), 1, {force3D:true, x:0, scale:1, delay:0.7, opacity:1, ease:Power3.easeOut});
			TweenMax.to($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").next(), 1, {force3D:true, x:0, scale:1, delay:0.6, opacity:1, ease:Power3.easeOut});
			TweenMax.to($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").next().next(), 1, {force3D:true, x:0, scale:1, delay:0.7, opacity:1, ease:Power3.easeOut});
			TweenMax.set($("#showcase-carousel-holder #showcase-slider .swiper-slide"), {x:0, scale:1, delay:1.8, opacity:1});		
			TweenMax.to($("#showcase-carousel-holder.columns-carousel .swiper-slide .slide-title span"), 0.5, {force3D:true, y: 0, opacity:1, delay:0.8, ease:Power2.easeOut});		
		} else {
			var slideWidth = $("#showcase-carousel-holder #showcase-slider .swiper-slide").width();
			TweenMax.set($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").prev(), {x:slideWidth, scale:0.8, opacity:0});
			TweenMax.set($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").next(), {x:-slideWidth, scale:0.8, opacity:0});								
			TweenMax.to($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").prev(), 2, {force3D:true, x:0, scale:1, delay:0.2, opacity:1, ease:Power3.easeInOut});
			TweenMax.to($("#showcase-carousel-holder #showcase-slider .swiper-slide-active").next(), 2, {force3D:true, x:0, scale:1, delay:0.2, opacity:1, ease:Power3.easeInOut});
		}
		
		setTimeout( function(){	
			$('#showcase-slider-holder, #showcase-carousel-holder, #showcase-slider-webgl-holder, .showcase-list-holder').addClass("loaded");
		} , 1500 );
		
			
		
		if( $('.load-project-thumb').length > 0 ){
			$('#hero-image-wrapper').waitForImages({
				finished: function() {
					setTimeout( function(){
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});
						$("#app.active").remove();
						$(".big-title-caption").remove();	
					} ,250 );
				},
				waitForAll: true
			});
		} else if( $('.load-project-thumb-with-title').length > 0 ){
			$('#hero-image-wrapper').waitForImages({
				finished: function() {
					setTimeout( function(){
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});
						$("#app.active").remove();
						$("#canvas-slider.active").remove();
						$(".temporary-hero").remove();
						$(".next-project-image.temporary").remove();
						$('body').removeClass("load-project-thumb-with-title").removeClass("show-loader");	
					} , 500 );
				},
				waitForAll: true
			});			
		} else if( $('.load-project-thumb-with-title-and-scale').length > 0 ){
			$('#hero-image-wrapper').waitForImages({
				finished: function() {
					setTimeout( function(){
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});
						$("#app.active").remove();
						$("#canvas-slider.active").remove();
						$(".temporary-hero").remove();
						$(".next-project-image.temporary").remove();
						$('body').removeClass("load-project-thumb-and-title").removeClass("show-loader");	
					} , 500 );
				},
				waitForAll: true
			});	
		} else {
			$('#hero-image-wrapper').waitForImages({
				finished: function() {
					$('#hero-image-wrapper').find('video').each(function() {
						$(this).get(0).play();
					});
					$("#app.active").remove();
					$("#canvas-slider.active").remove();
				},
				waitForAll: true
			});
		}
		
		setTimeout( function(){	
			$('header').removeClass('white-header');
			$('body').removeClass("load-project-page").removeClass("load-project-thumb").removeClass("load-next-project").removeClass("load-next-page");
			setTimeout( function(){	
				$('body').removeClass("load-project-thumb-with-title").removeClass("show-loader");
			} , 300 );			
		} , 500 );
		
	
	}// End Lazy Load		



/*--------------------------------------------------
Function Showcase Webgl Slider
---------------------------------------------------*/
	
	function ShowcaseWebgl() {
		
	
		if( $('#showcase-slider-webgl-holder').length > 0 ){
			
			$("footer").addClass("showcase-footer")
								
			var swiperOptions = {
				direction: "horizontal",
				loop: true,
				grabCursor: false,
				resistance : true,
				resistanceRatio:0.1,
				slidesPerView: 'auto',				
				centeredSlides: true,
				allowTouchMove:true,
				spaceBetween:0,  
				speed:1000,
				autoplay: false,
				mousewheel: true,
				parallax:true,
				navigation: {
					nextEl: '.swiper-next',
					prevEl: '.swiper-prev',
				},
				pagination: {
				  el: '.swiper-pagination',
						clickable: true,
						renderBullet: function (index, className) {
					  return '<span class="' + className + '">'+'<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader" width="20" height="20" viewBox="0 0 20 20">'+
									'<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)"'+
									'stroke-opacity="1" stroke-width="2px"></circle>'+
									'<circle class="solid-fill" cx="10" cy="10" r="3"></circle>'+
									'</svg></div></div></span>';
					},
			
				},						
				on: {
					slideChangeTransitionStart: function () {
						
						$('.swiper-slide-active').find('div').each(function() {
							if (!$(this).hasClass("active")) {
								$(this).trigger('click');
							}
							
						});
						
						$('.swiper-slide-duplicate-active').find('div').each(function() {
							if (!$(this).hasClass("active")) {
								$(this).trigger('click');
							}
						}); 
						
						if ($('.swiper-slide-active').hasClass("change-header")) {
							$('#page-content').removeClass('light-content');
							$('#magic-cursor').removeClass('light-content');
						} else {
							$('#page-content').addClass('light-content');
							$('#magic-cursor').addClass('light-content');
						}
						
						if ($('.swiper-slide-duplicate-active').hasClass("change-header")) {
							$('#page-content').removeClass('light-content');
							$('#magic-cursor').removeClass('light-content');
						} else {
							$('#page-content').addClass('light-content');
							$('#magic-cursor').addClass('light-content');
						}
						$('.swiper-slide').find('.slide-title').each(function() {
							$(this).removeClass('active-title');							
						});
						
						
					},
					slideChangeTransitionEnd: function () {	
						
						setTimeout(function(){ 
						$('.swiper-slide-active').find('.slide-title').each(function() {
							$(this).addClass('active-title');							
						});
						
						$('.swiper-slide-duplicate-active').find('.slide-title').each(function() {
							$(this).addClass('active-title');	
						});
						}, 0);
						
					},
  				},
			};
							
			var showcaseSwiper = new Swiper(".swiper-container", swiperOptions);
			
			if( $('#slider-webgl').length > 0 ){
				$('body').waitForImages({
					finished: function() {	
						showcaseSwiper.update();
					},				
					waitForAll: true
				});	
			}
			
			
			
			if ($(window).width() >= 1024) {
				var timeout, clicker = $('.swiper-container');
			
				$('.swiper-container .slide-title-wrapper').on('mousedown', function(event) {
					return false;
				});	
				
				$('.swiper-container').on('mousedown touchstart', function(event) {
					if ($('#magic-cursor').hasClass("light-content")) {
						TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
					} else {
						TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#000',});
					}
					$("body" ).addClass("scale-drag-x");
					timeout = setInterval(function(){        
						if (!$('#page-content').hasClass("light-content")) {
							$('#page-content').addClass('light-content');
						}
						if (!$('#magic-cursor').hasClass("light-content")) {
							$('#magic-cursor').addClass('light-content');
						}
						TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
						$("body" ).addClass("scale-drag-down");
						TweenMax.to('#slider-webgl', 0.2,{scale: 0.6, delay:0,});
						TweenMax.to('.swiper-slide', 0.2,{scale: 1, delay:0,});
						TweenMax.to('.swiper-slide .subtitle span', 0.3,{y:80, opacity: 0,});
						TweenMax.to('#canvas-slider', 0.2,{opacity: 0, delay:0, ease:Linear.easeNone});					
						showcaseSwiper.params.longSwipes = true;
						showcaseSwiper.params.longSwipesRatio=0.5;
						showcaseSwiper.params.touchRatio=3;
						$('.swiper-slide .slide-title').each(function() {
							var image = $(this).data('fill-img');	
							$(this).children().css({'background': 'url(' + image + ')'});
						});
					}, 1000);
				});
				
				$('.swiper-container').on('mouseup touchend', function(event) {
					
					TweenMax.to('#slider-webgl', 0.2,{scale:1, });
					TweenMax.to('.swiper-slide', 0.2,{scale:1,});
					TweenMax.to('.swiper-slide .subtitle span', 0.2,{y:0, opacity: 1, delay:0.3});
					TweenMax.to('#canvas-slider', 0.2,{opacity: 1, delay:0.4, ease:Linear.easeNone});
					showcaseSwiper.params.longSwipes = false;
					showcaseSwiper.params.longSwipesRatio=0.1;
					showcaseSwiper.params.touchRatio=1;
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					$("body").removeClass("scale-drag-x");
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					clearInterval(timeout);
					setTimeout(function(){       
						
						if ($('.swiper-slide-active').hasClass("change-header")) {
							$('#page-content').removeClass('light-content');
							$('#magic-cursor').removeClass('light-content');
						} else {
							$('#page-content').addClass('light-content');
							$('#magic-cursor').addClass('light-content');
						}
						setTimeout(function(){
							
							$("body").removeClass("scale-drag-down");
							$('.swiper-slide .slide-title').each(function() {	
								$(this).children().css({'background': 'none'});
							});
						}, 100)
					}, 300);
				});
				
				$("#showcase-slider-webgl-holder .slide-title").on('mouseenter', function() {	
					var $this = $(this);			
					TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );				
				});
									
				$("#showcase-slider-webgl-holder .slide-title").on('mouseleave', function() {					
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$('#ball p').remove();				
				});
			}
			
			if (!$("body").hasClass("load-no-ajax")) {
				$('#showcase-slider-webgl-holder .slide-title span').on('click', function() {
					let parent_slide = $(this).closest( '.swiper-slide' );
					parent_slide.addClass('above');
					
					$("body").addClass("show-loader");
					if ($(this).parents('.swiper-slide').hasClass("change-header")) {
						$("body").append('<div class="temporary-hero"><div class="outer"><div class="inner"></div></div></div>');
					} else {
						$("body").append('<div class="temporary-hero light-content"><div class="outer"><div class="inner"></div></div></div>');
					}
					
					TweenMax.to($("#showcase-slider-webgl-holder .swiper-slide.above").prevAll(), 0.3, {force3D:true, x:-100, scale:1.1, delay:0, opacity:0, ease:Power3.easeInOut  });
					TweenMax.to($("#showcase-slider-webgl-holder .swiper-slide.above").nextAll(), 0.3, {force3D:true, x:100, scale:1.1, delay:0, opacity:0, ease:Power3.easeInOut  });
					TweenMax.to('footer, .showcase-pagination-wrap .parallax-element, .caption-border', 0.5,{opacity:0, ease:Power4.easeInOut});
					
					setTimeout( function(){
						parent_slide.find('.slide-title').appendTo('.temporary-hero .inner');
						parent_slide.find('.subtitle').appendTo('.temporary-hero .inner');
						$("body").addClass("load-project-thumb-with-title");
						setTimeout( function(){
							var link = $(".above").find('a');
							link.trigger('click');
						} , 100 );	
					} , 300 );
					
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-icon");
					$('#ball p').remove();
					$('#ball i').remove();
				});
				
				$('#slider-split-webgl .split-caption').on('click', function() {
					let parent_slide = $(this).closest( '#slider-split-projects li' );
					parent_slide.addClass('above');
					
					TweenMax.to('#canvas-slider.split', 0.7,{x:0, delay:0.3, ease:Power1.easeInOut});
					TweenMax.to('#canvas-slider.split canvas', 0.7,{x:0, delay:0.3, ease:Power1.easeInOut});
					
					$("body").addClass("show-loader");
					if (parent_slide.hasClass("change-header")) {
						$('#page-content').delay(900).queue(function(next){
							$(this).removeClass('light-content');
							next();
						});
					}
					TweenMax.to('footer', 0.5,{opacity:0, ease:Power4.easeInOut});
					
					TweenMax.to($(".split-slider-intro span"), 0.5, {force3D:true, y:-30, opacity:0, delay:0, ease:Power2.easeInOut});
					var SplitTitle = new TimelineLite();					
					$(".split-title span").each(function(index, element) {
						SplitTitle.to(element, 0.5, {force3D:true, y:-80, opacity:0, delay:0, ease:Power2.easeInOut}, index * 0.05)
					});				
					var SplitSubtitle = new TimelineLite();					
					$(".split-subtitle span").each(function(index, element) {
						SplitSubtitle.to(element, 0.5, {force3D:true, y:-20, opacity:0, delay:0, ease:Power2.easeInOut}, index * 0.05)
					});					
					TweenMax.to('footer', 0.5,{opacity:0, ease:Power4.easeInOut});
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-icon");
					$('#ball p').remove();
					$('#ball i').remove();							
					$(this).delay(1000).queue(function() {
						var link = $(".above").find('a');
						link.trigger('click');
					});
				});
			}
			
			
			
			
			
			
			if( $('#slider-split-webgl').length > 0 ){
				
				class Spring {
					constructor(list, friction) {
						this.__list = $(list);
						this.friction = friction;
						this.desire_positionY = $("#slider-split-scroll").scrollTop();
						this.py = [];
						// Behaviours
						$("#slider-split-scroll").on("scroll", this.handleChange.bind(this));
						this.update();
					}
		
					handleChange(e){
						this.desire_positionY = $("#slider-split-scroll").scrollTop();
						
					}
		  
					update(){
						$.each(this.__list, function(i, e){
							if(this.py[i] == null) this.py[i] = 0;
							this.py[i] += ( (this.desire_positionY) - this.py[i]) / (this.friction+i);
							$(e).css({
								"top":  Math.round(this.desire_positionY)+"px",
								"transform": " translateY(-"+ Math.round(this.py[i])+"px)"
							});
						}.bind(this))
						window.requestAnimationFrame(this.update.bind(this));
						
					}
				}
		
				if ($(window).width() > 1024) {			
						
					let spring = new Spring("#slider-split-projects li", 6);			
				}
				
			}
			
			
		}	
		
			
	}//End Showcase Slider
	
	
	
	
/*--------------------------------------------------
Function Showcase Webgl Slider Core
---------------------------------------------------*/
	
	function ShowcaseWebglCore() {
		
	
		if( $('#showcase-slider-webgl-holder').length > 0 ){
			
			
			var vertex = 'varying vec2 vUv; void main() {  vUv = uv;  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );	}';
			var fragment = `
				varying vec2 vUv;

				uniform sampler2D currentImage;
				uniform sampler2D nextImage;
				uniform sampler2D disp;
				uniform float dispFactor;
				uniform float effectFactor;
				uniform vec4 resolution;

				void main() {

					vec2 uv = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

					vec4 disp = texture2D(disp, uv);
					vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
					vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
					vec4 _currentImage = texture2D(currentImage, distortedPosition);
					vec4 _nextImage = texture2D(nextImage, distortedPosition2);
					vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);

					gl_FragColor = finalTexture; }

				`;

			var gl_canvas = new ClapatWebGL({
					vertex: vertex,
					fragment: fragment,
			});
			
			if( $('#slider-webgl').length > 0 ){
			
				var addEvents = function(){
	
					var triggerSlide = Array.from(document.getElementById('trigger-slides').querySelectorAll('.slide-wrap'));
					gl_canvas.isRunning = false;
	
					triggerSlide.forEach( (el) => {
	
						el.addEventListener('click', function() {
	
								if( !gl_canvas.isRunning ) {
	
									gl_canvas.isRunning = true;
	
									document.getElementById('trigger-slides').querySelectorAll('.active')[0].className = '';
									this.className = 'active';
	
									var slideId = parseInt( this.dataset.slide, 10 );
	
									gl_canvas.material.uniforms.nextImage.value = gl_canvas.textures[slideId];
									gl_canvas.material.uniforms.nextImage.needsUpdate = true;
	
									TweenLite.to( gl_canvas.material.uniforms.dispFactor, 0.9, {
										value: 1,
										ease: 'Sine.easeInOut',
										onComplete: function () {
											gl_canvas.material.uniforms.currentImage.value = gl_canvas.textures[slideId];
											gl_canvas.material.uniforms.currentImage.needsUpdate = true;
											gl_canvas.material.uniforms.dispFactor.value = 0.0;
											gl_canvas.isRunning = false;
										}
									});
	
								}
	
						});
	
					});
	
				};
	
				addEvents();
				
			}
			
			if( $('#slider-split-webgl').length > 0 ){
			
				var addEventsHover = function(){
	
					var triggerSlide = Array.from(document.getElementById('slider-split-projects').querySelectorAll('.slide-wrap'));
					gl_canvas.isRunning = false;
	
					triggerSlide.forEach( (el) => {
	
						el.addEventListener('mousemove', function() {
							
							if (!$(this).hasClass("active")) {
							
								if( !gl_canvas.isRunning ) {
	
									gl_canvas.isRunning = true;
	
									document.getElementById('slider-split-projects').querySelectorAll('.active')[0].className = '';
									this.className = 'active';
	
									var slideId = parseInt( this.dataset.slide, 10 );
	
									gl_canvas.material.uniforms.nextImage.value = gl_canvas.textures[slideId];
									gl_canvas.material.uniforms.nextImage.needsUpdate = true;
	
									TweenLite.to( gl_canvas.material.uniforms.dispFactor, 0.5, {
										value: 1,
										ease: 'Sine.easeInOut',
										onComplete: function () {
											gl_canvas.material.uniforms.currentImage.value = gl_canvas.textures[slideId];
											gl_canvas.material.uniforms.currentImage.needsUpdate = true;
											gl_canvas.material.uniforms.dispFactor.value = 0.0;
											gl_canvas.isRunning = false;
										}
									});
	
								}
								
							}
	
						});
	
					});
	
				};
	
				addEventsHover();				
				
			}
			
			
		}	
		
			
	}//End Showcase WebGL Core		




/*--------------------------------------------------
Function Showcase Slider
---------------------------------------------------*/
	
	function Showcase() {
		
	
		if( $('#showcase-slider-holder').length > 0 ){
			
			$("footer").addClass("showcase-footer")
								
			var interleaveOffset = 0.3;
			
			var swiperOptions = {
				direction: "vertical",
				loop: true,
				grabCursor: false,
				resistance : true,
				resistanceRatio:0.5,
				slidesPerView: 'auto',
				allowTouchMove:true,  
				speed:1000,
				autoplay: false,
				mousewheel: true,
				parallax:true,
				navigation: {
					nextEl: '.swiper-next',
					prevEl: '.swiper-prev',
				},						
				on: {
					progress: function() {
						var swiper = this;
						for (var i = 0; i < swiper.slides.length; i++) {
							var slideProgress = swiper.slides[i].progress;
							var innerOffset = swiper.height * interleaveOffset;
							var innerTranslate = slideProgress * innerOffset;
							swiper.slides[i].querySelector(".img-mask").style.transform = "translate3d(0," + innerTranslate + "px, 0)";
						}
					  
					},
					touchStart: function() {
						var swiper = this;
						for (var i = 0; i < swiper.slides.length; i++) {
							swiper.slides[i].style.transition = "";
						}
					},
					setTransition: function(speed) {
						var swiper = this;
						for (var i = 0; i < swiper.slides.length; i++) {
							swiper.slides[i].style.transition = speed + "ms";
							swiper.slides[i].querySelector(".img-mask").style.transition = speed + "ms";
						}   
				 	},
					init: function () {						
						$('.swiper-slide-active').find('video').each(function() {
							$(this).get(0).play();
						});
						
					},
					slideChangeTransitionStart: function () {						
						
						
						if ($('#showcase-slider .swiper-slide-active').hasClass("change-header")) {							
							$('#page-content').delay(300).queue(function(next){
								$(this).removeClass('light-content');
								next();
							});							
							$('#magic-cursor').removeClass('light-content');
							
						} else {
							$('#page-content').delay(300).queue(function(next){
								$(this).addClass('light-content');
								next();
							});							
							$('#magic-cursor').addClass('light-content');
						}
							
						
						if ($('#showcase-slider .swiper-slide-duplicate-active').hasClass("change-header")) {
							$('#page-content').delay(300).queue(function(next){
								$(this).removeClass('light-content');
								next();
							});							
							$('#magic-cursor').removeClass('light-content');
						} else {
							$('#page-content').delay(300).queue(function(next){
								$(this).addClass('light-content');
								next();
							});							
							$('#magic-cursor').addClass('light-content');
						}
						
						$('#showcase-slider .swiper-slide').find('.slide-title').each(function() {
							$(this).removeClass('active-title');							
						});
						
						$('#showcase-slider .swiper-slide-active').find('video').each(function() {
							$(this).get(0).play();
						});
						
						LinesWidth();  
						
					},
					slideChangeTransitionEnd: function () {	
					
						$('#showcase-slider .swiper-slide-active').find('.slide-title').each(function() {
							$(this).addClass('active-title');							
						});
						
						$('#showcase-slider .swiper-slide-duplicate-active').find('.slide-title').each(function() {
							$(this).addClass('active-title');	
						});
						
						$('#showcase-slider .swiper-slide-prev').find('video').each(function() {
							$(this).get(0).pause();
						});
						
						$('#showcase-slider .swiper-slide-next').find('video').each(function() {
							$(this).get(0).pause();
						});
						
						
					},
  				},
			};
			
			
			function LinesWidth() {
			
				var carouselWidth = $('#showcase-slider-holder').width();
				var captionWidth = $('.swiper-slide-active .slide-title').width();
				var lineWidth = carouselWidth / 2 - 120
				
				$(".caption-border.left").css({
					'width': lineWidth - captionWidth/2 + 'px',
					'opacity': 1,
				});				
				$(".caption-border.right").css({
					'width': lineWidth - captionWidth/2 + 'px',
					'opacity': 1,
				});
				
			}// End Lines Width
			
			var showcaseSwiper = new Swiper("#showcase-slider", swiperOptions);	
			
			LinesWidth();
			
			
			if ($(window).width() >= 1024) {
			
				var captionsSwiper = new Swiper('#showcase-slider-captions', {
					speed: 700,
					spaceBetween: 0,
					slidesPerView: 'auto',
					direction: 'vertical',
					longSwipes:true,
					longSwipesRatio:0.5,
					touchRatio:3,
					longSwipesMs: 0,
					centeredSlides: true,
					loop: true,
					mousewheel: true,
					parallax:true,
				});
				
				
				
				var listsSwiper = new Swiper('#showcase-slider-lists', {
					speed: 700,
					spaceBetween: 0,
					slidesPerView: 'auto',
					direction: 'vertical',
					longSwipes:true,
					longSwipesRatio:0.5,
					touchRatio:3,
					longSwipesMs: 0,
					centeredSlides: true,
					loop: true,
					mousewheel: true,
					parallax:true,
				});
				
				
				
				showcaseSwiper.controller.control = listsSwiper;
				showcaseSwiper.controller.control = captionsSwiper;
				captionsSwiper.controller.control = listsSwiper;
			
			} 
			
			
			
			if ($(window).width() >= 1024) {
			
				$('#showcase-slider-holder .slide-title').on('mousedown', function(event) {
					return false;
				});				
				
				$('.swiper-container').on('mousedown touchstart', function() {	
					if ($('#magic-cursor').hasClass("light-content")) {
						TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
					} else {
						TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#000',});
					}
					$("body" ).addClass("scale-drag-y");
				});
					
				$('.swiper-container').on('mouseup touchend', function() {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					$("body").removeClass("scale-drag-y");
				});
				
				$('body').on('mouseup touchend', function() {				
					$('body').removeClass('scale-drag-y');					
				});
				
				$("#showcase-slider-holder .slide-title").on('mouseenter', function() {	
					var $this = $(this);			
					TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );				
				});
									
				$("#showcase-slider-holder .slide-title").on('mouseleave', function() {					
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$('#ball p').remove();				
				});
			
			}
			
			
			// Showcase Slider Project Load Events
			if (!$("body").hasClass("load-no-ajax")) {
				$('#showcase-slider-holder .slide-title').on('click', function() {
					let parent_slide = $(this).closest( '.swiper-slide' );
					parent_slide.addClass('above');
					
					$("body").addClass("show-loader");
					if ($(this).parents('.swiper-slide').hasClass("change-header")) {
						$("body").append('<div class="temporary-hero"><div class="outer"><div class="inner"></div></div></div>');
					} else {
						$("body").append('<div class="temporary-hero light-content"><div class="outer"><div class="inner"></div></div></div>');
					}
					
					TweenMax.to('.slide-small-title span', 0.3,{y:-30, opacity:0, delay:0, ease:Power2.easeIn});				
					TweenMax.to('footer, .showcase-pagination-wrap .parallax-element, .caption-border', 0.5,{opacity:0, ease:Power4.easeInOut});
					
					TweenMax.to('#showcase-slider .inner .subtitle', 0.3,{opacity:1, delay:0.4, ease:Power2.easeOut, onComplete:function(){
						parent_slide.find('.slide-title').appendTo('.temporary-hero .inner');
						parent_slide.find('.subtitle').appendTo('.temporary-hero .inner');
						parent_slide.find(".section-image").addClass("temporary").appendTo('.temporary-hero');
						$("body").addClass("load-project-thumb-with-title");
						$(this).delay(100).queue(function() {
							var link = $(".above").find('a');
							link.trigger('click');
						});	
					}});
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-icon");
					$('#ball p').remove();
					$('#ball i').remove();				
				});
			}
			
			
		}	
		
			
	}//End Showcase Slider
	
	
	
	

	
	
	
/*--------------------------------------------------
Function Showcase Carousel
---------------------------------------------------*/
	
	function ShowcaseCarousel() {
		
	
		if( $('#showcase-carousel-holder').length > 0 ){	
								
			$("footer").addClass("showcase-footer")
			
			
			var swiperOptions = {
				direction: "horizontal",
				loop: true,
				grabCursor: false,
				resistance : true,
				resistanceRatio:0.5,
				slidesPerView: 'auto',
				allowTouchMove:true,  
				speed:1000,
				autoplay: false,
				mousewheel: true,
				centeredSlides: true,
				spaceBetween: 200,
				navigation: {
					nextEl: '.swiper-next',
					prevEl: '.swiper-prev',
				},
				pagination: {
				  el: '.swiper-pagination',
						clickable: true,
						renderBullet: function (index, className) {
					  return '<span class="' + className + '">'+'<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader" width="20" height="20" viewBox="0 0 20 20">'+
									'<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)" stroke="#FFF"'+
									'stroke-opacity="1" stroke-width="2px"></circle>'+
							'<circle cx="10" cy="10" r="3" fill="#FFF"></circle>'+
									'</svg></div></div></span>';
					},
			
				},						
				on: {
					
					init: function () {						
						
						if (!$("#showcase-carousel-holder").hasClass("columns-carousel")) {
						
							$('.swiper-slide-active').find('video').each(function() {
								$(this).get(0).play();
							});
						
						}
					},
					slideChangeTransitionStart: function () {
						
						if (!$("#showcase-carousel-holder").hasClass("columns-carousel")) {
						
							$('.swiper-slide-active').find('video').each(function() {
								$(this).get(0).play();
							});						
												
							var TitleHeight = $("#showcase-carousel-holder #showcase-slider .swiper-slide .slide-title").height();
							
							$('#showcase-carousel-holder').find('.swiper-slide').each(function() {
								if (!$(this).hasClass("swiper-slide-active")) {	
									TweenMax.to($(this).find(".slide-title span"), 0.7, {force3D:true, y: TitleHeight, opacity:0, delay:0.2, ease:Power2.easeOut});
									TweenMax.to($(this).find(".subtitle span"), 0.7, {force3D:true, y: 30, opacity:0, delay:0.1, ease:Power2.easeOut});	
								} else {
									TweenMax.to($(this).find(".slide-title span"), 0.7, {force3D:true, y: 0, opacity:1, delay:0.1, ease:Power2.easeOut});
									TweenMax.to($(this).find(".subtitle span"), 0.7, {force3D:true, y: 0, opacity:1, delay:0.15, ease:Power2.easeOut});								
								}
							});
						
						}
						
					},				
					slideChangeTransitionEnd: function () {	
						
						if (!$("#showcase-carousel-holder").hasClass("columns-carousel")) {
						
							$('.swiper-slide-prev').find('video').each(function() {
								$(this).get(0).pause();
							});
							
							$('.swiper-slide-next').find('video').each(function() {
								$(this).get(0).pause();
							});
						
						}
						
					}
  				},
			};
			
			
			
			var showcaseSwiper = new Swiper("#showcase-slider", swiperOptions);
			
			if ($("#showcase-carousel-holder").hasClass("mixed-carousel")) {
				showcaseSwiper.params.spaceBetween = 20;
				showcaseSwiper.update();
			}
			
			if ($("#showcase-carousel-holder").hasClass("columns-carousel")) {
				showcaseSwiper.params.spaceBetween = 0;
				showcaseSwiper.params.centeredSlides = false;
				showcaseSwiper.params.speed = 600;
				showcaseSwiper.update();
					
				if ($(window).width() > 1024) {
					$(".columns-carousel").find(".swiper-slide").on("mouseenter", function(e) {
						$(this).find('video').each(function() {
							$(this).get(0).play();
						});	
					}).on("mouseleave", function(e) {							
						$(this).find('video').each(function() {
							$(this).get(0).pause();
						});
					})
				}
				
			}
			
			
			if ($(window).width() >= 1024) {
				
				$('#showcase-carousel-holder .trigger-slide-link').on('mousedown', function() {
					return false;
				});
			
				$('#showcase-carousel-holder .swiper-container').on('mousedown touchstart', function() {
					TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
					$("body" ).addClass("scale-drag-x");				
				});
				
				$('#showcase-carousel-holder .swiper-container').on('mouseup touchend', function(event) {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					$("body").removeClass("scale-drag-x");				
				});
				
				$("#showcase-carousel-holder .trigger-slide-link").on('mouseenter', function() {	
					var $this = $(this);			
					TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );				
				});
									
				$("#showcase-carousel-holder .trigger-slide-link").on('mouseleave', function() {					
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$('#ball p').remove();				
				});
				
			}
			
		}	
		
			
	}//End Showcase Carousel
	
	
	
	
/*--------------------------------------------------
Function Floating Lists
---------------------------------------------------*/

	function FloatingLists() {
	
		if( $('.showcase-list-holder').length > 0 ){	
			
			if ($(window).width() < 1024) {
				$('.hover-reveal').addClass('trigger-slide-link');
				$('.sl-title').addClass('trigger-slide-link');
			}
			
			if ($(window).width() >= 1024) {
			
				if ($("body").hasClass("smooth-scroll")) {
					var elem = document.querySelector("#content-scroll");
					var scrollbar = Scrollbar.init(elem,
					{
						renderByPixels: true,
						damping:0.1
					});
				}
				
				const getMousePos = (e) => {
					let posx = 0;
					let posy = 0;
					if (!e) e = window.event;
					if (e.pageX || e.pageY) {
						posx = e.pageX;
						posy = e.pageY;
					}
					else if (e.clientX || e.clientY) 	{
						posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
						posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
					}
					return { x : posx, y : posy }
				}
			
				// Effect 1
				class HoverImgFx1 {
					constructor(el) {
						this.DOM = {el: el};
						this.DOM.reveal = this.DOM.el.querySelector('.hover-reveal');				
						this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
						this.DOM.revealInner.style.overflow = 'hidden';
						this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');
						this.initEvents();
					}
					initEvents() {				
						
						this.positionElement = (ev) => {
							const mousePos = getMousePos(ev);
							if ($("body").hasClass("smooth-scroll")) {
								const docScrolls = {
									left : document.body.scrollLeft + document.documentElement.scrollLeft, 
									top : - scrollbar.scrollTop
								};
								if ($(".showcase-list-holder").hasClass("vertical-list")) {
									TweenLite.to($('.hover-reveal'), 0.7, { top: `${mousePos.y-250-docScrolls.top}px`, left: `${mousePos.x-400-docScrolls.left}px`, ease:Power4.easeOut });
								} else {
									TweenLite.to($('.hover-reveal'), 1, { top: `${mousePos.y+40-docScrolls.top}px`, left: `${mousePos.x+10-docScrolls.left}px`, ease:Power4.easeOut });
								}
							} else {
								const docScrolls = {
									left : document.body.scrollLeft + document.documentElement.scrollLeft, 
									top : document.body.scrollTop + document.documentElement.scrollTop
								};
								if ($(".showcase-list-holder").hasClass("vertical-list")) {
									TweenLite.to($('.hover-reveal'), 0.7, { top: `${mousePos.y-250-docScrolls.top}px`, left: `${mousePos.x-400-docScrolls.left}px`, ease:Power4.easeOut });
								} else {
									TweenLite.to($('.hover-reveal'), 1, { top: `${mousePos.y+40-docScrolls.top}px`, left: `${mousePos.x+10-docScrolls.left}px`, ease:Power4.easeOut });
								}
							}
							
						};
						this.mouseenterFn = (ev) => {
							this.positionElement(ev);
							this.showImage();
						};
						this.mousemoveFn = ev => requestAnimationFrame(() => {
							this.positionElement(ev);
						});
						this.mouseleaveFn = () => {
							this.hideImage();
						};
						
						this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
						this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
						this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
					}
					showImage() {
						TweenMax.killTweensOf(this.DOM.revealInner);
						TweenMax.killTweensOf(this.DOM.revealImg);
			
						this.tl = new TimelineMax({
							onStart: () => {
								this.DOM.reveal.style.opacity = 1;
								TweenMax.set(this.DOM.el, {zIndex: 1000});
							}
						})
						.add('begin')
						.add(new TweenMax(this.DOM.revealInner, 0.4, {
							ease: Sine.easeOut,
							startAt: {x: '-100%'},
							x: '0%'
						}), 'begin')
						.add(new TweenMax(this.DOM.revealImg, 0.4, {
							ease: Sine.easeOut,
							startAt: {x: '100%'},
							x: '0%'
						}), 'begin');
					}
					hideImage() {
						TweenMax.killTweensOf(this.DOM.revealInner);
						TweenMax.killTweensOf(this.DOM.revealImg);
			
						this.tl = new TimelineMax({
							onStart: () => {
								TweenMax.set(this.DOM.el, {zIndex: 999});
							},
							onComplete: () => {
								TweenMax.set(this.DOM.el, {zIndex: ''});
								TweenMax.set(this.DOM.reveal, {opacity: 0});
							}
						})
						.add('begin')
						.add(new TweenMax(this.DOM.revealInner, 0.4, {
							ease: Sine.easeOut,
							x: '100%'
						}), 'begin')
						
						.add(new TweenMax(this.DOM.revealImg, 0.4, {
							ease: Sine.easeOut,
							x: '-100%'
						}), 'begin');
					}
				}
				
				Array.from(document.querySelectorAll('.slide-list')).forEach(link => new HoverImgFx1(link));
				
				
				var slide_top = document.querySelector('.slide-list:first-child');
				$('.showcase-list-intro').css( 'top', slide_top.offsetTop);
				
				$('.slide-list').on('mouseenter', function() {
					$('.slide-list').addClass('disable');
					$(this).removeClass('disable');
					$(this).find('video').each(function() {
						$(this).get(0).play();
					});
				}).on('mouseleave', function() {
					$('.slide-list').removeClass('disable');
					$(this).find('video').each(function() {
						$(this).get(0).pause();
					});
				});
			
			
				$(".vertical-list .slide-list").on('mouseenter', function() {	
					var $this = $(this);			
					TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );				
				}).on('mouseleave', function() {					
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$('#ball p').remove();				
				});
			}
			
			if (!$("body").hasClass("load-no-ajax")) {
				$('.showcase-list-holder .trigger-slide-link').on('click', function() {
					let parent_slide = $(this).closest( '.slide-list' );
					parent_slide.addClass('above');				
					if (parent_slide.hasClass("change-header")) {
						$('#page-content').delay(900).queue(function(next){
							$(this).removeClass('light-content');
							next();
						});
					}
					$('.showcase-list-holder').removeClass("loaded");
					$("body").addClass("load-project-thumb").addClass("show-loader");
					
					TweenMax.to($(".showcase-list-intro span"), 0.5, {force3D:true, y:-30, opacity:0, delay:0, ease:Power2.easeInOut});
					var SlideListTitle = new TimelineLite();					
					$(".sl-title span").each(function(index, element) {
						SlideListTitle.to(element, 0.5, {force3D:true, y:-80, opacity:0, delay:0, ease:Power2.easeInOut}, index * 0.05)
					});				
					var SlideListSubtitle = new TimelineLite();					
					$(".sl-subtitle span").each(function(index, element) {
						SlideListSubtitle.to(element, 0.5, {force3D:true, y:-20, opacity:0, delay:0, ease:Power2.easeInOut}, index * 0.05)
					});					
					TweenMax.to('footer, .slide-list', 0.5,{opacity:0, ease:Power4.easeInOut});
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent', opacity:1});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-icon");
					$('#ball p').remove();
					$('#ball i').remove();							
					$(this).delay(1000).queue(function() {
						var link = $(".above").find('a');
						link.trigger('click');
					});
				});
			}
			
		}
		
		
	}// End Floating Lists	
	


/*--------------------------------------------------
Function Portfolio
---------------------------------------------------*/	
		
	function Portfolio() {	
	
			
		if( $('.portfolio-wrap').length > 0 ){			
			
			
			if ($("body").hasClass("smooth-scroll")) {
				var elem = document.querySelector("#content-scroll");
				var scrollbar = Scrollbar.init(elem,
				{renderByPixels: true,damping:0.1});
			}
			
			var $container = $('.portfolio');
		
			$container.isotope({
			  layoutMode: 'packery',
			  itemSelector: '.item',
			  gutter:0,
			  transitionDuration: "0.5s"
			});
			
			$('#filters a').on('click', function() {
				$('#filters a').removeClass('active');
				$(this).addClass('active');
				$('.item').addClass('item-margins');
				var selector = $(this).attr('data-filter');
				$container.isotope({ filter: selector }, function( $changedItems, instance ) {
				  instance.$allAtoms.filter('.isotope-hidden').removeClass('is-filtered');
				  instance.$filteredAtoms.addClass('is-filtered');
				});		
				return false;
			});
			
			$("#all").trigger('click');
			
			
				
			
			
			//Show Filters On overlay
			$('#show-filters, #close-filters').on('click', function() {			
				$('#filters-overlay').toggleClass('active');
				var navtitleheight = $(".hero-title").height()
				var navsubtitleheight = $(".hero-subtitle").height()
				
				setTimeout( function(){			
					if ($('#filters-overlay').hasClass("active")) {
						
						TweenMax.to($(".item-parallax"), 0.6, {force3D:true, scale:0.9, opacity:0.3, delay:1.1, ease:Power2.easeInOut});					
						TweenMax.to($(".active .item-caption"), 0.3, {opacity:0, ease:Power2.easeOut});
						TweenMax.to($("#show-filters, #counter-wrap"), 0.3, {opacity:0, delay:0, ease:Power2.easeOut});
						TweenMax.to($("#show-filters, #counter-wrap"), 0, {visibility:'hidden', delay:0.35, ease:Power2.easeOut}); 
						
						//Fade In Navigation Lists
						TweenMax.set($(".filters-info"), {y:30, opacity:0});
						TweenMax.to($(".filters-info"), 0.4, {force3D:true, y:0, opacity:1, delay:0.7, ease:Power2.easeOut});
						var tlMenu = new TimelineLite();
						tlMenu.set($(".filters-timeline"), {y:60, opacity:0});
						$(".filters-timeline").each(function(index, element) {
							tlMenu.to(element, 0.5, {y:0, opacity:1, delay:1.2, ease:Power3.easeOut}, index * 0.1)
						});
						
						var heroheight = $("#hero").height();			
						if ($("body").hasClass("smooth-scroll")) {
							TweenLite.to(scrollbar, 1.5, {scrollTop:heroheight, ease:Power4.easeInOut});
						} else {
							$("html,body").animate({scrollTop: heroheight}, 800);
						}
							
					} else {					
						
						
						TweenMax.to($(".item-parallax"), 0.6, {force3D:true, scale: 1, opacity:1, delay:0.3, ease:Power2.easeInOut});					
						TweenMax.to($(".active .item-caption"), 0.5, {opacity:1, delay:0.5, ease:Power2.easeOut});
						TweenMax.set($("#show-filters, #counter-wrap"), {visibility:'visible', opacity:0});
						TweenMax.to($("#show-filters, #counter-wrap"), 0.3, {opacity:1, delay:0.7, ease:Power2.easeOut});
						
						//Fade Out Navigation Lists
						TweenMax.to($(".filters-info"), 0.2, {force3D:true, y:-30, opacity:0, delay:0, ease:Power1.easeIn});					
						var tlMenu = new TimelineLite();
						$(".filters-timeline, .jssocials-share").each(function(index, element) {
							tlMenu.to(element, 0.25, {opacity:0, y:-60, delay:0.1, ease:Power1.easeIn }, index * 0.1)
						});	
						TweenMax.to('#ball', 0.1,{borderWidth: '4px', scale:0.5,});
						$("#ball").removeClass("close-icon");
						$('#ball i').remove();
						
					}							
				} , 20 );
			});
			
			if ($(window).width() >= 1024) {
				$("#close-filters").mouseenter(function(e) {	
					TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).addClass("close-icon").append( '<i class="fa fa-times"></i>' );
				});
					
				$("#close-filters").mouseleave(function(e) {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("close-icon");
					$('#ball i').remove();
				});
			}
			
			setTimeout( function(){
				var controller = new ScrollMagic.Controller();
				$('.portfolio').each(function(){
					var $this = $(this);
					var $thisHeightFilters = $(this).outerHeight() - window.innerHeight*0.7;
					var $thisHeightCaptions = $(this).outerHeight() - window.innerHeight * 0.1;
					
					var sceneFilters = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeightFilters})
						.addTo(controller)
						
					
					sceneFilters.triggerHook(0.3)
					
					sceneFilters.on('enter', function(){				
						TweenMax.to($("#show-filters"), 0.3, {opacity:1, delay:0, ease:Power2.easeOut});
						$("#show-filters").addClass('enabled')
					});
					
					sceneFilters.on('leave', function(){				
						TweenMax.to($("#show-filters"), 0.15, {opacity:0, delay:0, ease:Power2.easeOut});
						$("#show-filters").removeClass('enabled')
					});
					
					var sceneCaptions = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeightCaptions})
						.addTo(controller)
						
					
					sceneCaptions.triggerHook(0.5)
					
					sceneCaptions.on('enter', function(){
						$(".portfolio-captions").addClass('enabled')
					});
					
					sceneCaptions.on('leave', function(){
						$(".portfolio-captions").removeClass('enabled')
					});
					
					
					
					if ($("body").hasClass("smooth-scroll")) {
						scrollbar.addListener(() => {
							sceneFilters.refresh()
							sceneCaptions.refresh()
						});
					}
				})
			} , 2000 );
			
			TweenMax.to($("#show-filters"), 0, {opacity:0, delay:0.05, ease:Power2.easeOut});
			
			if ($(window).width() > 1024) {
				if (!$(".portfolio-wrap").hasClass("tooltip-caption")) {	
					$(".item-image").mouseenter(function(e) {	
						TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1, borderColor:'#fff'});
						TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
						$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-plus"></i>' );
						$(this).parent().find('video').each(function() {
							$(this).get(0).play();
						});
					});
									
					$(".item-image").mouseleave(function(e) {
						TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999'});
						TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
						$("#ball").removeClass("with-icon");
						$('#ball i').remove();
						$(this).parent().find('video').each(function() {
							$(this).get(0).pause();
						});
					});
				}
				
				//Title Floating Tooltip
				if( $('.tooltip-caption').length > 0 ){
					
					$(".item-title-hover").remove();
					
					$("#ball").append('<div class="title-caption-tooltip"></div>');
					$(".portfolio").find(".item .item-caption").each(function() {
						$(".title-caption-tooltip").append($(this))
					});
					
					$(".portfolio").find(".item .item-image").on("mouseenter", function(e) {
						$(".title-caption-tooltip").children().eq($(this).parents('.item').index()).addClass("hover")
					}).on("mouseleave", function(e) {
						$(".title-caption-tooltip").children().eq($(this).parents('.item').index()).removeClass("hover")
					}).on("click", function() {
						$(".title-caption-tooltip").children().eq($(this).parents('.item').index()).removeClass("hover")
						setTimeout( function(){$(".title-caption-tooltip").remove();} , 100 );
					});
					$(".item-image").mouseenter(function(e) {	
						TweenMax.to('#ball', 0.2,{borderWidth:"0px",scale:1,borderColor:'transparent'});
						TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 4, left: 4});
					});						
					$(".item-image").mouseleave(function(e) {
						TweenMax.to('#ball', 0.3,{borderWidth:"4px",scale:0.5,borderColor:'#999999'});
						TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					});
						
				}	
				
				if( $('.hover-caption').length > 0 ){
					
					if ($(".portfolio-wrap").hasClass("hover-caption")) {
						if ($("#page-content").hasClass("light-content")) {
							$("body").append('<div class="temporary-hero portfolio-captions light-content"></div>');
						} else {
							$("body").append('<div class="temporary-hero portfolio-captions"></div>');
						}
						$(".temporary-hero").append('<div class="outer"></div>');
						$(".temporary-hero .outer").append('<div class="inner"></div>');
						$(".portfolio").find(".item .item-caption").each(function() {
							$(".temporary-hero .outer .inner").append($(this))
						}); 
						
						$(".portfolio").find(".item .item-image").on("mouseenter", function(e) {
							
							TweenMax.to($(".temporary-hero .outer .inner").children().children(".item-title").eq($(this).parents('.item').index()), 0.4, {force3D:true, opacity:1,  y: 0, delay:0.15, ease:Power2.easeOut});
							TweenMax.to($(".temporary-hero .outer .inner").children().children(".item-cat").eq($(this).parents('.item').index()), 0.3, {force3D:true, opacity:1,  y: 0, delay:0.25, ease:Power2.easeOut});
							
						}).on("mouseleave", function(e) {
							
							TweenMax.to($(".temporary-hero .outer .inner").children().children(".item-title").eq($(this).parents('.item').index()), 0.3, {force3D:true, opacity:0,  y: -50, ease:Power2.easeIn});
							TweenMax.to($(".temporary-hero .outer .inner").children().children(".item-cat").eq($(this).parents('.item').index()), 0.3, {force3D:true, opacity:0,  y: -30, delay:0.05, ease:Power2.easeIn});
							TweenMax.set($(".temporary-hero .outer .inner").children().children(".item-title").eq($(this).parents('.item').index()), { y: 50, opacity:0, delay:0.3});
							TweenMax.set($(".temporary-hero .outer .inner").children().children(".item-cat").eq($(this).parents('.item').index()), { y: 30, opacity:0, delay:0.35});
							
						}).on("click", function() {
							$(".temporary-hero").removeClass('enabled')
						});
						$(".item-title-hover").remove();
					}
						
				}
			
			}
			
		}
	
	}//End Portfolio
	
	
	
	
/*--------------------------------------------------
Function FitThumbScreen
---------------------------------------------------*/	
	
	function FitThumbScreen() {
		
		if( $('#itemsWrapper').length > 0 ){
		
			function createDemoEffect(options) {
			  const transitionEffect = new GridToFullscreenEffect(
				document.getElementById("app"),
				document.getElementById("itemsWrapper"),
				Object.assign(
				  {
					scrollContainer: window,
					onToFullscreenStart: ({ index }) => {},
					onToFullscreenFinish: ({ index }) => {},
					onToGridStart: ({ index }) => {},
					onToGridFinish: ({ index, lastIndex }) => {}
				  },
				  options
				)
			  );
			
			  return transitionEffect;
			}
	
			let currentIndex;
			const itemsWrapper = document.getElementById("itemsWrapper");
			const thumbs = [...itemsWrapper.querySelectorAll("img.grid__item-img:not(.grid__item-img--large)")];
			const transitionEffectDuration = 1.8;

			const transitionEffect = createDemoEffect({
				activation: { type: "closestCorner" },
				timing: {
					type: "sameEnd",
					sections: 0,
					duration: transitionEffectDuration
				},
				activation: {
					type: "mouse"
				},
				transformation: {
					type: "wavy",
					props: {
						seed: "217",
						frequency: 0.1,
						amplitude: 0.1
					}
				},
				onToFullscreenStart: ({ index }) => {
					currentIndex = index;
					thumbs[currentIndex].style.opacity = 1;
					
					
					TweenLite.to(itemsWrapper, .6, {
						ease: Power1.easeInOut,
						scale: 1,
						opacity:1,
						delay:0,
					});
					

					toggleFullview();
				},
				
				onToGridStart: ({ index }) => {
					TweenLite.to(itemsWrapper, 1, {
						ease: Power3.easeInOut,
						scale: 1,
						opacity: 1
					});

					toggleFullview();
				},
				
				onToGridFinish: ({ index, lastIndex }) => {
					thumbs[lastIndex].style.opacity = 1;
					
				},
				easings: {
					toFullscreen: Cubic.easeInOut,
					toGrid: Power3.easeInOut
				}
			});
			transitionEffect.init();
			
			if( $('#itemsWrapperLinks').length > 0 ){
				
				const itemsCaptions = document.getElementById("itemsWrapperLinks");
				const thumbsLink = [...itemsCaptions.querySelectorAll(".trigger-slide-link")];
				for( let idxCaption = 0; idxCaption < thumbsLink.length; idxCaption++){
				
					thumbsLink[idxCaption].addEventListener( "mousedown", transitionEffect.createOnMouseDown( idxCaption ) );
				}
			}
			
			const toggleFullview = () => {
				if ( transitionEffect.isFullscreen ) {
					
					transitionEffect.toGrid();
				}
				else {
					
					
				}
			};

			// Preload all the images in the pageI
			imagesLoaded(document.querySelectorAll(".grid__item-img"), instance => {
				//https://www.techrepublic.com/article/preloading-and-the-javascript-image-object/
				

				// Make Images sets for creating the textures.
				let images = [];
				for (var i = 0, imageSet = {}; i < instance.elements.length; i++) {
					let image = {
						element: instance.elements[i],
						image: instance.images[i].isLoaded ? instance.images[i].img : null
					};
					if (i % 2 === 0) {
						imageSet = {};
						imageSet.small = image;
					}

					if (i % 2 === 1) {
						imageSet.large = image;
						images.push(imageSet);
					}
				}
				transitionEffect.createTextures(images);
			});
		
		}
		
		$('.item .grid__item-img').on('click', function() {
			$(this).parents('.item').addClass('above');
			$("body").addClass("load-project-thumb").addClass("show-loader");
			TweenMax.to('.item, #show-filters, #counter-wrap, .marquee-wrapper, footer, .item-caption-wrapper', 0.5,{opacity:0, ease:Power4.easeInOut});
			TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball p').remove();
			$('#ball i').remove();
			if ($(this).parents('.item').hasClass("change-header")) {
				$('#page-content').delay(900).queue(function(next){
					$(this).removeClass('light-content');
					next();
				});
			}						
			$(this).delay(1000).queue(function() {
				var link = $(".above").find('a');
				link.trigger('click');
			});		
		});
		
		$('#itemsWrapperLinks .trigger-slide-link').on('click', function() {
			let parent_slide = $(this).closest( '.swiper-slide' );
			parent_slide.addClass('above');
			
			if (parent_slide.hasClass("change-header")) {
				$('#page-content').delay(900).queue(function(next){
					$(this).removeClass('light-content');
					next();
				});
			}
			
			$("body").addClass("load-project-thumb").addClass("show-loader");
			TweenMax.to($("#showcase-slider .swiper-slide .inner"), 0.3, {force3D:true, delay:0, opacity:0, ease:Power3.easeInOut  });
			TweenMax.to($("#showcase-slider .swiper-slide.above").prevAll(), 0.7, {force3D:true, x:-300, scale:1.1, delay:0, opacity:0, ease:Power3.easeInOut  });
			TweenMax.to($("#showcase-slider .swiper-slide.above").nextAll(), 0.7, {force3D:true, x:300, scale:1.1, delay:0, opacity:0, ease:Power3.easeInOut  });
				
			TweenMax.to('footer', 0.5,{opacity:0, ease:Power4.easeInOut});
			TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball p').remove();
			$('#ball i').remove();
						
			$(this).delay(1000).queue(function() {
				var link = $(".above").find('a');
				link.trigger('click');
			});
		});
		
		
	}//End FitThumbScreen		

	

/*--------------------------------------------------
Function Shortcodes
---------------------------------------------------*/
	
	function Shortcodes() {

		// Accordion	  
		
		$('dd.accordion-content').slideUp(1).addClass('hide');		
		$('dl.accordion').on('click', 'dt', function() {
			$(this).addClass('accordion-active').next().slideDown(350).siblings('dd.accordion-content').slideUp(350).prev().removeClass('accordion-active');						
		});	
		$('dl.accordion').on('click', 'dt.accordion-active', function() {
			$(this).removeClass('accordion-active').siblings('dd.accordion-content').slideUp(350);
		});
		
		$(".flexnav").flexNav({ 'animationSpeed' : 250 });
		
		// Project Share	
		
		$("#share").jsSocials({
            showLabel: false,
    		showCount: false,
    		shares: ["facebook", "twitter", "pinterest"]
        });
		
		$('.jssocials-share').wrap( "<div class='parallax-wrap'><div class='parallax-element'></div></div>" );
		
		if( $('.random-collage-wrap').length > 0 ){
		
			if ($(window).width() >= 1024) {
				
				$(".random-collage .rc-slide .item-wrap-image").on('mouseenter', function() {	
					var $this = $(this);			
					TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );				
				});
									
				$(".random-collage .rc-slide .item-wrap-image").on('mouseleave', function() {					
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$('#ball p').remove();				
				});
			
			}
		}
	
	}//End Shortcodes
	

	
	
/*--------------------------------------------------
Function Sliders
---------------------------------------------------*/
	
	function Sliders() {
		
		setTimeout( function(){
			
			if( $('.content-slider').length > 0 ){
			
				var interleaveOffset = 0.4;
				
				var ContentSliderOptions = {				
					direction: 'horizontal',
					loop: true,
					slidesPerView: 1,
					paginationClickable: true,
					spaceBetween: 0,
					mousewheelControl: false,
					simulateTouch: false,
					speed: 1000,
					navigation: {
						nextEl: '.slider-button-next',
						prevEl: '.slider-button-prev',
					},
					on: {
						progress: function() {
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								var slideProgress = swiper.slides[i].progress;
								var innerOffset = swiper.height * interleaveOffset;
								var innerTranslate = slideProgress * innerOffset;
								swiper.slides[i].querySelector("img").style.transform = "translate3d(" + innerTranslate + "px,0, 0)";
							}
						  
						},
						touchStart: function() {
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								swiper.slides[i].style.transition = "";
							}
						},
						setTransition: function(speed) {
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								swiper.slides[i].style.transition = speed + "ms";
								swiper.slides[i].querySelector("img").style.transition = speed + "ms";
							}   
						}
					}
			
				}
				
				var swiper = new Swiper(".content-slider", ContentSliderOptions);
				
				$(".slider-button-prev").mouseenter(function(e) {	
					TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-chevron-left"></i>' );
				});
					
				$(".slider-button-prev").mouseleave(function(e) {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-icon");
					$('#ball i').remove();
				});
				
				$(".slider-button-next").mouseenter(function(e) {	
					TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-chevron-right"></i>' );
				});
					
				$(".slider-button-next").mouseleave(function(e) {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-icon");
					$('#ball i').remove();
				});
				
			}
			
			
			if( $('.content-carousel').length > 0 ){
				
				$('body').waitForImages({
					finished: function() {
			
						var ContentCarouselOptions = {			
							direction: 'horizontal',
							simulateTouch: true,
							slidesPerView: 'auto',
							spaceBetween: 0,
							mousewheelControl: false,
							speed: 700,
							pagination: {
				  				el: '.swiper-pagination',
								clickable: true,
								renderBullet: function (index, className) {
					  			return '<span class="' + className + '">'+'<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader" width="20" height="20" viewBox="0 0 20 20">'+
									'<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)"'+
									'stroke-opacity="1" stroke-width="2px"></circle>'+
									'<circle class="solid-fill" cx="10" cy="10" r="3"></circle>'+
									'</svg></div></div></span>';
								},
							}
						}
						
						var swiper = new Swiper(".content-carousel", ContentCarouselOptions);
				
					},
					waitForAll: true
				});	

				
				$('.content-carousel').on('mousedown touchstart', function() {
					TweenMax.to('.swiper-slide img', 0.7,{scale: 0.9});
					$("body").addClass("drag-cursor");
				});
				
				$('body').on('mouseup touchend', function() {
					TweenMax.to('.swiper-slide img', 0.7,{scale:1});
					$("body").removeClass("drag-cursor");
				});
				
				$('.content-carousel').on('mouseenter mousemove', function() {	
					TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
					$("body" ).addClass("scale-drag-x");
				});
					
				$('.content-carousel').on('mouseleave', function() {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					$("body").removeClass("scale-drag-x").removeClass("drag-cursor");
				});
				
				$("body").mouseleave(function(e) {
					TweenMax.to('.swiper-slide img', 0.7,{scale:1});
					$("body").removeClass("scale-drag-x").removeClass("drag-cursor");
				});
			
			}
			
			
			if( $('.content-looped-carousel').length > 0 ){
				
				$('body').waitForImages({
					finished: function() {
			
						var ContentLoopedCarouselOptions = {			
							direction: 'horizontal',
							simulateTouch: true,
							slidesPerView: 'auto',
							spaceBetween: 0,
							centeredSlides: true,
							loop:true,
							mousewheelControl: false,
							speed: 700,
							pagination: {
				  				el: '.swiper-pagination',
								clickable: true,
								renderBullet: function (index, className) {
					  			return '<span class="' + className + '">'+'<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader" width="20" height="20" viewBox="0 0 20 20">'+
									'<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)"'+
									'stroke-opacity="1" stroke-width="2px"></circle>'+
									'<circle class="solid-fill" cx="10" cy="10" r="3"></circle>'+
									'</svg></div></div></span>';
								},
							}			
						}
						
						var swiper = new Swiper(".content-looped-carousel", ContentLoopedCarouselOptions);
						
					},
					waitForAll: true
				});							
				
				$('.content-looped-carousel').on('mousedown touchstart', function() {
					TweenMax.to('.swiper-slide img', 0.7,{scale: 0.9});
					$("body").addClass("drag-cursor");
				});
				
				$('body').on('mouseup touchend', function() {
					TweenMax.to('.swiper-slide img', 0.7,{scale:1});
					$("body").removeClass("drag-cursor");
				});
				
				$('.content-looped-carousel').on('mouseenter mousemove', function() {	
					TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
					$("body" ).addClass("scale-drag-x");
				});
					
				$('.content-looped-carousel').on('mouseleave', function() {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					$("body").removeClass("scale-drag-x").removeClass("drag-cursor");
				});
				
				$("body").mouseleave(function(e) {
					TweenMax.to('.swiper-slide img', 0.7,{scale:1});
					$("body").removeClass("scale-drag-x").removeClass("drag-cursor");
				});
			
			}
		
		} , 400 );
		
		
		if( $('.content-middle-carousel').length > 0 ){
			
			var ContentMiddleCarouselOptions = {			
				direction: 'horizontal',
				simulateTouch: true,
				slidesPerView: 'auto',
				spaceBetween: 0,
				centeredSlides: true,
				loop:true,
				mousewheelControl: false,
				speed: 700,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
					renderBullet: function (index, className) {
					return '<span class="' + className + '">'+'<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader" width="20" height="20" viewBox="0 0 20 20">'+
						'<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)"'+
						'stroke-opacity="1" stroke-width="2px"></circle>'+
						'<circle class="solid-fill" cx="10" cy="10" r="3"></circle>'+
						'</svg></div></div></span>';
					},
				}			
			}
			
			var swiper = new Swiper(".content-middle-carousel", ContentMiddleCarouselOptions);
			
			if ($(window).width() > 1024) {
				
				$(".content-middle-carousel .swiper-slide img").mouseenter(function(e) {	
					TweenMax.to('#ball', 0.3,{borderWidth: '2px', scale: 1, borderColor:'#fff'});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-plus"></i>' );
					$(this).parent().find('video').each(function() {
						$(this).get(0).play();
					});
				});
								
				$(".content-middle-carousel .swiper-slide img").mouseleave(function(e) {
					TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999'});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-icon");
					$('#ball i').remove();
					$(this).parent().find('video').each(function() {
						$(this).get(0).pause();
					});
				});
			}
			
		}
		
		
	}//End Sliders	
	
	
/*--------------------------------------------------
Function Justified Grid
---------------------------------------------------*/	
	
	function JustifiedGrid() {
		
		if( $('#justified-grid').length > 0 ){
		
			$('#justified-grid').justifiedGallery({
				rowHeight : 360,
				lastRow : 'nojustify',
				margins : 10
			});
		
		}
		
	}//End Justified Grid	
	
	
/*--------------------------------------------------
Function Lightbox
---------------------------------------------------*/
	
	function Lightbox() {
		
		$('.image-link').magnificPopup({
		  	type: 'image',
			mainClass: 'mfp-with-zoom',	
			gallery: {
			  enabled:true
			},		
			zoom: {
				enabled: true, 			
				duration: 300, 
				easing: 'ease-in-out', 
				opener: function(openerElement) {
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}			
		});
		
		$(".image-link").mouseenter(function(e) {	
			TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 2, left: 2});
			$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-plus"></i>' );
		});
			
		$(".image-link").mouseleave(function(e) {
			TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball i').remove();
		});
			
	}//End Lightbox	
	
	
	
/*--------------------------------------------------
Function Contact Formular
---------------------------------------------------*/	
		
	function ContactForm() {	
	
		if( $('#contact-formular').length > 0 ){
			
			$('#contactform').submit(function(){
				var action = $(this).attr('action');
				$("#message").slideUp(750,function() {
					$('#message').hide();
					$('#submit').attr('disabled','disabled');		
					$.post(action, {
						name: $('#name').val(),
						email: $('#email').val(),
						comments: $('#comments').val()
					},
					function(data){
						document.getElementById('message').innerHTML = data;
						$('#message').slideDown('slow');
						$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
						$('#submit').removeAttr('disabled');
						if(data.match('success') != null) $('#contactform').slideUp('slow');		
					}
				);		
				});		
				return false;		
			});		
		}
		
		
		
		

	}//End ContactForm
	
	
	
/*--------------------------------------------------
Function Page PlayVideo
---------------------------------------------------*/	


	function PlayVideo() {
	
		if( $('.video-wrapper').length > 0 ){
			
			
			$(".video-wrapper").mouseenter(function(e) {
				if ($(this).hasClass("play")) {
					$( "#ball" ).addClass("pause-movie")		
				}
				TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
				$( "#ball" ).addClass("over-movie").append( '<i class="fa fa-play"></i><i class="fa fa-pause"></i>' );
			});
			
			$(".video-wrapper").mouseleave(function(e) {
				TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
				$("#ball").removeClass("over-movie").removeClass("pause-movie");
				$('#ball i').remove();
			});
			
			$(".video-wrapper .control").mouseenter(function(e) {	
				TweenMax.to('#ball', 0.2,{borderWidth: '20px', scale: 0});
			});
			
			$(".video-wrapper .control").mouseleave(function(e) {
				TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale: 1, borderColor:'#fff',});
			});
			
			var videocenter = ($(window).height() - $('.video-cover').height()) / 2
					
			////////////////////////////////////////////////////// REFACTOR //////////////////////////////////////////////////////
			// plays or pause the video function of its current state
			var playpause = function( videoObj ) {
				
				if( videoObj[0] != null ){
					if(videoObj[0].paused || videoObj[0].ended) {
						
						videoObj.parent().addClass('play');
						videoObj[0].play();
					}
					else {
						
						videoObj.parent().removeClass('play');
						videoObj[0].pause();
					}
				}
			};
			
			//Time format converter - 00:00
			var timeFormat = function(seconds){
				var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
				var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
				return m+":"+s;
			};
			
			// Events
			// click to video cover - will start the video
			$('.video-wrapper').on('click', function() {
				
				$('html,body').animate({scrollTop: $(this).offset().top - videocenter},390);		
				// hide the video cover in order to start playing
				$(this).find('.video-cover').addClass('hidden');
				
				$( "#ball" ).toggleClass("pause-movie");
				
				// pause first the other videos
				var current_wrapper = $(this);
				$('#main-page-content').find('.video-wrapper').each(function() {
					
					if( !current_wrapper.is( $(this) ) ){
						
						$(this).removeClass('play');
						$(this).find('video').each(function() {
							
							if( !$(this).get(0).paused && !$(this).get(0).ended ) {
								
								$(this).get(0).pause();
							}
						});
					}
					
				});
				
				// trigger the click for the inner video
				$(this).find('video').each(function() {

					playpause( $(this) );
				});

			});
			
			//fullscreen button clicked
			$('.btnFS').on('click', function( e ) {
					
				var parent_wrapper	= $(this).closest('.video-wrapper');
				var video_object 		= parent_wrapper.find('video');
					
				if($.isFunction(video_object[0].webkitEnterFullscreen)) {
					video_object[0].webkitEnterFullscreen();
				}	
				else if ($.isFunction(video_object[0].mozRequestFullScreen)) {
					video_object[0].mozRequestFullScreen();
				}
				else {
					alert('Your browsers doesn\'t support fullscreen');
				}
				
				// prevent video wrapper div responding the event
				e.stopPropagation();
				
			});
				
			//sound button clicked
			$('.sound').on('click', function( e ) {
					
				var parent_wrapper	= $(this).closest('.video-wrapper');
				var video_object 		= parent_wrapper.find('video');
					
				video_object[0].muted = !video_object[0].muted;
				$(this).toggleClass('muted');
				if(video_object[0].muted) {
					parent_wrapper.find('.volumeBar').css('width',0);
				}
				else{
					parent_wrapper.find('.volumeBar').css('width', video_object[0].volume*100+'%');
				}
				
				// prevent video wrapper div responding the event
				e.stopPropagation();
			});
			
			//progress bar (video timebar) clicked
			$('.progress').on('click', function( e ) {
				
				var parent_wrapper	= $(this).closest('.video-wrapper');
				var video_object 		= parent_wrapper.find('video');
									
				// calculate click position
				// and update video current time
				// as well as progress bar
				var maxduration 	= video_object[0].duration;
				var position 			= e.pageX - $(this).offset().left;
				var percentage 	= 100 * position / $(this).width();
				if(percentage > 100) {
					
					percentage = 100;
				}
				if(percentage < 0) {
					
					percentage = 0;
				}
				$('.timeBar').css('width', percentage+'%');	
				video_object[0].currentTime = maxduration * percentage / 100;
				
				// prevent video wrapper div responding the event
				e.stopPropagation();
			});
			
			$('#main-page-content').find('video').each(function() {
			
				var video = $(this);
				var video_wrapper = $(this).parent();
				
				//remove default control when JS loaded
				video[0].removeAttribute("controls");
				video_wrapper.find('.control').fadeIn(500);
				video_wrapper.find('.caption').fadeIn(500);
			 
				//before everything get started and we have the info about the video such as duration
				video.on('loadedmetadata', function() {
					
					var video_object = $(this);
					var parent_wrapper = $(this).parent();
					//set video properties
					parent_wrapper.find('.current').text(timeFormat(0));
					parent_wrapper.find('.duration').text(timeFormat(video[0].duration));
					
				});
				
				//display current video buffered progress
				video.on('progress', function() {
					
					var video_object 		= $(this);
					var parent_wrapper 	= $(this).parent();
					var maxduration 		= video_object [0].duration;
					
					if (maxduration > 0) {
					  for (var i = 0; i < video_object [0].buffered.length; i++) {
							if (video_object [0].buffered.start(video_object [0].buffered.length - 1 - i) <video_object [0].currentTime) {
								var perc = (video_object [0].buffered.end(video_object [0].buffered.length - 1 - i) / maxduration) * 100 + "%";
								parent_wrapper.find('.bufferBar').css('width',perc+'%');
								break;
							}
						}
					}
					
				});
				
				//display current video play time
				video.on('timeupdate', function() {
					
					var parent_wrapper 	= $(this).parent();
					var currentPos 			= $(this).get(0).currentTime;
					var maxduration 		= $(this).get(0).duration;
					var perc 					= 100 * currentPos / maxduration;
					parent_wrapper.find('.timeBar').css('width',perc+'%');	
					parent_wrapper.find('.current').text(timeFormat(currentPos));	
				});
				
				//video screen and play button clicked
				video.on('click', function() { 
					
					playpause( $(this) ); 
				});
				
				//video canplay event
				video.on('canplay', function() {
					
					var parent_wrapper = $(this).parent();
					parent_wrapper.find('.loading').fadeOut(100); //?
				});
				
				//video canplaythrough event
				//solve Chrome cache issue
				var completeloaded = false;
				video.on('canplaythrough', function() {
					
					completeloaded = true;
				});
				
				//video ended event
				video.on('ended', function() {		
					
					$(this).get(0).pause();
					$(this).parent().removeClass("play");
					$( "#ball" ).toggleClass("pause-movie");
				});
			
				//video seeking event
				video.on('seeking', function() {
					
					//if video fully loaded, ignore loading screen
					if(!completeloaded) { 
						var parent_wrapper = $(this).parent();
						parent_wrapper.find('.loading').fadeIn(200); //?
					}	
				});
				
				//video seeked event
				video.on('seeked', function() { });
				
				//video waiting for more data event
				video.on('waiting', function() {
					
					var parent_wrapper = $(this).parent();
					parent_wrapper.find('.loading').fadeIn(200); //?
				});
				
			});
			
		}
		
	}// End PlayVideo					
	





/*--------------------------------------------------
Function Ajax Load
---------------------------------------------------*/


	function AjaxLoad() {		
		
		var mouse = { x: 0, y: 0 };
		var pos = { x: 0, y: 0 };
		var ratio = 0.65;			
		var active = false;			
		var ball = document.getElementById("ball");
		var ballloader = document.getElementById("ball-loader");
		var offsetX = 40;
		
		
		TweenLite.set(ball, { xPercent: -50, yPercent: -50, scale:0.5, borderWidth: '4px' });
		
		document.addEventListener("mousemove", mouseMove);
		
		function mouseMove(e) {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			mouse.x = e.pageX;
			mouse.y = e.pageY - scrollTop;
		}
		
		TweenLite.ticker.addEventListener("tick", updatePosition);
		
		function updatePosition() {
			if (!active) {
				pos.x += (mouse.x - pos.x) * ratio;
				pos.y += (mouse.y - pos.y) * ratio;
		
				TweenLite.to(ball, 0.4, { x: pos.x, y: pos.y });
			}
		}
		
		$(".sticky.left").mouseenter(function(e) {
			var rcBounds = $(this)[0].getBoundingClientRect();		  
			var positionX = rcBounds.left - offsetX;
			var positionY = rcBounds.top + rcBounds.height/2;		  
			TweenLite.to(ball, 0.5, { x: positionX, y: positionY, scale: 0.9, borderWidth: '2px'});
			TweenMax.ticker.removeEventListener("tick", updatePosition);
		})
		
		$(".sticky.right").mouseenter(function(e) {
			var rcBounds = $(this)[0].getBoundingClientRect();		  
			var positionX = rcBounds.right + offsetX;
			var positionY = rcBounds.top + rcBounds.height/2;		  
			TweenLite.to(ball, 0.5, { x: positionX, y: positionY, scale: 0.9, borderWidth: '2px'});
			TweenMax.ticker.removeEventListener("tick", updatePosition);
		})
		
		$("#main .sticky.left").mouseenter(function(e) {		  
			var rcBounds = $(this)[0].getBoundingClientRect();		  
			var positionX = rcBounds.left - offsetX + 10;
			var positionY = rcBounds.top + rcBounds.height/2;		  
			TweenLite.to(ball, 0.5, { x: positionX, y: positionY, scale:0.7, opacity:0.6, borderWidth: '6px', borderColor:'#999999'});
			TweenMax.ticker.removeEventListener("tick", updatePosition);
		})
		
		$("#main .sticky.right").mouseenter(function(e) {		  
			var rcBounds = $(this)[0].getBoundingClientRect();		  
			var positionX = rcBounds.right + offsetX - 10;
			var positionY = rcBounds.top + rcBounds.height/2;		  
			TweenLite.to(ball, 0.5, { x: positionX, y: positionY, scale:0.7, opacity:0.6, borderWidth: '6px', borderColor:'#999999'});
			TweenMax.ticker.removeEventListener("tick", updatePosition);
		})
		
		$(".sticky").mouseleave(function(e) {			
			TweenLite.to(ball, 0.2, { scale:0.5, borderWidth: '4px', borderColor:'#999999', opacity:1 });
			TweenMax.ticker.addEventListener("tick", updatePosition);		  
		})
		
		$(".sticky-titles .slide-title").mouseenter(function(e) {		  
			var rcBounds = $(this)[0].getBoundingClientRect();		  
			var positionX = rcBounds.right + offsetX + 10;
			var positionY = rcBounds.top + rcBounds.height - 30;		  
			TweenLite.to(ball, 0.5, { x: positionX, y: positionY, scale:0.7, opacity:1, borderWidth: '6px', borderColor:$("body").data('cursor-color')});
			TweenMax.ticker.removeEventListener("tick", updatePosition);
		})
		
		$(".sticky-titles .slide-title").mouseleave(function(e) {			
			TweenLite.to(ball, 0.2, { scale:0.5, borderWidth: '4px', borderColor:'#999999', opacity:1 });
			TweenMax.ticker.addEventListener("tick", updatePosition);		  
		})		
		
		$(".parallax-wrap").mouseenter(function(e) {
			TweenMax.to(this, 0.3, { scale: 2 });
			TweenMax.to(ball, 0.3, { scale: 0.9, borderWidth: '2px',opacity:1 });
			TweenMax.to($( this ).children(), 0.3,{scale:0.5});
			active = true;
		});
		
		$("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
			TweenMax.to(ball, 0.3, { scale: 0.7, borderWidth: '6px', opacity:0.6, borderColor:'#999' });
		});
		
		$(".parallax-wrap.bigger").mouseenter(function(e) {
			TweenMax.to(ball, 0.3, { scale: 1.35, borderWidth: '2px', opacity:1 });
		});
		
		$(".parallax-wrap").mouseleave(function(e) {
			TweenMax.to(this, 0.3, { scale: 1 });
			TweenMax.to(ball, 0.3, { scale: 0.5, borderWidth: '4px', opacity:1, borderColor:'#999999'  });
			TweenMax.to($( this ).children(), 0.3,{scale:1, x: 0, y:0});
			active = false;
		});		
		
		if ($('#magic-cursor').hasClass("light-content")) {
			$(".sticky").mouseenter(function(e) {
			  TweenLite.to(ball, 0.5, { borderColor:$("body").data('primary-color') });
			})
			$("#main .sticky").mouseenter(function(e) {
			  TweenLite.to(ball, 0.5, { borderColor:'#999' });
			})
			$(".parallax-wrap").mouseenter(function(e) {
				TweenMax.to(ball, 0.3, { borderColor:$("body").data('primary-color')  });
			});
			$(".parallax-wrap.bigger").mouseenter(function(e) {
				TweenMax.to(ball, 0.3, { borderColor:$("body").data('primary-color')  });
			});
			$(".white-section .parallax-wrap.bigger").mouseenter(function(e) {
				TweenMax.to(ball, 0.3, { borderColor:$("body").data('primary-color')  });
			});
			$("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
				TweenMax.to(ball, 0.3, { borderColor:'#999'});
			});
		} else {
			$(".sticky").mouseenter(function(e) {
			  TweenLite.to(ball, 0.5, { borderColor:$("body").data('primary-color') });
			})
			$("#main .sticky").mouseenter(function(e) {
			  TweenLite.to(ball, 0.5, { borderColor:'#999' });
			})
			$(".parallax-wrap").mouseenter(function(e) {
				TweenMax.to(ball, 0.3, { borderColor:$("body").data('primary-color') });
			});
			$(".parallax-wrap.bigger").mouseenter(function(e) {
				TweenMax.to(ball, 0.3, { borderColor:$("body").data('primary-color')  });
			});
			$("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
				TweenMax.to(ball, 0.3, { borderColor:'#999'});
			});
		}
		
		$(".parallax-wrap").mousemove(function(e) {
			parallaxCursor(e, this, 2);
			callParallax(e, this);
		});
		
		function callParallax(e, parent) {
			parallaxIt(e, parent, parent.querySelector(".parallax-element"), 20);
		}
		
		function parallaxIt(e, parent, target, movement) {
			var boundingRect = parent.getBoundingClientRect();
			var relX = e.pageX - boundingRect.left;
			var relY = e.pageY - boundingRect.top;
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			
			TweenMax.to(target, 0.3, {
				x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
				y: (relY - boundingRect.height / 2 - scrollTop) / boundingRect.height * movement,
				ease: Power2.easeOut
			});
		}
		
		function parallaxCursor(e, parent, movement) {
			var rect = parent.getBoundingClientRect();
			var relX = e.pageX - rect.left;
			var relY = e.pageY - rect.top;
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
			pos.y = rect.top + rect.height / 2  + (relY - rect.height / 2 - scrollTop)  / movement ;
			TweenMax.to(ball, 0.3, { x: pos.x, y: pos.y });
		}
		
		$(".hide-ball").mouseenter(function(e) {	
			TweenMax.to('#ball', 0.2,{borderWidth: '1px', scale: 1, opacity:0});
		});			
		$(".hide-ball").mouseleave(function(e) {
			TweenMax.to('#ball', 0.3,{borderWidth: '4px', scale:0.5, opacity:1});
		});
		
		$(".link").mouseenter(function(e) {	
			TweenMax.to('#ball', 0.2,{borderWidth:"0px",scale:1.5,backgroundColor:"rgba(153, 153, 153, 1)",opacity:0.15});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 4, left: 4});
		});			
		$(".link").mouseleave(function(e) {
			TweenMax.to('#ball', 0.3,{borderWidth:"4px",scale:0.5,backgroundColor:"rgba(153, 153, 153, 0)",opacity:1});
			TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
		});
		
		
		
		
		
		jQuery(document).ready(function(){
			  var isAnimating = false,
				newLocation = '';
				firstLoad = false;
			  
			  //trigger smooth transition from the actual page to the new one 
			  $('main').on('click', '[data-type="page-transition"]', function(event){
				event.preventDefault();
				//detect which page has been selected
				var newPage = $(this).attr('href');
				//if the page is not already being animated - trigger animation
				if( !isAnimating ) changePage(newPage, true);
				firstLoad = true;
			  });
			
			  //detect the 'popstate' event - e.g. user clicking the back button
			  $(window).on('popstate', function() {
				if( firstLoad ) {
				  /*
				  Safari emits a popstate event on page load - check if firstLoad is true before animating
				  if it's false - the page has just been loaded
				  */
				  var newPage = location.href;

				  if( !isAnimating  &&  newLocation != newPage ) changePage(newPage, false);
				}
				firstLoad = true;
				});
			
				function changePage(url, bool) {
				isAnimating = true;
				// trigger page animation
				$('body').addClass('page-is-changing');
				$('.cd-cover-layer').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					loadNewContent(url, bool);
				  newLocation = url;
				  $('.cd-cover-layer').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
				});
				//if browser doesn't support CSS transitions
				if( !transitionsSupported() ) {
				  loadNewContent(url, bool);
				  newLocation = url;
				}
				}
			
				function loadNewContent(url, bool) {
					url = ('' == url) ? 'index.html' : url;
				
				var section = $('<div class="cd-main-content "></div>');
						
					
				section.load(url+' .cd-main-content > *', function(event){
				  // load new content and replace <main> content with the new one
				  
				  	$('main').html(section);
				  
				 	var clapat_title = event.match(/<title[^>]*>([^<]+)<\/title>/)[1];
					$('head title').html( clapat_title );
				  
					
					$('html, body').scrollTop(0);
				  
				  //if browser doesn't support CSS transitions - dont wait for the end of transitions
				  var delay = ( transitionsSupported() ) ? 30 : 0;
				  setTimeout(function(){
					//wait for the end of the transition on the loading bar before revealing the new content				
					$('body').removeClass('page-is-changing');
					$('.cd-cover-layer').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					  isAnimating = false;
					  $('.cd-cover-layer').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
					})
				
				LoadViaAjax();
				
				
				
				$(".sticky.left").mouseenter(function(e) {
					var rcBounds = $(this)[0].getBoundingClientRect();		  
					var positionX = rcBounds.left - offsetX;
					var positionY = rcBounds.top + rcBounds.height/2;		  
					TweenLite.to(ball, 0.5, { x: positionX, y: positionY, scale: 0.9, borderWidth: '2px'});
					TweenMax.ticker.removeEventListener("tick", updatePosition);
				})
				
				$(".sticky.right").mouseenter(function(e) {
					var rcBounds = $(this)[0].getBoundingClientRect();		  
					var positionX = rcBounds.right + offsetX;
					var positionY = rcBounds.top + rcBounds.height/2;		  
					TweenLite.to(ball, 0.5, { x: positionX, y: positionY, scale: 0.9, borderWidth: '2px'});
					TweenMax.ticker.removeEventListener("tick", updatePosition);
				})
				
				$("#main .sticky.left").mouseenter(function(e) {		  
					var rcBounds = $(this)[0].getBoundingClientRect();		  
					var positionX = rcBounds.left - offsetX + 10;
					var positionY = rcBounds.top + rcBounds.height/2;		  
					TweenLite.to(ball, 0.5, { x: positionX, y: positionY, scale:0.7, opacity:0.6, borderWidth: '6px', borderColor:'#999999'});
					TweenMax.ticker.removeEventListener("tick", updatePosition);
				})
				
				$("#main .sticky.right").mouseenter(function(e) {		  
					var rcBounds = $(this)[0].getBoundingClientRect();		  
					var positionX = rcBounds.right + offsetX - 10;
					var positionY = rcBounds.top + rcBounds.height/2;		  
					TweenLite.to(ball, 0.5, { x: positionX, y: positionY, scale:0.7, opacity:0.6, borderWidth: '6px', borderColor:'#999999'});
					TweenMax.ticker.removeEventListener("tick", updatePosition);
				})
				
				$(".sticky").mouseleave(function(e) {			
					TweenLite.to(ball, 0.2, { scale:0.5, borderWidth: '4px', borderColor:'#999999', opacity:1 });
					TweenMax.ticker.addEventListener("tick", updatePosition);		  
				})		
				
				$(".parallax-wrap").mouseenter(function(e) {
					TweenMax.to(this, 0.3, { scale: 2 });
					TweenMax.to(ball, 0.3, { scale: 0.9, borderWidth: '2px',opacity:1 });
					TweenMax.to($( this ).children(), 0.3,{scale:0.5});
					active = true;
				});
				
				$("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
					TweenMax.to(ball, 0.3, { scale: 0.7, borderWidth: '6px', opacity:0.6, borderColor:'#999' });
				});
				
				$(".parallax-wrap.bigger").mouseenter(function(e) {
					TweenMax.to(ball, 0.3, { scale: 1.35, borderWidth: '2px', opacity:1 });
				});
				
				$(".parallax-wrap").mouseleave(function(e) {
					TweenMax.to(this, 0.3, { scale: 1 });
					TweenMax.to(ball, 0.3, { scale: 0.5, borderWidth: '4px', opacity:1, borderColor:'#999999'  });
					TweenMax.to($( this ).children(), 0.3,{scale:1, x: 0, y:0});
					active = false;
				});		
				
				if ($('#magic-cursor').hasClass("light-content")) {
					$(".sticky").mouseenter(function(e) {
					  TweenLite.to(ball, 0.5, { borderColor:$("body").data('primary-color') });
					})
					$("#main .sticky").mouseenter(function(e) {
					  TweenLite.to(ball, 0.5, { borderColor:'#999' });
					})
					$(".parallax-wrap").mouseenter(function(e) {
						TweenMax.to(ball, 0.3, { borderColor:$("body").data('primary-color')  });
					});
					$(".parallax-wrap.bigger").mouseenter(function(e) {
						TweenMax.to(ball, 0.3, { borderColor:$("body").data('primary-color')  });
					});
					$(".white-section .parallax-wrap.bigger").mouseenter(function(e) {
						TweenMax.to(ball, 0.3, { borderColor:$("body").data('primary-color')  });
					});
					$("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
						TweenMax.to(ball, 0.3, { borderColor:'#999'});
					});
				} else {
					$(".sticky").mouseenter(function(e) {
					  TweenLite.to(ball, 0.5, { borderColor:$("body").data('primary-color') });
					})
					$("#main .sticky").mouseenter(function(e) {
					  TweenLite.to(ball, 0.5, { borderColor:'#999' });
					})
					$(".parallax-wrap").mouseenter(function(e) {
						TweenMax.to(ball, 0.3, { borderColor:$("body").data('primary-color') });
					});
					$(".parallax-wrap.bigger").mouseenter(function(e) {
						TweenMax.to(ball, 0.3, { borderColor:$("body").data('primary-color')  });
					});
					$("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
						TweenMax.to(ball, 0.3, { borderColor:'#999'});
					});
				}
				
				$(".parallax-wrap").mousemove(function(e) {
					parallaxCursor(e, this, 2);
					callParallax(e, this);
				});
				
				function callParallax(e, parent) {
					parallaxIt(e, parent, parent.querySelector(".parallax-element"), 20);
				}
				
				function parallaxIt(e, parent, target, movement) {
					var boundingRect = parent.getBoundingClientRect();
					var relX = e.pageX - boundingRect.left;
					var relY = e.pageY - boundingRect.top;
					var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
					
					TweenMax.to(target, 0.3, {
						x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
						y: (relY - boundingRect.height / 2 - scrollTop) / boundingRect.height * movement,
						ease: Power2.easeOut
					});
				}
				
				function parallaxCursor(e, parent, movement) {
					var rect = parent.getBoundingClientRect();
					var relX = e.pageX - rect.left;
					var relY = e.pageY - rect.top;
					var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
					pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
					pos.y = rect.top + rect.height / 2  + (relY - rect.height / 2 - scrollTop)  / movement ;
					TweenMax.to(ball, 0.3, { x: pos.x, y: pos.y });
				}
				
				$(".hide-ball").mouseenter(function(e) {	
					TweenMax.to('#ball', 0.2,{borderWidth: '1px', scale: 1, opacity:0});
				});			
				$(".hide-ball").mouseleave(function(e) {
					TweenMax.to('#ball', 0.3,{borderWidth: '4px', scale:0.5, opacity:1});
				});
				
				$(".link").mouseenter(function(e) {	
					TweenMax.to('#ball', 0.2,{borderWidth:"0px",scale:1.5,backgroundColor:"rgba(153, 153, 153, 1)",opacity:0.15});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 4, left: 4});
				});			
				$(".link").mouseleave(function(e) {
					TweenMax.to('#ball', 0.3,{borderWidth:"4px",scale:0.5,backgroundColor:"rgba(153, 153, 153, 0)",opacity:1});
					TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
				});
				
				
				
				
				if( !transitionsSupported() ) isAnimating = false;
				  }, delay);			  
				  if(url!=window.location && bool){
					window.history.pushState({path: url},'',url);
				  }
					});
			  }
			
			  function transitionsSupported() {
				return $('html').hasClass('csstransitions');
			  }
			});
			
		
	}// End Ajax Load	


	
	
/*--------------------------------------------------
Function Load Via Ajax
---------------------------------------------------*/	
		
	function LoadViaAjax() {		
		
		FirstLoad();
		ScrollEffects();
		PageLoadActions();		
		Showcase();
		ShowcaseWebgl();
		ShowcaseWebglCore();
		ShowcaseCarousel();
		FloatingLists();
		LazyLoad();				
		Portfolio();
		FitThumbScreen();	
		Shortcodes();
		Sliders();
		JustifiedGrid();
		Lightbox();
		ContactForm();
		PlayVideo();
		ContactMap();
	
	}//End Load Via Ajax
	
	
					
	
		