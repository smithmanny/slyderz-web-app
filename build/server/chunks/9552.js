"use strict";
exports.id = 9552;
exports.ids = [9552];
exports.modules = {

/***/ 9552:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResetPasswordError": () => (/* binding */ ResetPasswordError),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7897);
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5481);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3747);
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4678);
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7774);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_validations__WEBPACK_IMPORTED_MODULE_3__, _login__WEBPACK_IMPORTED_MODULE_4__]);
([_validations__WEBPACK_IMPORTED_MODULE_3__, _login__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





class ResetPasswordError extends Error {
    name = "ResetPasswordError";
    message = "Reset password link is invalid or it has expired.";
}
const __internal_rpcHandler = _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__.resolver.pipe(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__.resolver.zod(_validations__WEBPACK_IMPORTED_MODULE_3__/* .ResetPassword */ .tq), async ({ password , token  }, ctx)=>{
    // 1. Try to find this token in the database
    const hashedToken = (0,_blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__.hash256)(token);
    const possibleToken = await db__WEBPACK_IMPORTED_MODULE_2__["default"].token.findFirst({
        where: {
            hashedToken,
            type: "RESET_PASSWORD"
        },
        include: {
            user: true
        }
    });
    // 2. If token not found, error
    if (!possibleToken) {
        throw new ResetPasswordError();
    }
    const savedToken = possibleToken;
    // 3. Delete token so it can't be used again
    await db__WEBPACK_IMPORTED_MODULE_2__["default"].token["delete"]({
        where: {
            id: savedToken.id
        }
    });
    // 4. If token has expired, error
    if (savedToken.expiresAt < new Date()) {
        throw new ResetPasswordError();
    }
    // 5. Since token is valid, now we can update the user's password
    const hashedPassword = await _blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__.SecurePassword.hash(password);
    const user = await db__WEBPACK_IMPORTED_MODULE_2__["default"].user.update({
        where: {
            id: savedToken.userId
        },
        data: {
            hashedPassword
        }
    });
    // 6. Revoke all existing login sessions for this user
    await db__WEBPACK_IMPORTED_MODULE_2__["default"].session.deleteMany({
        where: {
            userId: user.id
        }
    });
    // 7. Now log the user in with the new credentials
    await (0,_login__WEBPACK_IMPORTED_MODULE_4__["default"])({
        email: user.email,
        password
    }, ctx);
    return true;
});
__internal_rpcHandler._resolverName = "resetPassword";
__internal_rpcHandler._resolverType = "mutation";
__internal_rpcHandler._routePath = "/api/rpc/resetPassword";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;