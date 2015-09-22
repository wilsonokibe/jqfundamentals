"use strict";

class Search {

  searchAction() {
    let textToMatch = $('#search-input').val();
    if( textToMatch != "") {
      $('.todo-content').hide('slow');
      $("#todos div:contains-ci('" + $('#search-input').val() + "')").parent(".todo-content").show('slow');

      //SEARCH AND FLASH
      this.flashMatchingEmployee(textToMatch);
    } else {
      $('.todo-content').show('slow');
    }
  }

  flashMatchingEmployee(textToMatch) {
    let self = this;
    $('.employee-container1').each(function() {
      $('.row-content').each(function() {
        let stringOfText = $('.task-container', this).text();
        stringOfText = stringOfText.toUpperCase();
        textToMatch = textToMatch.toUpperCase();
        if(stringOfText.indexOf(`${textToMatch}`) >=0 ) {
          self.flashEffect($(this).find('.name-container'));
        }
      });
    });
  }

  flashEffect(nameElement) {
    let stopBlinking = true;
    setTimeout(function() {
      stopBlinking = false;
    }, 5000);

    //function blinking()
    function blinking(selector) {
      let speed = 500;
      $(selector).fadeToggle(speed, function() { 
        if (!stopBlinking) {
          return;
        }
        blinking(this);
      });
    }

    //CALL TO function blinking()
    blinking(nameElement);
  }
}