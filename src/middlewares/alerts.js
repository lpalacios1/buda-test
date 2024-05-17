let alertSpreads = [];

const saveAlertSpread = (marketId, spread) => {
  const existingAlert = alertSpreads.find(alert => alert.marketId === marketId);
  if (existingAlert) {
    existingAlert.spread = spread;
  } else {
    alertSpreads.push({ marketId, spread });
  }
};

const getAlertSpread = (marketId) => {
  return alertSpreads.find(alert => alert.marketId === marketId);
};

module.exports = { saveAlertSpread, getAlertSpread };
