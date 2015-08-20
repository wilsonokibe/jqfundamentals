
//TASK 2.1
//SELECTING
$(document).ready(function() {

  //Select all of the div elements that have a class of "module".
  $('div.module'); 

  //Come up with three selectors that you could use to get the third item in 
  //the #myList unordered list. Which is the best to use? Why?
  $('#myList li').eq(2);
  $('#myList li:nth-child(3)');  
  $('#myListItem'); //fastest: direct reference to id (#myListItem) without having to iterate through objects of li's

  //Select the label for the search input using an attribute selector.
  $('#search label[for="q"]');

  //Figure out how many elements on the page are hidden
  $('body:hidden').length;

  //Figure out how many image elements on the page have an alt attribute.
  $('img[alt]').length;
  
  //Select all of the odd table rows in the table body.

  //"the :even and :odd selectors use JavaScript's native zero-based numbering. 
  //Therefore, the first row counts as zero (even) and the second row counts as one (odd), and so on".
  $('tr:even'); 


//TASK 2.2
//TRAVERSING
  //Select all of the image elements on the page; log each image's alt attribute.
  var imageWithAttribute = $('img[alt]');
  $(imageWithAttribute).each(function(index, attribute) {
    console.log('Image element '+index+ ' has attribute: '+$(attribute).attr('alt'));
  });

  //Select the search input text box, then traverse up to the form and add a class to the form.
  $('input.input_text').parent().addClass('searchClass');

  //Select the list item inside #myList that has a class of "current" and remove that class from it; 
  //add a class of "current" to the next list item.
  $('#myList li').filter('.current').removeClass('current').next().addClass('current');

  //Select the select element inside #specials; traverse your way to the submit button.
  $('#specials select').parent().next().children();

  //Select the first list item in the #slideshow element; add the class "current" to it, 
  //and then add a class of "disabled" to its sibling elements.
  $('#slideshow li').first().addClass('current').siblings().addClass('disabled');


//TASK 2.3
//MANIPULATING
  //Add five new list items to the end of the unordered list #myList.
  var myItem = [], index = 8;
  for(var i = 0; i < 5; i++) {
    index = i+8;
    myItem.push('<li>List item '+index+'</li>');
  }
  $('#myList li:last').append(myItem.join(''));

  //Remove the odd list items
  $('#myList li:even').remove();

  //Add another h2 and another paragraph to the last div.module
  var $newHeader = $('<h2>New: Specials</h2>');
  var $newParagraph = $('<p>New: Choose the day of the week to see the specials:</p>');
  $newHeader.insertAfter('div.module:last h2');
  $newParagraph.appendTo('div.module:last p');

  //Add another option to the select element; give the option the value "Wednesday"
  var $newOption = $('<option>', { 
                      value : 'wednesday', 
                      text : 'Wednesday'
                    });
  ($newOption).insertAfter('div.module:last() option[value="tuesday"]');

  //Add a new div.module to the page after the last one; put a copy of one of the existing images inside of it.
  ($('<div>Hello New Div</div>')
    .addClass('module'))
    .insertAfter('div.module:last');
  $('img:first')
    .clone()
    .appendTo('div.module:last');
});
