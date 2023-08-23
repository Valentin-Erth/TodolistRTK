import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeSelector } from "app/app.selectors";
import React from "react";
import { Input, Slider, Switch } from "components/Toggle/styled";

type PropsType = {
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const Toggle = ({ onChange, checked }: PropsType) => {
  const theme = useSelector(themeSelector);
  const dispatch = useDispatch<any>();

  return (
    <Switch>
      <Input type={"checkbox"} checked={checked} onChange={onChange} />
      <Slider />
    </Switch>
  );
};