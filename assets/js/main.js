(function ($) {
  ("use strict");
  /*=================================
      JS Index Here
  ==================================*/
  /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu Active
    04. Sticky fix
    05. Scroll To Top
    06. Set Background Image
    07. Global Slider
    08. Ajax Contact Form
    09. Magnific Popup
    10. Filter
    11. Popup Sidemenu   
    12. Search Box Popup
    13. Woocommerce Toggle
    14. Quantity Added
    15. Shape Mockup
    16. Range Slider
    17. WOW.js Animation
    18. Hero Slider Active
    19. Testimonial Slider
    20. Date & Time Picker
    21. Accordion Class Toggler
    22. Parallax Effect
  */
  /*=================================
      JS Index End
  ==================================*/
  /*

  /*---------- 01. On Load Function ----------*/
  $(window).on("load", function () {
    $(".preloader").fadeOut();
  });

  /*---------- 02. Preloader ----------*/
  if ($(".preloader").length > 0) {
    $(".preloaderCls").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".preloader").css("display", "none");
      });
    });
  }

  /*---------- 03. Mobile Menu Active ----------*/
  $.fn.vsmobilemenu = function (options) {
    var opt = $.extend(
      {
        menuToggleBtn: ".vs-menu-toggle",
        bodyToggleClass: "vs-body-visible",
        subMenuClass: "vs-submenu",
        subMenuParent: "vs-item-has-children",
        subMenuParentToggle: "vs-active",
        meanExpandClass: "vs-mean-expand",
        appendElement: '<span class="vs-mean-expand"></span>',
        subMenuToggleClass: "vs-open",
        toggleSpeed: 400,
      },
      options
    );

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = "." + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css("display", "none");
            $(this).parent().removeClass(opt.subMenuParentToggle);
          }
        });
      }

      // Class Set Up for every submenu
      menu.find("li").each(function () {
        var submenu = $(this).find("ul");
        submenu.addClass(opt.subMenuClass);
        submenu.css("display", "none");
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev("a").append(opt.appendElement);
        submenu.next("a").append(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next("ul").slideToggle(opt.toggleSpeed);
          $($element).next("ul").toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev("ul").slideToggle(opt.toggleSpeed);
          $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
        }
      }

      // Submenu toggle Button
      var expandToggler = "." + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on("click", function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on("click", function () {
          menuToggle();
        });
      });

      // Hide Menu On out side click
      menu.on("click", function (e) {
        e.stopPropagation();
        menuToggle();
      });

      // Stop Hide full menu on menu click
      menu.find("div").on("click", function (e) {
        e.stopPropagation();
      });
    });
  };

  $(".vs-menu-wrapper").vsmobilemenu();

  /*---------- 04. Sticky fix ----------*/
  var lastScrollTop = "";
  var scrollToTopBtn = ".scrollToTop";

  function stickyMenu($targetMenu, $toggleClass, $parentClass) {
    var st = $(window).scrollTop();
    var height = $targetMenu.css("height");
    $targetMenu.parent().css("min-height", height);
    if ($(window).scrollTop() > 800) {
      $targetMenu.parent().addClass($parentClass);

      if (st > lastScrollTop) {
        $targetMenu.removeClass($toggleClass);
      } else {
        $targetMenu.addClass($toggleClass);
      }
    } else {
      $targetMenu.parent().css("min-height", "").removeClass($parentClass);
      $targetMenu.removeClass($toggleClass);
    }
    lastScrollTop = st;
  }
  $(window).on("scroll", function () {
    stickyMenu($(".sticky-active"), "active", "will-sticky");
    if ($(this).scrollTop() > 500) {
      $(scrollToTopBtn).addClass("show");
    } else {
      $(scrollToTopBtn).removeClass("show");
    }
  });

  /*---------- 05. Scroll To Top ----------*/
  $(scrollToTopBtn).each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        lastScrollTop / 3
      );
      return false;
    });
  });

  /*---------- 06. Set Background Image ----------*/
  $.fn.vsBgSetup = function () {
    $(this).each(function () {
      var src = $(this).attr("data-bg-src");
      $(this).css("background-image", "url(" + src + ")");
      $(this).removeAttr("data-bg-src").addClass("background-image");
    });
  };

  $.fn.vsMaskSetup = function () {
    $(this).each(function () {
      var mask = $(this).attr("data-mask-src");
      $(this).css({
        "mask-image": "url(" + mask + ")",
        "-webkit-mask-image": "url(" + mask + ")",
      });
      $(this).removeAttr("data-mask-src");
    });
  };

  $("[data-bg-src]").vsBgSetup();
  $("[data-mask-src]").vsMaskSetup();

  /*----------- 07. Global Slider ----------*/
  $(".vs-carousel").each(function () {
    var asSlide = $(this);

    // Collect Data
    function d(data) {
      return asSlide.data(data);
    }

    // Custom Arrow Button
    var prevButton =
        '<button type="button" class="slick-prev"><i class="' +
        d("prev-arrow") +
        '"></i></button>',
      nextButton =
        '<button type="button" class="slick-next"><i class="' +
        d("next-arrow") +
        '"></i></button>';

    // Check for arrow wrapper
    if (d("arrows") == true) {
      if (!asSlide.closest(".arrow-wrap").length) {
        asSlide.closest(".container").parent().addClass("arrow-wrap");
      }
    }

    asSlide.slick({
      dots: d("dots") ? true : false,
      fade: d("fade") ? true : false,
      arrows: d("arrows") ? true : false,
      speed: d("speed") ? d("speed") : 1000,
      asNavFor: d("asnavfor") ? d("asnavfor") : false,
      autoplay: d("autoplay") == false ? false : true,
      infinite: d("infinite") == false ? false : true,
      slidesToShow: d("slide-show") ? d("slide-show") : 1,
      adaptiveHeight: d("adaptive-height") ? true : false,
      centerMode: d("center-mode") ? true : false,
      autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 8000,
      centerPadding: d("center-padding") ? d("center-padding") : "0",
      focusOnSelect: d("focuson-select") == false ? false : true,
      pauseOnFocus: d("pauseon-focus") ? true : false,
      pauseOnHover: d("pauseon-hover") ? true : false,
      variableWidth: d("variable-width") ? true : false,
      vertical: d("vertical") ? true : false,
      verticalSwiping: d("vertical") ? true : false,
      prevArrow: d("prev-arrow")
        ? prevButton
        : '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: d("next-arrow")
        ? nextButton
        : '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
      rtl: $("html").attr("dir") == "rtl" ? true : false,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            arrows: d("xl-arrows") ? true : false,
            dots: d("xl-dots") ? true : false,
            slidesToShow: d("xl-slide-show")
              ? d("xl-slide-show")
              : d("slide-show"),
            centerMode: d("xl-center-mode") ? true : false,
            centerPadding: d("xl-center-padding")
              ? d("xl-center-padding")
              : "0",
          },
        },
        {
          breakpoint: 1400,
          settings: {
            arrows: d("ml-arrows") ? true : false,
            dots: d("ml-dots") ? true : false,
            slidesToShow: d("ml-slide-show")
              ? d("ml-slide-show")
              : d("slide-show"),
            centerMode: d("ml-center-mode") ? true : false,
            centerPadding: d("ml-center-padding")
              ? d("ml-center-padding")
              : "0",
          },
        },
        {
          breakpoint: 1200,
          settings: {
            arrows: d("lg-arrows") ? true : false,
            dots: d("lg-dots") ? true : false,
            slidesToShow: d("lg-slide-show")
              ? d("lg-slide-show")
              : d("slide-show"),
            centerMode: d("lg-center-mode") ? true : false,
            centerPadding: d("lg-center-padding")
              ? d("lg-center-padding")
              : "0",
          },
        },
        {
          breakpoint: 992,
          settings: {
            arrows: d("md-arrows") ? true : false,
            dots: d("md-dots") ? true : false,
            slidesToShow: d("md-slide-show") ? d("md-slide-show") : 1,
            centerMode: d("md-center-mode") ? true : false,
            centerPadding: d("md-center-padding")
              ? d("md-center-padding")
              : "0",
          },
        },
        {
          breakpoint: 767,
          settings: {
            arrows: d("sm-arrows") ? true : false,
            dots: d("sm-dots") ? true : false,
            slidesToShow: d("sm-slide-show") ? d("sm-slide-show") : 1,
            centerMode: d("sm-center-mode") ? true : false,
            centerPadding: d("sm-center-padding")
              ? d("sm-center-padding")
              : "0",
          },
        },
        {
          breakpoint: 576,
          settings: {
            arrows: d("xs-arrows") ? true : false,
            dots: d("xs-dots") ? true : false,
            slidesToShow: d("xs-slide-show") ? d("xs-slide-show") : 1,
            centerMode: d("xs-center-mode") ? true : false,
            centerPadding: d("xs-center-padding")
              ? d("xs-center-padding")
              : "0",
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  });


  // Function For Custom Arrow Btn
  $.fn.slickGoNext = function () {
    $(this).each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $($(this).data("slick-next")).slick("slickNext");
      });
    });
  };

  $.fn.slickGoPrev = function () {
    $(this).each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $($(this).data("slick-prev")).slick("slickPrev");
      });
    });
  };

  $("[data-slick-next]").slickGoNext();
  $("[data-slick-prev]").slickGoPrev();


  /*----------- 08. Ajax Contact Form ----------*/
  var form = ".ajax-contact";
  var invalidCls = "is-invalid";
  var $email = '[name="email"]';
  var $validation = '[name="name"],[name="email"],[name="subject"],[name="message"]'; // Must be use (,) without any space
  var formMessages = $(form).find(".form-messages");

  var appointmentForm = ".appointment-form";
  var appointmentValidation = '[name="name"],[name="email"],[name="subject"],[name="number"],[name="date"]'; // Must be use (,) without any space
  var appointmentFormMessages = $(appointmentForm).find(".form-messages");

  function sendContact(formEle, inputs, emailInput, errorCls, messageElement) {
    var formData = $(formEle).serialize();
    var valid;
    valid = validateContact(inputs, emailInput, errorCls, formEle);
    if (valid) {
      jQuery
        .ajax({
          url: $(formEle).attr("action"),
          data: formData,
          type: "POST",
        })
        .done(function (response) {
          // Make sure that the formMessages div has the 'success' class.
          messageElement.removeClass("error");
          messageElement.addClass("success");
          // Set the message text.
          messageElement.text(response);
          // Clear the form.
          $(formEle + ' input:not([type="submit"]),' + formEle + " textarea").val("");
        })
        .fail(function (data) {
          // Make sure that the formMessages div has the 'error' class.
          messageElement.removeClass("success");
          messageElement.addClass("error");
          // Set the message text.
          if (data.responseText !== "") {
            messageElement.html(data.responseText);
          } else {
            messageElement.html(
              "Oops! An error occured and your message could not be sent."
            );
          }
        });
    }
  }

  function validateContact(inputElement, emailInput, errorClass, formToValid) {
    var valid = true;
    var formInput;

    function unvalid(inputElement) {
      inputElement = inputElement.split(",");
      for (var i = 0; i < inputElement.length; i++) {
        formInput = formToValid + " " + inputElement[i];
        if (!$(formInput).val()) {
          $(formInput).addClass(errorClass);
          valid = false;
        } else {
          $(formInput).removeClass(errorClass);
          valid = true;
        }
      }
    }
    unvalid(inputElement);

    if (
      !$(emailInput).val() ||
      !$(emailInput)
        .val()
        .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
    ) {
      $(emailInput).addClass(errorClass);
      valid = false;
    } else {
      $(emailInput).removeClass(errorClass);
      valid = true;
    }
    return valid;
  }

  $(form).on("submit", function (element) {
    element.preventDefault();
    sendContact(form, $validation, $email, invalidCls, formMessages);
  });

  $(appointmentForm).on("submit", function (element) {
    element.preventDefault();
    sendContact(appointmentForm, appointmentValidation, $email, invalidCls, appointmentFormMessages);
  });

  /*----------- 09. Magnific Popup ----------*/
  /* magnificPopup img view */
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /* magnificPopup video view */
  $(".popup-video").magnificPopup({
    type: "iframe",
  });

  /*----------- 10. Filter ----------*/
  $(".filter-active").imagesLoaded(function () {
    var $filter = ".filter-active",
      $filterItem = ".filter-item",
      $filterMenu = ".filter-menu-active";

    if ($($filter).length > 0) {
      var $grid = $($filter).isotope({
        itemSelector: $filterItem,
        filter: "*",
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: 1,
        },
      });

      // filter items on button click
      $($filterMenu).on("click", "button", function () {
        var filterValue = $(this).attr("data-filter");
        $grid.isotope({
          filter: filterValue,
        });
      });

      // Menu Active Class
      $($filterMenu).on("click", "button", function (event) {
        event.preventDefault();
        $(this).addClass("active");
        $(this).siblings(".active").removeClass("active");
      });
    }
  });

  /*---------- 11. Popup Sidemenu ----------*/
  function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
    // Sidebar Popup
    $($sideMunuOpen).on("click", function (e) {
      e.preventDefault();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenu).on("click", function (e) {
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
    var sideMenuChild = $sideMenu + " > div";
    $(sideMenuChild).on("click", function (e) {
      e.stopPropagation();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenuCls).on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
  }
  popupSideMenu(
    ".sidemenu-wrapper",
    ".sideMenuToggler",
    ".sideMenuCls",
    "show"
  );

  /*---------- 12. Search Box Popup ----------*/
  function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
    $($searchOpen).on("click", function (e) {
      e.preventDefault();
      $($searchBox).addClass($toggleCls);
    });
    $($searchBox).on("click", function (e) {
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
    $($searchBox)
      .find("form")
      .on("click", function (e) {
        e.stopPropagation();
        $($searchBox).addClass($toggleCls);
      });
    $($searchCls).on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
  }
  popupSarchBox(
    ".popup-search-box",
    ".searchBoxTggler",
    ".searchClose",
    "show"
  );

  /*----------- 13. Woocommerce Toggle ----------*/
  // Ship To Different Address
  $("#ship-to-different-address-checkbox").on("change", function () {
    if ($(this).is(":checked")) {
      $("#ship-to-different-address").next(".shipping_address").slideDown();
    } else {
      $("#ship-to-different-address").next(".shipping_address").slideUp();
    }
  });

  // Login Toggle
  $(".woocommerce-form-login-toggle a").on("click", function (e) {
    e.preventDefault();
    $(".woocommerce-form-login").slideToggle();
  });

  // Coupon Toggle
  $(".woocommerce-form-coupon-toggle a").on("click", function (e) {
    e.preventDefault();
    $(".woocommerce-form-coupon").slideToggle();
  });

  // Woocommerce Shipping Method
  $(".shipping-calculator-button").on("click", function (e) {
    e.preventDefault();
    $(this).next(".shipping-calculator-form").slideToggle();
  });

  // Woocommerce Payment Toggle
  $('.wc_payment_methods input[type="radio"]:checked')
    .siblings(".payment_box")
    .show();
  $('.wc_payment_methods input[type="radio"]').each(function () {
    $(this).on("change", function () {
      $(".payment_box").slideUp();
      $(this).siblings(".payment_box").slideDown();
    });
  });

  // Woocommerce Rating Toggle
  $(".rating-select .stars a").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(this).siblings().removeClass("active");
      $(this).parent().parent().addClass("selected");
      $(this).addClass("active");
    });
  });

  /*---------- 00. Quantity Added ----------*/
  $(".quantity-plus").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      var $qty = $(this).siblings(".qty-input");
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal)) {
        $qty.val(currentVal + 1);
      }
    });
  });

  $(".quantity-minus").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      var $qty = $(this).siblings(".qty-input");
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal) && currentVal > 1) {
        $qty.val(currentVal - 1);
      }
    });
  });

  /*----------- 15. Shape Mockup ----------*/
  $.fn.shapeMockup = function () {
    var $shape = $(this);
    $shape.each(function () {
      var $currentShape = $(this),
        shapeTop = $currentShape.data("top"),
        shapeRight = $currentShape.data("right"),
        shapeBottom = $currentShape.data("bottom"),
        shapeLeft = $currentShape.data("left");
      $currentShape
        .css({
          top: shapeTop,
          right: shapeRight,
          bottom: shapeBottom,
          left: shapeLeft,
        })
        .removeAttr("data-top")
        .removeAttr("data-right")
        .removeAttr("data-bottom")
        .removeAttr("data-left")
        .parent()
        .addClass("shape-mockup-wrap");
    });
  };

  if ($(".shape-mockup")) {
    $(".shape-mockup").shapeMockup();
  }

  /*----------- 16. Range Slider ----------*/
  $("#slider-range").slider({
    range: true,
    min: 40,
    max: 300,
    values: [60, 570],
    slide: function (event, ui) {
      $("#minAmount").text("$" + ui.values[0]);
      $("#maxAmount").text("$" + ui.values[1]);
    },
  });
  $("#minAmount").text("$" + $("#slider-range").slider("values", 0));
  $("#maxAmount").text("$" + $("#slider-range").slider("values", 1));

  /*----------- 17. WOW.js Animation ----------*/
  var wow = new WOW({
    boxClass: "wow", // animated element css class (default is wow)
    animateClass: "wow-animated", // animation css class (default is animated)
    offset: 0, // distance to the element when triggering the animation (default is 0)
    mobile: false, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    scrollContainer: null, // optional scroll container selector, otherwise use window,
    resetAnimation: false, // reset animation on end (default is true)
  });
  wow.init();



  /*----------- 18. Hero Slider Active ----------*/
  $(".vs-hero-carousel").each(function () {
    var vsHslide = $(this);

    // Get Data From Dom
    function d(data) {
      return vsHslide.data(data);
    }


    /* Custom Thumb Navigation */
    var customNav = '.thumb';
    var navDom = 'data-slide-go';

    vsHslide.on('sliderDidLoad', function (event, slider) { // On Slide Init
      var currentSlide = slider.slides.current.index; // current Slide index 
      var i = 1;
      // Set Attribute 
      vsHslide.find(customNav).each(function () {
        $(this).attr(navDom, i)
        i++
        // On Click Thumb, Change slide
        $(this).on('click', function (e) {
          e.preventDefault();
          var target = $(this).attr(navDom);
          vsHslide.layerSlider(parseInt(target));
        })
      });
      // Add class To current Thumb
      var currentNav = customNav + '[' + navDom + '="' + currentSlide + '"';
      $(currentNav).addClass('active');
    }).on('slideChangeDidComplete', function (event, slider) { // On slide Change Start
      var currentActive = slider.slides.current.index; // After change Current Index
      var currentNav = customNav + '[' + navDom + '="' + currentActive + '"';
      $(currentNav).addClass('active') // Add Class on current Nav
      $(currentNav).siblings().removeClass('active');
    });

    /* Custom Responsive Option */
    vsHslide.on('sliderWillLoad', function (event, slider) {
      // Define Variable
      var respLayer = jQuery(this).find('.ls-responsive'),
        lsDesktop = 'ls-desktop',
        lsLaptop = 'ls-laptop',
        lsTablet = 'ls-tablet',
        lsMobile = 'ls-mobile',
        windowWid = jQuery(window).width(),
        lgDevice = 1025,
        mdDevice = 992,
        smDevice = 767;

      // Set Style on each Layer
      respLayer.each(function () {
        var layer = jQuery(this);

        function lsd(data) {
          return (layer.data(data) === '') ? layer.data(null) : layer.data(data);
        }
        // var respStyle = (windowWid < smDevice) ? ((lsd(lsMobile)) ? lsd(lsMobile) : lsd(lsTablet)) : ((windowWid < mdDevice) ? ((lsd(lsTablet)) ? lsd(lsTablet) : lsd(lsDesktop)) : lsd(lsDesktop)),
        var respStyle = (windowWid < smDevice) ? lsd(lsMobile) : ((windowWid < mdDevice ? lsd(lsTablet) : ((windowWid < lgDevice) ? lsd(lsLaptop) : lsd(lsDesktop)))),
          mainStyle = (layer.attr('style') !== undefined) ? layer.attr('style') : ' ';

        layer.attr('style', mainStyle + respStyle);
      });

    });

    vsHslide.layerSlider({
      allowRestartOnResize: true,
      maxRatio: d("maxratio") ? d("maxratio") : 1,
      type: d("slidertype") ? d("slidertype") : "responsive",
      pauseOnHover: d("pauseonhover") ? true : false,
      navPrevNext: d("navprevnext") ? true : false,
      hoverPrevNext: d("hoverprevnext") ? true : false,
      hoverBottomNav: d("hoverbottomnav") ? true : false,
      navStartStop: d("navstartstop") ? true : false,
      navButtons: d("navbuttons") ? true : false,
      loop: d("loop") === false ? false : true,
      autostart: d("autostart") ? true : false,
      height: d("height") ? d("height") : 1080,
      responsiveUnder: d("responsiveunder") ? d("responsiveunder") : 1220,
      layersContainer: d("container") ? d("container") : 1220,
      showCircleTimer: d("showcircletimer") ? true : false,
      skinsPath: "layerslider/skins/",
      thumbnailNavigation: d("thumbnailnavigation") === false ? false : true,
      startInViewport: false,
      allowFullscreen: false,
    });
  });





  /*----------- 19. Testimonial Slider ----------*/
  $('#testis_4_1').slick({
    dots: false,
    infinite: true,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
    autoplay: true,
    autoplaySpeed: 6000,
    fade: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: '#testis_4_2, #testis_4_3',
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          arrows: false
        }
      }
    ]
  });

  $('#testis_4_2').slick({
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    focusOnSelect: true,
    asNavFor: '#testis_4_1, #testis_4_3'
  });

  $('#testis_4_3').slick({
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: '#testis_4_2, #testis_4_1'
  });





  /*---------- 20. Date & Time Picker ----------*/
  // Time And Date Picker
  $('.dateTime-pick').datetimepicker({
    timepicker: true,
    datepicker: true,
    format: 'y-m-d H:i',
    hours12: false,
    step: 30
  });

  // Only Date Picker
  $('.date-pick').datetimepicker({
    timepicker: false,
    datepicker: true,
    format: 'm-d-y',
    step: 10
  });

  // Only Time Picker
  $('.time-pick').datetimepicker({
    datepicker: false,
    timepicker: true,
    format: 'H:i',
    hours12: false,
    step: 10
  });



  /*----------- 21. Accordion Class Toggler ----------*/
  $(".accordion-button").on("click", function () {
    let btn = $(this).closest(".accordion-item");
    btn.toggleClass("active").siblings().removeClass("active");
  });




  /*---------- 22. Parallax Effect ----------*/
  new universalParallax().init();


  

})(jQuery);


