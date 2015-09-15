"use strict";

class Assignment {

  //APPEND SELECTED EMPLOYEE TO ROLE TABLE UNDER SPECIFIC ROLES
  assignEmployeeToRole(mythis, employeeCount, imageCounter) {
    let selectedOption = $('#assign-employee-select option:selected').text();
    let $element = $('<div></div>');

    $element
      .addClass('employees-table')
      .attr('id', employeeCount)
      .text(selectedOption)
      .insertAfter(mythis);
    $('#assign').hide('slow');
    this.assignEmployeeAndRoleInTodo(mythis, selectedOption, employeeCount, imageCounter);
  }

  //APPEND EMPLOYE AND ROLE TO TODO TABLE
  assignEmployeeAndRoleInTodo(mythis, selectedOption, employeeCount, imageCounter) {      
    let $inner = $('<div></div>');    
    $inner
      .addClass('inner')
      .append(this.innerLeft(selectedOption, employeeCount))
      .append(this.innerRight(selectedOption, imageCounter, "Add a new todo here..." ));
    $('.role-todo').each(function() {
      if(mythis.attr('role-data-id') === $(this).attr('todo-role-data-id')) {      
        $(this).next().append($inner);
      }
    });   
  }

  //CREATE INPUTBOX
  getinputDiv(imageCounter, textValue){
    let $inputDiv = $('<input />');
    $inputDiv
      .addClass('input-text-todo')
      .attr('id', 'data_' + imageCounter)
      .val(textValue)
      .css('color', 'grey');
    return $inputDiv;
  }

  //APPEND INPUT BOX TO DIV
  getInputBox(imageCounter, textValue) {
    let $inputBox = $('<div></div>');
    $inputBox
      .addClass('input-box')
      .append(this.getinputDiv(imageCounter, textValue));
    return $inputBox;
  }

  //GET AND APPEND IMAGE TO DIV
  //modularise this
  getImage1(imageCounter) {
    let $image1 = $('<div></div>');  
    $image1
      .addClass('image1')
      .attr('data-id', imageCounter)
      .append('<img class="img1" data-id="'+ imageCounter + '" src="images/add-icon.png" height="20px" width="20px">');
    return $image1;
  }
  getImage2(imageCounter) {
    let $image2 = $('<div></div>'); 
    $image2
      .addClass('image2')
      .attr('id', 'image2_' + imageCounter)
      .attr('data-id', imageCounter)
      .append('<img data-id="'+ imageCounter + '" src="images/delete.png" height="20px" width="20px">');
    return $image2;
  }
  getImage3(imageCounter) {
      let $image3 = $('<div></div>'); 
    $image3
      .addClass('image3')
      .attr('id', 'image3_' + imageCounter)
      .attr('data-id', imageCounter)
      .append('<img data-id="' + imageCounter + '" src="images/OK.png" height="20px" width="20px">');
    return $image3;
  }

  //ALIGN IMAGES WITH INPUTBOX
  inputDivContainer(imageCounter, textValue) {
    let $inputDivContainer = $('<div></div>');
    $inputDivContainer
      .addClass('input-group')
      .attr('id', 'inner-right-input-'+imageCounter)
      .css('width', '300px')
      .append(this.getInputBox(imageCounter, textValue))
      .append(this.getImage3(imageCounter))
      .append(this.getImage2(imageCounter));
    return $inputDivContainer;
  }

  //TEXT FOR ASSIGN TODO TO NEW EMPLOYEE
  innerRightBox(selectedOption, imageCounter) {
    let $innerRightBox = $('<div></div>');
    $innerRightBox
      .attr('id', 'inner-right-text-'+imageCounter)
      .addClass('inner-right-box')
      .text("add todos for "+selectedOption);
    return $innerRightBox;
  }

  //NAME OF EMPLOYEE ON LEFT HAND SIDE OF TODO
  innerLeft(selectedOption, employeeCount) {
    let $innerLeft = $('<div></div>');
    $innerLeft
      .addClass('inner-left')
      .attr('id', employeeCount)
      .css('width', '100px')
      .append(selectedOption);
    return $innerLeft;
  }

  //ALL CONTENT OF RIGHT SIDE TODO TABLE BESIDE EMPLOYEE NAME
  innerRight(selectedOption, imageCounter, textValue) {
    let $innerRight = $('<div></div>');
    $innerRight
      .addClass('inner-right')
      .append(this.innerRightBox(selectedOption, imageCounter))
      .append(this.inputDivContainer(imageCounter, textValue));

    let $innerRightContainer = $('<div></div>');
    $innerRightContainer
      .css('display', 'inline-block')
      .css('width', '410px')
      .addClass('inner-right')
      .addClass('my-inner-right')
      .append($innerRight)
      .append(this.getImage1(imageCounter));
    return $innerRightContainer;     
  }
}