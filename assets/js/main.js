///////////////////////////////////////////
// settings
var onePageSite = 1;

///////////////////////////////////////////
// Animate Scroll
(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('.js-scroll[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 57)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  $('.preload').delay(1000).fadeOut();

  //no webp navigators
  var isSafari = window.safari !== undefined;
  if (isSafari) $('body').addClass('no-webp');

  var es_ie = navigator.userAgent.search("MSIE") >= 0;
  if (es_ie) $('body').addClass('no-webp');

  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  if (isIE11) $('body').addClass('no-webp');

  var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  if (iOS) $('body').addClass('no-webp');
})(jQuery); // End of use strict
///////////////////////////////////////////
//Sticky Header
// When the user scrolls the page, execute stickyMenu
window.onscroll = function () { stickyMenu() };
$(function () {
  stickyMenu();
});

// Get the header
var header = document.getElementById("navHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyMenu() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

///////////////////////////////////////////
// Open menu in responsive
$(function () {
  $('.responsiveMenu').click(function (event) {
    openMenu();
  });
});
function openMenu() {
  var menuClass = ".menu-main";
  if ($(menuClass).hasClass('open')) {
    $(menuClass).removeClass('open');
    $('.responsiveMenu').removeClass('open');
  } else {
    $(menuClass).addClass('open');
    $('.responsiveMenu').addClass('open');
  }
}

//quit menu responsive onclick
$(function () {
  quitMenuResponsive();
});
$(window).resize(function () {
  quitMenuResponsive();
});
function quitMenuResponsive() {
  if ($(window).width() <= 900) {
    $('.menu-main > ul > li > a:not(.submenu)').click(function (event) {
      openMenu();
    });
    $('.menu-main > ul > li > a.submenu').click(function (event) {
      submenu = $(this).siblings('ul');

      if (submenu.css('display') == 'none') {
        submenu.show();
      } else {
        submenu.hide();
      }

      return false;
    });
  } else {
    $('.menu-main > ul > li > a.submenu').siblings('ul').show();
  }
}

///////////////////////////////////////////
// Detectar elemento visible en pantalla
function isInView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();
  var elemTop = $(elem).offset().top;
  return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
}

///////////////////////////////////////////
// Para paginas onePage
if (onePageSite) {
  $(function () {
    scrollSpy();
  });
  $(window).scroll(function () {
    scrollSpy();
  })
  $(window).resize(function () {
    scrollSpy();
  });
  function scrollSpy() {
    detected = 0;
    $('.menu-main a').each(function (index, el) {
      enlace = $(this).attr('href');
      if ($("#undiv").length > 0) {
        if (isInView($(enlace))) {
          //visible in screen
          if (detected == 0) {
            $('.menu-main a[href="' + enlace + '"]').addClass('active');
            detected = 1;
          } else {
            $('.menu-main a[href="' + enlace + '"]').removeClass('active');
          }
        } else {
          //hidden in screen
          $('.menu-main a[href="' + enlace + '"]').removeClass('active');
        }
      }
    });
  }
}


const sliderMouse = document.querySelector('.slider-with-mouse');
let isDown = false;
let startX;
let scrollLeft;

sliderMouse.addEventListener('mousedown', (e) => {
  isDown = true;
  sliderMouse.classList.add('active');
  startX = e.pageX - sliderMouse.offsetLeft;
  scrollLeft = sliderMouse.scrollLeft;
});
sliderMouse.addEventListener('mouseleave', () => {
  isDown = false;
  sliderMouse.classList.remove('active');
});
sliderMouse.addEventListener('mouseup', () => {
  isDown = false;
  sliderMouse.classList.remove('active');
});
sliderMouse.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - sliderMouse.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  sliderMouse.scrollLeft = scrollLeft - walk;
  console.log(walk);
});
