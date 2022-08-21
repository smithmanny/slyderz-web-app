"use strict";
exports.id = 5543;
exports.ids = [5543];
exports.modules = {

/***/ 5543:
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


const GetChefDishes = zod__WEBPACK_IMPORTED_MODULE_1__.object({
    chefId: zod__WEBPACK_IMPORTED_MODULE_1__.number()
});
const __internal_rpcHandler = async function fetchChefDishes(input, ctx) {
    const data = GetChefDishes.parse(input);
    const dishes = await db__WEBPACK_IMPORTED_MODULE_0__["default"].dish.findMany({
        where: {
            id: data.chefId
        },
        include: {
            chef: {
                include: {
                    hours: true
                }
            },
            section: {
                select: {
                    id: true
                }
            }
        }
    });
    return dishes;
};
__internal_rpcHandler._resolverName = "chefDishesQuery";
__internal_rpcHandler._resolverType = "query";
__internal_rpcHandler._routePath = "/api/rpc/chefDishesQuery";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;