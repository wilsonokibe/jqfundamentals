"use strict";

class UserTodo {

  init() {
    this.count = 0;
    this.value1 = 0;

    this.createUser();
    this.addUser();
    this.createTodo();
    this.saveTodo();
    this.validator = new Validator();
  }

  createUser() {
    $('#create_user').click(function() {
      $('#user_input').show();
    });
  }

  addUser() {
    this.nameArray = [];
    let userName = null;
    let $div = '';
    $('#add_user').click(function() {
      userName = $('#user_name').val();

      //validate userName (no duplication)
      userName = this.validator.validateName(userName);
      if(userName) {
        //this.nameArray = this.nameArray.push(userName);
        //this.validator.checkExistingNames(userName, this.nameArray);
        $div = $('<div></div>');
        $div
          .text(userName)
          .attr('id', this.count + 1)
          .addClass('userClass');
        $('#user_list').append($div);
        $('#user_input').hide();
        $('#user_name').val('');
        this.count = this.count + 1;      
        this.showCreateToDoButton();
      }
    }.bind(this));
  }

  showCreateToDoButton() {
    if(this.count >= 1) {      
      this.populateSelectOption();
      $('#create_todo').show();
    }
  }

  createTodo() {
    $('#create_todo').click(function() {
      $('#todo_group').show();
    });
  }

  populateSelectOption() {
    let self = this;
    let $option = $('<option></option>');
    $('.userClass').each(function() {
      $option
        .text($(this).text())
        .attr('id', self.count)
        .addClass('optionClass')
        .appendTo('#todo_select');
    });
  }

  saveTodo() {  
    let self = this;  
    $('#todo_save').click(function() {      
      let $input = '';
      let $selectedOption = '';
      let $selectedOptionId = '';

      $input = $('#todo_input').val();
      $selectedOption = $('#todo_select').val();
      $selectedOptionId = $('#todo_select').find('option:selected').attr('id');

      //validate $input
      self.addTodoInList($input, $selectedOption, $selectedOptionId);      
      self.getAssignmentCount($selectedOption, $selectedOptionId);
    });
  }

  addTodoInList(input, option, id) {
    let $checkBox = this.createCheckbox(id);
    let $div = $('<div></div>');
    $div
      .text(input + ' assigned by (' + option + ')')
      .attr('data-id', id)
      .addClass('todoListClass')
      .append($checkBox)
    $('#todo_list').append($div);
    $('#todo_input').val('');
    $('#todo_group').hide();
    this.checkBoxEvent();
  }

  createCheckbox(data_id) {
    let id = $('input[type="checkbox"]').length + 1;
    let $checkBox = $('<input />', {type: 'checkbox', id: id, 'data-id': data_id, class: 'chkbox'});
    return $checkBox;
  }

  getAssignmentCount(name, id) {    
    let todoCount = this.countTotalAssigned(id);
    let idCount = this.countCheckedAssigned(id);
    idCount = todoCount - idCount;
    this.displayAssignmentCount(idCount, id, name);
  }

  countTotalAssigned(id) {
    let todoCount = 0;
    $('.todoListClass').each(function() {
      if($(this).attr('data-id') === id) {
        todoCount = todoCount + 1;
      }       
    });
    return todoCount;
  }

  countCheckedAssigned(id) {
    let checkedCount = 0;
    $('input[data-id="'+id+'"]:checkbox').each(function() {
      if($(this).is(':checked')) {
        checkedCount = checkedCount + 1;          
      }
    });
    return checkedCount;
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
    name = name.match(/\w*/i);
    return name;
  }
}

class Validator {
  constructor() {
    this.toDo = new UserTodo();    
  }

  validateName(name) {
    if(this.isEmpty(name)) {
      alert(`Input is empty!`);
      $('#user_input').hide();
      return false;
    }
    else {
      name = this.nameFormat(name);
      return name;
    }
  }

  isEmpty(value) {
    if(value == null || value.trim() == '') {
      return true;
    }
    return false;
  }

  nameFormat(name) {
    return (name.match(/\w*/i));
  }

  // checkExistingNames(userName, nameArray) {
  //   for(let i = 0; i <= nameArray.length; i++) {
  //     if(userName == nameArray[i]) {
  //       console.log(userName);
  //     }
  //   }
  // }
}

$(document).ready(function() {
  const user = new UserTodo();
  user.init();
});