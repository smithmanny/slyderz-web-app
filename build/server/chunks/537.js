"use strict";
exports.id = 537;
exports.ids = [537];
exports.modules = {

/***/ 537:
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
    name: zod__WEBPACK_IMPORTED_MODULE_1__.string()
});
const __internal_rpcHandler = async function createSection(input, ctx) {
    // Validate input - very important for security
    const data = GetSection.parse(input);
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
    const section = await db__WEBPACK_IMPORTED_MODULE_0__["default"].section.create({
        data: {
            name: data.name,
            chefId: chef.id
        }
    });
    return section;
};
__internal_rpcHandler._resolverName = "createSectionMutation";
__internal_rpcHandler._resolverType = "mutation";
__internal_rpcHandler._routePath = "/api/rpc/createSectionMutation";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;