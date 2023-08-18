export const loadTheme = () => {
  try {
    const serializedState = localStorage.getItem('theme')

    if (serializedState === null) {
      return 'light'
    }

    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveTheme = (state: 'dark' | 'light') => {
  try {
    const serializedState = JSON.stringify(state)

    localStorage.setItem('theme', serializedState)
  } catch {
    // ignore write errors
  }
}