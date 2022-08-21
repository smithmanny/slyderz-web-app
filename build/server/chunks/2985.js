"use strict";
exports.id = 2985;
exports.ids = [2985];
exports.modules = {

/***/ 7588:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bn": () => (/* binding */ CreateMenuItem),
/* harmony export */   "L8": () => (/* binding */ UpdateMenuItem),
/* harmony export */   "_P": () => (/* binding */ DestroyMenuItem)
/* harmony export */ });
/* unused harmony export MenuItem */
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9926);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zod__WEBPACK_IMPORTED_MODULE_0__]);
zod__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const MenuItem = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    id: zod__WEBPACK_IMPORTED_MODULE_0__.string().uuid(),
    name: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    description: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    price: zod__WEBPACK_IMPORTED_MODULE_0__.number(),
    quantity: zod__WEBPACK_IMPORTED_MODULE_0__.number()
});
const DestroyMenuItem = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    menuItemId: zod__WEBPACK_IMPORTED_MODULE_0__.string().uuid()
});
const CreateMenuItem = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    chefId: zod__WEBPACK_IMPORTED_MODULE_0__.number(),
    id: zod__WEBPACK_IMPORTED_MODULE_0__.string().uuid(),
    description: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    name: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    price: zod__WEBPACK_IMPORTED_MODULE_0__.number(),
    dishId: zod__WEBPACK_IMPORTED_MODULE_0__.number(),
    quantity: zod__WEBPACK_IMPORTED_MODULE_0__.number()
});
const UpdateMenuItem = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    id: zod__WEBPACK_IMPORTED_MODULE_0__.string().uuid(),
    quantity: zod__WEBPACK_IMPORTED_MODULE_0__.number()
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2985:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5481);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7588);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_validations__WEBPACK_IMPORTED_MODULE_1__]);
_validations__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const __internal_rpcHandler = _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.resolver.pipe(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.resolver.zod(_validations__WEBPACK_IMPORTED_MODULE_1__/* .UpdateMenuItem */ .L8), async (input, ctx)=>{
    const { id , quantity  } = input;
    const cartItems = ctx.session?.cart?.pendingCartItems || [];
    const index = cartItems.findIndex((elem)=>elem?.id === id);
    let updatedArray = [
        ...cartItems
    ];
    if (updatedArray[index]) {
        if (updatedArray[index].quantity === 1) {
            updatedArray[index].quantity = 1;
        } else {
            updatedArray[index].quantity -= quantity;
        }
    } else {
        throw new Error("Error finding index for selected menu item");
    }
    const total = updatedArray.reduce((total, currentVal)=>{
        return total += currentVal.quantity * currentVal.price;
    }, 0);
    await ctx.session.$setPublicData({
        cart: {
            pendingCartItems: updatedArray,
            total
        }
    });
});
__internal_rpcHandler._resolverName = "decreaseMenuItemQuantity";
__internal_rpcHandler._resolverType = "mutation";
__internal_rpcHandler._routePath = "/api/rpc/decreaseMenuItemQuantity";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;