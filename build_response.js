module.exports = action => {
  const header = {
    vendor: action.vendor,
    watchId: action.watchId,
    actionType: action.actionType
  };

  switch (action.actionType) {
    case "AL":
    case "LK":
      return header;
    case "WAD":
      return {
        ...header,
        actionType: "RAD",
        payload: {}
      };
    case "WG":
      return {
        ...header,
        actionType: "RG",
        payload: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        }
      };
  }
};
