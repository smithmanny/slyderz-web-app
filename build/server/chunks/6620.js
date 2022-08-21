"use strict";
exports.id = 6620;
exports.ids = [6620];
exports.modules = {

/***/ 8410:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T$": () => (/* reexport default from dynamic */ _mui_material_CardActions__WEBPACK_IMPORTED_MODULE_1___default.a),
/* harmony export */   "ZB": () => (/* reexport default from dynamic */ _mui_material_CardMedia__WEBPACK_IMPORTED_MODULE_3___default.a),
/* harmony export */   "ZP": () => (/* reexport default from dynamic */ _mui_material_Card__WEBPACK_IMPORTED_MODULE_0___default.a),
/* harmony export */   "aY": () => (/* reexport default from dynamic */ _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2___default.a)
/* harmony export */ });
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8167);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Card__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_CardActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3691);
/* harmony import */ var _mui_material_CardActions__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardActions__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8455);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_CardMedia__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6731);
/* harmony import */ var _mui_material_CardMedia__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardMedia__WEBPACK_IMPORTED_MODULE_3__);






/***/ }),

/***/ 7488:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var integrations_material_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2868);
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5556);



const SlyderzContainer = (0,integrations_material_ui__WEBPACK_IMPORTED_MODULE_1__/* .styled */ .zo)(_Container__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(({ theme  })=>({
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(0)
        }
    }));
const ConsumerContainer = ({ children , ...props })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SlyderzContainer, {
        ...props,
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConsumerContainer);


/***/ }),

/***/ 6620:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* reexport */ LoggedInLayout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/@blitzjs/next/dist/index-server.cjs
var index_server = __webpack_require__(1990);
// EXTERNAL MODULE: ./integrations/material-ui.js
var material_ui = __webpack_require__(2868);
// EXTERNAL MODULE: ./app/core/components/shared/Card.jsx
var Card = __webpack_require__(8410);
// EXTERNAL MODULE: ./app/core/components/shared/ConsumerContainer.jsx
var ConsumerContainer = __webpack_require__(7488);
// EXTERNAL MODULE: ./app/core/components/shared/Grid.jsx
var Grid = __webpack_require__(8820);
// EXTERNAL MODULE: ./app/core/components/shared/Typography.tsx
var Typography = __webpack_require__(6165);
;// CONCATENATED MODULE: ./app/core/layouts/LoggedInLayout/LoggedInLayout.tsx








const ChefCard = (0,material_ui/* styled */.zo)(Card/* default */.ZP)`
 & .MuiCard-root {
    background: transparent;
    box-shadow: none;
    max-width: 308px;
  }
`;
const ChefCardContent = (0,material_ui/* styled */.zo)(Card/* CardContent */.aY)`
 & .MuiCardContent-root {
      padding-top: 8px;
    }
`;
const LoggedinLayout = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(ConsumerContainer/* default */.Z, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(Grid/* default */.Z, {
            container: true,
            spacing: 2,
            children: /*#__PURE__*/ jsx_runtime_.jsx(Grid/* default */.Z, {
                item: true,
                xs: 12,
                md: 4,
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: index_server/* Routes.ChefPage */.Z5.ChefPage({
                        cid: 1
                    }),
                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ChefCard, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(Card/* CardMedia */.ZB, {
                                    image: "/logo.png",
                                    component: "img",
                                    height: "140",
                                    title: "Chef dish"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ChefCardContent, {
                                    sx: {
                                        "& .name": {
                                            mt: 1,
                                            mr: 1,
                                            mb: 1,
                                            ml: 0
                                        }
                                    },
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                            variant: "button",
                                            children: "BBQ • Atlanta"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "name",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                                variant: "h6",
                                                children: "Chef Shakhor"
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                            variant: "body1",
                                            children: "Starting at $17/person"
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                })
            })
        })
    });
};
/* harmony default export */ const LoggedInLayout = (LoggedinLayout);

;// CONCATENATED MODULE: ./app/core/layouts/LoggedInLayout/index.js



/***/ })

};
;