"use strict";

class Validator {

  isEmpty(value) {
    if(value == null || value.trim() == '') {
      return true;
    }
    return false;
  }
}