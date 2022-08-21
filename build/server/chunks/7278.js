"use strict";
exports.id = 7278;
exports.ids = [7278];
exports.modules = {

/***/ 7278:
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


const GetDish = zod__WEBPACK_IMPORTED_MODULE_1__.object({
    dishId: zod__WEBPACK_IMPORTED_MODULE_1__.number(),
    sectionId: zod__WEBPACK_IMPORTED_MODULE_1__.number()
});
const __internal_rpcHandler = async function getChefMenuSections(input, ctx) {
    const data = GetDish.parse(input);
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
        select: {
            dishes: {
                where: {
                    sectionId: data.sectionId,
                    id: data.dishId
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    chefId: true,
                    sectionId: true
                }
            }
        }
    });
    return query?.dishes[0];
};
__internal_rpcHandler._resolverName = "dishQuery";
__internal_rpcHandler._resolverType = "query";
__internal_rpcHandler._routePath = "/api/rpc/dishQuery";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;