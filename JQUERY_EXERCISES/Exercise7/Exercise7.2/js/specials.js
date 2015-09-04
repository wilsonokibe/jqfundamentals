"use strict";
/*
Open the file /exercises/index.html in your browser. Use the file /exercises/js/specials.js. 
Your task is to show the user details about the special for a given day when the user selects 
a day from the select dropdown.

1. Append a target div after the form that's inside the #specials element; this will be where 
you put information about the special once you receive it.

2. Bind to the change event of the select element; when the user changes the selection, send an 
Ajax request to /exercises/data/specials.json.
When the request returns a response, use the value the user selected in the select (hint: $.fn.val) 
to look up information about the special in the JSON response.
Add some HTML about the special to the target div you created.

Finally, because the form is now Ajax-enabled, remove the submit button from the form.

Note that we're loading the JSON every time the user changes their selection. How could we change 
the code so we only make the request once, and then use a cached response when the user changes 
their choice in the select?
*/

class User {

  init() {    
    this.getJsonData();
    this.removeSubmitButton();
    this.newDivElement();
  }

  getJsonData() {
    $.getJSON('./data/specials.json', function(data) {
      this.specialsData = data; 
    }.bind(this));
  }

  newDivElement() {
    $('#specials form').after($('<div></div>'));
    this.userSelection();
  }

  userSelection() {
    let self = this;
    var $option = $('#specials select');
    $option.on('change', function() {
      var selectedDay = $(this).val(); 
      self.hideOrShow(selectedDay);   
    });
  }

  hideOrShow(selectedDay) {
    if(selectedDay == "") { 
      $('#specials div').hide();
    }
    else { 
      $('#specials div').show();
      this.displayRequestResult(selectedDay);
    }
  }

  displayRequestResult(day) {
    let data = this.specialsData;
    var html = '';
    html += '<h3>'+data[day].title+'</h3>';
    html += '<p style="color:'+data[day].color+'"><img src="'+data[day].image+'"/></br>'+data[day].text+'</p>';
    $('#specials div').html(html);
  }

  removeSubmitButton() {
    $('li.buttons').remove();
  }
}

$(document).ready(function() {
  const user = new User();
  user.init();
});