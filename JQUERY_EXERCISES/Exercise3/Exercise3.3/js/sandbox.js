"use strict"; 

class Manipulate {

  //Question 2.3 - a: Add five new list items to the end of the unordered list #myList.
  addNewList() {
    var myItem = [], index = 8;
    for(var i = 0; i < 5; i++) {
      index = i+8;
      myItem.push('<li>List item '+index+'</li>');
    }
    $('#myList li:last').append(myItem.join(''));
  }

  //Question 3.3 - b: Remove the odd list items
  removeOdd() {
    $('#myList li:even').remove();    
  }

  //Question 3.3 - c: Add another h2 and another paragraph to the last div.module
  addH2AndParagraph() {
    var $newHeader = $('<h2>New: Specials</h2>');
    var $newParagraph = $('<p>New: Choose the day of the week to see the specials:</p>');
    $newHeader.insertAfter('div.module:last h2');
    $newParagraph.appendTo('div.module:last p');
  }

  //Question 3.3 - d: Add another option to the select element; give the option the value "Wednesday"
  addOption() {
    var $newOption = $('<option>', { 
                        value : 'wednesday', 
                        text : 'Wednesday'
                      });
    ($newOption).insertAfter('div.module:last() option[value="tuesday"]');
  }

  //Question 3.3 - e: Add a new div.module to the page after the last one; put a copy of one of the existing images inside of it.
  addNewDiv() {
    ($('<div></div>')
      .addClass('module'))
      .insertAfter('div.module:last');
    $('img:first')
      .clone()
      .appendTo('div.module:last');
  }
}



//TASK 3.2
//TRAVERSING
$(document).ready(function() {
  const manipulate = new Manipulating();

  //Exercise 3.3 - a
  manipulate.addNewList();

  //Exercise 3.3 - b
  manipulate.removeOdd();

  //Exercise 3.3 - c
  manipulate.addH2AndParagraph();

  //Exercise 3.3 - d
  manipulate.addOption();

  //Exercise 3.3 - e
  manipulate.addNewDiv();
});
