/**
 * VALORES DEL CAMPO PROVINCIA
 * @param {*} province 
 */
const validateProvince = async (province) => {
  const validProvinces = [
    'pinar del río',
    'artemisa',
    'la habana',
    'mayabeque',
    'matanzas',
    'cienfuegos',
    'villa clara',
    'sancti spíritus',
    'ciego de ávila',
    'camagüey',
    'las tunas',
    'granma',
    'holguín',
    'santiago de cuba',
    'guantánamo',
    'isla de la juventud'
  ];
  if (!validProvinces.includes(province.toLowerCase())) {
    throw new Error('The province provided is invalid. Please provide one of the following provinces: ' + validProvinces.join(', '));
  }
};


/**
 * PARA CUANDO SE PUEDA O NO ENVIAR EL NAME --- SOLO QUE SI SE ENVIA QUE NO SEA UN STRING VACIO ----
 * @param {*} name 
 */
const NameNotEmpty = async (name) => {
  if (name === "" || name.length < 2) {
    throw new Error("The name or lastname are empty or less than two characters");
  }
};


//SI SE ENVIA EL EMAIL TIENE QUE SER VALIDO
const EmailNotEmpty = async (email) => {
  if (email && !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
    throw new Error("The email is invalid");
  }
};

/**
 * PARA CUANDO SE PUEDA O NO ENVIAR EL PHONE NUMBER 
 * @param {*} phone 
 */
const PhoneNumberValid = async (phone) => {
  if (phone === "" || phone.length !== 8) {
    throw new Error("The phone number must be exactly eight digits or more");
  }
  const regex = /^[0-9]+$/;
  if (!regex.test(phone)) {
    throw new Error("The phone number must only contain digits");
  }
};



//PARA VALIDAR EL GENERO
const GenderTipe = async (gender) => {
  if (gender !== "Femenino" && gender !== "Masculino") {
    throw new Error("The gender most be Femenino or Masculino");
  }
};

//PARA VALIDAR EL RATING
const validateRating = async (rating) => {
  const validRatings = ["Muy Bien", "Bien", "Regular", "Mal", "Muy Mal", ""];
  if (!validRatings.includes(rating)) {
    throw new Error("The rating must be one of the following: Muy Bien, Bien, Regular, Mal, Muy Mal");
  }
};


//PARA CUANDO SE PUEDA O NO ENVIAR EL PHONE NUMBER 
/* const whatUser = async (code) => {
  if (phone === "" || phone.length >= 8) {
    throw new Error("The phone number must be exactly eight digits or more");
  }  
  const regex = /^[0-9]+$/;
  if (!regex.test(phone)) {
    throw new Error("The phone number must only contain digits");
  }
}; */


module.exports = {
  NameNotEmpty,
  EmailNotEmpty,
  PhoneNumberValid,
  GenderTipe,
  validateRating,
  validateProvince
};
