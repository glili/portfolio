$(function () {
  const projectsSlider = $('[data-slider ="slick"]');

  // Filter
  let filter = $('[data-filter]');

  filter.on('click', function (event) {
    event.preventDefault();

    let cat = $(this).data('filter');

    if (cat == 'all') {
      $('[data-cat]').removeClass('hide');
    } else {
      $('[data-cat]').each(function () {
        let projectCat = $(this).data('cat');

        if (projectCat != cat) {
          $(this).addClass('hide');
        } else {
          $(this).removeClass('hide');
        }
      });
    }
  });
  // Modal

  const modalCall = $('[data-modal]');
  const modalClose = $('[data-close]');

  modalCall.on('click', function (event) {
    event.preventDefault();

    let $this = $(this);
    let modalId = $this.data('modal');

    $(modalId).addClass('show');
    $('body').addClass('no-scroll');

    setTimeout(function () {
      $(modalId).find('.modal__dialog').css({
        transform: 'scale(1)',
      });
    }, 200);

    projectsSlider.slick('setPosition');
  });

  modalClose.on('click', function (event) {
    event.preventDefault();

    let $this = $(this);
    let modalParent = $this.parents('.modal');

    modalParent.find('.modal__dialog').css({
      transform: 'scale(0)',
    });

    setTimeout(function () {
      modalParent.removeClass('show');
      $('body').removeClass('no-scroll');
    }, 200);
  });

  $('.modal').on('click', function (event) {
    let $this = $(this);
    $this.find('.modal__dialog').css({
      transform: 'scale(0)',
    });

    setTimeout(function () {
      $this.removeClass('show');
      $('body').removeClass('no-scroll');
    }, 200);
  });

  $('.modal__dialog').on('click', function (event) {
    event.stopPropagation();
  });

  /* Slider: https://kenwheeler.github.io/slick/
====================*/

  projectsSlider.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: true,
  });

  $('.slickPrev').on('click', function (event) {
    event.preventDefault();

    let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');
    currentSlider.slick('slickPrev');
  });

  $('.slickNext').on('click', function (event) {
    event.preventDefault();

    let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');
    currentSlider.slick('slickNext');
  });

  /*Mobile nav 
    ====================================*/
  const navToggle = $('#navToggle');
  const nav = $('#nav');

  navToggle.on('click', function (event) {
    event.preventDefault();

    nav.toggleClass('show');
  });
});

var mybutton = document.getElementById('myBtn');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (screen.availWidth > 991) {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = 'block';
    } else {
      mybutton.style.display = 'none';
    }
  } else {
    mybutton.style.display = 'none';
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//print the page
function display() {
  window.print();
}

//download pdf
var doc = new jsPDF();
var specialElementHandlers = {
  '#download-btn': function (element, renderer) {
    return true;
  },
};

$('#download').click(function () {
  doc.fromHTML($('#load').html(), 15, 15, {
    width: 200,
    elementHandlers: specialElementHandlers,
  });
  doc.save('pdf-version.pdf');
});