// me

(function (global) {
"use strict";
var DESKTOP_FULL = 4;
var MOBILE_FULL = 1;
var DRAG_INTENT_PX = 8;
var SWIPE_RATIO = 0.18;

function ServicesCarousel(root, options) {
  options = options || {};
  this.root = root;
  
  // تشخیص جهت صفحه (RTL/LTR)
  this.isRTL = getComputedStyle(root).direction === 'rtl';

  var viewport = root.querySelector("[data-carousel-viewport]");
  var track = root.querySelector("[data-carousel-track]");
  if (!viewport || !track) {
    throw new Error("ServicesCarousel: missing viewport or track");
  }
  this.viewport = viewport;
  this.track = track;
  this.prevBtn = root.querySelector("[data-carousel-prev]");
  this.nextBtn = root.querySelector("[data-carousel-next]");
  this.dotsRoot = root.querySelector("[data-carousel-dots]");
  this.status = root.querySelector("[data-carousel-status]");
  this.interval = options.interval != null ? options.interval : 3000;
  this.gap = options.gap != null ? options.gap : 20;
  this.peek = options.peek != null ? options.peek : 0.36;
  this.mobileBreakpoint = options.mobileBreakpoint != null ? options.mobileBreakpoint : 900;
  this.originals = Array.prototype.slice.call(track.querySelectorAll("[data-carousel-slide]"));
  this.count = this.originals.length;
  if (!this.count) throw new Error("ServicesCarousel: no slides");
  this.cloneCount = DESKTOP_FULL + 1;
  this.position = this.cloneCount;
  this.cardWidth = 0;
  this.step = 0;
  this.fullVisible = DESKTOP_FULL;
  this.autoplayId = null;
  this.paused = false;
  this.hovering = false;
  this.reducedMotion = false;
  this.pointerId = null;
  this.startX = 0;
  this.startY = 0;
  this.dragDelta = 0;
  this.dragIntent = null;
  this.ignoreClick = false;
  this.wrapping = false;
  this.resizeObserver = null;
  this.motionQuery = null;
  this.dots = [];
  this.destroyed = false;

  var self = this;
  this.onPrev = function () { self.prev(); self.restartAutoplay(); };
  this.onNext = function () { self.next(); self.restartAutoplay(); };
  this.onEnter = function () { self.hovering = true; };
  this.onLeave = function () { self.hovering = false; };
  
  // اصلاح جهت کلیدهای کیبورد برای RTL
  this.onKey = function (e) {
    if (self.isRTL) {
      if (e.key === "ArrowLeft") { e.preventDefault(); self.next(); self.restartAutoplay(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); self.prev(); self.restartAutoplay(); }
    } else {
      if (e.key === "ArrowRight") { e.preventDefault(); self.next(); self.restartAutoplay(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); self.prev(); self.restartAutoplay(); }
    }
  };

  this.onTransitionEnd = function (e) {
    if (e.target !== self.track || e.propertyName !== "transform") return;
    if (self.wrapping) return;
    self.wrapIfNeeded();
  };
  this.onVisibility = function () { document.hidden ? self.stopAutoplay() : self.startAutoplay(); };
  this.onMotionChange = function (e) {
    self.reducedMotion = e.matches;
    self.reducedMotion ? self.stopAutoplay() : self.startAutoplay();
  };
  this.onPointerDown = function (e) {
    if (e.button !== 0) return;
    self.pointerId = e.pointerId;
    self.startX = e.clientX;
    self.startY = e.clientY;
    self.dragDelta = 0;
    self.dragIntent = null;
    self.ignoreClick = false;
  };
  this.onPointerMove = function (e) {
    if (self.pointerId !== e.pointerId) return;
    var dx = e.clientX - self.startX;
    var dy = e.clientY - self.startY;
    if (!self.dragIntent) {
      if (Math.abs(dx) < DRAG_INTENT_PX && Math.abs(dy) < DRAG_INTENT_PX) return;
      self.dragIntent = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (self.dragIntent === "x") {
        self.viewport.setPointerCapture(e.pointerId);
        self.root.classList.add("is-dragging");
      }
    }
    if (self.dragIntent !== "x") return;
    e.preventDefault();
    self.dragDelta = dx;
    self.applyTransform(false, dx);
  };
  
  // اصلاح منطق Swipe برای RTL
  this.onPointerUp = function (e) {
    if (self.pointerId !== e.pointerId) return;
    var dx = self.dragDelta;
    var wasDrag = self.dragIntent === "x";
    self.pointerId = null;
    self.dragIntent = null;
    self.dragDelta = 0;
    self.root.classList.remove("is-dragging");
    if (!wasDrag) return;
    self.ignoreClick = Math.abs(dx) > DRAG_INTENT_PX;
    var threshold = self.cardWidth * SWIPE_RATIO;
    
    if (self.isRTL) {
        // در حالت RTL: کشیدن به چپ (منفی) یعنی قبلی، کشیدن به راست (مثبت) یعنی بعدی
        if (dx <= -threshold) self.prev(); 
        else if (dx >= threshold) self.next(); 
        else self.goToPosition(self.position, true);
    } else {
        // حالت استاندارد LTR
        if (dx <= -threshold) self.next();
        else if (dx >= threshold) self.prev();
        else self.goToPosition(self.position, true);
    }
    self.restartAutoplay();
  };

  this.onClickCapture = function (e) {
    if (!self.ignoreClick) return;
    e.preventDefault();
    e.stopPropagation();
    self.ignoreClick = false;
  };

  this.track.style.setProperty("--carousel-gap", this.gap + "px");
  this.setupClones();
  this.buildDots();
  this.bind();
  this.measure();
  this.goToPosition(this.position, false);
  this.syncUi();
  this.startAutoplay();
}

ServicesCarousel.prototype.destroy = function () {
  if (this.destroyed) return;
  this.destroyed = true;
  this.stopAutoplay();
  this.unbind();
  var clones = this.track.querySelectorAll("[data-clone]");
  for (var i = 0; i < clones.length; i++) clones[i].parentNode.removeChild(clones[i]);
  this.track.style.transform = "";
  this.track.style.transition = "";
  if (this.dotsRoot) this.dotsRoot.innerHTML = "";
};

ServicesCarousel.prototype.next = function () { this.goToPosition(this.position + 1, true); };
ServicesCarousel.prototype.prev = function () { this.goToPosition(this.position - 1, true); };
ServicesCarousel.prototype.goTo = function (logicalIndex, animate) {
  if (animate == null) animate = true;
  var wrapped = ((logicalIndex % this.count) + this.count) % this.count;
  this.goToPosition(this.cloneCount + wrapped, animate);
};

ServicesCarousel.prototype.setupClones = function () {
  var head = this.originals.slice(-this.cloneCount);
  var tail = this.originals.slice(0, this.cloneCount);
  for (var i = head.length - 1; i >= 0; i--) this.track.insertBefore(this.cloneSlide(head[i]), this.track.firstChild);
  for (var j = 0; j < tail.length; j++) this.track.appendChild(this.cloneSlide(tail[j]));
};

ServicesCarousel.prototype.cloneSlide = function (source) {
  var clone = source.cloneNode(true);
  clone.setAttribute("data-clone", "");
  clone.setAttribute("aria-hidden", "true");
  clone.removeAttribute("data-carousel-slide");
  clone.tabIndex = -1;
  var focusables = clone.querySelectorAll("a, button");
  for (var i = 0; i < focusables.length; i++) {
    focusables[i].setAttribute("tabindex", "-1");
    focusables[i].setAttribute("aria-hidden", "true");
  }
  return clone;
};

ServicesCarousel.prototype.buildDots = function () {
  if (!this.dotsRoot) return;
  this.dotsRoot.innerHTML = "";
  this.dots = [];
  var self = this;
  for (var i = 0; i < this.originals.length; i++) {
    (function (index) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "carousel-dot";
      btn.setAttribute("aria-label", "Go to " + self.slideTitle(self.originals[index]));
      btn.addEventListener("click", function () { self.goTo(index, true); self.restartAutoplay(); });
      self.dotsRoot.appendChild(btn);
      self.dots.push(btn);
    })(i);
  }
};

ServicesCarousel.prototype.measure = function () {
  var width = this.viewport.clientWidth;
  var isMobile = width < this.mobileBreakpoint;
  this.fullVisible = isMobile ? MOBILE_FULL : DESKTOP_FULL;
  var peek = isMobile ? Math.max(this.peek, 0.42) : this.peek;
  this.cardWidth = (width - this.gap * this.fullVisible) / (this.fullVisible + peek);
  this.step = this.cardWidth + this.gap;
  this.track.style.setProperty("--card-width", this.cardWidth + "px");
};

ServicesCarousel.prototype.logicalIndex = function () {
  var raw = this.position - this.cloneCount;
  return ((raw % this.count) + this.count) % this.count;
};

// اصلاح محاسبه موقعیت برای RTL
ServicesCarousel.prototype.offsetPx = function (position, extra) {
  var base = ((position != null ? position : this.position) * this.step) - (extra || 0);
  return this.isRTL ? base : -base;
};

ServicesCarousel.prototype.applyTransform = function (animate, extra) {
  var reduce = this.reducedMotion || !animate;
  this.track.style.transition = reduce ? "none" : "transform var(--carousel-duration) var(--carousel-ease)";
  this.track.style.transform = "translate3d(" + this.offsetPx(this.position, extra || 0) + "px, 0, 0)";
};

ServicesCarousel.prototype.goToPosition = function (next, animate) {
  this.position = next;
  this.applyTransform(animate && !this.reducedMotion);
  this.syncUi();
  if (!animate || this.reducedMotion) this.wrapIfNeeded();
};

ServicesCarousel.prototype.wrapIfNeeded = function () {
  var firstReal = this.cloneCount;
  var lastReal = this.cloneCount + this.count - 1;
  if (this.position >= firstReal && this.position <= lastReal) return;
  this.wrapping = true;
  this.position = this.cloneCount + this.logicalIndex();
  this.applyTransform(false);
  void this.track.offsetWidth;
  this.wrapping = false;
  this.syncUi();
};

ServicesCarousel.prototype.syncUi = function () {
  var i = this.logicalIndex();
  for (var d = 0; d < this.dots.length; d++) {
    var on = d === i;
    this.dots[d].classList.toggle("is-active", on);
    this.dots[d].setAttribute("aria-current", on ? "true" : "false");
  }
  for (var s = 0; s < this.originals.length; s++) {
    this.originals[s].setAttribute("aria-hidden", s === i ? "false" : "true");
  }
  if (this.status) {
    this.status.textContent = this.slideTitle(this.originals[i]) + ", " + (i + 1) + " of " + this.count;
  }
};

ServicesCarousel.prototype.slideTitle = function (slide) {
  return slide.getAttribute("data-title") || (slide.querySelector("h3") && slide.querySelector("h3").textContent.trim()) || "Service";
};

ServicesCarousel.prototype.startAutoplay = function () {
  this.stopAutoplay();
  if (this.interval <= 0 || this.reducedMotion || this.destroyed) return;
  var self = this;
  this.autoplayId = setInterval(function () {
    if (self.paused || self.hovering || self.pointerId !== null) return;
    if (document.hidden) return;
    self.next();
  }, this.interval);
};

ServicesCarousel.prototype.stopAutoplay = function () {
  if (this.autoplayId !== null) { clearInterval(this.autoplayId); this.autoplayId = null; }
};

ServicesCarousel.prototype.restartAutoplay = function () { this.startAutoplay(); };

ServicesCarousel.prototype.bind = function () {
  var self = this;
  if (this.prevBtn) this.prevBtn.addEventListener("click", this.onPrev);
  if (this.nextBtn) this.nextBtn.addEventListener("click", this.onNext);
  this.viewport.addEventListener("pointerdown", this.onPointerDown);
  this.viewport.addEventListener("pointermove", this.onPointerMove);
  this.viewport.addEventListener("pointerup", this.onPointerUp);
  this.viewport.addEventListener("pointercancel", this.onPointerUp);
  this.viewport.addEventListener("click", this.onClickCapture, true);
  this.root.addEventListener("mouseenter", this.onEnter);
  this.root.addEventListener("mouseleave", this.onLeave);
  this.root.addEventListener("focusin", this.onEnter);
  this.root.addEventListener("focusout", this.onLeave);
  this.root.addEventListener("keydown", this.onKey);
  this.track.addEventListener("transitionend", this.onTransitionEnd);
  document.addEventListener("visibilitychange", this.onVisibility);
  this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  this.reducedMotion = this.motionQuery.matches;
  this.motionQuery.addEventListener("change", this.onMotionChange);
  this.resizeObserver = new ResizeObserver(function () {
    self.measure();
    self.goToPosition(self.position, false);
  });
  this.resizeObserver.observe(this.viewport);
};

ServicesCarousel.prototype.unbind = function () {
  if (this.prevBtn) this.prevBtn.removeEventListener("click", this.onPrev);
  if (this.nextBtn) this.nextBtn.removeEventListener("click", this.onNext);
  this.viewport.removeEventListener("pointerdown", this.onPointerDown);
  this.viewport.removeEventListener("pointermove", this.onPointerMove);
  this.viewport.removeEventListener("pointerup", this.onPointerUp);
  this.viewport.removeEventListener("pointercancel", this.onPointerUp);
  this.viewport.removeEventListener("click", this.onClickCapture, true);
  this.root.removeEventListener("mouseenter", this.onEnter);
  this.root.removeEventListener("mouseleave", this.onLeave);
  this.root.removeEventListener("focusin", this.onEnter);
  this.root.removeEventListener("focusout", this.onLeave);
  this.root.removeEventListener("keydown", this.onKey);
  this.track.removeEventListener("transitionend", this.onTransitionEnd);
  document.removeEventListener("visibilitychange", this.onVisibility);
  if (this.motionQuery) this.motionQuery.removeEventListener("change", this.onMotionChange);
  if (this.resizeObserver) this.resizeObserver.disconnect();
};

global.ServicesCarousel = ServicesCarousel;
})(window);

