import * as React from "react";
import {
  EffectCallback,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { ThemeContext } from "styled-components";
import { ITheme } from "../styling/ITheme";

export const useTheme = (): ITheme => {
  return useContext(ThemeContext);
};

export const useDidMount = (action: () => EffectCallback | void): void => {
  useEffect(action, []);
};

// thanks to https://github.com/streamich/react-use/blob/master/src/useToggle.ts
export const useFlag = (
  initialValue: boolean
): [boolean, (nextValue?: any) => void] => {
  const [flag, setFlag] = useState<boolean>(initialValue);

  const toggleFlag = useCallback(
    (nextValue?: any) => {
      if (typeof nextValue === "boolean") {
        setFlag(nextValue);
      } else {
        setFlag(currentValue => !currentValue);
      }
    },
    [setFlag]
  );

  return [flag, toggleFlag];
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

    return () =>
      document.removeEventListener("mousedown", handleDocumentClick, false);
  });
};
