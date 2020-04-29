import jwt_decode from "jwt-decode";

export function getEmailFromLocalStorage() {
    return localStorage.getItem("email");
}

export function getRoleFromLocalStorage() {
    return localStorage.getItem("role");
}
