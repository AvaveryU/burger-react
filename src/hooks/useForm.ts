import { ChangeEvent, useState } from "react";

interface IValuesInputForm {
  [name: string]: string;
}

//кастомный хук для полей ввода
export function useForm(inputValues: IValuesInputForm) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
