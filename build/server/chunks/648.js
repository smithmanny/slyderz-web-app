"use strict";
exports.id = 648;
exports.ids = [648];
exports.modules = {

/***/ 4678:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Al": () => (/* binding */ Signup),
/* harmony export */   "GR": () => (/* binding */ ChangePassword),
/* harmony export */   "m3": () => (/* binding */ Login),
/* harmony export */   "oP": () => (/* binding */ ForgotPassword),
/* harmony export */   "tq": () => (/* binding */ ResetPassword)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9926);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zod__WEBPACK_IMPORTED_MODULE_0__]);
zod__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const password = zod__WEBPACK_IMPORTED_MODULE_0__.string().min(6).max(100);
const Signup = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    email: zod__WEBPACK_IMPORTED_MODULE_0__.string().email(),
    firstName: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    lastName: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    password
});
const Login = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    email: zod__WEBPACK_IMPORTED_MODULE_0__.string().email(),
    password: zod__WEBPACK_IMPORTED_MODULE_0__.string()
});
const ForgotPassword = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    email: zod__WEBPACK_IMPORTED_MODULE_0__.string().email()
});
const ResetPassword = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    password: password,
    passwordConfirmation: password,
    token: zod__WEBPACK_IMPORTED_MODULE_0__.string()
}).refine((data)=>data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: [
        "passwordConfirmation"
    ]
});
const ChangePassword = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    currentPassword: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    newPassword: password
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 648:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var blitz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4405);
/* harmony import */ var blitz__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(blitz__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7897);
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_auth__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5481);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _sendgrid_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4262);
/* harmony import */ var _sendgrid_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_sendgrid_client__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var db__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3747);
/* harmony import */ var app_auth_validations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4678);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([app_auth_validations__WEBPACK_IMPORTED_MODULE_5__]);
app_auth_validations__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const stripe = __webpack_require__(8174)(process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY);
_sendgrid_client__WEBPACK_IMPORTED_MODULE_3___default().setApiKey(process.env.BLITZ_PUBLIC_SENDGRID_API_TOKEN || "");
const __internal_rpcHandler = _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_2__.resolver.pipe(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_2__.resolver.zod(app_auth_validations__WEBPACK_IMPORTED_MODULE_5__/* .Signup */ .Al), async ({ email , firstName , lastName , password  }, ctx)=>{
    const hashedPassword = await _blitzjs_auth__WEBPACK_IMPORTED_MODULE_1__.SecurePassword.hash(password);
    const userExists = await db__WEBPACK_IMPORTED_MODULE_4__["default"].user.findFirst({
        where: {
            email
        }
    });
    if (userExists) {
        throw new blitz__WEBPACK_IMPORTED_MODULE_0__.AuthenticationError();
    }
    const stripeCustomer = await stripe.customers.create({
        email,
        name: `${firstName} ${lastName}`
    });
    const user = await db__WEBPACK_IMPORTED_MODULE_4__["default"].user.create({
        data: {
            email: email.toLowerCase(),
            firstName,
            lastName,
            hashedPassword,
            role: "USER",
            stripeCustomerId: stripeCustomer.id
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true
        }
    });
    // // Create user in sendgrid
    const data = {
        "contacts": [
            {
                "email": email,
                "first_name": firstName,
                "last_name": lastName,
                "custom_fields": {
                    "e2_T": "false"
                }
            }
        ]
    };
    const request = {
        url: `/v3/marketing/contacts`,
        method: "PUT",
        body: data
    };
    _sendgrid_client__WEBPACK_IMPORTED_MODULE_3___default().request(request).catch((error)=>{
        console.error(error);
    });
    // Merge pending carts from logged out session
    const pendingCartItems = ctx.session?.cart?.pendingCartItems || [];
    const total = ctx.session?.cart?.total || 0;
    await ctx.session.$create({
        userId: user.id,
        role: user.role,
        cart: {
            pendingCartItems,
            total
        },
        stripeCustomerId: stripeCustomer.id
    });
    return user;
});
__internal_rpcHandler._resolverName = "signup";
__internal_rpcHandler._resolverType = "mutation";
__internal_rpcHandler._routePath = "/api/rpc/signup";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;