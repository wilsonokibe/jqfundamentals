"use strict";

class Main{

  init() {

    this.nameArray = [];        //KEEP RECORD OF EMPLOYEES' NAMES FOR INPUT VALIDATION
    this.roleArray = [];        //KEEP RECORD OF ROLES FOR VALIDATION INPUT VALIDATION

    this.rolesCount = 0;        //COUNTER FOR ROLES
    this.employeeCount = 0;     //COUNTER FOR EMPLOYEES
    this.employeeRoleCount = 0; //COUNTER FOR ALL EMPLOYEES ADDED TO ROLE TABLE      
    this.taskCounter = 0;       //COUNTER FOR ALL ASSIGNED TASKS

    this.roles = new Roles();
    this.validator = new Validator();
    this.employee = new Employee();
    this.assignment = new Assignment();
    this.search = new Search();

    // jQuery expression for case insensitive .contains()
    $.extend($.expr[":"], 
    {
      "contains-ci": function(elem, i, match, array) 
      {
        return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
      }
    });

    this.eventBind();
  }

  eventBind() {
    let self = this;

    //SEARCH INPUT LISTENER:

    //search button listener
    $('#search-button').click(function(){
      self.search.searchAction();
    });

    //ROLE AND EMPLOYEE LISTENERS:

    //Role button listener
    $('#show-role-input').click(function() {
      self.showInputField('employee', 'role');
    });

    //Role input button listener
    $('#new-role').click(function() {
      self.addRole();
    });

    //Button to show new employee input field
    $('#show-employee-input').click(function() {
      self.showInputField('role', 'employee');
    });

    //Employee button for adding employee
    $('#new-employee').click(function() {
      self.addEmployee();
    });

    //Adding employee to role table:
    //SELCT OPTION: show select option and assign button
    let selectedRoleElement;
    $('#roles').off('click').on('click', '.roles', function() {
      $('.select-list').show('slow');
      selectedRoleElement = $(this);      
    });

    //submit selected option click
    $('#assign-employee-btn').off('click').on('click', function() {
      self.assignRoleToUniqueEmployee(selectedRoleElement, ++self.employeeRoleCount);
    });


    //TASKS LISTENERS:

    //Add new task on button click
    $('#todos').on('click', '.add-task', function() {      
      let containerId = $(this).data('id');
      $('#text_' + containerId).hide();

      //create input elements
      self.createTaskInputElements(containerId);
      $('#task-input-' + containerId).focus();
    });

    //Cancel task creation on button click
    $('#todos').on('click', '.cancel-button-image', function() {
      let containerId = $(this).data('id')
      self.cancelTaskCreation(containerId);
    }); 

    //Save task on button click
    $('#todos').on('click', '.save-button-image', function(){
      let contentId = $(this).data('id');      
      self.saveTask(contentId, ++self.taskCounter);
    });

    //Delete existing task on click
    $('#todos').on('click', '.delete-button-image', function() {      
      let contentId = $(this).data('id');
      self.confirmAndDeleteTask(contentId);
    });

    //Edit existing task
    $('#todos').on('click', '.edit-button-image', function() {
      let contentId = $(this).data('id');
      let taskCounterId = $(this).data('taskcounter');
      let textValue = $('#task-' + contentId).text();
      self.editTask(contentId, textValue);
      $('#task-edit-input-' + contentId).focus();
    });

    //cancel Edit of existing tasks
    $('#todos').on('click', '.cancel-edit-button-image', function() {
      let contentId = $(this).data('id');
      self.cancelEditAction(contentId);
    });

    //save edit button click
    $('#todos').on('click', '.save-edit-button-image', function(){
      let contentId = $(this).data('id');
      self.saveEditAction(contentId);
    });


    //HOVER-EFFECT ON EMPLOYEE AND ROLE:

    //employee hover in
    $('#employees').on('mouseenter', '.employees', function() {
      let hoveredEmployee = $(this).data('id');
      self.applyHoverEffect('#emp-' + hoveredEmployee);
    });

    //employee hover out
    $('#employees').on('mouseleave', '.employees', function() {
      let hoveredEmployee = $(this).data('id');
      self.removeHover('#emp-' + hoveredEmployee);
    });

    //deleting employee
    $('#employees').on('click', '.hover-image', function() {
      let dataId = $(this).parent().data('id');
      self.employee.deleteEmployeeAndAssociatedData(dataId, self.nameArray);
    });

    //role hover in
    $('#roles').on('mouseenter', '.employees-in-role', function() {
      let hoveredRole = $(this).data('id');
      self.applyHoverEffect('#'+hoveredRole);
    });

    //role hover out
    $('#roles').on('mouseleave', '.employees-in-role', function() {
      let hoveredRole = $(this).data('id');
      self.removeHover('#'+hoveredRole);
    });

    //deleting role
    $('#roles').on('click', '.hover-image', function() {
      let dataId = $(this).parent().data('id');
      self.roles.deleteEmployeeAndAssociatedData(dataId, self.roleArray);
    });

    //todo hide and show
    $('#show-hide-todo-content').click(function() {
      $('.roles').toggle();
      $('.employee-container1').toggle('slow');
    });

    //roles on todo hide and show
    $('#todos').on('click', '.show-hide-role-todo-content', function() {
      $(this).parent().next().toggle('slow');
    });
  }


