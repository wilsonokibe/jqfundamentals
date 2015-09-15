"use strict";

class Validator {

  //CHECK FOR EMPTY INPUT
  isEmpty(value, nameArray) {
    if(value == null || value.trim() == '') {
      return true;
    } else if(this.checkDuplicateName(value, nameArray)) {
      return true;
    }
    nameArray.push(value);
    return false;
  }

  //CHECK DUPLICATE NAME  
  checkDuplicateName(userName, nameArray) {
    let isExist = ($.inArray(userName, nameArray));
    if(isExist >= 0) {
      alert(`"${userName}" already exists.`);
      return true;
    } 
    return false;
  }
}