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

$(document).ready(function() {
  $('#slideshow').insertBefore('body #header');

  var animationSpeed = 1000;
  var pause = 2000;
  var $slider = $('#slideshow');
  var $sliderContainer = $slider.find('li');
  var $currentSlide = 1;
  var width = 900;

  var interval;

  function startSlider() {
    interval = setInterval(function() {
      $slider.animate({'margin-left': '-='+width}, animationSpeed, function() {
        $currentSlide++;
        if($currentSlide === $sliderContainer.length) {
          $currentSlide = 1;
          $slider.css('margin-left',0)
        }
      });
    }, pause);
  }

  function stopSlider() {
    clearInterval(interval);
  }

  $slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);
  startSlider();
})