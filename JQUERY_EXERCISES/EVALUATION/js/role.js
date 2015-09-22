"use strict";

class Roles {

  addNewRole(value, rolesCount) {
    let roleId = 'role_' + rolesCount;
    let $newRoleDiv = $('<div></div>', {"data-id": roleId, "data-value": rolesCount});
    $newRoleDiv
      .addClass('border-top')
      .addClass('roles')
      .text(value);

    $('#roles').append($newRoleDiv);
  }

  deleteEmployeeAndAssociatedData(roleId, roleArray) {
    let confirmDelete = confirm(`All data associated with this employee will be lost.\nDo you want to proceed?`);
    if(confirmDelete) {
     
      let employeeName = $('.employees-in-role [id = ' + roleId + ']').text();
      roleArray.splice($.inArray(employeeName, roleArray),1);

      //remove from todo list
      $('#todos [data-id = ' + roleId + ']').parent().remove();
     
      //remove employee from role
      $('#roles [id = ' + roleId + ']').remove();
    }
  }
}
