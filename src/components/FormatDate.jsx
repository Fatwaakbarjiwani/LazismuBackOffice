import moment from "moment";
import PropTypes from "prop-types";


const formatDateString = (dateString) => {
  return moment(dateString, "YYYYMMDDHHmmss").format("DD MMMM YYYY HH:mm:ss");
};

const DateFormatter = ({ dateString }) => {
  const formattedDate = formatDateString(dateString);
  return <div>{formattedDate}</div>;
};

DateFormatter.propTypes = {
  dateString: PropTypes.string,
};
export default DateFormatter;
