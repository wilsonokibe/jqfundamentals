"use strict";

class Search {

  searchAction(mythis) {
    let textToMatch = $('#search-input').val();
    if( textToMatch != "") {
      $('.role-in-todo').hide('slow');
      $("#right div:contains-ci('" + $('#search-input').val() + "')").parent(".role-in-todo").show('slow');

      //SEARCH AND FLASH
      this.flashMatchingEmployee(textToMatch);
    } else {
      $('.role-in-todo').show('slow');
    }
  }

  flashMatchingEmployee(textToMatch) {
    let thisParent = this;
    $('.next-role-todo-container').each(function() {
      $('.inner').each(function() {
        let stringOfText = $('.inner-right', this).text();
        stringOfText = stringOfText.toUpperCase();
        textToMatch = textToMatch.toUpperCase();
        if(stringOfText.indexOf(`${textToMatch}`) >=0 ) {
          thisParent.flashEffect($(this).find('.inner-left'));
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
      $(selector).fadeOut(speed, function() {
        $(this).fadeIn(speed, function() {
          if (!stopBlinking) {
            return false;
          }
          blinking(this);
        });
      });
    }

    //CALL TO function blinking()
    blinking(nameElement);
  }
}