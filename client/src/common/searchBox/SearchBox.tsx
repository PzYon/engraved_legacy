import { IKeyword } from "engraved-shared";
import * as React from "react";
import { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";
import { useDidMount, useOnClickOutside } from "../Hooks";
import { If } from "../If";
import { DropDown } from "./dropDown/DropDown";
import { IDropDownItemGroup } from "./dropDown/IDropDownItemGroup";
import { SelectedKeywords } from "./SelectedKeywords";

const ContainerDiv = styled.div`
  position: relative;
  width: 100%;
`;

const InnerContainerDiv = styled.div<{
  isHighlight: boolean;
}>`
  background-color: ${p => p.theme.colors.palette.shades.light};
  border: 1px solid ${p => p.theme.colors.border};
  overflow: hidden;
  ${p => (p.isHighlight ? `box-shadow: ${p.theme.defaultBoxShadow};` : "")};
`;

const Input = styled.input`
  box-sizing: border-box;
  height: 42px;
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  margin-bottom: 0 !important;
  padding: ${p => p.theme.formElementPadding};
  border: 0 !important;
  border-top: 1px solid ${p => p.theme.colors.border} !important;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${p => p.theme.colors.palette.shades.dark};
  }
`;

export const SearchBox = (props: {
  selectedKeywords: IKeyword[];
  onKeywordSelect: (keyword: IKeyword) => void;
  dropDownItemGroups: IDropDownItemGroup[];
  onChange: (value: string) => void;
  searchValue: string;
  placeholder?: string;
  giveFocusOnLoad?: boolean;
}) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [hidePlaceholder, setHidePlaceHolder] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(containerRef, () => setShowDropDown(false));

  useDidMount(() => {
    if (props.giveFocusOnLoad) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  });

  return (
    <ContainerDiv ref={containerRef}>
      <InnerContainerDiv isHighlight={hasFocus} className={"search-box-inner"}>
        <SelectedKeywords
          selectedKeywords={props.selectedKeywords}
          onKeywordSelect={props.onKeywordSelect}
        />
        <Input
          type="text"
          value={props.searchValue}
          ref={inputRef}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            props.onChange(e.target.value);
            setShowDropDown(true);
          }}
          onFocus={() => {
            setShowDropDown(true);
            setHidePlaceHolder(true);
            setHasFocus(true);
          }}
          onBlur={() => setHasFocus(false)}
          placeholder={hidePlaceholder ? "" : props.placeholder}
        />
      </InnerContainerDiv>
      <If
        value={showDropDown}
        render={() => (
          <DropDown
            groups={props.dropDownItemGroups}
            onClose={() => setShowDropDown(false)}
          />
        )}
      />
    </ContainerDiv>
  );
};
