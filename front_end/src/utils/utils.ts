/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/prefer-default-export
/* eslint-disable no-unused-expressions */

import Moment from "moment";

export const capitalizeFirstLetter = (inputStr: string) =>
  inputStr.charAt(0).toUpperCase() + inputStr.slice(1).toLowerCase();

export const conditionalSelection = (
  check: any,
  value: any,
  replacemnet: any
) => (check ? value : replacemnet);
export const conditionalValue = (actual: any, replacement: any) =>
  actual || replacement;

export const isFunctionExist = (
  functionName: Function | undefined,
  argument: any
) => {
  if (functionName) {
    return functionName(argument);
  }
  return false;
};
export const DATE_FORMAT = "MM/DD/YYYY";
export const DATE_FORMAT_DATE_START = "DD/MM/YYYY";
export const DATE_FORMAT_YEARSTART = "YYYY/MM/DD";
export const DATE_PICKER_FORMAT = "MM/dd/yyyy";
export const TIME_FORMAT = "hh:mm A";
export const DATE_TIME_FORMAT = "MM/DD/YYYY hh:mm:ss A";
export const TIME_FORMAT_TWENTY_FOUR = "HH:mm";
export const STORAGE_KEY = "persistentState";

const MENU_WITH_ALL_ROLES = {
  show: true,
  role: ["ADMIN", "STAFF", "ONLINE_TEAM", "OFFLINE_TEAM"],
};
export const SESSION_TIMEOUT_TIME = 10000;
export const emailPattern = /\S+@\S+\.\S+/;
export const hasCapitalPattern = /[A-Z]/g;
export const hasNumberPattern = /\d/g;
export const hasSymbolPattern = /[#?!@$%^&*-]/g;
// A password containing at least 1 uppercase, 1 lowercase, 1 digit,
// 1 special character and have a length of at least of 8
export const hasPasswordValid =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=\S+$).{8,}$/;
export const hasValidName = /^[A-Za-z]+[A-Za-z ()!,.'-]{1,50}$/;
export const isAlphaNumeric = /^[A-Za-z0-9\s]{1,50}$/;
export const NumberWith2Decimal = /^(\d+)?(\.\d{0,2})?$/;

interface Exception {
  [key: string]: { pathName: string; includeSubpath: boolean }[];
}
interface AccessLevel {
  label: string;
  iconComponent?: string;
  secondIcon?: string | null;
  pathName: string;
  show?: boolean;
  role?: string[];
  // only the permission which is required to see the current menu option
  permissions?: string[];
  exception?: Exception;
}
export const ACCESS_LEVELS: AccessLevel[] = [
  {
    label: "Menu",
    iconComponent: "Menu",
    secondIcon: "ArrowBack",
    pathName: "",
    ...MENU_WITH_ALL_ROLES,
  },
  {
    label: "Dashboard",
    iconComponent: "Home",
    secondIcon: null,
    pathName: "/admin/dashboard",
    ...MENU_WITH_ALL_ROLES,
  },
];
export const WEBDESK = {
  deleteCookie: (cookieName: string) => {
    document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  },
  getCookie: (cookieName: string) => {
    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    // eslint-disable-next-line
    for (const i of ca) {
      let c = i;
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  setSessionCookie: (cookieName: string, cookieValue: string) => {
    // session cookie will end when browser is closed don't add any expiration time in this one
    document.cookie = `${cookieName}=${cookieValue};path=/`;
  },
};
const hasException = (pathsArray: any, pathName: string) =>
  pathsArray.find((exception: any) => {
    if (!exception.includeSubpath) {
      if (pathName.endsWith("/")) {
        return (
          exception.pathName !== "" &&
          pathName.endsWith(`${exception.pathName}/`)
        );
      }
      return exception.pathName !== "" && pathName.endsWith(exception.pathName);
    }
    return exception.pathName !== "" && pathName.includes(exception.pathName);
  });

export const grantAuthorization = (
  userRole: string,
  pathName: string,
  permission: string[]
) => {
  let hasPermission = true;
  const requestedPage = ACCESS_LEVELS.find(
    (page: AccessLevel) =>
      page.pathName !== "" && pathName.includes(page.pathName)
  );

  if (requestedPage?.permissions) {
    hasPermission = requestedPage?.permissions.every((elem) =>
      permission.includes(elem)
    );
  }

  if (
    hasPermission &&
    requestedPage?.exception &&
    requestedPage.exception[userRole]
  ) {
    const hasAccess = hasException(requestedPage.exception[userRole], pathName);
    return hasAccess?.pathName;
  }

  if (!hasPermission) {
    return hasPermission;
  }
  return requestedPage?.role?.includes(userRole) || pathName === "";
};

export const hasPermission = (userPermissions: string[], permission: string) =>
  userPermissions.includes(permission);

export const getRoleId = (accessRole: string | undefined) => {
  switch (accessRole) {
    case "Admin":
      return 1;
    case "Staff":
      return 2;
    case "Online Team":
      return 3;
    case "Offline Team":
      return 4;
    default:
      return null;
  }
};

export const parseAccessLevel = (accessLevel: any) => {
  switch (accessLevel) {
    case "ADMIN":
    case "Admin":
    case 1:
      return "Admin";

    case "STAFF":
    case 2:
      return "Staff";

    case "ONLINE_TEAM":
    case 3:
      return "Online Team";

    case "OFFLINE_TEAM":
    case 4:
      return "Offline Team";

    default:
      return "";
  }
};

export const parseRoleId = (roleId: any) => {
  switch (roleId) {
    case 1:
      return "ADMIN";
    case 2:
      return "STAFF";
    case 3:
      return "ONLINE_TEAM";
    case 4:
      return "OFFLINE_TEAM";
    default:
      return "";
  }
};

export const phoneFormat = (input: number | string) => {
  let phone = input;
  if (!phone) return "";
  if (typeof phone !== "string") phone = phone.toString();
  if (phone.length === 10) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }
  return phone;
};

export const getIsoFormat = (time: string) =>
  new Date(`${Moment().format(DATE_FORMAT)} ${time}`).toISOString();
export const getTimeFromIso = (time: string) =>
  Moment(time).format(TIME_FORMAT);

export const modifyDateRange = (
  value: any,
  setValue: any,
  watch: any,
  callback?: any,
  startDate: string = "startDate",
  endDate: string = "endDate"
) => {
  setValue(startDate, value);
  if (Moment(watch(startDate)) > Moment(watch(endDate))) {
    setValue(endDate, value);
  }
  callback && callback(value);
};

export const allowOnlyNumbers = (event: any) => {
  if (!/^\d+$/.test(event.key)) {
    event.preventDefault();
  }
};

export const allowNumbersWithDecimal = (event: any) => {
  if (!/^\d{0,5}(?:\.\d{0,2})?$/.test(event.key)) {
    event.preventDefault();
  }
};

export const fixTo6DecimalWithoutRounding = (x: number | string) => {
  let result = x;
  const regEx = /^-?\d+(?:\.\d{0,6})?/;
  const match = x.toString().match(new RegExp(regEx));
  if (match?.length) {
    result = Number(match[0]);
  }
  return result;
};

export const convertTime24to12 = (time24h: string) => {
  if (/^\d{2}:\d{2}\s[AP]M$/.test(time24h)) {
    return time24h;
  }
  const hms = time24h.split(":") as string[];
  const h = +hms[0];
  const suffix = h < 12 ? " AM" : " PM";
  const h12 = (h % 12 || 12).toString();
  hms[0] = h12.length < 2 ? `0${h12}` : h12;
  return hms.join(":") + suffix;
};

export const convertTime12to24 = (time12h: string) => {
  if (/^\d{2}:\d{2}$/.test(time12h)) {
    return time12h;
  }
  const [time, modifier] = time12h.split(" ");
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(":");
  let hours24 = hours;
  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "PM") {
    hours = (parseInt(hours, 10) + 12).toString();
    hours24 = hours.length < 2 ? `0${hours}` : hours;
  }
  return `${hours24}:${minutes}`;
};

export const checkArray = (array: any) => {
  if (array) {
    return array;
  }
  return [];
};

export const getLatestDate = (date: any) =>
  Moment(date) > Moment(Moment(new Date()).format(DATE_FORMAT))
    ? Moment(Moment(new Date(date)).format(DATE_FORMAT)).toDate()
    : Moment(Moment(new Date()).format(DATE_FORMAT)).toDate();

export const Programoptions = [
  {
    id: 1,
    name: "BACHELOR OF ENGINEERING",
  },
];

export const accountType = [
  {
    id: 1,
    name: "Current account",
  },
  {
    id: 2,
    name: "Savings account",
  },
];
export const monthOptions = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
export const yearOptions = [
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
];

export const previousDocumentsOptions = ["SSC", "HSC", "Diploma"];

export const entranceExamsTypesOptions = ["AIEE", "JEE", "MHT-CET"];
