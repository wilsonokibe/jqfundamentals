"use strict"; 

class Manipulating {

  //Question 2.3 - a: Add five new list items to the end of the unordered list #myList.
  addNewList() {
    // var myItem = []
    var index = 8;
    for(var i = 0; i < 5; i++) {
      index = i+8;
      var $liTag = $('<li></li>');
      $liTag.text('List item '+index);
    $('#myList').append($liTag);
    }

    //Exercise 3.3 - b
    this.removeOdd();
  }

  //Question 3.3 - b: Remove the odd list items
  removeOdd() {
    $('#myList li:even').remove(); 

    //Exercise 3.3 - c
    this.addH2AndParagraph();   
  }

  //Question 3.3 - c: Add another h2 and another paragraph to the last div.module
  addH2AndParagraph() {
    var $newHeader = $('<h2></h2>');
    $newHeader.text('New: Specials');
    var $newParagraph = $('<p></p>');
    $newParagraph.text('New: Choose the day of the week to see the specials:');
    $newHeader.insertAfter('div.module:last h2');
    $newParagraph.appendTo('div.module:last p');

    //Exercise 3.3 - d
    this.addOption();
  }

  //Question 3.3 - d: Add another option to the select element; give the option the value "Wednesday"
  addOption() {
    var $newOption = $('<option>', { 
                        value : 'wednesday', 
                        text : 'Wednesday'
                      });
    ($newOption).insertAfter('option[value="tuesday"]');

    //Exercise 3.3 - e
    this.addNewDiv();
  }

  //Question 3.3 - e: Add a new div.module to the page after the last one; put a copy of one of the existing images inside of it.
  addNewDiv() {
    var div = ($('<div></div>')
      div.addClass('module'))
      .insertAfter('div.module:last');
    $('img:first')
      .clone()
      .appendTo(div);
  }
}



//TASK 3.2
//TRAVERSING
$(document).ready(function() {
  const manipulate = new Manipulating();

  //Exercise 3.3 - a
  manipulate.addNewList();
});
