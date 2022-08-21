"use strict";
exports.id = 3295;
exports.ids = [3295];
exports.modules = {

/***/ 3295:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5481);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__);

const __internal_rpcHandler = _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.resolver.pipe(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.resolver.authorize(), async (input, ctx)=>{
    return await ctx.session.$setPublicData({
        cart: {
            pendingCartItems: [],
            total: 0
        }
    });
});
__internal_rpcHandler._resolverName = "resetCartItemsMutation";
__internal_rpcHandler._resolverType = "mutation";
__internal_rpcHandler._routePath = "/api/rpc/resetCartItemsMutation";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);


/***/ })

};
;