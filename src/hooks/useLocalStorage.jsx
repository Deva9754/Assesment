import { useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    let curr;
    const stringifiedValue = JSON.stringify(defaultValue);

    try {
      curr =
        JSON.parse(localStorage.getItem(key)) ||
        localStorage.setItem(stringifiedValue);
    } catch (error) {
      curr = defaultValue;
      localStorage.setItem(key, stringifiedValue);
    }
    return curr;
  });

  const setStateValue = (valueOrFunction) => {
    let newVal;
    if (typeof valueOrFunction === "function") {
      newVal = valueOrFunction(value);
    } else {
      newVal = valueOrFunction;
    }
    localStorage.setItem(key, JSON.stringify(newVal));
    setValue(newVal);
  };

  return [value, setStateValue];
};