document.addEventListener("DOMContentLoaded", function () {
  var roots = document.querySelectorAll("[data-services-carousel]");
  for (var i = 0; i < roots.length; i++) new ServicesCarousel(roots[i], { interval: 3000 });
});



//--------------------- slider--------------------






//jjjjjjjj

(function(){
  var fa=function(n){return Math.round(n).toLocaleString('fa-IR',{useGrouping:false})};
  var faGroup=function(n){return Math.round(n).toLocaleString('fa-IR')};
  var ease=function(t){return 1-Math.pow(1-t,3)};

  function run(el,from,to,dur,fmt,suffix){
    var t0=null;
    function step(ts){
      if(!t0)t0=ts;
      var p=Math.min((ts-t0)/dur,1);
      el.textContent=fmt(from+(to-from)*ease(p))+(p===1&&suffix?suffix:'');
      if(p<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var yearEl=document.getElementById('yearCounter');
  var expEl=document.getElementById('expYears');
  var founded=+yearEl.dataset.target;
  var nowYear=+new Intl.DateTimeFormat('en-u-ca-persian',{year:'numeric'}).format(new Date()).replace(/\D/g,'');
  var exp=Math.max(nowYear-founded,1);
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function start(){
    if(reduce){
      yearEl.textContent=fa(founded);
      expEl.textContent=fa(exp);
      document.querySelectorAll('[data-count]').forEach(function(e){e.textContent=faGroup(+e.dataset.count)+(e.dataset.plus?'+':'')});
      return;
    }
    run(yearEl,founded-90,founded,2200,fa);
    run(expEl,0,exp,2200,fa);
    document.querySelectorAll('[data-count]').forEach(function(e){
      run(e,0,+e.dataset.count,2200,faGroup,e.dataset.plus?'+':'');
    });
  }

  var sec=document.getElementById('about');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){
      if(en[0].isIntersecting){start();io.disconnect()}
    },{threshold:.35});
    io.observe(sec);
  }else start();
})();




