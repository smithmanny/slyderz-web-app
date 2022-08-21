"use strict";
exports.id = 7575;
exports.ids = [7575];
exports.modules = {

/***/ 4935:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Al": () => (/* binding */ Signup),
/* harmony export */   "m3": () => (/* binding */ Login),
/* harmony export */   "oP": () => (/* binding */ ForgotPassword),
/* harmony export */   "tq": () => (/* binding */ ResetPassword)
/* harmony export */ });
/* unused harmony export ChangePassword */
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9926);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zod__WEBPACK_IMPORTED_MODULE_0__]);
zod__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const password = zod__WEBPACK_IMPORTED_MODULE_0__.string().min(6).max(100);
const Signup = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    email: zod__WEBPACK_IMPORTED_MODULE_0__.string().email(),
    firstName: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    lastName: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    password
});
const Login = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    email: zod__WEBPACK_IMPORTED_MODULE_0__.string().email(),
    password: zod__WEBPACK_IMPORTED_MODULE_0__.string()
});
const ForgotPassword = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    email: zod__WEBPACK_IMPORTED_MODULE_0__.string().email()
});
const ResetPassword = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    password: password,
    passwordConfirmation: password,
    token: zod__WEBPACK_IMPORTED_MODULE_0__.string()
}).refine((data)=>data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: [
        "passwordConfirmation"
    ]
});
const ChangePassword = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    currentPassword: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    newPassword: password
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6417:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var blitz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4405);
/* harmony import */ var blitz__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(blitz__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3524);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);


const EnhancedPrisma = (0,blitz__WEBPACK_IMPORTED_MODULE_0__.enhancePrisma)(_prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new EnhancedPrisma());


/***/ })

};
;