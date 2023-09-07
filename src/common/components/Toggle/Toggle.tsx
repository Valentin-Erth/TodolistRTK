import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeSelector } from "app/app.selectors";
import React from "react";
import { Input, Slider, Switch } from "common/components/Toggle/styled";

type PropsType = {
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const Toggle = ({ onChange, checked }: PropsType) => {
   return (
    <Switch>
      <Input type={"checkbox"} checked={checked} onChange={onChange} />
      <Slider />
    </Switch>
  );
};