(() => {
  const tiles = [...document.querySelectorAll('.tile')];
  const items = tiles.map(t => ({
    full: t.dataset.full,
    thumb: t.querySelector('img').src,
    title: t.dataset.title || '',
    caption: t.dataset.caption || '',
    el: t
  }));

  const lb = document.getElementById('lb');
  const stage = document.getElementById('lbStage');
  const img = document.getElementById('lbImg');
  const loader = document.getElementById('lbLoader');
  const zoomLabel = document.getElementById('lbZoom');
  const titleEl = document.getElementById('lbTitle');
  const capEl = document.getElementById('lbCaption');
  const counterEl = document.getElementById('lbCounter');
  const thumbsEl = document.getElementById('lbThumbs');

  const MIN = 1, MAX = 6;
  let index = 0, scale = 1, tx = 0, ty = 0, isOpen = false;
  let token = 0;

  // ---- thumbnails
  items.forEach((it, i) => {
    const b = document.createElement('button');
    b.className = 'lb__thumb';
    b.setAttribute('aria-label', 'تصویر ' + (i + 1));
    b.innerHTML = `<img src="${it.thumb}" alt="">`;
    b.addEventListener('click', () => go(i));
    thumbsEl.appendChild(b);
  });
  const thumbBtns = [...thumbsEl.children];

  // ---- transform helpers
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  function bounds(s = scale) {
    const w = img.offsetWidth * s, h = img.offsetHeight * s;
    return {
      x: Math.max(0, (w - stage.clientWidth) / 2),
      y: Math.max(0, (h - stage.clientHeight) / 2)
    };
  }

  function apply(smooth = false) {
    const b = bounds();
    // کمی کشش (rubber band) اجازه می‌دهیم، در پایان به محدوده برمی‌گردد
    img.classList.toggle('smooth', smooth);
    img.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
    zoomLabel.textContent = Math.round(scale * 100) + '%';
    stage.classList.toggle('is-zoomed', scale > 1.001);
  }

  function settle(smooth = true) {
    const b = bounds();
    tx = clamp(tx, -b.x, b.x);
    ty = clamp(ty, -b.y, b.y);
    apply(smooth);
  }

  function zoomAt(newScale, cx, cy, smooth = false) {
    newScale = clamp(newScale, MIN, MAX);
    const r = stage.getBoundingClientRect();
    const px = cx - (r.left + r.width / 2);
    const py = cy - (r.top + r.height / 2);
    const k = newScale / scale;
    tx = px - (px - tx) * k;
    ty = py - (py - ty) * k;
    scale = newScale;
    if (scale === 1) { tx = 0; ty = 0; }
    const b = bounds();
    tx = clamp(tx, -b.x, b.x);
    ty = clamp(ty, -b.y, b.y);
    apply(smooth);
  }

  function reset(smooth = true) { scale = 1; tx = 0; ty = 0; apply(smooth); }

  // ---- open / close / navigate
  function load(i, fromRect) {
    const my = ++token;
    const it = items[i];
    index = i;
    titleEl.textContent = it.title;
    capEl.textContent = it.caption;
    counterEl.textContent = `${i + 1} / ${items.length}`;
    thumbBtns.forEach((b, k) => b.classList.toggle('is-active', k === i));

    img.classList.remove('is-ready', 'smooth');
    loader.classList.add('on');
    scale = 1; tx = 0; ty = 0;
    img.style.transform = '';
    img.alt = it.title;

    const pre = new Image();
    pre.onload = pre.onerror = () => {
      if (my !== token) return;
      img.src = it.full;
      loader.classList.remove('on');
      img.classList.add('is-ready');
      requestAnimationFrame(() => {
        if (fromRect) {
          // انیمیشن باز شدن از جای کاشی
          const sr = stage.getBoundingClientRect();
          const w = img.offsetWidth || 1;
          tx = fromRect.left + fromRect.width / 2 - (sr.left + sr.width / 2);
          ty = fromRect.top + fromRect.height / 2 - (sr.top + sr.height / 2);
          scale = Math.max(.15, fromRect.width / w);
          apply(false);
          img.getBoundingClientRect();
          scale = 1; tx = 0; ty = 0;
          apply(true);
        } else {
          img.style.transform = 'translate3d(0,0,0) scale(.94)';
          img.getBoundingClientRect();
          apply(true);
        }
      });
    };
    pre.src = it.full;
  }

  function open(i) {
    isOpen = true;
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    load(i, items[i].el.getBoundingClientRect());
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    token++;
    const r = items[index].el.getBoundingClientRect();
    const sr = stage.getBoundingClientRect();
    const w = img.offsetWidth || 1;
    // برگشت به کاشی
    scale = Math.max(.15, r.width / w);
    tx = r.left + r.width / 2 - (sr.left + sr.width / 2);
    ty = r.top + r.height / 2 - (sr.top + sr.height / 2);
    apply(true);
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    items[index].el.focus({ preventScroll: true });
  }

  function go(i) {
    i = (i + items.length) % items.length;
    if (i === index) return;
    load(i, null);
  }

  tiles.forEach((t, i) => {
    t.addEventListener('click', () => open(i));
    t.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  // ---- buttons
  lb.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const r = stage.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    switch (b.dataset.act) {
      case 'close': close(); break;
      case 'prev': go(index - 1); break;
      case 'next': go(index + 1); break;
      case 'zoom-in': zoomAt(scale * 1.5, cx, cy, true); break;
      case 'zoom-out': zoomAt(scale / 1.5, cx, cy, true); break;
      case 'reset': reset(); break;
    }
  });

  // ---- keyboard
  document.addEventListener('keydown', e => {
    if (!isOpen) return;
    const r = stage.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') go(index - 1);
    else if (e.key === 'ArrowRight') go(index + 1);
    else if (e.key === '+' || e.key === '=') zoomAt(scale * 1.4, cx, cy, true);
    else if (e.key === '-') zoomAt(scale / 1.4, cx, cy, true);
    else if (e.key === '0') reset();
  });

  // ---- wheel zoom (smooth, around cursor)
  stage.addEventListener('wheel', e => {
    e.preventDefault();
    const factor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0018));
    zoomAt(scale * factor, e.clientX, e.clientY, false);
  }, { passive: false });

  // ---- pointer: pan + pinch + double-tap
  const pointers = new Map();
  let startDist = 0, startScale = 1;
  let last = null, vel = { x: 0, y: 0 }, lastT = 0, moved = 0;
  let lastTap = 0;
  let raf = 0;

  stage.addEventListener('pointerdown', e => {
    stage.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    cancelAnimationFrame(raf);
    img.classList.remove('smooth');
    moved = 0;
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      startDist = Math.hypot(a.x - b.x, a.y - b.y);
      startScale = scale;
    } else {
      last = { x: e.clientX, y: e.clientY };
      vel = { x: 0, y: 0 };
      lastT = performance.now();
    }
  });

  stage.addEventListener('pointermove', e => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      zoomAt(startScale * (d / startDist), (a.x + b.x) / 2, (a.y + b.y) / 2, false);
      return;
    }
    if (!last) return;
    const dx = e.clientX - last.x, dy = e.clientY - last.y;
    moved += Math.abs(dx) + Math.abs(dy);
    if (scale > 1.001) {
      stage.classList.add('is-dragging');
      const b = bounds();
      // مقاومت لاستیکی در لبه‌ها
      const over = (v, lim) => Math.abs(v) > lim ? .35 : 1;
      tx += dx * over(tx, b.x);
      ty += dy * over(ty, b.y);
      const now = performance.now(), dt = Math.max(1, now - lastT);
      vel = { x: dx / dt * 16, y: dy / dt * 16 };
      lastT = now;
      apply(false);
    }
    last = { x: e.clientX, y: e.clientY };
  });

  function endPointer(e) {
    if (!pointers.has(e.pointerId)) return;
    pointers.delete(e.pointerId);
    stage.classList.remove('is-dragging');

    if (pointers.size === 1) { // بعد از pinch
      const p = [...pointers.values()][0];
      last = { x: p.x, y: p.y };
      return;
    }
    if (pointers.size > 0) return;

    // دو بار کلیک / تپ
    if (moved < 6) {
      const now = performance.now();
      if (now - lastTap < 320) {
        scale > 1.05 ? reset() : zoomAt(2.5, e.clientX, e.clientY, true);
        lastTap = 0;
        return;
      }
      lastTap = now;
      // کلیک روی فضای خالی اطراف تصویر = بستن (فقط در حالت زوم‌نشده)
      if (scale <= 1.001 && e.target === stage) {
        const r = img.getBoundingClientRect();
        const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        if (!inside) setTimeout(() => { if (lastTap) close(); }, 330);
      }
      return;
    }

    // حرکت اینرسی
    if (scale > 1.001 && (Math.abs(vel.x) > .5 || Math.abs(vel.y) > .5)) {
      const step = () => {
        vel.x *= .93; vel.y *= .93;
        tx += vel.x; ty += vel.y;
        const b = bounds();
        tx = clamp(tx, -b.x, b.x); ty = clamp(ty, -b.y, b.y);
        apply(false);
        if (Math.abs(vel.x) > .3 || Math.abs(vel.y) > .3) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    } else {
      settle(true);
    }
  }
  stage.addEventListener('pointerup', endPointer);
  stage.addEventListener('pointercancel', endPointer);

  window.addEventListener('resize', () => { if (isOpen) settle(false); });
})();






