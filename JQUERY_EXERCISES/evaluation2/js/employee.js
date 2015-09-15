"use strict";

class Employee {

  //GET EMPLOYEE'S NAME
  getNewEmployee() {
    let value = $('#new-employee-input').val();
    return value;
  }

  //ADD NEWLY CREATED EMPLOYEE TO EMPLOYEE TABLE
  addNewEmployee(value, id) {
    let $element = $('<div></div>');
    $element
      .attr('id', 'employee_' + id)
      .attr('employee-data-id', id)
      .addClass('employees-table')
      .text(value)
      // .append(this.removeImage(id));
    $('#middle').append($element);
    this.clearAndFocusOnRoleInput();
    this.appendNewEmployeeToSelectOption(value, id);    
    $('.remove-image').hide();
  }

  clearAndFocusOnRoleInput() {    
    $('#new-employee-input').focus().val('');
  }

  //ADD EMPLOYEE TO SELECT LIST
  appendNewEmployeeToSelectOption(value, id) {
    let $newEmployee = $('<option></option>');
    $newEmployee
      .attr('id', 'option_' + id)
      .val(id)
      .text(value)
      .appendTo($('#assign-employee-select'));
  }
}