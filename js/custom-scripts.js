/*-------------------------------------------------------------------*/
/* Project: Knowledge Desk - Responsive Knowledgebase HTML5 Template */
/* Ver: 1.0.2*/
/* Date: 15-10-2016*/
/* Last Update: 23-07-2017*/
/* Author: xenioushk*/
/*-------------------------------------------------------------------*/

jQuery(function ($) {

    "use strict";

    // DETECT TOUCH DEVICE //
    function is_touch_device() {
        return !!('ontouchstart' in window) || (!!('onmsgesturechange' in window) && !!window.navigator.maxTouchPoints);
    }

    // ANIMATIONS //
    function animations() {

        animations = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 120,
            mobile: false,
            live: true
        });

        animations.init();

    }

    function hexToRgbA(hex, opacity) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')';

        } else {

            return 'rgba("0,0,0,' + opacity + '")';

        }
    }

    // ONE PAGE SMOOTH SCROLLING 

    var current_screen_size;
          current_screen_size = $(window).width();

    $(window).resize(function () {

        current_screen_size = $(window).width();

    })
    
    function smooth_scrolling() {

        $(".nav_menu").on("click", function () {

            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                var offset = $('.header-wrapper').outerHeight();

                if ($('.stuck').length === 1) {
                    offset = $('.stuck').outerHeight();
                } else {
                    offset = parseInt(offset, 0);
                }


                if (target.length) {

                    var scrollTopValue;

                    if (current_screen_size < 752) {
                        scrollTopValue = target.offset().top;
                    } else {
                        scrollTopValue = target.offset().top - parseInt(offset, 0);
                    }

                    $('html,body').animate({
                        scrollTop: scrollTopValue
                    }, 1300);

                    return false;

                }

            }

        });

    }

    // PARALLAX

    if (typeof $.fn.stellar !== 'undefined') {

        if (!is_touch_device()) {

            $(window).stellar({
                horizontalScrolling: false,
                verticalScrolling: true,
                responsive: true,
                verticalOffset: 50
            });

        }

    }
    
    // BANNER.
    
    if ($(".section-banner").length) {

        // BG & Color Settings.

        $(".section-banner").each(function () {

            var $this = $(this);

            var bg_img = "",
                    bg_color = "#000000",
                    bg_opacity = "0.1";

            if ($this.is('[data-bg_img]')) {
                bg_img = ', url("' + $this.data('bg_img') + '")';
            }

            if ($this.is('[data-bg_color]')) {
                bg_color = $this.data('bg_color');
            }

            if ($this.is('[data-bg_opacity]')) {
                bg_opacity = $this.data('bg_opacity');
            }

            var $color_overlay = hexToRgbA(bg_color, bg_opacity);

            $this.attr("style", "background:linear-gradient( " + $color_overlay + ",  " + $color_overlay + " )" + bg_img + "; background-position: center center; background-repeat: no-repeat; background-attachment: inherit; background-size: cover; overflow:hidden;");

        });
        
    }


    // STICKY HEADER & MENU
    
    if ( $('.header-wrapper').attr('data-sticky_header') && $('.header-wrapper').attr('data-sticky_header') === 'false' ) {
        
        $('.header-wrapper').addClass('sticky-wrapper');
    
    } else {
        
        $('.header-wrapper').waypoint('sticky', {
            wrapper: '<div class="sticky-wrapper" />',
            stuckClass: 'stuck'
        });
        
    }
    

    // COUNTER

    if ($(".counter").length > 0) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }
    
    // Home FAQs
    
     if ($("#home_faqs").length > 0) {

        $("#home_faqs").bwlAccordion({
            ctrl_btn: false,
            closeall: true,
            nav_box: 'arrow',
            theme: 'theme-blue',
            toggle: true,
            pagination: true,
            limit:8
        });

    }
    
    // FAQ PAGE
    
    if ($("#accordion_theme_blue").length > 0) {

        $("#accordion_theme_blue").bwlAccordion({
            ctrl_btn: true,
            closeall: true,
            nav_box: 'arrow',
            theme: 'theme-blue',
            toggle: true,
            pagination: true,
            limit:8
        });

    }


    // TESTIMONIAL CAROUSEL.

    if ($(".testimonial-container").length > 0) {
        
        var $parent_testimonial_container = $(".testimonial-container");
        
        $parent_testimonial_container.each(function(){
            
            var $this = $(this); // Each Carousel.
            
            var items_val = 1,
                  nav_val = false,
                  autoplay_val = true,
                  autoplaytimeout_val = 5000;
            
            
            // Status.
            if ( $this.attr('data-carousel') && $this.data('carousel') !== 1 ) {
                return '';
            }
            
            // no of items
            
             if ( $this.attr('data-items') &&  ! isNaN( $this.data('items') ) ) {
           
                items_val = $this.data('items');
            }
            
             // navigation status.
          
            
             if ( $this.attr('data-nav') &&  ! isNaN( $this.data('nav') ) ) {
           
                nav_val = $this.data('nav');
                
            }
            
            // Autoplay status.
            
             if ( $this.attr('data-autoplay') &&  ! isNaN( $this.data('autoplay') ) ) {
                 
                autoplay_val = $this.data('autoplay');
            }
            
             // Autoplay status.
            
             if ( $this.attr('data-autoplaytimeout') &&  ! isNaN( $this.data('autoplaytimeout') ) ) {
           
                autoplaytimeout_val = $this.data('autoplaytimeout');
            }
            
         
            $this.owlCarousel({
                items: items_val,
                loop: true,
                autoplay: autoplay_val,
                autoplayTimeout: autoplaytimeout_val,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    600: {
                        items: 1,
                        nav: false
                    },
                    1000: {
                        items: items_val,
                        nav: nav_val,
                        loop: true
                    }
                },
                nav: nav_val,
                navText: ["<i class='nav-icon'></i>", "<i class='nav-icon'></i>"]
            });
            
            
        })
        
    }
    
    // Testimonial CONTAINER 2
    
     if ($(".testimonial-container-2").length > 0) {

        $(".testimonial-container-2 ").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 40000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 1,
                    nav: false
                },
                1000: {
                    items: 1,
                    nav: false,
                    loop: true
                }
            },
            nav: false,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
    }
    
    // TEAMS CAROUSEL.

    if ($(".teams-container").length > 0) {
        
        var $parent_teams_container = $(".teams-container");
        
        $parent_teams_container.each(function(){
            
            var $this = $(this); // Each Carousel.
            
            var items_val = 1,
                  nav_val = false,
                  autoplay_val = true,
                  autoplaytimeout_val = 5000;
            
            
            // Status.
            if ( $this.attr('data-carousel') && $this.data('carousel') !== 1 ) {
                return '';
            }
            
            // no of items
            
             if ( $this.attr('data-items') &&  ! isNaN( $this.data('items') ) ) {
           
                items_val = $this.data('items');
            }
            
             // navigation status.
          
            
             if ( $this.attr('data-nav') &&  ! isNaN( $this.data('nav') ) ) {
           
                nav_val = $this.data('nav');
                
            }
            
            // Autoplay status.
            
             if ( $this.attr('data-autoplay') &&  ! isNaN( $this.data('autoplay') ) ) {
                 
                autoplay_val = $this.data('autoplay');
            }
            
             // Autoplay status.
            
             if ( $this.attr('data-autoplaytimeout') &&  ! isNaN( $this.data('autoplaytimeout') ) ) {
           
                autoplaytimeout_val = $this.data('autoplaytimeout');
            }
            
         
            $this.owlCarousel({
                items: items_val,
                loop: true,
                autoplay: autoplay_val,
                autoplayTimeout: autoplaytimeout_val,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
                    },
                    600: {
                        items: 1,
                        nav: false
                    },
                    1000: {
                        items: items_val,
                        nav: nav_val,
                        loop: true,
                        navText: ["<i class='nav-icon fa fa-chevron-left'></i>", "<i class='nav-icon fa fa-chevron-right'></i>"]
                    }
                }
            });
            
            
        })
        
    }
    
    //LOGOS 

    if ($(".logo-items").length > 0) {
        
        var $parent_logo_container = $(".logo-items");
        
        $parent_logo_container.each(function(){
            
            var $this = $(this); // Each Carousel.
            
            var items_val = 6,
                  nav_val = false,
                  autoplay_val = true,
                  autoplaytimeout_val = 5000;
            
            
            // Status.
            if ( $this.attr('data-carousel') && $this.data('carousel') !== 1 ) {
                return '';
            }
            
            // no of items
            
             if ( $this.attr('data-items') &&  ! isNaN( $this.data('items') ) ) {
           
                items_val = $this.data('items');
            }
            
             // navigation status.
          
            
             if ( $this.attr('data-nav') &&  ! isNaN( $this.data('nav') ) ) {
           
                nav_val = $this.data('nav');
                
            }
            
            // Autoplay status.
            
             if ( $this.attr('data-autoplay') &&  ! isNaN( $this.data('autoplay') ) ) {
                 
                autoplay_val = $this.data('autoplay');
            }
            
             // Autoplay status.
            
             if ( $this.attr('data-autoplaytimeout') &&  ! isNaN( $this.data('autoplaytimeout') ) ) {
           
                autoplaytimeout_val = $this.data('autoplaytimeout');
            }
            
         
            $this.owlCarousel({
                items: items_val,
                loop: true,
                autoplay: autoplay_val,
                autoplayTimeout: autoplaytimeout_val,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    600: {
                        items: 1,
                        nav: false
                    },
                    1000: {
                        items: items_val,
                        nav: nav_val,
                        loop: true
                    }
                },
                nav: nav_val,
                navText: ["<i class='logo-nav-icon'></i>", "<i class='logo-nav-icon'></i>"]
            });
            
            
        });
        
    }

    // GOOGLE MAP

    if ($('#map_canvas').length) {

        var map;

        $('#map_canvas').css({
            'height': '400px'
        });

        map = new GMaps({
            div: '#map_canvas',
            lat: -12.043333,
            lng: -77.028333
        });

    }




    //WoW Animation.
    animations();

    //One Page Scrolling.
    smooth_scrolling();


    // BACK TO TOP BUTTON.

    if ($('#backTop').length === 1) {

        $('#backTop').backTop({
            'theme': 'custom'
        });
    }

    // PRELOADER

    $(window).on("load",function () {

        $("#preloader").fadeOut(500);

    });

});