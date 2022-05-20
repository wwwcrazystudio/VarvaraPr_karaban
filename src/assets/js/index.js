/* eslint-disable */
import '../scss/main.scss';
import { tns } from "tiny-slider";
import 'jquery-nice-select';
import 'magnific-popup';
$('.select-init').niceSelect();

$('.image-popup-zoom').magnificPopup({
    type: 'image',
    zoom: {
        enabled: true,
        duration: 300
    }
    });

$('.reviews__item-more').click(function () {
    if($(this).hasClass('toggled')) {
        $(this).parent().parent().children('.reviews__item-txt').removeClass('view');
        $(this).removeClass('toggled');
        $(this).html('Далее...');
    } else {
        $(this).parent().parent().children('.reviews__item-txt').addClass('view');
        $(this).addClass('toggled');
        $(this).html('Скрыть');
    }
});

$('ul.offers-accordion__nav').on('click', 'li:not(.active)', function () {
    $(this).addClass('active').siblings().removeClass('active').closest('div.offers-accordion').find('div.offers-accordion__block').removeClass('active').eq($(this).index()).addClass('active');
});

$('.js--openOffer').click(function() {
    $('.backdrop').addClass('open');
    $('.modal-offer').addClass('open');
    $('html').addClass('locked');
});

$('.js--openOfferTxt').click(function() {
    $('.backdrop').addClass('open');
    $('.modal-offerTxt').addClass('open');
    $('html').addClass('locked');
});

$('.js--openThank').click(function() {
    $('.backdrop').addClass('open');
    $('.modal-thank').addClass('open');
    $('html').addClass('locked');
});


$('.js--openCall').click(function() {
    $('.backdrop').addClass('open');
    $('.modal-call').addClass('open');
    $('html').addClass('locked');
});

$('.backdrop, .modal__close').click(function() {
    $('.backdrop').removeClass('open');
    $('.modal').removeClass('open');
    $('html').removeClass('locked');
});

if($('.gallery__slider_col3').length) {
    let gallerySlider4 = tns({
        container: '.gallery__slider_col3',
        items: 3,
        slideBy: 1,
        gutter: 111,
        responsive: {
            300: {
                gutter: 10,
                items: 2,
              },
            767: {
                gutter: 40,
                items: 2,
              },
            991: {
               gutter: 111,
              items: 3,
            },
          }
    });
}

if($('.gallery__slider_col2').length) {
    let gallerySlider3 = tns({
        container: '.gallery__slider_col2',
        items: 3,
        slideBy: 1,
        gutter: 111,
        responsive: {
            300: {
                gutter: 10,
                items: 2,
              },
            767: {
                gutter: 40,
                items: 2,
              },
            991: {
               gutter: 111,
              items: 3,
            },
          }
    });
}

if($('.workers__slider').length) {
    let slider = tns({
        container: '.workers__slider',
        items: 2,
        slideBy: 1,
        responsive: {
            300: {
                fixedWidth: 166,
                gutter: 15,
                items: 1,
              },
            767: {
              gutter: 55,
              fixedWidth: false,
              slideBy: 1,
              items: 2,
            },
            1199: {
              items: 2,
              gutter: 135,
            },
            1440: {
                items: 2,
                gutter: 0,
              }
          }
    });
}

if($('.reviews__slider').length) {
    let reviewsSlider = tns({
        container: '.reviews__slider',
        items: 3,
        slideBy: 1,
        gutter: 135,
        responsive: {
            300: {
                gutter: 20,
                items: 2,
              },
            768: {
                gutter: 48,
                items: 2,
              },
            991: {
              gutter: 35,
            },
            1199: {
              items: 3,
              gutter: 135,
            }
          }
    });
}


$('.header__burger').click(function () {
    $(this).toggleClass('open');
    $('.header__mobnav').toggleClass('open');
});