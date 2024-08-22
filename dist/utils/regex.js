"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidate = void 0;
const checkValidate = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);
    return isValidEmail;
};
exports.checkValidate = checkValidate;
