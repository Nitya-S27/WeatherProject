

module.exports.getDate = function() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const day = new Date();
    return day.toLocaleDateString("en-US", options);
  }
  