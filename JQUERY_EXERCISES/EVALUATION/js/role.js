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
      
      //delete all associated data to employee on todos table
      $('.name-container').each(function() {
        if($(this).data('role_id') === roleId) {
          $(this).parent().remove();
        }
      });

      //delete all associated data to employee on roles, employee table and array
      $('.employees-in-role').each(function() {
        if($(this).data('id') === roleId) {
          let employeeName = $(this).text();
          roleArray.splice($.inArray(employeeName, roleArray),1);
          $(this).remove();
        }
      });
    }
  }
}
