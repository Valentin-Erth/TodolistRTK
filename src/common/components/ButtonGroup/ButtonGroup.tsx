import { Input, Label, Wrapper } from "common/components/ButtonGroup/styled";
import { TaskPriorities } from "features/Tasks/api/tasks.types";
import React from "react";

type PropsType = {
  value: TaskPriorities
  onChange: (value: TaskPriorities) => void
}

export const ButtonGroup = ({ value, onChange }: PropsType) => {
  return (
    <Wrapper>
      <Input
        type={'radio'}
        id={'my'}
        name={'radio'}
        value={TaskPriorities.Low}
        checked={value === TaskPriorities.Low}
        onChange={() => onChange(TaskPriorities.Low)}
      />
      <Label htmlFor={'my'}>Low</Label>
      <Input
        type={'radio'}
        id={'my1'}
        value={TaskPriorities.Medium}
        checked={value === TaskPriorities.Medium}
        onChange={() => onChange(TaskPriorities.Medium)}
      />
      <Label htmlFor={'my1'}>Medium</Label>
      <Input
        type={'radio'}
        id={'my2'}
        value={TaskPriorities.High}
        checked={value === TaskPriorities.High}
        onChange={() => onChange(TaskPriorities.High)}
      />
      <Label htmlFor={'my2'}>High</Label>
    </Wrapper>
  )
}
