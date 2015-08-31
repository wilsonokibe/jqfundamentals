"use strict"; 

class InputHint {

  //Question 5.1 - a: Set the value of the search input to the text of the label element
  setValue() {
    $('input.input_text').val($('#search label').html());

    //Exercise 5.1 -b
    this.addClass();
  }

  //Question 5.1 - b: Add a class of "hint" to the search input
  addClass() {
    $('#search input[type="text"]').addClass('hint');

    //Exercise 5.1 -c
    this.removeLabelElement();
  }

  //Question 5.1 - c: Remove the label element
  removeLabelElement() {
    $('#search label').remove();

    //Exercise 5.1 -d
    this.bindFocusEvent();
  }

  //Question 5.1 - d: Bind a focus event to the search input that removes the hint text and the "hint" class
  bindFocusEvent() {
    $('#search input[type="text"]').bind('focus', function() {
      $(this).removeAttr('value').removeClass('hint');
    });

    //Exercise 5.1 -e
    this.bindBlurEvent();
  }

  //Question 5.1 - e: Bind a blur event to the search input that restores the hint text and 
  //"hint" class if no search text was entered
  bindBlurEvent() {
    var $attrValue = $('#search label').html();
    $('#search input[type="text"]').bind('blur', function() {
      if($(this).val().length == 0) {
        $(this).attr('value', $attrValue).addClass('hint');  
      }
    });
  }
}

//EVENTS 5.1
//CREATE AN INPUT HINT
$(document).ready(function() {

  const inputHint = new InputHint();

  //Exercise 5.1 -a
  inputHint.setValue();
});
