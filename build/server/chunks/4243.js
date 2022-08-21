"use strict";
exports.id = 4243;
exports.ids = [4243];
exports.modules = {

/***/ 4243:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "hi": () => (/* binding */ api)
});

// UNUSED EXPORTS: gSP, gSSP

// EXTERNAL MODULE: ./node_modules/@blitzjs/next/dist/index-server.cjs
var index_server = __webpack_require__(3407);
// EXTERNAL MODULE: external "@blitzjs/auth"
var auth_ = __webpack_require__(7897);
// EXTERNAL MODULE: ./db/index.ts
var db = __webpack_require__(3747);
// EXTERNAL MODULE: external "@blitzjs/rpc"
var rpc_ = __webpack_require__(5481);
;// CONCATENATED MODULE: ./app/blitz-client.ts



const authConfig = {
    cookiePrefix: "blitz-cookie-prefix"
};
const { withBlitz  } = (0,index_server/* setupBlitzClient */.qd)({
    plugins: [
        (0,auth_.AuthClientPlugin)(authConfig),
        (0,rpc_.BlitzRpcPlugin)({}), 
    ]
});

;// CONCATENATED MODULE: ./app/blitz-server.ts





const { gSSP , gSP , api  } = (0,index_server/* setupBlitzServer */.te)({
    plugins: [
        (0,auth_.AuthServerPlugin)({
            ...authConfig,
            storage: (0,auth_.PrismaStorage)(db["default"]),
            isAuthorized: auth_.simpleRolesIsAuthorized
        }), 
    ]
});


/***/ }),

/***/ 3747:
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