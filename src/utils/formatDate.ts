export const formatDate = (dateObject: Date) => {
  const year = dateObject.getFullYear()
  const month = dateObject.getMonth() + 1 // Months are zero-based
  const day = dateObject.getDate()

  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
  return formattedDate
}

export const getDeliveredDate = (dateObject: Date) => {
  // Add 7 days to the date
  dateObject.setDate(dateObject.getDate() + 7)

  return formatDate(dateObject)
}
