const monthTitle = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
]

export const nameDate = (startDate: string | null, deadline: string | null) => {
  if (!!startDate && !!deadline) {
    const start = new Date(startDate)
    const end = new Date(deadline)

    const startDay = start.getDate().toString()
    const startMount = monthTitle[start.getMonth()]
    const deadlineDay = end.getDate().toString()
    const deadlineMount = monthTitle[end.getMonth()]

    return `${startMount} ${startDay} - ${deadlineMount} ${deadlineDay}`
  } else {
    return 'none date'
  }
}
