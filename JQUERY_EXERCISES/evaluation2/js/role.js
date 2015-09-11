"use strict";

class Roles {
  init() {
    this.employeesArray = [];
    this.rolesCount = 0;
    this.employeesCount = 0;
    this.eventHandler();
    this.imageCounter = 0;
  }

  eventHandler() {
    let self = this;
    $('#assign').hide();

    /*ROLE*/
    $('#new-role').click(function() {
      this.newRoleClickAction();
    }.bind(this));   

    $('#left').off('click').on('click', '.roles-table', function() {
      $('#assign').hide().show('slow');
      self.assignEmployeeToRole($(this))
    });
    /*ROLE*/

    /*EMPLOYEE*/
    $('#new-employee').click(function() {
      this.newEmployeeClickAction();
    }.bind(this));
    /*EMPLOYEE*/
  }

  assignEmployeeToRole(callerRole) {
    let self = this;
    $('#assign-employee-btn').off('click').on('click', function() {
    $('#assign').hide('slow');
    let selectOption = $('#assign-employee-select option:selected').text();
    let $inputBox = $('<div></div>');
    let $inputDivContainer = $('<div></div>');
    let $element = $('<div></div>');
    let $inputDiv = $('<input />');
    let $innerRight = $('<div></div>');
    let $innerLeft = $('<div></div>');
    let $inner = $('<div></div>');
    let $image1 = $('<div></div>');  
    let $image2 = $('<div></div>'); 
    let $image3 = $('<div></div>'); 
    let $innerRightBox = $('<div></div>'); 
          
    $inputDiv
      .val('Add a new to do here...');
    $inputBox
      .addClass('input-box')
      .append($inputDiv)
    $image1
      .addClass('image1')
      .attr('id', 'image1_' + ++self.imageCounter)
      .attr('data-id', self.imageCounter)
      .append('<img src="images/add-icon.png" height="20px" width="20px">');
    $image2
      .addClass('image2')
      .attr('id', 'image2_' + self.imageCounter)
      .attr('data-id', self.imageCounter)
      .append('<img src="images/Delete.png" height="20px" width="20px">');
    $image3
      .addClass('image3')
      .attr('id', 'image3_' + self.imageCounter)
      .attr('data-id', self.imageCounter)
      .append('<img src="images/OK.png" height="20px" width="20px">');

    $inputDivContainer
      .addClass('input-group')
      .append($inputBox)
      .append($image3)
      .append($image2);

    $element
      .addClass('employees-table')
      .text(selectOption)
      .insertAfter(callerRole);


    $innerLeft
      .addClass('inner-left')
      .append(selectOption);

    $innerRightBox
      .addClass('inner-right-box')
      .text("add todos for "+selectOption);

    $innerRight
      .addClass('inner-right')
      .append($innerRightBox)
      .append($inputDivContainer)
      .append($image1);

    $inner
      .addClass('inner')
      .append($innerLeft)
      .append($innerRight)

    $('.role-todo').each(function() {
      if(callerRole.attr('data-id') === $(this).attr('data-id')) {          
          $(this).next().append($inner);
        }
      });    
    });
  }

/*EMPLOYEE*/
  newEmployeeClickAction() {
    let value = $('#new-employee-input').val();
    this.addNewEmployee(value, ++this.employeesCount);
    this.appendEmployeeToSelect(value, this.employeesCount);
    this.employeesArray.push([value, this.employeesCount]);
  }

  addNewEmployee(value, id) {
    let $element = $('<div></div>');
    $element
      .attr('id', 'employee_'+id)
      .attr('data-id', id)
      .addClass('employees-table')
      .text(value);
    $('#middle').append($element);
  }

  appendEmployeeToSelect(value, id) {
    let $newEm = $('<option></option>');
    $newEm
      .attr('id', 'option_' + id)
      .text(value)
      .appendTo($('#assign-employee-select'))
  }
/*EMPLOYEE*/

/*ROLE*/
  newRoleClickAction() {
    let value = $('#new-role-input').val();
    this.addNewRole(value, ++this.rolesCount);
  }

  addNewRole(value, id) {
    let $element = $('<div></div>');
    $element
      .attr('id', 'role_'+id)
      .attr('data-id', id)
      .addClass('roles-table')
      .text(value);
    $('#left').append($element);
    this.addRoleInTodo(value, id);
  }

  addRoleInTodo(value, id) {
    let $element = $('<div></div>');
    let $nextContent = $('<div></div>');
    $element
      .attr('id', 'todo-role_' + id)
      .attr('data-id', id)
      .addClass('tabulate')
      .addClass('role-todo')
      .append(value);
    $('#right').append($element);
    $nextContent
      .attr('data-id', 'next-todo-role_' +id)
      .addClass('tabulate');
    $('#right').append($nextContent);
  }
/*ROLE*/


}

$(document).ready(function() {
  const roles = new Roles();
  roles.init();
});