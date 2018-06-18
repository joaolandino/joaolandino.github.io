/*
VARS
*/
var lllCarousel = document.querySelector('#portfolio-carousel');
var lllCarouselContent = lllCarousel.querySelector('.lll-carousel-content');
var lllCarouselControls = document.querySelectorAll('.lll-carousel-controls');
var lllCarouselSlides = lllCarouselContent.querySelectorAll('.lll-carousel-slide');

var projectDetails = document.getElementById('project-details');
var portfolio = {
  'primeiro-superforum': {
    'title': '1º SuperFórum',
    'banner': 'assets/images/jobs/cover/primeiro-superforum.png',
    'bannerBackground': 'light',
    'text': [
      'Neste projeto recebi o layout pronto e realizei o desenvolvimento do front-end do site. O projeto levou cerca de 36h de trabalho, entre primeira entrega, ajustes no meio do caminho e entrega final.',
      'O site funciona perfeitamente em desktops, notebooks, tablets e smartphones, além de conter um serviço que permite o funcionamento mesmo sem acesso à internet, desde que o usuário já tenha acessado o site ao menos uma vez.'
    ],
    'skills': ['HTML5', 'CSS3', 'Vanilla JS', 'jQuery', 'Design Responsivo', 'Funcionamento Offline'],
    'gallery': [
      'assets/images/jobs/prints/primeiro-superforum-desktop.jpg'
    ]
  },
  'dmcard-acordos': {
    'title': 'DMCard Acordos',
    'banner': 'assets/images/jobs/cover/dmcard-acordos.png',
    'bannerBackground': '#ff6633',
    'text': [
      'Enquanto funcionário da DMCard, desenvolvi o design e o front-end do site de acordos financeiros da empresa. O projeto levou cerca de 20h para ser realizado, já que não houve nenhuma alteração desde a primeira entrega.',
      'O site funciona perfeitamente em desktops, notebooks, tablets e smartphones.'
    ],
    'skills': ['HTML5', 'CSS3', 'UIKit', 'jQuery', 'Design Responsivo'],
    'gallery': [
      'assets/images/jobs/prints/dmcard-acordos-1.jpg',
      'assets/images/jobs/prints/dmcard-acordos-2.jpg',
      'assets/images/jobs/prints/dmcard-acordos-3.jpg',
    ]
  }
}


/*
EVENTS
*/
window.onload = function(){
  if(window.location.hash != ''){ article(); }
  loadImages();
}

window.onhashchange = function(){
  article();
}

if(navigator.serviceWorker){
  navigator.serviceWorker.register('/service-worker.js').then( reg => {

    reg.addEventListener('updatefound', () => {
      console.log('updatefound');
    });

  });
}

for(var i = 0; i < lllCarouselControls.length; i++){
  (function(i) {
    lllCarouselControls[i].addEventListener('click', function(){
      var control = lllCarouselControls[i];
      var direction = control.getAttribute('data-direction');

      var elementStyle = lllCarouselSlides[1].currentStyle || window.getComputedStyle(lllCarouselSlides[1]);
      var scrollSize = lllCarouselSlides[1].clientWidth + parseInt(elementStyle.marginRight) + parseInt(elementStyle.marginLeft);

      if(direction == 'left'){
        lllCarouselContent.scrollLeft -= scrollSize;
      }else if(direction == 'right'){
        lllCarouselContent.scrollLeft += scrollSize;
      }
    });
  })(i);
}


/*
METHODS
*/
function article(name){
  name = name || window.location.hash;

  // JUST SHOW ARTICLE IF HASH IS NOT NULL
  if(name == ''){
    projectDetails.classList.remove('active');
    document.body.style.overflow = 'auto';
  }else{
    projectDetails.classList.add('active');
    document.body.style.overflow = 'hidden';

    projectDetails.scrollTo(0, 0);
  }

  // VARS
  var articleBanner = document.getElementById('article-banner');
  var articleBannerImage = document.createElement('img');
  var articleTitle = document.getElementById('article-title');
  var articleText = document.getElementById('article-text');
  var articleSkills = document.getElementById('article-skills');
  var articleGallery = document.getElementById('article-gallery');
  var article = portfolio[name.replace('#', '')];

  // ARTICLE NOT FOUND? STOP! MAYBE A DIAGLO?
  if( article == null ){ return false; }

  // CONSTRUCT ARTICLE
  if(article.bannerBackground.indexOf('#') == -1){
    articleBanner.setAttribute('data-background', article.bannerBackground);
    articleBanner.style.backgroundColor = null;
  }else{
    articleBanner.removeAttribute('data-background');
    articleBanner.style.backgroundColor = article.bannerBackground;
  }
  articleBannerImage.setAttribute("src", article.banner);
  articleBanner.innerHTML = "";
  articleBanner.appendChild(articleBannerImage);

  articleTitle.innerText = article.title;
  var text = "";
  for(var i = 0; i < article.text.length; i++){
    text += "<p class='normal'>" + article.text[i] + "</p>";
  }
  articleText.innerHTML = text;

  var skills = "";
  for(var i = 0; i < article.skills.length; i++){
    skills += "<li>" + article.skills[i] + "</li>";
  }
  articleSkills.innerHTML = skills;

  var gallery = "";
  for(var i = 0; i < article.gallery.length; i++){
    gallery += "<img src='" + article.gallery[i] + "' />";
  }
  articleGallery.innerHTML = gallery;

  gtag('event', 'Open', {
    'event_category': 'Portfólio',
    'event_label': article.title
  });
}

function loadImages(){
  var images = document.querySelectorAll('[data-src]');
  for(var i = 0; i < images.length; i++){
    var dataSrc = images[i].getAttribute('data-src');
    images[i].setAttribute('src', dataSrc);
    images[i].removeAttribute('data-src');
  }
}
