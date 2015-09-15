"use strict";

class Main{

  init() {    
    this.nameArray = [];        //KEEP RECORD OF EMPLOYEES' NAMES FOR INPUT VALIDATION
    this.roleArray = [];        //KEEP RECORD OF ROLES FOR VALIDATION INPUT VALIDATION
    this.rolesCount = 0;        //COUNTER FOR ROLES
    this.employeeCount = 0;     //COUNTER FOR EMPLOYEES
    this.imageCounter = 0;      //COUNTER FOR LEVEL 1 IMAGES      
    this.taskCounter = 0;       //COUNTER FOR ALL ASSIGNED TASKS
    this.employeeRoleCount = 0; //COUNTER FOR ALL EMPLOYEES ADDED TO ROLE TABLE   

    this.roles = new Roles();
    this.employee = new Employee();
    this.validator = new Validator();
    this.assignment = new Assignment();
    this.todos = new Todos();
    this.search = new Search();

    this.hideInputGroup();
    this.eventHandler();

    // jQuery EXPRESSION FOR CASE INSENSITIVE FILTER
    $.extend($.expr[":"], 
    {
      "contains-ci": function(elem, i, match, array) 
      {
        return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
      }
    });
  }

  eventHandler() {
    let thisParent = this;

    //SEARCH INPUT
    $('#search-button').click(function(){
      thisParent.search.searchAction($(this));
    });

    //TOGGLE TODO
    $('#todo-image').click(function() {
      thisParent.roles.toggleVisibility1();
    });

    //TOGGLE ROLE IN TODO
    $('#right').on('click', '.show-image', function() {
      thisParent.roles.toggleVisibility2($(this));
    });

    //ADD INPUT & BUTTON FOR ROLE
    $('#add-role-1').click(function() {
      thisParent.addRoleAction();
    });

    //ADD INPUT & BUTTON FOR EMPLOYEE
    $('#add-employee-1').click(function() {
      thisParent.addEmployeeAction();
    });

    //BUTTON FOR NEW ROLE INPUT DATA
    $('#new-role').click(function() {
      thisParent.newRoleAction();
    }); 

    //BUTTON FOR NEW EMPLOYEE INPUT DATA
    $('#new-employee').click(function() {
      thisParent.newEmployeeAction();
    }); 

    //ROLES CLICK
    $('#left').off('click').on('click', '.roles-table', function() {  //".off('click')"" -TO AVOID DUPLICATION    
      let mythis = $(this);
      $('#assign').hide().show('slow');
      $('#assign-employee-btn').off('click').on('click', function() { //DROPDOWN ADD BUTTON EVENT
        thisParent.assignment.assignEmployeeToRole(mythis, ++thisParent.employeeRoleCount, ++thisParent.imageCounter);

        //IMAGE FOR ADDING NEW TASK
        $( '.image1' ).off().on('click', 'img', function() {
          thisParent.newTaskImageClick($(this));
        });

        //INPUTBOX FOR ADDING NEW TASK
        $('.input-box').off().on('focusin', 'input', function() {
           thisParent.emptyInputBox($(this));
        });

        //SAVE NEW TASK BUTTON
        $('.image3').off().on('click', 'img', function() {
          let dataId = $(this).attr('data-id');
          thisParent.todos.assignTask(dataId, ++thisParent.taskCounter);

          //EDITING AND DELETING TASK
          $('.edit-delete').off().on('click', 'img', function() {
            let id = $(this).attr('id');
            let id2 = $(this).attr('data-id');
            let taskId = $(this).attr('task-counter');
            if($(this).attr('id') == 2) {
              let confirmIt = confirm(`This information will be deleted. \nAre you sure you want to delete`);
              if(confirmIt) {
                $('#task-counter_' + taskId).remove();
                if($('.task-1').length <= 0) {
                  $('#inner-right-text-' + dataId).show();
                }
              }
            } else if($(this).attr('id') == 1) {
              let initialTextValue = $('#input_'+taskId).text();
              $('#input_'+taskId).text('');
              let $editInputBox = thisParent.assignment.inputDivContainer('new_'+taskId, initialTextValue);  //edit task input group
              $editInputBox
                .css('display', 'inline-block');
              $('#input_'+taskId).append($editInputBox);

              //CANCEL EDIT CLICK
              $('#image2_new_' + taskId).click(function() {
                thisParent.cancelEdit(taskId, initialTextValue);
              });

              //SAVE EDIT CLICK
              $('#image3_new_' + taskId).click(function() {
                thisParent.saveEditedValue(taskId);
              });
            }
          });
        });
        
        //CANCEL NEW TASK ASSIGNMENT BUTTON
        $('.image2').off().on('click', 'img', function() {
          thisParent.cancelNewTaskAssignment($(this));
        });    
      });
    }); 

    //EMPLOYEE TABLE HOVER
    $('#middle')
      .on('mouseenter', '.employees-table', function() {
        thisParent.appendHoverClass($(this));

        //CLICKING REMOVE IMAGE OF EMPLOYEE UNDER ROLE TABLE
        $(this).off().on('click', 'img', function() {
          let trackingId = thisParent.confirmAndRemove(`Everything about this employee will be lost. \n Do you want to continue?`, $(this));   
          thisParent.removeFromSelect(trackingId);         
        });
      })
      .on('mouseleave', '.employees-table', function() {
        thisParent.mouseLeaveAction($(this));
      });

      //EMPLOYEES ON ROLES TABLE HOVER
      $('#left')
        .on('mouseenter', '.employees-table', function() {
          thisParent.appendHoverClass($(this));

           //CLICKING REMOVE IMAGE OF EMPLOYEE UNDER EMPLOYEE TABLE
          $(this).off().on('click', 'img', function() {
            let trackingId = thisParent.confirmAndRemove(`All todos assigned to this employee will be lost. \nDo you want to continue?`, $(this));
          });
        })
        .on('mouseleave', '.employees-table', function() {
          thisParent.mouseLeaveAction($(this));
        });
  //END OF EVENT-HANDLER METHOD
  }

