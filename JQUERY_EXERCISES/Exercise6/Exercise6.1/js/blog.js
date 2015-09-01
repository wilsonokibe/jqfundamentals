"use strict"; 

class ExcerptParagraph {

  init() {

    //Exercise 6.1
    this.showHide();
  }

  //Question 6.1: Reveal Hidden Text:
  //Clicking on a headline in the #blog div should slide down the excerpt paragraph
  //Clicking on another headline should slide down its excerpt paragraph, and 
  //slide up any other currently showing excerpt paragraphs.
  showHide() {
    $('#blog h3').on('click', function(event) {
      event.preventDefault();

      $( "#blog h3" )
        .next()
        .removeClass('excerpt')
        .end()
        .not(this)
        .next()
        .addClass('excerpt');    
    });  
  }
}

//EVENTS 6.1
//REVEAL HIDDEN TEXT
$(document).ready(function() {

  const excerpt = new ExcerptParagraph();
  excerpt.init(); 
})