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
    this.createNavigationElement();
    this.hideOtherImages();
    this.slideEffect();
  }

  slideEffect() {
    let self = this;
    $('ol li.class_1').addClass('number');
    setInterval(function() {
      $('#slideshow > li:first')
        .fadeOut(0, function() {
          self.changeNavigationColor();
        })
        .next()
        .fadeIn(1500)
        .end()
        .appendTo('#slideshow');
    }, 3000);
  }

  changeNavigationColor() {
    let className = $('#slideshow li:first').next().attr('class');
    let ol = $('ol');
    ol.find('li').removeClass('number');
    ol.find('.' + className).addClass('number');
  }

  hideOtherImages() {  
    $('#slideshow > li:gt(0)').hide();
  }

  createNavigationElement() {
    const $ol = $('<ol></ol>')
    $('#slideshow > li').each(function(index) {
      let number = index + 1;
      let $list = $('<li> '+number+' </li>');
      $list.addClass('class_'+number).appendTo($ol);
      $(this).addClass('class_'+number);
    });
    $ol.insertAfter('#slideshow');
  }
}

$(document).ready(function() {
  const slideshow = new Slideshow();
  slideshow.init();
});