  //EVENT ACTIONS:

  //Role button click event
  showInputField(selectorPart1, selectorPart2) {

    //EMPLOYEE: hide new employee input field
    $('#' + selectorPart1 + '-input-elements').hide('slow');

    //ROLE: show new role input field
    $('#' + selectorPart2 + '-input-elements').show('slow');
    $('#new-' + selectorPart2 + '-input').focus();
  }

  //Check for empty role input value existence of value in DOM before adding to DOM
  addRole(){
    let value = $('#new-role-input').val();

    //validate input & check if new role already exists
    if(!this.validator.isEmpty(value) && !this.validator.isDuplicate(value, this.roleArray)) {
      this.roles.addNewRole(value, ++this.rolesCount);

      //EMPLOYEE: show new employee button
      this.showNewEmployeeButton(); 
      this.hideInputField('role');
    }
  }

  //validate employee's name before adding
  addEmployee() {
    let value = $('#new-employee-input').val();
    value = this.nameFormat(value);

    //validate employee's name input value & check if employee already exists
    if(!this.validator.isEmpty(value) && !this.validator.isDuplicate(value, this.nameArray)) {

      this.employee.addNewEmployee(value, ++this.employeeCount);    
    }
    this.hideInputField('employee');
  }

  //add employee to role
  assignRoleToUniqueEmployee(selectedRoleElement, employeeRoleCount) {
    let self = this;
    let Count = 0;
    let dataValue = selectedRoleElement.data('id');

    //check if any task has been assigned under this role previously
    if($('.' + dataValue).length >= 1){
      let valueId = $('#select-employee option:selected').data('value');
      if($('[data-employee_id=' + valueId + '].' + dataValue).length) {
        alert(`${$(this).text()} has been assigned to ${selectedRoleElement.text()} role already. \nWe cannot have duplicates.`);
        $('.select-list').hide('slow');
        return false;
      } else{
          self.assignment.assignEmployeeToRole(selectedRoleElement, employeeRoleCount);            
        }
    } else {
      self.assignment.assignEmployeeToRole(selectedRoleElement, employeeRoleCount);
    }
  }

  //show new employee button
  showNewEmployeeButton() {    
    $('#show-employee-input').show();
  } 

  hideInputField(selectorPart) {
    $('#new-' + selectorPart + '-input').val('');
    $('#employee-input-elements').hide('slow');
  }

  hideInputField(selectorPart) {
    $('#new-' + selectorPart + '-input').val('');
    $('#' + selectorPart + '-input-elements').hide('slow');
  }

  //TASK ACTION:

  //create input elements
  createTaskInputElements(containerId) { 

    //if no active input element create new  
    if($('#task-input-' + containerId).length == 0) {      
      let $buttonsImageDiv = $('<div />', {'class': 'button-div'});
      let $inputContainer = $('<div />', {
        'class': 'input-group',
        'id': 'input-group-' + containerId});      
      
      $buttonsImageDiv
        .append(this.createSaveImageButton(containerId))
        .append(this.createCancelImageButton(containerId));

      $inputContainer
        .append(this.createInputBox(containerId))
        .append($buttonsImageDiv);
        
      $('#group-task-' + containerId)
        .append($inputContainer);
    }
  }

  //save button-image creation
  createSaveImageButton(containerId) {
    return $('<img />', {
      'id': 'save-button-' + containerId,
      'class': 'save-button-image',
      'src': 'images/OK.png',
      'data-id': containerId
      });
  }

  //cancel button-image creation
  createCancelImageButton(containerId)  {
    return $('<img />', {
      'id': 'cancel-button-' + containerId,
      'class': 'cancel-button-image', 
      'src': 'images/delete.png',
      'data-id': containerId
    });
  }

  //input box creation
  createInputBox(containerId) {
    return $('<input />', {
      'id': 'task-input-' + containerId,
      'class': 'task-input',
      'placeholder': 'Enter task here..'
    });
  }

