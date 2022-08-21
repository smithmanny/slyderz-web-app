"use strict";
exports.id = 6252;
exports.ids = [6252];
exports.modules = {

/***/ 6252:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3747);

const __internal_rpcHandler = async function getCurrentUser(_ = null, { session  }) {
    if (!session.userId) return null;
    const user = await db__WEBPACK_IMPORTED_MODULE_0__["default"].user.findFirst({
        where: {
            id: session.userId
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true
        }
    });
    return user;
};
__internal_rpcHandler._resolverName = "getCurrentUser";
__internal_rpcHandler._resolverType = "query";
__internal_rpcHandler._routePath = "/api/rpc/getCurrentUser";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);


/***/ })

};
;