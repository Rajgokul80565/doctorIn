

const validateEmail = (email) => {
  debugger;
  let isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if(email && email?.match(isValidEmail)){
    return true;
  }else{
    return false;
  }
}

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}

export {validateEmail, convertToBase64};