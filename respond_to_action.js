const getResponseType = action => {
  switch (action.actionType) {
    case "LK":
    case "AL":
    case "UPLOAD":
    case "MONITOR":
    case "CENTER":
    case "SLAVE":
    case "PW":
    case "CALL":
    case "SMS":
    case "SOS":
    case "SOS1":
    case "SOS2":
    case "SOS3":
    case "UPGRADE":
    case "FACTORY":
    case "URL":
    case "LZ":
    case "SOSSMS":
    case "LOWBAT":
    case "APN":
    case "ANY":
    case "TS":
    case "RESET":
    case "REMOVE":
    case "PULSE":
    case "VERNO":
      return action.actionType;

    case "UD":
    case "UD2":
    case "IP":
      return "";

    case "CR":
    case "BT":
    case "WORK":
    case "WORKTIME":
    case "POWEROFF":
      return "RESET";

    case "WAD":
      return "RAD";
    case "WG":
      return "RG";

    default:
      return "ERROR";
  }
};

const getReponseHeader = (action, responseType) => {
  if (responseType === "") return {};
  else
    return {
      vendor: action.vendor,
      watchId: action.watchId,
      length: responseType.length,
      actionType: responseType
    };
};

module.exports = respondToAction = action => {
  const responseType = getResponseType(action);
  const responseHeader = getReponseHeader(action, responseType);

  return responseHeader;
};
