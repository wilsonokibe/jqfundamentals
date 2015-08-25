"use strict"; 

class InputHint {

/*Question 6.2: Create Dropdown Menus
Hovering over an item in the main menu should show that item's submenu items, if any.
Exiting an item should hide any submenu items.
To accomplish this, use the $.fn.hover method to add and remove a class from the submenu items 
to control whether they're visible or hidden. (The file at /exercises/css/styles.css includes 
the "hover" class for this purpose.)
*/
  menu() {  
    $('#nav li').hover(function() {
      $(this).toggleClass('hover').children('ul').slideToggle(400);
    });
  }
}

//EVENTS 6.2
//REVEAL HIDDEN TEXT
$(document).ready(function() {
  const dropDown = new DropdownMenu();

  //Exercise 6.2
  dropDown.menu();
})