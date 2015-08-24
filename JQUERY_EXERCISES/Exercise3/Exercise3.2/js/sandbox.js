"use strict"; 

class Traverse {

  //Question 3.2 - a: Select all of the image elements on the page; log each image's alt attribute.
  logImageAlt() {
    var $imageWithAltAttribute = $('img[alt]');
    $imageWithAltAttribute.each(function(index, attribute) {
      console.log('Image element '+index+ ' has attribute: '+$(attribute).attr('alt'));
    });
  }

  //Question 3.2 - b://Select the search input text box, then traverse up to the form and add a class to the form.
  searchInputToFormAddClass() {
    $('input.input_text').parent().addClass('searchClass');
  }

  //Question 3.2 - c: Select the list item inside #myList that has a class of "current" and 
  //remove that class from it; add a class of "current" to the next list item.
  changeClass() {
    $('#myList li')
      .filter('.current')
      .removeClass('current')
        .next()
        .addClass('current');
  }

  //Question 3.2 - d: Select the select element inside #specials; traverse your way to the submit button.
  specialToSubmit() {
    $('#specials select')
      .parent()
        .next()
          .children();
  }

  //Question 3.2 - e: Select the first list item in the #slideshow element; add the class "current" to it, 
  //and then add a class of "disabled" to its sibling elements.
  addClassAndDisableSiblings() {
    $('#slideshow li')
      .first()
      .addClass('current')
        .siblings()
          .addClass('disabled');
  }
}

//TASK 3.2
//TRAVERSING
$(document).ready(function() {
  const traverse = new Traversing();

  //Exercise 3.2 - a
  traverse.logImageAlt();

  //Exercise 3.2 - b
  traverse.searchInputToFormAddClass();

  //Exercise 3.2 - c
  traverse.changeClass();

  //Exercise 3.2 - d
  traverse.specialToSubmit();

  //Exercise 3.2 - e
  traverse.addClassAndDisableSiblings();
});
