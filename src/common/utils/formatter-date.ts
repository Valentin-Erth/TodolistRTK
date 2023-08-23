export const formatterDate = (date: any) => {
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const mount = newDate.getMonth().toString().padStart(2, '0')
  const day = newDate.getDate().toString().padStart(2, '0')

  return `${year}-${mount}-${day}`
}
