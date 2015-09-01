"use strict"; 

class TabbedNavigation {

  init() {

    //Question 5.2 - a: Hide all of the modules
    this.hideAllModules();

    //Question 5.2 - b: Create an unordered list element before the first module.
    this.createListElement();

    //Exercise 5.1 -d
    this.bindClickEvent();

    //Exercise 5.1 -e
    this.showFirstTab();
  }
  
  hideAllModules() {
    $('.module').hide();    
  }
  
  createListElement() {
    var $newUnorderedList = $('<ul></ul>');
    $newUnorderedList = $($newUnorderedList)
    .insertBefore('.module:first')
    .addClass('newUlClass');

    //Exercise 5.1 -c
    this.iterateAndAddToModules($newUnorderedList);    
  }

  //Question 5.2 - c: Iterate over the modules using $.fn.each. For each module, 
  //use the text of the h2 element as the text for a list item that  
  //you add to the unordered list element.
  iterateAndAddToModules($newUnorderedList) {
    var myItems = [];
    $('.module').each(function(index, element) {
      var $h2Text = $(element).find('h2').html();
      myItems.push('<li>'+$h2Text+'</li>'); 
    });
    $newUnorderedList.append(myItems.join(''));
  }

  //Question 5.2 - d: Bind a click event to the list item that:
    //~Shows the related module, and hides any other modules
    //~Adds a class of "current" to the clicked list item
    //~Removes the class "current" from the other list item
  bindClickEvent() {
    this.hideAllModules();

    $('.newUlClass').find('li').bind('click',function() {
      var liIndex;
      liIndex = $(this).index();

      $('div.module')
        .hide()
        .eq(liIndex)
        .show();
        
        $(this).addClass('current')
          .siblings().removeClass('current');
    });
  }

  //Question 5.2 - e: Finally, show the first tab.
  showFirstTab() {
    $('.newUlClass').find('li:first').trigger('click');
    //Alternative ~ $('#blog').show();  
  }
}

//EVENTS 5.2
//ADD TABBED NAVIGATION
$(document).ready(function() {

  const tab = new TabbedNavigation();
  tab.init();
});
