"use strict"; 

class Selecting {

  //Question 3.1 - a: Select all of the div elements that have a class of "module".
  divWithClassModule() {
    $('div.module'); 

    //Exercise 3.1 - b
    this.bestOfThreeSelectors();
  }

  //Question 3.1 - b: Come up with three selectors that you could use to get the third item in 
  //the #myList unordered list. Which is the best to use? Why?
  bestOfThreeSelectors() {
    $('#myList li').eq(2);
    $('#myList li:nth-child(3)');  
    $('#myListItem');         

    //$('#myListItem') is fastest: direct reference to id (#myListItem) without 
    //having to iterate through objects of li's

    //Exercise 3.1 - c
    this.usingAttributeSelector();
  }

  //Question 3.1 - c: Select the label for the search input using an attribute selector.
  usingAttributeSelector() {
    $('#search label[for="q"]');

    //Exercise 3.1 - d
    this.hiddenElements();
  }

  //Question 3.1 - d: Figure out how many elements on the page are hidden
  hiddenElements() {
    var hiddenElements = $(':hidden').length;
    console.log('Found '+hiddenElements+' hidden elements total');

    //Exercise 3.1 - e
    this.numberOfAltAttributes();
  }

  //Question 3.1 - e: Figure out how many image elements on the page have an alt attribute.
  numberOfAltAttributes() {
    var imageElements = $('img[alt]').length;
    console.log('There are '+imageElements+' image elements with alt attribute on the page');

    //Exercise 3.1 - f
    this.oddTableRows();
  }

  //Question 3.1 - f: Select all of the odd table rows in the table body.
  oddTableRows() {
    $('tr:even').css('color', 'green'); 

  //"the :even and :odd selectors use JavaScript's native zero-based numbering. 
  //Therefore, the first row counts as zero (even) and the second row counts as one (odd), and so on".
  }
}

//TASK 3.1
//SELECTING
$(document).ready(function() {

  const select = new Selecting();

  //Exercise 3.1 - a
  select.divWithClassModule();
});
