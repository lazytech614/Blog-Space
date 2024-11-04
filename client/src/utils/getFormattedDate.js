const getFormattedDate = (dateString) => {
  const isoDate = dateString;
  const date = new Date(isoDate);

  // Get day, month, and year
  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "long" }); // Get full month name
  const year = date.getUTCFullYear();

  // Helper function to get ordinal suffix
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // 4-20 are all 'th'
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  return formattedDate;
};

export default getFormattedDate;
