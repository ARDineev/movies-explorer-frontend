import React from 'react';

function useValidation(value, validators) {

  const [isEmptyErr, setEmptyErr] = React.useState(false); // ошибка валидации "поле пустое"
  const [isMinLengthErr, setMinLengthErr] = React.useState(false); // ошибка валидации "длина поля менее допустимого значения"
  const [isMaxLengthErr, setMaxLengthErr] = React.useState(false); // ошибка валидации "длина поля более допустимого значения"
  const [isEmailErr, setEmailErr] = React.useState(false); // ошибка валидации "поле не соответствует форме email"
  const [isUserNameErr, setUserNameErr] = React.useState(false); // ошибка валидации "поле не соответствует форме username"
  const [inputValid, setInputValid] = React.useState(false); // отвечает за валидность всего инпута

  React.useEffect(() => {
    for (const validator in validators) {
      if (validator === 'isEmpty' && validators['isEmpty'] === true) {
        value ? setEmptyErr(false) : setEmptyErr(true);
      }
      if (validator === 'minLength') {
        value.length < validators['minLength'] ? setMinLengthErr(true) : setMinLengthErr(false);
      }
      if (validator === 'maxLength') {
        value.length > validators['maxLength'] ? setMaxLengthErr(true) : setMaxLengthErr(false);
      }
      if (validator === 'isEmail' && validators['isEmail'] === true) {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        re.test(value) ? setEmailErr(false) : setEmailErr(true);
      }
      if (validator === 'isUserName' && validators['isUserName'] === true) {
        const re = /^[а-яА-ЯёЁa-zA-Z-\s]+$/i;
        re.test(value) ? setUserNameErr(false) : setUserNameErr(true);
      }
    }
  }, [value]);
  
  React.useEffect(() => {
    if (isEmptyErr || isMinLengthErr || isMaxLengthErr || isEmailErr || isUserNameErr) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmptyErr, isMinLengthErr, isEmailErr, isMaxLengthErr, isUserNameErr]);

  return {
    isEmptyErr,
    isMinLengthErr,
    isMaxLengthErr,
    isEmailErr,
    isUserNameErr,
    inputValid,
    validators
  }
}

export default useValidation;
