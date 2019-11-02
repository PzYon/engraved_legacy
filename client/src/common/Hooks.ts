import * as React from "react";
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
      currentValue.current = value === true || value === false ? value : !currentValue.current;
      setFlag(currentValue.current);
    }
  ];
};

export const useOnClickOutside = (
  container: React.RefObject<HTMLElement>,
  onClickOutside: () => void
) => {
  useDidMount(() => {
    const handleDocumentClick = (e: any): void => {
      if (container.current && !container.current.contains(e.target)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleDocumentClick, false);

    return () => document.removeEventListener("mousedown", handleDocumentClick, false);
  });
};
