"use strict";
exports.id = 3548;
exports.ids = [3548];
exports.modules = {

/***/ 3548:
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
    description: zod__WEBPACK_IMPORTED_MODULE_1__.string(),
    name: zod__WEBPACK_IMPORTED_MODULE_1__.string(),
    price: zod__WEBPACK_IMPORTED_MODULE_1__.string(),
    sectionId: zod__WEBPACK_IMPORTED_MODULE_1__.number(),
    selectedDishId: zod__WEBPACK_IMPORTED_MODULE_1__.number()
});
const __internal_rpcHandler = async function destroyDish(input, ctx) {
    // Validate input - very important for security
    const data = GetDish.parse(input);
    const userId = ctx.session.userId;
    ctx.session.$authorize();
    if (!userId) {
        throw new Error("Can't find user");
    }
    const chef = await db__WEBPACK_IMPORTED_MODULE_0__["default"].chef.findFirst({
        where: {
            userId
        },
        select: {
            id: true
        }
    });
    if (!chef) {
        throw new Error("Can't find user");
    }
    const dish = await db__WEBPACK_IMPORTED_MODULE_0__["default"].dish.update({
        where: {
            id: data.selectedDishId
        },
        data: {
            description: data.description,
            name: data.name,
            price: data.price,
            chefId: chef.id
        }
    });
    return dish;
};
__internal_rpcHandler._resolverName = "updateDishMutation";
__internal_rpcHandler._resolverType = "mutation";
__internal_rpcHandler._routePath = "/api/rpc/updateDishMutation";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;