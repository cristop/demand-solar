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

$(document).ready(function () {
  $("#burguer-menu").click(function () {
      // Agregar o quitar la clase 'menu-open' al elemento contenedor
      $("#menu-container").toggleClass("menu-open");
  });
});

/////////////////////////////////////////////////////////
//filter
const botones = [$("#btn-first"), $("#btn-second"), $(".add-word"), $(".add-new-note")];
const elementos = [$(".list-filters"), $(".list-projects"), $(".edit-note"), $(".new-note")];

// Función para cerrar los elementos cuando se hace clic en cualquier lugar de la pantalla
function closeElements() {
  elementos.forEach(function (elemento) {
    elemento.each(function () {
      $(this).hide();
    });
  });

  botones.forEach(function (boton) {
    boton.removeClass("open");
  });
}


$(document).ready(function () {
  // Asignar eventos click a cada botón
  botones.forEach(function (boton, indice) {
    boton.on("click", function (event) {
      elementos.forEach(function (elemento, i) {
        if (i === indice) {
          elemento.toggle();
          boton.toggleClass("open");
        } else {
          elemento.hide();
          botones[i].removeClass("open");
        }
      });

      event.stopPropagation();
      return false;
    });
  });

  // Agregar un controlador de eventos clic al documento para cerrar los elementos abiertos
  $(document).on("click", function (event) {
    if (!$(event.target).closest(".list-filters, .list-projects, .edit-note").length) {
      closeElements();
    }
  });
});