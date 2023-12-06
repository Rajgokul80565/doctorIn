const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const validateEmail = (email) => {
  if(email?.value && email?.match(isValidEmail)){
    return true;
  }else{
    return false;
  }
}

export {validateEmail};