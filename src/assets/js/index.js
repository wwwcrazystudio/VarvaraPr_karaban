/* eslint-disable */
import '../scss/main.scss';
import { tns } from "tiny-slider";
import 'jquery-nice-select';
$('.select-init').niceSelect();

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
    let gallerySlider3 = tns({
        container: '.gallery__slider_col3',
        items: 3,
        slideBy: 1,
        gutter: 111,
    });
}

if($('.gallery__slider_col2').length) {
    let gallerySlider3 = tns({
        container: '.gallery__slider_col2',
        items: 2,
        slideBy: 1,
        gutter: 114,
    });
}

if($('.workers__slider').length) {
    let slider = tns({
        container: '.workers__slider',
        items: 2,
        slideBy: 1,
    });
}

if($('.reviews__slider').length) {
    let reviewsSlider = tns({
        container: '.reviews__slider',
        items: 3,
        slideBy: 1,
        gutter: 135,
    });
}