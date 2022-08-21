"use strict";
exports.id = 4877;
exports.ids = [4877];
exports.modules = {

/***/ 2647:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ authConfig),
/* harmony export */   "p": () => (/* binding */ withBlitz)
/* harmony export */ });
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7897);
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _blitzjs_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1990);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5481);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__);



const authConfig = {
    cookiePrefix: "blitz-cookie-prefix"
};
const { withBlitz  } = (0,_blitzjs_next__WEBPACK_IMPORTED_MODULE_2__/* .setupBlitzClient */ .qd)({
    plugins: [
        (0,_blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__.AuthClientPlugin)(authConfig),
        (0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__.BlitzRpcPlugin)({}), 
    ]
});


/***/ }),

/***/ 9057:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "t2": () => (/* binding */ gSSP)
/* harmony export */ });
/* unused harmony exports gSP, api */
/* harmony import */ var _blitzjs_next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1990);
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7897);
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6417);
/* harmony import */ var _blitz_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2647);





const { gSSP , gSP , api  } = (0,_blitzjs_next__WEBPACK_IMPORTED_MODULE_3__/* .setupBlitzServer */ .te)({
    plugins: [
        (0,_blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__.AuthServerPlugin)({
            ..._blitz_client__WEBPACK_IMPORTED_MODULE_2__/* .authConfig */ .a,
            storage: (0,_blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__.PrismaStorage)(db__WEBPACK_IMPORTED_MODULE_1__["default"]),
            isAuthorized: _blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__.simpleRolesIsAuthorized
        }), 
    ]
});


/***/ }),

/***/ 672:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ readableDate)
/* harmony export */ });
/* unused harmony export transfromDateToReadableTime */
const transfromDateToReadableTime = (date)=>{
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    });
};
const readableDate = (date)=>{
    return date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};


/***/ })

};
;