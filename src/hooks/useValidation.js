import React from 'react';

function useValidation(value, validators) {

  const [isEmptyErr, setEmptyErr] = React.useState(false); // ошибка валидации "поле пустое"
  const [isMinLengthErr, setMinLengthErr] = React.useState(false); // ошибка валидации "длина поля менее допустимого значения"
  const [isEmailErr, setEmailErr] = React.useState(false); // ошибка валидации "поле не соответствует форме email"
  const [inputValid, setInputValid] = React.useState(false); // отвечает за валидность всего инпута

  React.useEffect(() => {
    for (const validator in validators) {
      if (validator === 'isEmpty' && validators['isEmpty'] === true) {
        value ? setEmptyErr(false) : setEmptyErr(true);
      }
      if (validator === 'minLength') {
        value.length < validators['minLength'] ? setMinLengthErr(true) : setMinLengthErr(false);
      }
      if (validator === 'isEmail') {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        re.test(String(value).toLowerCase()) ? setEmailErr(true) : setEmailErr(false);
      }
    }
  }, [value]);

  React.useEffect(() => {
    if (isEmptyErr || isMinLengthErr || isEmailErr) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmptyErr, isMinLengthErr, isEmailErr]);

  return {
    isEmptyErr,
    isMinLengthErr,
    isEmailErr,
    inputValid,
  }
}

export default useValidation;
