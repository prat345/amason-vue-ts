export const parseDateString = (dateString: string) => {
  // const dateString = "2024-01-29T22:32:42.431Z";
  const dateObject = new Date(dateString)

  const year = dateObject.getFullYear()
  const month = dateObject.getMonth() + 1 // Months are zero-based
  const day = dateObject.getDate()

  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
  return formattedDate
}
