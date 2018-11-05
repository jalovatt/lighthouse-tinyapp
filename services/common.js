// Misc. controller

exports.generateIDString = function() {

  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV0123456789";
  const range = chars.length;

  const out = [];
  for (let i = 0; i < 6; i++) {
    const idx = Math.floor(Math.random() * range);
    out.push(chars[idx]);
  }

  return out.join("");

};


// Returns a given Date in the form "02 Feb 2018"
exports.formatDate = function(d) {

  return d.toLocaleDateString(
    "en-us",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

};


// Returns a given Date's time in the form "1:49 AM MDT"
// Localization is hardcoded to 'en-us', Mountain time
exports.formatTime = function(d) {

  return d.toLocaleTimeString(
    "en-us",
    {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short"
    });

};