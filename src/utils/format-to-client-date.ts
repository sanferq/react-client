export const formatToClientDate = (date?: Date) => {
  if (!date) {
    return ""
  }

  const formattedDate = new Date(date).toLocaleString(undefined, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return formattedDate
}
