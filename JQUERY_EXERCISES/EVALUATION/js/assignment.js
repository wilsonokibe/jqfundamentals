"use strict";

class Assignment{

  //APPEND SELECTED EMPLOYEE TO ROLE TABLE UNDER SPECIFIC ROLES
  assignEmployeeToRole(selectedRoleElement, employeeRoleCount) {
    let selectedOption = $('#select-employee option:selected').text();
    let selectedValueId = $('#select-employee option:selected').data('value');
    let dataValue = selectedRoleElement.data('id');
    let $employeOnRoleElement = $('<div></div>', {
      'data-id': employeeRoleCount, 
      'data-employee_id': selectedValueId,
      'id': employeeRoleCount});

    $employeOnRoleElement
      .addClass('border-top')
      .addClass('employees-in-role')
      .addClass(dataValue)
      .text(selectedOption)
      .insertAfter(selectedRoleElement);

    $('.select-list').hide('slow');

    //if role does not already exist in todo, add role
    this.appendRoleIfNotAlreadyAppended(selectedRoleElement);    
    this.appendEmployeeToRoleInTodo(selectedOption, selectedRoleElement , selectedValueId, employeeRoleCount);    
  }

  appendRoleIfNotAlreadyAppended(clickedRoleElement) {
    let roleInTodoCount = 0;
    if($('.task-detail').length >= 1){
      $('.task-detail').each(function() {
        if($(this).data('id') === clickedRoleElement.data('id')) {
          ++roleInTodoCount;
        }
      });
      if(!roleInTodoCount){
        this.appendRoleInTodo(clickedRoleElement); 
      }
    } 
    else{
      this.appendRoleInTodo(clickedRoleElement);      
    }
  }

  appendRoleInTodo(clickedRoleElement) {
    let $roleContainer = $('<div />', {"data-id": clickedRoleElement.data('id')});
    let $employeeContainer = $('<div />', {"data-container": clickedRoleElement.data('id'), 'class': 'employee-container1'});
    let $roleImage = $('<img />', {"data-id": clickedRoleElement.data('id')});     
    let $clear = $('<div />', { 'class': "clear" });
    let $todoContent = $('<div />', {'class': 'todo-content'});

    $employeeContainer
      .addClass('border-top')
      .attr('id', clickedRoleElement.data('id'));

    $roleContainer
      .addClass('border-top')
      .addClass('roles')
      .addClass('task-detail')
      .text(clickedRoleElement.text());
    

    $roleImage
      .attr('src', 'images/minus.png')
      .addClass('show-hide-role-todo-content') 
      .appendTo($roleContainer);

    $roleImage
      .after($clear);

    $todoContent
      .append($roleContainer)
      .append($employeeContainer);    

    $('#todos')
      .append($todoContent);
  }

  //add specific employee under a task in todo table
  appendEmployeeToRoleInTodo(selectedOption, clickedRoleElement, employeeCount, employeeRoleCount) {
    let $nameContainer = $('<div />', {'data-id': employeeRoleCount, 'data-employee-id': 'employee_' + employeeCount, 'data-role_id': employeeCount});
    let $taskContainer = $('<div />', {'data-id': employeeRoleCount, 'data-employee-id': 'employee_' + employeeCount, 'id': 'group-task-' + employeeRoleCount});
    let $individualContainer = $('<div />', {'class': 'row-content'});
    let $roleImage = $('<img />', {'data-id': employeeRoleCount});     
    let $clear = $('<div/>', { 'class': "clear" });
    let $text = $('<p />', { 'id': 'text_' + employeeRoleCount});
    $text.append(`Add new to do for ${selectedOption} here`)

    $nameContainer
      .addClass('all-bordered')
      .addClass('name-container')
      .text(selectedOption);

    $roleImage
      .attr('src', 'images/add.png')
      .addClass('add-task') 
      .appendTo($taskContainer);

    $roleImage
      .after($clear);

    $taskContainer
      .addClass('all-bordered')
      .addClass('task-container')
      .append($text);

    $individualContainer
      .append($nameContainer)
      .append($taskContainer);

    $('#' + clickedRoleElement.data('id'))
      .append($individualContainer);
  }
}
