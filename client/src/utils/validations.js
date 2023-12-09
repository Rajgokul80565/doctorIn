

const validateEmail = (email) => {
  debugger;
  let isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if(email && email?.match(isValidEmail)){
    return true;
  }else{
    return false;
  }
}

export {validateEmail};