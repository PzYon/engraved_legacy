import { EffectCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import { ITheme } from "../styling/ITheme";

export const useTheme = (): ITheme => {
  return useContext(ThemeContext);
};

export const useDidMount = (action: () => EffectCallback | void): void => {
  useEffect(() => {
    return action();
  }, []);
};

export const useFlag = (defaultValue: boolean): [boolean, (forceValue?: boolean) => void] => {
  const [flag, setFlag] = useState(defaultValue);
  return [
    flag,
    (forceValue?: boolean) =>
      setFlag(forceValue === true || forceValue === false ? forceValue : !flag)
  ];
};
