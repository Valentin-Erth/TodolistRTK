import { ITheme } from 'interfaces/styled'
export const baseTheme: ITheme = {
  colors: {
    primary: '#796EFF',
    secondary: '#14AAF5',
    warning: '#FF9C02',
    success: '#4caf50',
    danger: '#f44336',

    bg: {
      primary: '#fff',
      secondary: '#f4f4f4',
      active: '#EBEBEB',
    },
    font: {
      primary: '#000',
      secondary: '#d3d3d3',
    },
  },
}

export const lightTheme: ITheme = {
  ...baseTheme,

  colors: {
    ...baseTheme.colors,
    bg: {
      primary: '#fff',
      secondary: '#f4f4f4',
      active: '#EBEBEB',
    },
    font: {
      primary: '#000',
      secondary: '#d3d3d3',
    },
  },
}

export const darkTheme: ITheme = {
  ...baseTheme,

  colors: {
    ...baseTheme.colors,
    bg: {
      primary: '#2B2A33',
      secondary: '#42414D',
      active: '#1C1B22',
    },
    font: {
      primary: '#fff',
      secondary: '#d3d3d3',
    },
  },
}