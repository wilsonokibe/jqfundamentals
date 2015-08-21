//4.1
//CREATE AN IN INPUT HINT

jQuery(document).ready(function($) {
  var $attrValue = $('#search label').html();

  //Set the value of the search input to the text of the label element
  $('#search input.input_text').attr('value', $('#search label').html());

  //Add a class of "hint" to the search input
  $('#search input[type="text"]').addClass('hint');

  //Remove the label element
  $('#search label').remove();

  //Bind a focus event to the search input that removes the hint text and the "hint" class
  $('#search input[type="text"]').bind('focus', function() {
    $(this).removeAttr('value').removeClass('hint');
  });

  //Bind a blur event to the search input that restores the hint text and "hint" class if no search text was entered
  $('#search input[type="text"]').bind('blur', function() {
    if($(this).val().length == 0) {
      $(this).attr('value', $attrValue).addClass('hint');  
    }
  });
})