"use strict";
exports.id = 8898;
exports.ids = [8898];
exports.modules = {

/***/ 8898:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3747);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9926);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zod__WEBPACK_IMPORTED_MODULE_1__]);
zod__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const GetOrder = zod__WEBPACK_IMPORTED_MODULE_1__.object({
    confirmationNumber: zod__WEBPACK_IMPORTED_MODULE_1__.string()
});
const __internal_rpcHandler = async function getOrderByConfirmation(input, ctx) {
    const data = GetOrder.parse(input);
    // Require user to be logged in
    ctx.session.$authorize();
    const userId = ctx.session.userId;
    const query = await db__WEBPACK_IMPORTED_MODULE_0__["default"].order.findFirst({
        where: {
            userId,
            confirmationNumber: data.confirmationNumber
        }
    });
    return query;
};
__internal_rpcHandler._resolverName = "getOrderByConfirmation";
__internal_rpcHandler._resolverType = "query";
__internal_rpcHandler._routePath = "/api/rpc/getOrderByConfirmation";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;