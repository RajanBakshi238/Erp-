const moment = require("moment");

const millisecondsDiff = (date_1, date_2) => {
  let startDate = new moment(date_1);
  let endDate = new moment(date_2);
  let duration = moment.duration(endDate.diff(startDate));
  return duration.as("milliseconds");
};

module.exports = {
    millisecondsDiff
}
