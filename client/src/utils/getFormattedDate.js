const getFormattedDate = (dateString) => {
  const isoDate = dateString;
  const date = new Date(isoDate);

  // Convert to Indian Standard Time (IST)
  const options = {
    timeZone: "Asia/Kolkata", // Set time zone to IST
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  // Format the date according to IST
  const formattedDate = date.toLocaleString("en-IN", options);

  // Split formatted date into parts
  const [day, month, year] = formattedDate.split(" ");

  // Helper function to get ordinal suffix
  const getOrdinalSuffix = (day) => {
    const dayNum = parseInt(day, 10); // Parse day to an integer
    if (dayNum > 3 && dayNum < 21) return "th"; // 4-20 are all 'th'
    switch (dayNum % 10) {
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

  const formattedWithSuffix = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  return formattedWithSuffix;
};

export default getFormattedDate;
