"use strict"

/*
Create a Slideshow

Open the file /exercises/index.html in your browser. Use the file /exercises/js/slideshow.js. 
Your task is to take a plain semantic HTML page and enhance it with JavaScript by adding a slideshow.

Move the #slideshow element to the top of the body.

Write code to cycle through the list items inside the element; fade one in, display it for a few seconds, 
then fade it out and fade in the next one.

When you get to the end of the list, start again at the beginning.

For an extra challenge, create a navigation area under the slideshow that shows how many images there 
are and which image you're currently viewing. (Hint: $.fn.prevAll will come in handy for this.)
*/

class Slideshow {

  init() {  

    this.moveSlideshowTop();  

    this.slideShow(); 
  }

  //Question 6.3 - a: Move the #slideshow element to the top of the body.
  moveSlideshowTop() {
    $('#slideshow').insertBefore('#header');      
  }  

/* Question 6.3 - b:
Write code to cycle through the list items inside the element; fade one in, display it for a few seconds, 
then fade it out and fade in the next one.

When you get to the end of the list, start again at the beginning.

For an extra challenge, create a navigation area under the slideshow that shows how many images there 
are and which image you're currently viewing. (Hint: $.fn.prevAll will come in handy for this.)
*/
  slideShow() {
    this.createElementUnderSlideshow();
    this.createNavigationElement();

    this.hideOtherImages();

    var pause = 3000;
    var fadeDuration = 1500;
    var firstSlide = $('#slideshow > li:first');
    var totalSlides = $('#slideshow > li').length;

    this.slideEffect(pause, fadeDuration, firstSlide, totalSlides);
  }

  slideEffect(pause, fadeDuration, firstSlide, totalSlides) {
    $('ol li.class_1').addClass('number');
    let self = this;
    setInterval(function() {
      $('#slideshow > li:first')
        .fadeOut(0, function() {
          self.checkAndChangeClass($(this));
        })
        .next()
        .fadeIn(fadeDuration)
        .end()
        .appendTo('#slideshow');
    }, pause);  
  }

  checkAndChangeClass(mythis) {
    if(mythis.next().hasClass('class_1')) {
      $('ol li.class_2').removeClass('number');
      $('ol li.class_3').removeClass('number');
      $('ol li.class_1').addClass('number');
    } 
    else if(mythis.next().hasClass('class_2')) {
      $('ol li.class_1').removeClass('number');
      $('ol li.class_3').removeClass('number');
      $('ol li.class_2').addClass('number');
    } 
    else if(mythis.next().hasClass('class_3')) {
      $('ol li.class_1').removeClass('number');
      $('ol li.class_2').removeClass('number');
      $('ol li.class_3').addClass('number');
    }
  }

  hideOtherImages() {  
    $('#slideshow > li:gt(0)').hide();
  }

  createElementUnderSlideshow() {
    $('<ol></ol>').insertAfter('#slideshow');
  }

  createNavigationElement() {
    $('#slideshow > li').each(function(idx, el) {
      var number = idx+1;
      var $list = $('<li> '+number+' </li>');
      $list.addClass('class_'+number).appendTo('ol');
      $(this).addClass('class_'+number);
    });
  }
}

$(document).ready(function() {
  const slideshow = new Slideshow();
  slideshow.init();
})