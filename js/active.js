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
    /* ================================================================
       Long descriptions for BD items — using template literals so we
       avoid escaping problems with quotes and apostrophes.
    ================================================================= */
    var bdDescriptions = {
        ellipto: `<h4>Le cercle des elliptocytaires</h4>
<p>Il s'agit d'une BD de 62 planches qui se déroule dans l'entre‑deux‑guerres, dans un contexte politico‑historique présentant certaines similitudes avec les temps présents (montée de l'extrême droite, danger de guerre mondiale). Le narrateur part à l'aventure au Proche‑Orient, à la recherche de trois ami(e)s : Julia, une apprentie archéologue ; Jean, un cinéaste en mal de producteur ; et Paul, un passionné d'aviation. L'originalité tient au parti pris narratif : l'action se déroule à travers le regard du héros, qui n'apparaît presque jamais à l'image. Pour lire les douze premières pages, rendez‑vous sur ma page « Les amis de la bande dessinée ». Pour l'intégralité, contactez‑moi : roland.dewind@gmail.com.</p>`,
        trilogie: `<p><strong>Trilogie prévue :</strong> Deux suites compléteront <em>Le cercle des elliptocytaires</em> :</p>
<ul>
<li><strong>Smog and Blitz</strong> – le vécu de Jacques durant les bombardements allemands à Londres en 1940‑41.</li>
<li><strong>Dernière valse à Vienne</strong> marquera le retour de Paul, devenu riche parvenu, au cœur d'une intrigue dans les montagnes carinthiennes en 1949.</li>
</ul>`
    };
    // Dynamically generate titles and hover captions for gallery images
    $('.gallery_img').each(function () {
        var $link = $(this);
        // Skip title generation for specific categories
        var $item = $link.closest('.column_single_gallery_item');
        var fileName = $link.attr('href').split('/').pop(); // ensure fileName is defined early
        // Skip captions for Affiches & Caricatures
        if ($item.hasClass('affiches') || $item.hasClass('caricatures')) {
            return; // no title or caption for these categories
        }
        /* ----------  BD : long description in the light-box ---------- */
        if ($item.hasClass('bd')) {
            var desc = '';

            if (/ellipto/i.test(fileName)) {
                desc = bdDescriptions.ellipto;
            } else if (/blitz/i.test(fileName) || /derniere-valse/i.test(fileName) || /dernière-valse/i.test(fileName)) {
                desc = bdDescriptions.trilogie;
            }

            if (desc) {
                $link.attr('data-description', desc);
            }
            return; // pas de bandeau-titre ni attr title pour BD
        }
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
                titleSrc: function (item) {
                    return item.el.data('description') || item.el.attr('title');
                }
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