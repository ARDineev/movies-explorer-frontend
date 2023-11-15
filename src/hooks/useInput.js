import React from 'react';
import useValidation from './useValidation';

function useInput(initialValue, validators) {
  // кастомный хук для создания управляемого инпута с базовой функциональностью
  // опционально инпут можно провалидировать с помощью другого кастомного хука useValidation
  // хук принимает два параметра: начальное значение и объект с валидаторами (проверка на пустоту, на минимальную длину и т.д.)
  const [value, setValue] = React.useState(initialValue);
  // показывает, вышли из input или нет
  const [isDirty, setDirty] = React.useState(false); // инпут "испачкан", т.е. в нем побывали и покинули
  const valid = useValidation(value, validators);

  function onChange(e) {
    // обрабатывает изменения внутри input
    setValue(e.target.value);
  }

  function onBlur(e) {
    // срабатывает, когда пользователь покинул input (теряет фокус)
    setDirty(true);
  }
  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
};

export default useInput;
