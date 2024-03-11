

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
function convertToUTC(dateString) {
  // Create a Date object from the input date string
  const date = new Date(dateString);

  const utcTime = date.getTime() - (date.getTimezoneOffset() * 60000);
  const utcDate = new Date(utcTime);
  
  // Get the UTC string representation of the date
  const utcString = utcDate.toUTCString();
  
  return utcString;
}

function convertUTCtoLocal(utcDateString) {
  // Create a new Date object from the UTC string
  var utcDate = new Date(utcDateString);

  // Convert UTC date to local date
  var localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);

  // Return local date string
  return localDate.toLocaleString();
}


const isBase64 = (baseString) => {
  const base64Regex = /^data:image\/([a-zA-Z]*);base64,([^\"]*)$/;
  return base64Regex.test(baseString);
}

function formatDate(dateString) {
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

export {validateEmail, convertToBase64, isBase64, convertToUTC, convertUTCtoLocal,formatDate };