import { USER } from "../const";

let parse = JSON.parse(localStorage.getItem(USER))?.role;
let parseId = JSON.parse(localStorage.getItem(USER))?._id;

export const ROLE = parse;
export const USER_ID = parseId;


// import Cookies from "js-cookie";
// import { TOKEN, USER } from "../const";

// export function getToken() {
//   return Cookies.get(TOKEN);
// }

// export function getUser() {
//   const userCookie = Cookies.get(USER);
//   return userCookie ? JSON.parse(userCookie) : null;
// }

// export function isAuthorized(user) {
//   return user && user.role == "admin";
// }