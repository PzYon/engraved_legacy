import * as React from "react";
import { useContext } from "react";
import { AuthenticatedServerApi } from "../authentication/AuthenticatedServerApi";
import { SelectField } from "../common/form/fields/select/SelectField";
import { ThemeContext } from "./ThemeContext";
import { ThemeStyle } from "./ThemeStyle";

export const ThemePicker = () => {
  const userSettingsContext = useContext(ThemeContext);

  return (
    <SelectField
      label={"Choose your theme"}
      options={themeOptions}
      defaultKey={userSettingsContext.themeStyle}
      value={userSettingsContext.themeStyle}
      onValueChange={(themeStyle: ThemeStyle) => {
        userSettingsContext.setThemeStyle(themeStyle);
        AuthenticatedServerApi.post("users/me/settings/themeStyle", {
          value: themeStyle
        }).subscribe();
      }}
      isReadOnly={false}
    />
  );
};

const themeOptions = [
  { label: "Light", value: ThemeStyle.Light },
  { label: "Dark", value: ThemeStyle.Dark },
  { label: "Random", value: ThemeStyle.Random }
];
