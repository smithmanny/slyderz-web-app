"use strict";
exports.id = 3901;
exports.ids = [3901];
exports.modules = {

/***/ 3901:
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


const GetSection = zod__WEBPACK_IMPORTED_MODULE_1__.object({
    id: zod__WEBPACK_IMPORTED_MODULE_1__.number()
});
const __internal_rpcHandler = async function destroySection(input, ctx) {
    // Validate input - very important for security
    const data = GetSection.parse(input);
    // Require user to be logged in
    ctx.session.$authorize();
    const section = await db__WEBPACK_IMPORTED_MODULE_0__["default"].section["delete"]({
        where: {
            id: data.id
        }
    });
    return section;
};
__internal_rpcHandler._resolverName = "destroySectionMutation";
__internal_rpcHandler._resolverType = "mutation";
__internal_rpcHandler._routePath = "/api/rpc/destroySectionMutation";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;