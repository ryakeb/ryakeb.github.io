(function ($) {
    'use strict';

    var $window = $(window);

    // Preloader Active Code
    $window.on('load', function () {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    var $listCollection = $(".questions-area > ul > li");
    var $firstItem = $listCollection.first();
    $listCollection.first().addClass("question-show");
    setInterval(function () {
        var $activeItem = $(".question-show")
        $activeItem.removeClass("question-show");
        var $nextItem = $activeItem.closest('li').next();
        if ($nextItem.length == 0) {
            $nextItem = $firstItem;
        }
        $nextItem.addClass("question-show");
    }, 5000);

    // Fullscreen Active Code
    $window.on('resizeEnd', function () {
        $(".full_height").height($window.height());
    });

    $window.on('resize', function () {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeEnd');
        }, 300);
    }).trigger("resize");

    // Welcome Carousel Active Code
    $('#welcomeSlider').carousel({
        pause: false,
        interval: 4000
    })

    // Tooltip Active Code
    $('[data-toggle="tooltip"]').tooltip()

    // Nicescroll Active Code
    if (!window.location.pathname.includes('/blog.html')) { 
        $("body, .gallery_area").niceScroll({
            cursorcolor: "#717171",
            cursorwidth: "5px",
            background: "#f0f0f0"
        });
    }

    // Instagram Feeds Slider
    if ($.fn.owlCarousel) {
        $('.instagram-feeds-area').owlCarousel({
            items: 7,
            margin: 0,
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 3
                },
                768: {
                    items: 4
                },
                992: {
                    items: 5
                },
                1280: {
                    items: 7
                }
            }
        });
    }

    // Search Btn Active Code
    $('#searchbtn').on('click', function () {
        $('body').toggleClass('search-form-on');
    })

    // ------------------------------------------------------------------
    // Dynamically generate titles and hover captions for gallery images
    $('.gallery_img').each(function () {
        var $link = $(this);
        // Skip title generation for specific categories
        var $item = $link.closest('.column_single_gallery_item');
        if ($item.hasClass('affiches') || $item.hasClass('caricatures')) {
            return; // do not add title or caption
        }
        var fileName = $link.attr('href').split('/').pop();          // e.g. "amour_fou_couleur.jpg"
        var titleText = fileName.replace(/\.[^/.]+$/, '')    // remove extension
                                .replace(/[_-]+/g, ' ');    // "_" or "-" to space, keep original capitalization
        $link.attr('title', titleText);                              // light‑box caption
        if ($link.find('.gallery-title').length === 0) {             // avoid duplicates
            $link.append('<span class="gallery-title">' + titleText + '</span>');
        }
    });
    // ------------------------------------------------------------------

    // Video Active Code
    if ($.fn.magnificPopup) {
        $('.videobtn').magnificPopup({
            disableOn: 0,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false
        });
        $('.gallery_img').magnificPopup({
            type: 'image',
            image: {
                titleSrc: 'title'
            },
            removalDelay: 300,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true,
                preload: [0, 2],
                navigateByImgClick: true,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
                tPrev: 'Previous (Left arrow key)', // title for left button
                tNext: 'Next (Right arrow key)', // title for right button
                tCounter: '<span class="mfp-counter">%curr% of %total%</span>'
            }
        });
    }

 // Gallery Menu Style Active Code
$('.portfolio-menu button.btn').on('click', function () {
    $('.portfolio-menu button.btn').removeClass('active');
    $(this).addClass('active');

    var filter = $(this).data('filter').substring(1); // remove the leading "."
    $('.portfolio-submenu').hide().filter('.' + filter).show();
})

// Masonary Gallery Active Code
if ($.fn.imagesLoaded) {
    $('.portfolio-column').imagesLoaded(function () {
        // Set default filter to first category
        var defaultFilter = $('.portfolio-menu button.btn').first().attr('data-filter');
        // Set active class on first menu button
        $('.portfolio-menu button.btn').removeClass('active');
        $('.portfolio-menu button.btn').first().addClass('active');
        // Show only the first submenu
        var firstSubfilter = $('.portfolio-menu button.btn').first().data('filter').substring(1);
        $('.portfolio-submenu').hide().filter('.' + firstSubfilter).show();
        // filter items on button click
        $('.portfolio-menu, .portfolio-submenu').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            });
        });
        // init Isotope
        var $grid = $('.portfolio-column').isotope({
            itemSelector: '.column_single_gallery_item',
            percentPosition: true,
            filter: defaultFilter,
            masonry: {
                columnWidth: '.column_single_gallery_item'
            }
        });
    });
}

// Blog Menu Active Code
// $('.blog-menu button.btn').on('click', function () {
//     $('.blog-menu button.btn').removeClass('active');
//     $(this).addClass('active');

//     var filter = $(this).data('filter'); // No need to remove the leading ".", Isotope can handle it
//     $('.blog-column').isotope({
//         filter: filter
//     });
// });

// // Isotope for Blog Posts
// if ($.fn.imagesLoaded) {
//     $('.blog-column').imagesLoaded(function () {
//         // Initialize Isotope for blog posts
//         var $grid = $('.blog-column').isotope({
//             itemSelector: '.column_single_blog_item',
//             percentPosition: true,
//             masonry: {
//                 columnWidth: '.column_single_blog_item'
//             }
//         });

//         // On button click, filter items
//         $('.blog-menu').on('click', 'button', function () {
//             var filterValue = $(this).attr('data-filter');
//             $grid.isotope({ filter: filterValue });
//         });
//     });
// }


    // Progress Bar Active Code
    if ($.fn.barfiller) {
        $('#bar1').barfiller({
            tooltip: true,
            duration: 1000,
            barColor: '#1d1d1d',
            animateOnResize: true
        });
        $('#bar2').barfiller({
            tooltip: true,
            duration: 1000,
            barColor: '#1d1d1d',
            animateOnResize: true
        });
        $('#bar3').barfiller({
            tooltip: true,
            duration: 1000,
            barColor: '#1d1d1d',
            animateOnResize: true
        });
        $('#bar4').barfiller({
            tooltip: true,
            duration: 1000,
            barColor: '#1d1d1d',
            animateOnResize: true
        });
    }

    // CounterUp Active Code
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // ScrollUp Active Code
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: 'easeInOutQuart',
            scrollText: '<i class="fa fa-angle-up" aria-hidden="true"></i>'
        });
    }

    // PreventDefault a Click
    $("a[href='#']").on('click', function ($) {
        $.preventDefault();
    });

    // wow Active Code
    if ($window.width() > 767) {
        new WOW().init();
    }

})(jQuery);