import moment from "moment";

export function setLocalStorage(responseObject) {
    const expires = moment().add(responseObject.expiresIn);
    localStorage.setItem("token", responseObject.token);
    localStorage.setItem("expires", JSON.stringify(expires.valueOf()));
}

export function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
    console.log("LOGGED OUT")
}

export function isLoggedIn() {
    return moment().isBefore(getExpiration());
}

export function getExpiration() {
    const expiration = localStorage.getItem("expires");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
}