//--------------------- slider--------------------




(() => {
  /* ---------- آیکن‌ها ---------- */
  const ICONS = {
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
    brush:    '<path d="M18.4 2.6a2.1 2.1 0 0 1 3 3L12 15l-3-3z"/><path d="M9 12c-2.8.2-4.5 1.8-4.5 4.3 0 1.6-.6 2.8-2.5 3.7 4.5 1.2 9.5.3 10-4"/>',
    sparkle:  '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    lash:     '<path d="M2 14s3.6-5 10-5 10 5 10 5-3.6 5-10 5S2 14 2 14z"/><circle cx="12" cy="14" r="2.6"/><path d="M12 4v2.5M5.5 6.5 7 8.5M18.5 6.5 17 8.5"/>',
    drop:     '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2.5"/>',
    brow:     '<path d="M3 16c4-7 12-9 18-5"/><path d="M5 19c3-3 8-4.5 14-2.5"/>',
    wave:     '<path d="M3 7c3-3 6 3 9 0s6 3 9 0M3 13c3-3 6 3 9 0s6 3 9 0M3 19c3-3 6 3 9 0s6 3 9 0"/>',
    heart:    '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'
  };

  /* ---------- داده‌ها: برای هر اسلایدر یک مجموعه ----------
     نام هر مجموعه را در HTML با data-source="..." به سکشن وصل کنید. */
  const DATA = {
    main: [
      { cat: 'آرایش و میکاپ',   title: 'میکاپ حرفه‌ای عروس و مجلسی',  desc: ' تمرکز بر شناخت فرم چهره، انتخاب رنگ مناسب و اجرای تکنیک‌های حرفه‌ای، زیبایی طبیعی هر فرد را برجسته می‌کند. ',     icon: 'brush', img: 'assets/img/hero/arosicon.png',   g: 'linear-gradient(135deg,#e98ea0,#c9707e)', badge: 'پرطرفدار', level: '<img src="assets/img/banner/logo.png" style="width:28px;">',  dur: '۶۰ ساعت', ses: '۲۰ جلسه', price: 'رزرو نوبت' },
      { cat: 'مو',               title: 'رنگ و لایت تخصصی',     desc: 'فرمول‌نویسی رنگ، بالیاژ، آمبره و اصلاح رنگ‌های خراب‌شده.',          icon: 'scissors', img: 'assets/img/icon/keratin2.png', g: 'linear-gradient(135deg,#d3a86e,#a8773e)', badge: 'پرطرفدار',      level: '<img src="assets/img/banner/logo.png" style="width:28px;">',    dur: '۴۸ ساعت', ses: '۱۶ جلسه', price: 'مشاهده و رزرو' },
      { cat: 'ناخن',             title: 'خدمات تخصصی ناخن',          desc: 'از کاشت ژل و پودر تا نیل‌آرت‌های خلاقانه و ترمیم ناخن.',            icon: 'sparkle', img: 'assets/img/icon/nail1.png',  g: 'linear-gradient(135deg,#b799e0,#7f5fb4)', badge: 'پرطرفدار', level: '<img src="assets/img/banner/logo.png" style="width:28px;">',  dur: '۳۶ ساعت', ses: '۱۲ جلسه', price: 'مشاهده و رزرو' },
      { cat: 'مژه و ابرو',       title: 'اکستنشن مژه',         desc: 'طراحی هر ست متناسب با فرم چشم و سبک مورد علاقه شما انجام می‌شود.',        icon: 'lash', img: 'assets/img/icon/mozhe1.png',     g: 'linear-gradient(135deg,#7fb5b0,#4f8a86)', badge: 'پرطرفدار',          level: '<img src="assets/img/banner/logo.png" style="width:28px;">',    dur: '۲۴ ساعت', ses: '۸ جلسه',  price: 'مشاهده و رزرو' },
      { cat: 'مو',                  title: ' شنیون حرفه ای', desc: 'مدل مو با توجه به فرم صورت، استایل، لباس و سلیقه فرد طراحی می‌شود. اجرای ظریف و حرفه‌ای، ماندگاری و توجه به جزئیات.',       icon: 'drop', img: 'assets/img/icon/shenion2.png',     g: 'linear-gradient(135deg,#8fb7e0,#5b88bd)', badge: 'پرطرفدار', level: '<img src="assets/img/banner/logo.png" style="width:28px;">', dur: '۷۲ ساعت', ses: '۲۴ جلسه', price: 'مشاهده و رزرو' },
      { cat: 'مو',               title: 'کراتینه، پروتئین و احیای مو', desc: 'خدمات کراتین و احیای مو با هدف بهبود ظاهر، لطافت، درخشندگی و نظم مو انجام می‌شود. ',          icon: 'wave', img: 'assets/img/icon/keratin2.png',     g: 'linear-gradient(135deg,#9ac49a,#5f9461)', badge: 'پرطرفدار',          level: '<img src="assets/img/banner/logo.png" style="width:28px;">',    dur: '۳۰ ساعت', ses: '۱۰ جلسه', price: 'مشاهده و رزرو' },
      { cat: 'ابرو',      title: 'اصلاح و طراحی ابرو', desc: 'اصلاح و طراحی ابرو با توجه به فرم صورت و تناسب اجزای چهره',    icon: 'heart', img: 'assets/img/icon/mozhe1.png',    g: 'linear-gradient(135deg,#d9889f,#a24d6d)', badge: 'پرطرفدار',      level: ' <img src="assets/img/banner/logo.png" style="width:28px;">', dur: '۲۰ ساعت', ses: '۶ جلسه',  price: 'مشاهده و رزرو' },
      { cat: 'آرایش دائم',      title: 'آرایش دائم', desc: 'با بهره‌گیری از تکنیک‌های تخصصی، برای ایجاد فرم و جلوه‌ای طبیعی',    icon: 'heart', img: 'assets/img/icon/pmu.svg',    g: 'linear-gradient(135deg,#d3a86e,#a8773e)', badge: 'پرطرفدار',      level: ' <img src="assets/img/banner/logo.png" style="width:28px;">', dur: '۲۰ ساعت', ses: '۶ جلسه',  price: 'مشاهده و رزرو' },
      { cat: 'مژه و ابرو',      title: 'لیفت و لمینت ابرو و مژه', desc: 'لیفت و لمینت با هدف مرتب‌تر، خوش‌فرم‌تر و شاداب‌تر نشان دادن ابرو و مژه',    icon: 'heart', img: 'assets/img/icon/mozhe1.png',    g: 'linear-gradient(135deg,#b799e0,#7f5fb4)', badge: 'پرطرفدار',      level: ' <img src="assets/img/banner/logo.png" style="width:28px;">', dur: '۲۰ ساعت', ses: '۶ جلسه',  price: 'مشاهده و رزرو' },
      { cat: 'مو',      title: 'اپلاسیون', desc: 'با رعایت اصول بهداشتی و استفاده از تکنیک‌های مناسب',    icon: 'heart', img: 'assets/img/icon/clean.svg',    g: 'linear-gradient(135deg,#8fb7e0,#5b88bd)', badge: 'پرطرفدار',      level: ' <img src="assets/img/banner/logo.png" style="width:28px;">', dur: '۲۰ ساعت', ses: '۶ جلسه',  price: 'مشاهده و رزرو' },

            { cat: 'مو',  title: 'فر دائم', desc: 'با تکنیک‌های تخصصی و متناسب با جنس و فرم مو ',          icon: 'wave', img: 'assets/img/icon/curl.svg',     g: 'linear-gradient(135deg,#9ac49a,#5f9461)', badge: 'پرطرفدار',          level: '<img src="assets/img/banner/logo.png" style="width:28px;">',    dur: '۳۰ ساعت', ses: '۱۰ جلسه', price: 'مشاهده و رزرو' },
            { cat: 'ماساژ',  title: 'ماساژ تخصصی', desc: 'فضایی برای آرامش و رهایی از خستگی‌های روزمره ',          icon: 'wave', img: 'assets/img/icon/curl.svg',     g: 'linear-gradient(135deg,#d9889f,#a24d6d)', badge: 'پرطرفدار',          level: '<img src="assets/img/banner/logo.png" style="width:28px;">',    dur: '۳۰ ساعت', ses: '۱۰ جلسه', price: 'مشاهده و رزرو' }

    ],

    second: [
      { cat: 'آرایش و میکاپ',   title: ' دوره میکاپ حرفه‌ای عروس و مجلسی ',  desc: 'تکنیک‌های روز دنیا برای پوست، چشم و صورت‌سازی با لوازم برتر.',     icon: 'brush', img: 'assets/img/hero/arosicon.png',    g: 'linear-gradient(135deg,#e98ea0,#c9707e)', badge: 'پرطرفدار', level: 'پیشرفته',  dur: '۶۰ ساعت', ses: '۲۰ جلسه', price: '۱۸٬۵۰۰٬۰۰۰' },
      { cat: 'مو',               title: 'دوره رنگ و مش و دکلره تخصصی',     desc: 'فرمول‌نویسی رنگ، بالیاژ، آمبره و اصلاح رنگ‌های خراب‌شده.',          icon: 'scissors', img: 'assets/img/icon/keratin2.png', g: 'linear-gradient(135deg,#d3a86e,#a8773e)', badge: 'جدید',      level: 'متوسط',    dur: '۴۸ ساعت', ses: '۱۶ جلسه', price: '۱۵٬۲۰۰٬۰۰۰' },
      { cat: 'ناخن',             title: 'دوره کاشت و طراحی ناخن',          desc: 'از کاشت ژل و پودر تا نیل‌آرت‌های خلاقانه و ترمیم ناخن.',            icon: 'sparkle', img: 'assets/img/icon/nail1.png',  g: 'linear-gradient(135deg,#b799e0,#7f5fb4)', badge: 'ظرفیت محدود', level: 'مبتدی',  dur: '۳۶ ساعت', ses: '۱۲ جلسه', price: '۹٬۸۰۰٬۰۰۰' },
      { cat: 'مژه و ابرو',       title: 'دوره اکستنشن و لیفت مژه',         desc: 'کلاسیک، حجمی و هیبرید؛ همراه با اصول ایمنی و مدیریت مشتری.',        icon: 'lash', img: 'assets/img/icon/mozhe1.png',     g: 'linear-gradient(135deg,#7fb5b0,#4f8a86)', badge: '',          level: 'مبتدی',    dur: '۲۴ ساعت', ses: '۸ جلسه',  price: '۷٬۵۰۰٬۰۰۰' },
      { cat: 'پوست و زیبایی',    title: 'دوره پاکسازی و مراقبت تخصصی پوست', desc: 'پوست‌شناسی، انواع فیشیال، لایه‌برداری و پروتکل‌های درمانی.',       icon: 'drop', img: 'assets/img/icon/clean.svg',     g: 'linear-gradient(135deg,#8fb7e0,#5b88bd)', badge: 'مدرک بین‌المللی', level: 'متوسط', dur: '۷۲ ساعت', ses: '۲۴ جلسه', price: '۲۱٬۰۰۰٬۰۰۰' },
      { cat: 'ابرو ', title: 'دوره اصلاح و طراحی ابرو', desc: 'اصول طراحی متناسب با چهره و تکنیک‌های سایه‌مو و هاشور.',         icon: 'brow', img: 'assets/img/icon/mozhe1.png',     g: 'linear-gradient(135deg,#e8a98a,#c47c5a)', badge: 'پرطرفدار', level: 'پیشرفته',  dur: '۴۰ ساعت', ses: '۱۴ جلسه', price: '۱۶٬۸۰۰٬۰۰۰' },
      { cat: 'مو',               title: 'دوره کراتینه، پروتئین و احیای مو', desc: 'درمان‌های ترمیمی مو، انتخاب محصول مناسب و اجرای بی‌نقص.',          icon: 'wave', img: 'assets/img/icon/keratin2.png',     g: 'linear-gradient(135deg,#9ac49a,#5f9461)', badge: '',          level: 'مبتدی',    dur: '۳۰ ساعت', ses: '۱۰ جلسه', price: '۸٬۹۰۰٬۰۰۰' },
      { cat: 'مدیریت سالن',      title: 'دوره راه‌اندازی و مدیریت سالن زیبایی', desc: 'برندینگ، قیمت‌گذاری، جذب مشتری و ساخت یک کسب‌وکار پایدار.',    icon: 'heart', img: 'assets/img/icon/clean.svg',    g: 'linear-gradient(135deg,#d9889f,#a24d6d)', badge: 'جدید',      level: 'همه سطوح', dur: '۲۰ ساعت', ses: '۶ جلسه',  price: '۶٬۲۰۰٬۰۰۰' }
    ]
  };

  const ico = {
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    book:  '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>'
  };
  const svg = p => `<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
  const faNum = n => String(n).padStart(2, '0').replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

  

  function initSlider(root) {
    const $ = name => root.querySelector(`[data-role="${name}"]`);
    const track = $('track'), slider = $('slider');
    const prevBtn = $('prev'), nextBtn = $('next'), toggle = $('toggle');
    const ring = $('ring'), barFill = $('bar'), counter = $('counter');

    const key = root.dataset.source || Object.keys(DATA)[0];
    const list = DATA[key] || [];
    if (!list.length) return;

    const DELAY = parseInt(root.dataset.delay, 10) || 5000;
    root.style.setProperty('--delay', DELAY + 'ms');

    /* ---------- ساخت کارت‌ها ---------- */
    track.innerHTML = list.map((c, i) => `
      <article class="card" style="animation-delay:${i * 90}ms" role="group" aria-roledescription="slide" aria-label="${i + 1} از ${list.length}">
        <div class="card__cover" style="--g:${c.g}">
          ${c.badge ? `<span class="badge">${c.badge}</span>` : ''}
          <span class="level">${c.level}</span>
          <div class="card__icon${c.img ? ' card__icon--img' : ''}">${
            c.img
              ? `<img src="${c.img}" alt="" width="56" height="56" draggable="false">`
              : svg(ICONS[c.icon] || ICONS.sparkle)
          }</div>
        </div>
        <div class="card__body">
          <span class="card__cat">${c.cat}</span>
          <h3 class="card__title">${c.title}</h3>
          <p class="card__desc">${c.desc}</p>
          <div class="meta">
            <span>${svg(ico.clock)}${c.dur}</span>
            <span>${svg(ico.book)}${c.ses}</span>
            <span>${svg(ico.award)}مدرک</span>
          </div>
          <div class="card__foot">
            <div class="price">
              <small>شهریه دوره</small>
              <b>${c.price}<i>تومان</i></b>
            </div>
            <a class="go" href="${c.href || '#'}" aria-label="مشاهده ${c.title}">${svg('<path d="M19 12H5M11 6l-6 6 6 6"/>')}</a>
          </div>
        </div>
      </article>`).join('');

    const cards = [...track.children];


     // اگر فایل PNG پیدا نشد، آیکن SVG جایگزین نمایش داده می‌شود
    // cards.forEach((card, i) => {
    //   const im = card.querySelector('.card__icon img');
    //   if (!im) return;
    //   im.addEventListener('error', () => {
    //     const box = im.parentElement;
    //     box.classList.remove('card__icon--img');
    //     box.innerHTML = svg(ICONS[list[i].icon] || ICONS.sparkle);
    //   }, { once: true });
    // });


    /* ---------- کمکی‌های اسکرول ---------- */
    const rtl = () => getComputedStyle(track).direction === 'rtl';
    const maxScroll = () => track.scrollWidth - track.clientWidth;
    const atEdge = () => Math.abs(track.scrollLeft) >= maxScroll() - 4;
    const atStart = () => Math.abs(track.scrollLeft) <= 4;
    const gutter = () => parseFloat(getComputedStyle(track).scrollPaddingInlineStart) ||
                         parseFloat(getComputedStyle(track).paddingInlineStart) || 0;

    function offsetOf(card) {
      const t = track.getBoundingClientRect(), c = card.getBoundingClientRect();
      return (rtl() ? t.right - c.right : c.left - t.left) - gutter();
    }
    function currentIndex() {
      let best = 0, min = Infinity;
      cards.forEach((c, i) => { const d = Math.abs(offsetOf(c)); if (d < min) { min = d; best = i; } });
      return best;
    }
    function goTo(i, smooth = true) {
      i = Math.max(0, Math.min(cards.length - 1, i));
      const d = offsetOf(cards[i]);
      track.scrollTo({ left: track.scrollLeft + (rtl() ? -d : d), behavior: smooth ? 'smooth' : 'auto' });
    }
    const next = () => atEdge() ? goTo(0) : goTo(currentIndex() + 1);
    const prev = () => atStart() ? goTo(cards.length - 1) : goTo(currentIndex() - 1);

    /* ---------- نوار پیشرفت و شمارنده ---------- */
    let ticking = false;
    function update() {
      ticking = false;
      const ratio = maxScroll() > 0 ? Math.min(1, Math.abs(track.scrollLeft) / maxScroll()) : 1;
      const w = 100 / cards.length;
      barFill.style.width = (w + (100 - w) * ratio) + '%';
      counter.textContent = `${faNum(currentIndex() + 1)} / ${faNum(cards.length)}`;
    }
    track.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);

    /* ---------- پخش خودکار ---------- */
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let userPaused = reduce, hoverPaused = false, hidden = document.hidden, offscreen = false, timer = 0;
    const active = () => !userPaused && !hoverPaused && !hidden && !offscreen;

    function restartRing() {
      ring.classList.remove('run', 'hold');
      void ring.getBoundingClientRect();
      if (active()) ring.classList.add('run');
    }
    function schedule() {
      clearTimeout(timer);
      restartRing();
      if (!active()) return;
      timer = setTimeout(() => { next(); schedule(); }, DELAY);
    }

    toggle.setAttribute('aria-pressed', userPaused);
    toggle.addEventListener('click', () => {
      userPaused = !userPaused;
      toggle.setAttribute('aria-pressed', userPaused);
      toggle.setAttribute('aria-label', userPaused ? 'پخش خودکار' : 'توقف پخش خودکار');
      schedule();
    });
    nextBtn.addEventListener('click', () => { next(); schedule(); });
    prevBtn.addEventListener('click', () => { prev(); schedule(); });

    slider.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { hoverPaused = true; schedule(); } });
    slider.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { hoverPaused = false; schedule(); } });
    track.addEventListener('focusin',  () => { hoverPaused = true;  schedule(); });
    track.addEventListener('focusout', () => { hoverPaused = false; schedule(); });
    document.addEventListener('visibilitychange', () => { hidden = document.hidden; schedule(); });
    new IntersectionObserver(([en]) => { offscreen = !en.isIntersecting; schedule(); }, { threshold: .25 }).observe(slider);

    /* ---------- کیبورد ---------- */
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); rtl() ? next() : prev(); schedule(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); rtl() ? prev() : next(); schedule(); }
    });

    /* ---------- درگ با ماوس ---------- */
    let down = false, sx = 0, sl = 0, moved = 0;
    track.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = 0; sx = e.clientX; sl = track.scrollLeft;
    });
    window.addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
      if (moved > 5) {
        track.classList.add('is-dragging');
        track.scrollLeft = sl - dx;
      }
    });
    window.addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      if (track.classList.contains('is-dragging')) {
        track.classList.remove('is-dragging');
        goTo(currentIndex());
        schedule();
      }
    });
    track.addEventListener('click', e => { if (moved > 5) { e.preventDefault(); e.stopPropagation(); moved = 0; } }, true);
    track.addEventListener('dragstart', e => e.preventDefault());

    /* ---------- شروع ---------- */
    track.scrollLeft = 0;
    update();
    schedule();
  }

  document.querySelectorAll('[data-slider]').forEach(initSlider);
})();




// cta section



(function () {
  var root = document.querySelector('[data-lxc]');
  if (!root) return;
  root.classList.add('lxc-js');

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ---------- ارقام فارسی ---------- */
  var faDigits = '۰۱۲۳۴۵۶۷۸۹';
  function fa(n, pad) {
    var s = String(n);
    if (pad && s.length < pad) s = new Array(pad - s.length + 1).join('0') + s;
    return s.replace(/\d/g, function (d) { return faDigits[d]; });
  }
  function toEn(s) {
    return String(s)
      .replace(/[۰-۹]/g, function (d) { return String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)); })
      .replace(/[٠-٩]/g, function (d) { return String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)); });
  }

  /* ---------- Reveal ---------- */
  var box = root.querySelector('[data-lxc-box]');
  var revealEls = root.querySelectorAll('[data-lxc-reveal]');
  if (hasIO) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('lxc-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('lxc-in'); });
  }

  /* ---------- ظرفیت (نوار پیشرفت) ---------- */
  var urgent = root.querySelector('.lxc-urgent');
  if (urgent) {
    var total = parseInt(urgent.getAttribute('data-lxc-seats-total'), 10) || 12;
    var left = parseInt(urgent.getAttribute('data-lxc-seats-left'), 10);
    if (isNaN(left)) left = 5;
    var fill = Math.max(4, Math.min(100, ((total - left) / total) * 100));
    urgent.style.setProperty('--fill', fill.toFixed(1) + '%');
    var elL = urgent.querySelector('[data-lxc-left]'), elT = urgent.querySelector('[data-lxc-total]');
    if (elL) elL.textContent = fa(left);
    if (elT) elT.textContent = fa(total);
    /* --fill روی .lxc-bar i باید در دسترس باشد؛ از والد ارث‌بری می‌شود */

    /* ---------- شمارش معکوس ---------- */
    var deadline = Date.parse(urgent.getAttribute('data-lxc-deadline'));
    var cells = {
      d: urgent.querySelector('[data-u="d"]'), h: urgent.querySelector('[data-u="h"]'),
      m: urgent.querySelector('[data-u="m"]'), s: urgent.querySelector('[data-u="s"]')
    };
    var countBox = urgent.querySelector('[data-lxc-count]');
    var label = urgent.querySelector('[data-lxc-label]');
    var lastSec = null, timer = null;

    function tick() {
      var diff = deadline - Date.now();
      if (isNaN(deadline) || diff <= 0) {
        if (countBox) countBox.style.display = 'none';
        if (label) label.textContent = 'ثبت‌نام دوره‌ی جدید باز است';
        urgent.style.gridTemplateColumns = '1fr';
        clearInterval(timer);
        return;
      }
      var sec = Math.floor(diff / 1000);
      var d = Math.floor(sec / 86400), h = Math.floor(sec % 86400 / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
      cells.d.textContent = fa(d, 2); cells.h.textContent = fa(h, 2); cells.m.textContent = fa(m, 2);
      cells.s.textContent = fa(s, 2);
      if (!reduce && lastSec !== s) {
        cells.s.classList.remove('lxc-tick'); void cells.s.offsetWidth; cells.s.classList.add('lxc-tick');
        lastSec = s;
      }
    }
    tick();
    timer = setInterval(tick, 1000);
  }

  /* ---------- فرم ---------- */
  var main = root.querySelector('[data-lxc-main]');
  var form = root.querySelector('[data-lxc-form]');
  var msg = root.querySelector('[data-lxc-msg]');
  if (form) {
    var input = form.querySelector('input');
    var defaultMsg = msg ? msg.textContent : '';
    function setMsg(text, bad) {
      if (!msg) return;
      msg.textContent = text; msg.classList.toggle('lxc-bad', !!bad);
    }
    input.addEventListener('input', function () {
      form.classList.remove('lxc-err'); setMsg(defaultMsg, false);
    });
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var raw = toEn(input.value).replace(/[\s\-()]/g, '');
      var ok = /^(\+98|0098|98|0)?9\d{9}$/.test(raw);
      if (!ok) {
        form.classList.remove('lxc-err'); void form.offsetWidth; form.classList.add('lxc-err');
        setMsg('لطفاً یک شماره موبایل معتبر وارد کنید؛ مثل ۰۹۱۲۳۴۵۶۷۸۹', true);
        input.focus();
        return;
      }
      var phone = '0' + raw.slice(-10);
      /* ⬇️ برای اتصال به سرور: روی عنصر .lxc به این رویداد گوش بده
         document.querySelector('[data-lxc]').addEventListener('lxc:submit', function (e) { fetch('/api/academy-lead', { method:'POST', body: JSON.stringify({ phone: e.detail.phone }) }); }); */
      root.dispatchEvent(new CustomEvent('lxc:submit', { detail: { phone: phone }, bubbles: true }));
      main.classList.add('lxc-done');
    });
  }

  /* ---------- درخشش دنبال‌کننده‌ی موس روی کارت‌ها ---------- */
  root.querySelectorAll('[data-lxc-glow]').forEach(function (card) {
    card.addEventListener('pointermove', function (ev) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
      card.style.setProperty('--my', (ev.clientY - r.top) + 'px');
    });
  });

  /* ---------- پارالکس ---------- */
  var par = root.querySelector('[data-lxc-parallax]');
  if (par && box && !reduce) {
    box.addEventListener('pointermove', function (ev) {
      var r = box.getBoundingClientRect();
      par.style.setProperty('--px', ((ev.clientX - r.left) / r.width - 0.5).toFixed(3));
      par.style.setProperty('--py', ((ev.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    box.addEventListener('pointerleave', function () {
      par.style.setProperty('--px', 0); par.style.setProperty('--py', 0);
    });
  }

  /* ---------- دکمه‌ی مغناطیسی ---------- */
  if (!reduce) {
    root.querySelectorAll('[data-lxc-magnetic]').forEach(function (btn) {
      btn.addEventListener('pointermove', function (ev) {
        var r = btn.getBoundingClientRect();
        btn.style.transform = 'translate(' + ((ev.clientX - r.left - r.width / 2) * 0.18) + 'px,' + ((ev.clientY - r.top - r.height / 2) * 0.3) + 'px)';
      });
      btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
    });
  }
})();



