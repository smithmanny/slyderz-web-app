"use strict";
exports.id = 9976;
exports.ids = [9976];
exports.modules = {

/***/ 9976:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U": () => (/* binding */ LoginForm),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _blitzjs_next__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1990);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5481);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_auth_mutations_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(872);
/* harmony import */ var app_auth_validations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4935);
/* harmony import */ var app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6165);
/* harmony import */ var app_core_components_shared_Box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(583);
/* harmony import */ var app_core_components_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5252);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([app_auth_mutations_login__WEBPACK_IMPORTED_MODULE_3__, app_auth_validations__WEBPACK_IMPORTED_MODULE_4__]);
([app_auth_mutations_login__WEBPACK_IMPORTED_MODULE_3__, app_auth_validations__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const LoginForm = (props)=>{
    const [login] = (0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_2__.useMutation)(app_auth_mutations_login__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(app_core_components_shared_Box__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
        sx: {
            padding: 2,
            textAlign: "center",
            margin: "auto",
            maxWidth: 550,
            width: "100%"
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                gutterBottom: true,
                variant: "h4",
                children: "Login"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(app_core_components_form__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .ZP, {
                submitText: "Login",
                schema: app_auth_validations__WEBPACK_IMPORTED_MODULE_4__/* .Login */ .m3,
                initialValues: {
                    email: "",
                    password: ""
                },
                mutation: {
                    schema: login,
                    toVariables: (values)=>({
                            ...values
                        })
                },
                ...props,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_form__WEBPACK_IMPORTED_MODULE_7__/* .TextField */ .nv, {
                        name: "email",
                        label: "Email",
                        placeholder: "Email"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_form__WEBPACK_IMPORTED_MODULE_7__/* .TextField */ .nv, {
                        name: "password",
                        label: "Password",
                        placeholder: "Password",
                        type: "password"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                            href: _blitzjs_next__WEBPACK_IMPORTED_MODULE_8__/* .Routes.ForgotPasswordPage */ .Z5.ForgotPasswordPage(),
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                    children: "Forgot your password?"
                                })
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    marginTop: "1rem"
                },
                children: [
                    "Or ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: _blitzjs_next__WEBPACK_IMPORTED_MODULE_8__/* .Routes.SignupPage */ .Z5.SignupPage(),
                        children: "Sign Up"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;