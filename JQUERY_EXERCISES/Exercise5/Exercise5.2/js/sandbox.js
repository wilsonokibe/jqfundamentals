"use strict"; 

class TabbedNavigation {

  //Question 5.2 - a: Hide all of the modules
  hideAllModules() {
    $('.module').hide();

    //Exercise 5.1 -b
    this.createListElement();
  }

  //Question 5.2 - b: Create an unordered list element before the first module.
  createListElement() {
    var $newUnorderedList = $('<ul></>');
    $($newUnorderedList).insertBefore('.module:first');

    //Exercise 5.1 -c
    this.IterateAndAddToModules();
  }

  //Question 5.2 - c: Iterate over the modules using $.fn.each. For each module, 
  //use the text of the h2 element as the text for a list item that  
  //you add to the unordered list element.
  IterateAndAddToModules() {
    var myItems = [];
    $('.module').each(function(index, element) {
      var $h2Text = $(element).find('h2').html();
      myItems.push('<li>'+$h2Text+'</li>'); 
    });
    $newUnorderedList.append(myItems.join(''));

    //Exercise 5.1 -d
    this.bindClickEvent();
  }

  //Question 5.2 - d: Bind a click event to the list item that:
    //~Shows the related module, and hides any other modules
    //~Adds a class of "current" to the clicked list item
    //~Removes the class "current" from the other list item
  bindClickEvent() {
    $newUnorderedList.find('li').bind('click',function() { //NOTE: using toggle will give us the same result
      $('#specials').hide();
      $('#blog').hide();

      if($(this).html() == 'Blog') {
        $('#blog').show();      
        $(this).next().removeClass('current');
        $(this).addClass('current');
      } 
      else if($(this).html() == 'Specials') {   
        $('#specials').show();
        $(this).prev().removeClass('current');
        $(this).addClass('current');           
      }
    });

    //Exercise 5.1 -e
    this.showFirstTab();
  }

  //Question 5.2 - e: Finally, show the first tab.
  showFirstTab() {
    $newUnorderedList.find('li:first').trigger('click');
    //Alternative ~ $('#blog').show();  
  }
}

//EVENTS 5.2
//ADD TABBED NAVIGATION
$(document).ready(function() {

  const tab = new TabbedNavigation();

  //Exercise 5.1 -a
  tab.hideAllModules();
});
