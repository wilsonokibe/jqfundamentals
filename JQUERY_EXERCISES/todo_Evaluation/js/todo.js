"use strict";

class ToDo {

  init() {
    this.validator = new Validator();
    this.nameArray = [];
    this.count = 0;
    this.eventHandler();
  }

  eventHandler() {
    $('#create_user').click(function() {
      $('#user_input').show();
    });

    $('#add_user').click(function() {
      this.verifyUserInput();
    }.bind(this));

    $('#create_todo').click(function() {
      $('#todo_group').show();
      $('#user_group').hide();
    });

    $('#todo_save').click(function() { 
      this.saveTodo();
    }.bind(this));
  }

  verifyUserInput() {
    let userName = this.nameFormat($('#user_name').val());
    let result = this.validateName(userName);
    if(result) {
      let isDuplicate = this.checkDuplicateName(userName); 
      if(!isDuplicate) {       
        this.addUserToList(userName);
      }
    }
  }

  nameFormat(name) {
    let stringArray = [];
    let myString = name.split(' ');  
    for(let i = 0 ; i < myString.length ; i++) {
      let part1 = myString[i].substring(0,1).toUpperCase();
      let part2 = myString[i].substring(1).toLowerCase();
      stringArray[i] = part1 + part2;
    }  
    let newName = stringArray.join(' ');
    return newName;
  } 


  checkDuplicateName(userName) {
    if(this.nameArray.length >= 1) {
      if(!($.inArray(userName, this.nameArray)) >= -1) {
        alert(`"${userName}" already exists.`);
        return true;
      } else {
        this.nameArray.push(userName);
        return false;
      }
    } else {
      this.nameArray.push(userName);
      return false;
    }
  }

  addUserToList(userName) { 
    if(userName) {
      let $div = $('<div></div>');
      $div
        .text(userName+' (0)')
        .attr('id', this.count + 1)
        .addClass('userClass');
      $('#user_list').append($div);
      $('#user_input').hide();
      $('#user_name').val('');
      this.count = this.count + 1; 
      this.populateSelectOption(userName);     
      this.showCreateToDoButton();
    }
  }

  showCreateToDoButton() {
    if(this.count >= 1) {      
      $('#create_todo').show();
    }
  }

  populateSelectOption(name) {
    let self = this;
    let $option = $('<option></option>');
    $option
      .text(name)
      .attr('id', self.count)
      .addClass('optionClass')
      .appendTo('#todo_select');
  }

  saveTodo() {  
    if(this.count >= 1) {  
      let input = $('#todo_input').val();
      let result = this.validateToDo(input);
      if(result) {
        $('#user_group').show();
        let $selectedOption = $('#todo_select').val();
        let $selectedOptionId = $('#todo_select').find('option:selected').attr('id');
        this.addTodoInList(input, $selectedOption, $selectedOptionId);      
        this.getAssignmentCount($selectedOption, $selectedOptionId);
      }
    } else {
      alert(`You cannot create to-do: No user exists`);
    }
  }

  addTodoInList(input, option, id) {
    let $checkBox = this.createCheckbox(id);
    let $div = $('<div></div>');
    $div
      .append($checkBox)
      .append(' '+input + ' assigned by (' + option + ')')
      .attr('data-id', id)
      .addClass('todoListClass')
    $('#todo_list').append($div);
    $('#todo_input').val('');
    $('#todo_group').hide();
    this.checkBoxEvent();
  }

  createCheckbox(data_id) {
    let id = $('input[type="checkbox"]').length + 1;
    let $checkBox = $('<input />');
    $checkBox
      .attr({
        'type': 'checkbox',
        'data-id': data_id})
      .addClass('chkbox');
    return $checkBox;
  }

  getAssignmentCount(name, id) {    
    let $unchecked = $('.todoListClass').find("[data-id='" + id + "']").not(':checked');
    let count = $unchecked.length;
    this.displayAssignmentCount(count, id, name);
  }

  displayAssignmentCount(idCount, id, name) {    
    $('.userClass').attr('div[id="' + id + '"]', function() {
      $('div[id="' + id + '"]').text(name + ' (' + idCount + ')');
    });
  }

  checkBoxEvent() {
    let self = this;
    $('.todoListClass').on('click', 'input[type="checkbox"]', function() {
      let count = 0;
      let id = $(this).attr('data-id');
      let name = self.getAndStripeName(id);
      let isChecked = $(this).is(':checked');

      if(isChecked) {
        $(this).parent().addClass('strike'); 
      } 
      if(!isChecked)  {
        $(this).parent().removeClass('strike'); 
      }
      self.getAssignmentCount(name, id);
    });
  }

  getAndStripeName(id) {
    let name = '';
    $('.userClass').attr('div[id="'+id+'"]', function() {
      name = $('div[id="' + id + '"]').text();
    });
    name = this.stripeName(name);
    return name;
  }

  stripeName(name) {
    name = name.replace(/\([0-9]\)/, '');
    return name;
  }

  validateName(name) {
    if(this.validator.isEmpty(name)) {
      alert(`Input is empty!`);
      return false;
    } else {
      return true;
    }
  }

  validateToDo(value) {
    if(this.validator.isEmpty(value)) {
      alert(`To-do input is empty!`);
      return false;
    } else { 
      return true;
    }
  }
}

$(document).ready(function() {
  const user = new ToDo();
  user.init();
});