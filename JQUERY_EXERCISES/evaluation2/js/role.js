"use strict";

class Roles {

  //GET NEW ROLE'S NAME
  getNewRole() {
    let value = $('#new-role-input').val();
    return value;
  }

  //APPEND NEW ROLE TO ROLE TABLE
  addNewRole(value, id) {
    let $element = $('<div></div>');
    $element
      .attr('id', 'role_' + id)
      .attr('role-data-id', id)
      .addClass('roles-table')
      .text(value);
    $('#left').append($element);    
    this.clearAndFocusOnRoleInput();
    this.addRoleInTodo(value, id);
  }

  clearAndFocusOnRoleInput() {    
    $('#new-role-input').focus().val('');
  }

  //ADD ROLE ON TODO TABLE
  addRoleInTodo(value, id) {
    let $element = $('<div></div>');
    let $nextContent = $('<div></div>');
    let $divv = $('<div></div>');
    $divv
      .addClass('role-in-todo')

    $element
      .attr('id', 'todo-role_' + id)
      .attr('todo-role-data-id', id)
      .addClass('tabulate')
      .addClass('role-todo')
      .append(value)
      .append(this.showImage(id));
    $divv.append($element);
    $nextContent
      .attr('next-todo-role-data-id', 'next-todo-role_' +id)
      .attr('id', 'next-'+id)
      .addClass('next-role-todo-container')
      .addClass('tabulate');
    $divv.append($nextContent);
    $('#right').append($divv);
  }

  showImage(id) {    
    let $image = $('<div></div>');
    $image
      .addClass('show-image')
      .attr('id', id)
      .append('<img id="show_'+ id + '" src="images/add-icon.png" height="20px" width="20px">');
      return $image;
  }

  //TOGGLE TODO 
  toggleVisibility1() {
    $('.next-role-todo-container').slideToggle('slow');
    $('.role-todo').slideToggle('slow');
  }

  //TOGGLE ROLE IN TODO
  toggleVisibility2(mythis){    
    let id = mythis.attr('id');
    $('#next-'+id).slideToggle('slow');
  }
}