  cancelNewTaskAssignment(myThis) {
    let dataId = myThis.attr('data-id');
    $('#inner-right-input-' + dataId).hide();
    if(!$('.task-1').length >= 1) {
      $('#inner-right-text-' + dataId).show();
    }
  }

  saveEditedValue(taskId) {
    let newTextValue = $('#data_new_' + taskId).val();

    //validate input
    $('#data_' + taskId).remove();
    $('#input_'+taskId).text(newTextValue);
  }

  cancelEdit(taskId, initialTextValue){
    $('data_new_' + taskId).remove();
    $('#input_new_'+taskId).text(initialTextValue);
  }

  emptyInputBox(myThis) {
    let dataId = myThis.attr('data-id');
    $('#input-text-' + dataId).val('');
  }

  newTaskImageClick(myThis) {
    let dataId = myThis.attr('data-id');
    $('#inner-right-text-'+dataId).hide();
    $('#inner-right-input-'+dataId).show().css('display', 'inline-block');
  }

  mouseLeaveAction(myThis) {
    myThis
      .removeClass('employee-hover')
    $('#data-1').detach();
  }

  removeFromSelect(trackingId) {

    //remove employee from employee table
    $(this).parent().parent().remove();

    //remove from select list
    $('#option_'+trackingId).remove();
  }

  confirmAndRemove(text, myThis) {
    let confirmAction = confirm(text);
    let trackingId = myThis.parent().parent().attr('employee-data-id');

    //delete any trace of data linked to this employee in todo table
    //delete employee from role table
    if(confirmAction) {  
      $('.inner-left').each(function() {
        if($(this).attr('id') == trackingId) {
          $(this).parent().remove();
          $('#'+trackingId).remove();
        }
        console.log('trackingId: '+trackingId);
      });
    }
    return trackingId;
  }

  appendHoverClass(myThis) {
    myThis
      .addClass('employee-hover')
      .append(this.imageForRemove());
  }

  imageForRemove(){
    let $imageRemove = $('<div id="data-1"></div>');
    $imageRemove
      .append('<img class="img1" id="data-1" src="images/delete.png" height="20px" width="20px">')
      .addClass('hover-image');
    return $imageRemove;
  }

  hideInputGroup() {
    $('.input-group').hide();
  }

  addRoleAction() {    
    $('#employee-input-elements').fadeOut('slow');
    $('#role-input-elements').hide().show('slow');
    $('#new-role-input').focus().val('');
  }

  addEmployeeAction() {
    $('#role-input-elements').fadeOut('slow');
    $('#employee-input-elements').hide().show('slow');
    $('#new-employee-input').focus().val('');
  }

  newRoleAction() {
    $('#role-input-elements').hide('slow');
    let roleValue = this.roles.getNewRole();
    if(!this.validator.isEmpty(roleValue, this.roleArray)) {
      ++this.rolesCount;
      this.roles.addNewRole(roleValue, this.rolesCount);
      this.showNewEmployeeButton();
    } else {
      alert(`Enter valid input.`);
      $('#new-role-input').focus();
    }
  }

  showNewEmployeeButton() {
    if(this.rolesCount) {
      $('#add-employee-1').fadeIn('slow');
    }
  }

  newEmployeeAction() {
    $('#employee-input-elements').hide('slow');
    let employeeValue = this.employee.getNewEmployee();
    employeeValue = this.nameFormat(employeeValue);
    if(this.rolesCount) {
      if(!this.validator.isEmpty(employeeValue, this.nameArray)) {
        ++this.employeeCount;
        this.employee.addNewEmployee(employeeValue, this.employeeCount);
      } else {
          alert(`Enter valid input`);
        }
    } else {
      alert('There must be existing role(s) for employee.');
      $('#employee-input-elements').hide('slow');
      $('#add-employee-1').hide('slow');
      $('#role-input-elements').show('slow');
      $('#new-role-input').focus().val('');
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
}

$('document').ready(function() {
  const main = new Main();
  main.init();
});