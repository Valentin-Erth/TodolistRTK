import styled, { keyframes } from 'styled-components'

const animloader = keyframes`
  0% {
    left: 0;
    transform: translateX(-100%);
  }
  100% {
    left: 100%;
    transform: translateX(0%);
  }
`

export const LinerProgress = styled.div`
  width: 100%;
  height: 4.8px;
  display: inline-block;
  position: absolute;
  background: rgba(255, 255, 255, 0);
  overflow: hidden;

  ::after {
    content: '';
    width: 400px;
    height: 4px;
    background: tomato;
    position: absolute;
    border-radius: 25px;
    top: 0;
    left: 0;
    box-sizing: border-box;
    animation: ${animloader} 2s linear infinite;
  }
`
