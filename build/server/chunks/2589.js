"use strict";
exports.id = 2589;
exports.ids = [2589];
exports.modules = {

/***/ 2589:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const __internal_rpcHandler = async function logout(_, ctx) {
    return await ctx.session.$revoke();
};
__internal_rpcHandler._resolverName = "logout";
__internal_rpcHandler._resolverType = "mutation";
__internal_rpcHandler._routePath = "/api/rpc/logout";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);


/***/ })

};
;