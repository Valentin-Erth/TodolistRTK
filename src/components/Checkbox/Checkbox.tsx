import { ChangeEvent, memo } from 'react'
import { Indicator, Input, Label } from "components/Checkbox/style";
import React from 'react';



type PropsType = {
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  id: string
  disabled: boolean
}

export const Checkbox = ({ checked, onChange, id, disabled }: PropsType) => {
  return (
    <Label htmlFor={id} disabled={disabled}>
      <Input
        id={id}
        type="checkbox"
        name={'check'}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <Indicator />
    </Label>
  )
}
