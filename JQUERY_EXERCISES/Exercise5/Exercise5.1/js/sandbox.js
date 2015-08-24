"use strict"; 

class InputHint {

  //Question 5.1 - a: Set the value of the search input to the text of the label element
  setValue() {
    $('#search input.input_text').attr('value', $('#search label').html());
  }

  //Question 5.1 - b: Add a class of "hint" to the search input
  addClass() {
    $('#search input[type="text"]').addClass('hint');
  }

  //Question 5.1 - c: Remove the label element
  removeLabelElement() {
    $('#search label').remove();
  }

  //Question 5.1 - d: Bind a focus event to the search input that removes the hint text and the "hint" class
  bindFocusEvent() {
    $('#search input[type="text"]').bind('focus', function() {
      $(this).removeAttr('value').removeClass('hint');
    });
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

  //Exercise 5.1 -b
  inputHint.addClass();

  //Exercise 5.1 -c
  inputHint.removeLabelElement();

  //Exercise 5.1 -d
  inputHint.bindFocusEvent();

  //Exercise 5.1 -e
  inputHint.bindBlurEvent();
});
