import { ChangeEvent } from 'react'


import { formatterDate } from 'common/utils/formatter-date'
import { InputDate } from "components/DataPicker/styled";
import React from 'react';

type PropsType = {
  onChange: (date: string) => void
}

export const DataPicker = ({ onChange }: PropsType) => {
  const handlerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(formatterDate(e.target.value))
  }

  return <InputDate type="date" onChange={handlerOnChange} />
}
