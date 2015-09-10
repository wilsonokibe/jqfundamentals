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
      $('#user_name').focus();
      $('#todo_group').hide();
      $('#todo_input').val('');
    });

    $('#add_user').click(function() {
      this.verifyUserInput();
    }.bind(this));

    $('#create_todo').click(function() {
      $('#todo_group').show();
      $('#user_input').hide();      
      $('#user_name').val('');
      $('#todo_input').focus();
    });

    $('#todo_save').click(function() { 
      this.saveTodo();
    }.bind(this));
  }

  verifyUserInput() {
    let userName = this.nameFormat($('#user_name').val());
    if(this.validateName(userName)) { 
      if(!this.checkDuplicateName(userName)) {       
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
    let isExist = ($.inArray(userName, this.nameArray));
    if(isExist >= 0) {
      alert(`"${userName}" already exists.`);
      return true;
    } 
    return false;
  }

  addUserToList(userName) { 
    this.nameArray.push(userName);
    if(userName) {
      let $div = $('<div></div>');
      $div
        .text(userName+' (0)')
        .attr('id', ++this.count)
        .addClass('users');
      $('#user_list').append($div);
      $('#user_input').hide();
      $('#user_name').val('');
      this.populateSelectOption(userName);     
      this.showCreateToDoButton();
    }
  }

  showCreateToDoButton() {
    if(this.count) {      
      $('#create_todo').show();
    }
  }

  populateSelectOption(name) {
    let $option = $('<option></option>');
    $option
      .text(name)
      .val(this.count)
      .appendTo('#todo_select');
  }

  saveTodo() {  
    if(this.count >= 1) {  
      let input = $('#todo_input').val();
      let result = this.validateToDo(input);
      if(result) {
        $('#user_group').show();
        let userId = $('#todo_select').val();
        let userName = $('#todo_select').find('option:selected').text();
        this.addTodoInList(input, userName, userId);      
        this.getAssignmentCount(userName, userId);
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
      .addClass('check-box')
    $('#todo_list').append($div);
    $('#todo_input').val('');
    $('#todo_group').hide();
    this.checkBoxEvent();
  }

  createCheckbox(data_id) {
    let $checkBox = $('<input />');
    $checkBox
      .attr({
        'type': 'checkbox',
        'data-id': data_id})
      .addClass('chkbox');
    return $checkBox;
  }

  getAssignmentCount(name, id) {    
    let $unchecked = $('.check-box').find("[data-id='" + id + "']").not(':checked');
    let count = ($unchecked).length;
    this.displayAssignmentCount(count, id, name);
  }

  displayAssignmentCount(idCount, id, name) {    
    $('.users').attr('div[id="' + id + '"]', function() {
      $('div[id="' + id + '"]').text(name + ' (' + idCount + ')');
    });
  }

  checkBoxEvent() {
    let self = this;
    $('.check-box').on('click', 'input[type="checkbox"]', function() {
      let id = $(this).data('id');
      let name = self.getAndStripeName(id);

      if($(this).is(':checked')) {
        $(this).parent().addClass('strike'); 
      } else {
        $(this).parent().removeClass('strike'); 
      }
      self.getAssignmentCount(name, id);
    });
  }

  getAndStripeName(id) {
    let name = '';
    $('.users').attr('div[id="'+id+'"]', function() {
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
    } 
    return true;
  }

  validateToDo(value) {
    if(this.validator.isEmpty(value)) {
      alert(`To-do input is empty!`);
      return false;
    } 
    return true;
  }
}

$(document).ready(function() {
  const user = new ToDo();
  user.init();
});