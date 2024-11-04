const getFormattedDate = (dateString) => {
  const isoDate = dateString;
  const date = new Date(isoDate);

  // Convert to Indian Standard Time (IST)
  const options = {
    timeZone: "Asia/Kolkata", // Set time zone to IST
    day: "2-digit", // Get day in two-digit format
    month: "2-digit", // Get month in two-digit format
    year: "numeric", // Get full year
  };

  // Use toLocaleString to format the date according to IST
  const formattedDateParts = date.toLocaleString("en-IN", options).split("/");

  // Ensure correct format as dd-mm-yyyy
  const formattedDate = `${formattedDateParts[0]}-${formattedDateParts[1]}-${formattedDateParts[2]}`;

  return formattedDate;
};

export default getFormattedDate;
