"use strict";
exports.id = 385;
exports.ids = [385];
exports.modules = {

/***/ 385:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3747);

const __internal_rpcHandler = async function getChefHoursQuery(input, ctx) {
    // Require user to be logged in
    const userId = ctx.session.userId;
    ctx.session.$authorize();
    if (!userId) {
        throw new Error("Can't find user");
    }
    const query = await db__WEBPACK_IMPORTED_MODULE_0__["default"].chef.findFirst({
        where: {
            userId
        },
        include: {
            hours: {
                include: {
                    daysOfWeek: true
                }
            }
        }
    });
    const hours = query?.hours;
    return hours;
};
__internal_rpcHandler._resolverName = "hoursQuery";
__internal_rpcHandler._resolverType = "query";
__internal_rpcHandler._routePath = "/api/rpc/hoursQuery";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);


/***/ })

};
;