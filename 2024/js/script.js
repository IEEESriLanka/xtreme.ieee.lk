var backToTop = document.querySelector('#back-to-top');
var scrollPosition = window.scrollY;

window.addEventListener('scroll', function() {
    scrollPosition = window.scrollY;
    if (scrollPosition > 300) {
        backToTop.classList.remove('hidden');
    } else {
        backToTop.classList.add('hidden');
    }
});

backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'hidden' });
});

// Hamberger Menu
var hamburger = document.querySelector('#hamburger');
var nav = document.querySelector('nav');

hamburger.addEventListener('click', function() {
    nav.classList.toggle('active');
});

$(function() {
    $('img.lazy').lazyload();
});

var btnday1 = document.getElementById('btnday1');
var btnday2 = document.getElementById('btnday2');

var day1cont = document.getElementById('day1cont');
var day2cont = document.getElementById('day2cont');

btnday1.addEventListener('click', function() {
    day1cont.classList.add('active');
    day2cont.classList.remove('active');
    btnday1.classList.add('active');
    btnday2.classList.remove('active');
});

btnday2.addEventListener('click', function() {
    day2cont.classList.add('active');
    day1cont.classList.remove('active');
    btnday2.classList.add('active');
    btnday1.classList.remove('active');
});
