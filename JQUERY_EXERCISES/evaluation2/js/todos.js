"use strict";

class Todos {

  //APPEND INPUTED VALUE TO DOM
  assignTask(dataId, taskCounter) {
    let inputedValue = $('#data_' + dataId).val();
    $('#inner-right-input-' + dataId).hide();
    let $task = $('<div></div>');
    $task
      .addClass('task-' + dataId)
      .attr('task-data-id', dataId)
      .attr('id', 'task-counter_'+taskCounter)
      .append(this.addDivToInputValue(inputedValue, taskCounter))
      .append(this.deleteImage(dataId, taskCounter))
      .append(this.editImage(dataId, taskCounter));
    $task
      .insertBefore($('#inner-right-text-'+dataId))
  }

  //APPEND INPUT VALUE TO DIV
  addDivToInputValue(inputedValue, taskCounter) {
    let $input = $('<div></div>');
    $input
      .attr('id', 'input_' + taskCounter)
      .append(inputedValue);
      return $input;
  }

  deleteImage(imageCounter, taskCounter) {
    let $taskImage1 = $('<div></div>');  
    $taskImage1
      .addClass('edit-delete')
      .attr('id', 2)
      .attr('task-counter', taskCounter)
      .attr('delete-image-id', imageCounter)
      .append('<img class="img1" task-counter="'+taskCounter+'" data-id="'+ imageCounter + '" id="2" src="images/delete.png" height="20px" width="20px">');
    return $taskImage1;
  }

  editImage(imageCounter, taskCounter) {
    let $taskImage2 = $('<div></div>');  
    $taskImage2
      .addClass('edit-delete')
      .attr('id', 1)
      .attr('task-counter', taskCounter)
      .attr('edit-image-id', imageCounter)
      .append('<img class="img1" task-counter="'+taskCounter+'" data-id="'+ imageCounter + '" id="1" src="images/edit.png" height="20px" width="20px">');
    return $taskImage2;
  }
}