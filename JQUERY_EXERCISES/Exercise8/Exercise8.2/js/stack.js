"use strict";
class Stack {
  init() {
    this.count = 0;
    this.buttonClick();
    this.deleteOrHighlightDiv();
  }

  buttonClick() {
    $('#button').click(function() {
      this.count = this.count + 1;
      let newDiv = $('<div></div>');
      $(newDiv)
        .text('div element: '+this.count)
        .addClass('divClass')
        .appendTo('#container');
    }.bind(this));
  }

  deleteOrHighlightDiv() {
    $("#container").on("click", "div", function() {
      $('div.highlight').removeClass('highlight');

      if(!$(this).is(':last-child')) {
        $(this).addClass('highlight');
      } else {
        $(this).remove();
        this.count = this.count-1;
      }
    });
  }
}

$(document).ready(function() {
  const stack = new Stack();
  stack.init();
})