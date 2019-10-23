import { EffectCallback, useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "styled-components";
import { ITheme } from "../styling/ITheme";

export const useTheme = (): ITheme => {
  return useContext(ThemeContext);
};

export const useDidMount = (action: () => EffectCallback | void): void => {
  useEffect(action, []);
};

export const useFlag = (defaultValue: boolean): [boolean, (value?: boolean) => void] => {
  const [flag, setFlag] = useState(defaultValue);
  const currentValue = useRef(flag);

  return [
    currentValue.current,
    (value?: boolean) => {
      currentValue.current = value !== undefined ? value : !currentValue.current;
      setFlag(currentValue.current);
    }
  ];
};
