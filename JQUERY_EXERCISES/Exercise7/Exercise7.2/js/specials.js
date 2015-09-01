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
  constructor() {
    this.cachedData = null;
  }

  init() {    
    this.removeSubmitButton();
    this.newDivElement();
  }

  newDivElement() {
    $('#specials form').after($('<div></div>'));
    this.userSelection();
  }

  userSelection() {
    let self = this;
    var $option = $('#specials select');
    $option.on('change', function() {
      var attribute = $(this).val(); 
      self.hideOrShow(attribute);   
    });
  }

  hideOrShow(attribute) {
    if(attribute == "") { 
      $('#specials div').hide();
    }
    else { 
      $('#specials div').show();
      if(this.cachedData != null) {
        this.displayRequestResult(attribute, this.cachedData);
      } else {
        this.requestAndGetJSON(attribute);
      }   
    }
  }

  requestAndGetJSON(attribute) {
    let self = this;
    $.getJSON('./data/specials.json', function(data) {
      self.cachedData = data;      
      self.displayRequestResult(attribute, data);
    });
  }

  displayRequestResult(attribute, data) {
    var html = '';
    html += '<h3>'+data[attribute].title+'</h3>';
    html += '<p style="color:'+data[attribute].color+'"><img src="'+data[attribute].image+'"/></br>'+data[attribute].text+'</p>';
    $('#specials div').html(html);
  }

  removeSubmitButton() {
    $('li.buttons').remove();
  }
}

$(document).ready(function() {
  const user = new User();
  user.init();
})


/*
<li class="buttons">
  <input type="submit" class="input_submit" value="Go" />
</li>
*/