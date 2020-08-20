'use strict';

$(document).ready(function() {
  collapseButtonsVisualBehavior();
  enableNavbarScrollBehavior();
  enableScrollToView();
  enableAddressFormVisualEffects();
  maskInputs();
  // inlineIcons();
  // enableParallaxEffect();
  new MainFormViewController();
  new CheckAddressFormViewController();
});

function maskInputs() {
  $("input[type='tel']")
    .mask("+7 (000) 000-0000")
    .attr("placeholder", "+7 (999) 999-9999");
}

function enableNavbarScrollBehavior() {
  var navbar = $(".navbar");
  var navbarColorChangeScrollTrigger = navbar.height();

  var scrolled = false;
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > navbarColorChangeScrollTrigger) {
      if (!scrolled) {
        scrolled = true;
        navbar.addClass("is-scrolled");
      }
    } else if (scrolled) {
      scrolled = false;
      navbar.removeClass("is-scrolled");
    }
  })
}

function collapseButtonsVisualBehavior() {
  var tariffsCollapseButtons = $("[data-target='#tariffs-collapse']");
  $("#tariffs-collapse").on("show.bs.collapse", function() {
    tariffsCollapseButtons.each(function() {
      if ($(this).attr("data-value") === "show") {
        $(this).hide();
      } else
      if ($(this).attr("data-value") === "hide") {
        $(this).show();
      }
    });
  });
  $("#tariffs-collapse").on("hide.bs.collapse", function() {
    tariffsCollapseButtons.each(function() {
      if ($(this).attr("data-value") === "show") {
        $(this).show();
      } else
      if ($(this).attr("data-value") === "hide") {
        $(this).hide();
      }
    });
  });
}

function enableScrollToView() {
  var offset = $(".navbar").outerHeight();
  console.log({offset});
  $(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - offset
    }, 500);
  });
}

// function enableParallaxEffect() {
//   // https://github.com/wagerfield/parallax
//   var scene = document.getElementById("parallax-scene");
//   var parallaxInstance = new Parallax(scene, {
//     relativeInput: true
//   });
// }

function inlineIcons() {
  $(".--chevron-down").replaceWith('<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="--svg-inline--fa"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" class=""></path></svg>');
  $(".--chevron-up").replaceWith('<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="--svg-inline--fa"><path fill="currentColor" d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" class=""></path></svg>');
}

function enableAddressFormVisualEffects() {
  /* Добавляет или удаляет attr data-hasvalue в нужный момент, в зависимости
   * от того, начинает ли пользователь вводить данные или стирает их. В CSS
   * через этот селектор анимируются лейблы для полей ввода */
  $("#check-address").find("input.form-control").each(function(index) {
    const changeDataVlue = function() {
      $(this).attr("data-hasvalue", $(this).val() ? true : null);
    };
    $(this)
      .on('change', changeDataVlue)
      .on('keyup', changeDataVlue)
      .on('keydown', function(event) {
      $(this).attr("data-hasvalue", event.originalEvent.key === "Backspace" ? ($(this).val() ? true : null) : true);
    });
  });
}
