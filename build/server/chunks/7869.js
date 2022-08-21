"use strict";
exports.id = 7869;
exports.ids = [7869];
exports.modules = {

/***/ 7869:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var blitz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4405);
/* harmony import */ var blitz__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(blitz__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5481);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7897);
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_auth__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3747);
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7774);
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4678);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_login__WEBPACK_IMPORTED_MODULE_4__, _validations__WEBPACK_IMPORTED_MODULE_5__]);
([_login__WEBPACK_IMPORTED_MODULE_4__, _validations__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const __internal_rpcHandler = _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__.resolver.pipe(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__.resolver.zod(_validations__WEBPACK_IMPORTED_MODULE_5__/* .ChangePassword */ .GR), _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__.resolver.authorize(), async ({ currentPassword , newPassword  }, ctx)=>{
    const user = await db__WEBPACK_IMPORTED_MODULE_3__["default"].user.findFirst({
        where: {
            id: ctx.session.userId
        }
    });
    if (!user) throw new blitz__WEBPACK_IMPORTED_MODULE_0__.NotFoundError();
    await (0,_login__WEBPACK_IMPORTED_MODULE_4__.authenticateUser)(user.email, currentPassword);
    const hashedPassword = await _blitzjs_auth__WEBPACK_IMPORTED_MODULE_2__.SecurePassword.hash(newPassword);
    await db__WEBPACK_IMPORTED_MODULE_3__["default"].user.update({
        where: {
            id: user.id
        },
        data: {
            hashedPassword
        }
    });
    return true;
});
__internal_rpcHandler._resolverName = "changePassword";
__internal_rpcHandler._resolverType = "mutation";
__internal_rpcHandler._routePath = "/api/rpc/changePassword";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;