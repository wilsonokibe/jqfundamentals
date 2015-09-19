"use strict";

class Validator {

  //CHECKS FOR EMPTY INPUT
  isEmpty(value) {
    if(value == null || value.trim() == '') {
      alert(`You did not enter any value. \nPlease enter value.`);
      return true;
    }
    return false;
  }

  //CHECK DUPLICATE NAME  
  isDuplicate(value, arrayName) {
    let isExist = ($.inArray(value, arrayName));
    if(isExist >= 0) {
      alert(`"${value}" already exists.`);
      return true;
    } 
    arrayName.push(value);
    return false;
  }
}