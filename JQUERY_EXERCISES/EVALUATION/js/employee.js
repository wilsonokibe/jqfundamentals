"use strict";

class Employee {

  addNewEmployee(value, employeeCount) {       
    let employeeId = 'employee_' + employeeCount;
    let $newEmployeeDiv = $('<div></div>', {"data-id": employeeCount, 'id': 'emp-' + employeeCount});
    $newEmployeeDiv
      .addClass('border-top')
      .addClass('employees')
      .text(value)
      
    $('#employees').append($newEmployeeDiv);

    //SELECT OPTION: add each new employee to select option
    this.addEmployeeToSelectOption(value, employeeCount); 
  }

  addEmployeeToSelectOption(value, employeeCount) {
    let employeeId = 'option_' + employeeCount;
    let $selectOption = $('<option></option>', {"data-id": employeeId, "data-value": employeeCount});

    $selectOption
      .text(value);

    $selectOption
      .appendTo('#select-employee');
  }

  deleteEmployeeAndAssociatedData(employeeId, nameArray) {
    let confirmDelete = confirm(`All data associated with this employee will be lost.\nDo you want to proceed?`);
    if(confirmDelete) {

      //delete all associated data to employee on todos table
      $('.row-content [data-employee-id = employee_' + employeeId + ']').parent().remove();

      //delte all associated data to employee on roles
      $('#roles [data-employee_id=' + employeeId + ']').remove();

      //delete employee's name from selection option
       $('#select-employee [data-value = ' + employeeId + ']').remove();

      //delete all associated data to employee on employee table and array
      $('#employees [data-id = ' + employeeId + ']').remove();
      let employeeName = $('#employees [data-id = ' + employeeId + ']').text();
      nameArray.splice($.inArray(employeeName, nameArray),1);
    }
  }
}