  cancelTaskCreation(containerId) {
    $('#input-group-' + containerId).remove();

    //if empty task content
    this.showOrHideText(containerId);
  }

  //save new task
  saveTask(contentId, taskCounter) {
    let inputValue = $('#task-input-' + contentId).val();
      
    if(!this.validator.isEmpty(inputValue)) {
      this.createTextTask(contentId, inputValue, taskCounter);
      $('#input-group-' + contentId).remove();
    }
  }

  //delete existing task
  confirmAndDeleteTask(contentId) {
    let confirmDelete = confirm(`This task will be deleted. \nAre you sure you want to delete?`);
    if(confirmDelete) {
      $('#task-group-' + contentId).remove();

      //if empty task content
      this.showOrHideText(contentId);
    }
  }

  //if empty task content, show P text
  showOrHideText(containerId) {
    if(!$('#group-task-' + containerId).find('.task-group').length >= 1) {
      $('#text_' + containerId).show();
    }
  }

  //Edit existing task
  editTask(contentId, textValue) {
    let $buttonImageDiv = $('<div />', {'class': 'button-div',});
    let $inputContainer = $('<div />', {
      'class': 'edit-input-group', 
      'id': 'input-group-' + contentId});

    $buttonImageDiv
      .append(this.saveEditButton(contentId))
      .append(this.cancelEditButton(contentId));

    $inputContainer
      .append(this.editInputBox(contentId, textValue))
      .append($buttonImageDiv);

    $('#task-group-' + contentId)
      .append($inputContainer)

    $('#button-group-' + contentId).hide();
    $('#task-' + contentId).hide();
  }

  //save button for task editing
  saveEditButton(contentId) {
    return $('<img />', {
      'id': 'save-edit-button-' + contentId, 
      'class': 'save-edit-button-image', 
      'src': 'images/OK.png',
      'data-id': contentId
    });
  }

  //cancel button for task editing
  cancelEditButton(contentId) {
    return $('<img />', {
      'id': 'cancel-edit-button-' + contentId, 
      'class': 'cancel-edit-button-image', 
      'src': 'images/delete.png',
      'data-id': contentId
    });
  }

  //input box for task editing
  editInputBox(contentId, textValue) {
    return $('<input />', {
      'id': 'task-edit-input-' + contentId, 
      'class': 'task-input'
    })
      .val(textValue);
  }

  //cancellation of editing process
  cancelEditAction(contentId) {
    $('#input-group-' + contentId).remove();
    $('#button-group-' + contentId).show();
    $('#task-' + contentId).show();
  }

  //saving after making edition to task
  saveEditAction(contentId) {
    let textValue = $('#task-edit-input-' + contentId).val();
    if(!this.validator.isEmpty(textValue)){
      $('#task-' + contentId).text(textValue);
      $('#input-group-' + contentId).remove();
      $('#button-group-' + contentId).show();
      $('#task-' + contentId).show();
    }
  }

  //EMPLOYEE TABLE HOVER
  applyHoverEffect(hoveredElement) {
    let $imageRemove = $('<img />', {
      'data-id': hoveredElement,
      'src': 'images/delete.png',
      'class': 'hover-image'});

    $(hoveredElement)
      .addClass('hover-effect')
      .append($imageRemove);
  }

  removeHover(hoveredElement) {
    $(hoveredElement)
      .removeClass('hover-effect');
    $('.hover-image').detach();
  }

  //create and save entered input as text for task
  createTextTask(containerId, inputValue, taskCounter) {

    //edit button creation
    let $buttonImageEdit = $('<img />', {
      'id': 'edit-button-' + taskCounter,
      'class': 'edit-button-image', 
      'src': 'images/edit.png',
      'data-id': taskCounter});

    //delete button creation
    let $buttonImageRemove = $('<img />', {
      'id': 'delete-button-' + taskCounter,
      'class': 'delete-button-image', 
      'src': 'images/delete.png',
      'data-id': taskCounter});
    let $divButtonsImage = $('<div />', {
      'class': 'button-div', 
      'id': 'button-group-' + taskCounter});
    let $textHolder = $('<p />', {
      'class': 'tasks', 
      'id': 'task-' + taskCounter, 
      'data-id': taskCounter} );
    let $inputContainer = $('<div />', {
      'class': 'task-group', 
      'id': 'task-group-' + taskCounter});

    $divButtonsImage
      .append($buttonImageEdit)
      .append($buttonImageRemove);

    $textHolder
      .append(inputValue);

    $inputContainer
      .append($textHolder)
      .append($divButtonsImage);

    $('#group-task-' + containerId)
      .append($inputContainer);
  }

  //format inputed name
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

}

$('document').ready(function() {
  const main = new Main();
  main.init();
});
