import styled from 'styled-components'

export const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`

export const Label = styled.label<{ disabled: boolean }>`
  position: relative;
  display: inline-block;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  margin: 0.6em 1em;
`

export const Indicator = styled.div`
  width: 1.2em;
  height: 1.2em;
  background: #e6e6e6;
  position: absolute;
  top: 0;
  left: -1.6em;
  border: 1px solid #757575;
  border-radius: 0.2em;

  ${Input}:not(:disabled):checked & {
    background: #d1d1d1;
  }

  ${Label}:hover & {
    background: #ccc;
  }

  &::after {
    content: '';
    position: absolute;
    display: none;
  }

  ${Input}:checked + &::after {
    display: block;
    top: 0.1em;
    left: 0.35em;
    width: 25%;
    height: 50%;
    border: solid #263238;
    border-width: 0 0.2em 0.2em 0;
    opacity: 1;
    transform: rotate(45deg);
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

  :disabled {
    cursor: not-allowed;
  }
`
