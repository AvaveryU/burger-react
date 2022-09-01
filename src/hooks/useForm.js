import { useState } from "react";
//кастомный хук для полей ввода
export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
