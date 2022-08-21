"use strict";
exports.id = 4955;
exports.ids = [4955];
exports.modules = {

/***/ 3262:
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

/***/ 1573:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5481);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_chefs_mutations_destroyMenuItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7294);
/* harmony import */ var app_chefs_mutations_decreaseMenuItemQuantity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4694);
/* harmony import */ var app_chefs_mutations_increaseMenuItemQuantity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8869);
/* harmony import */ var integrations_material_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2868);
/* harmony import */ var app_core_components_shared_Divider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4612);
/* harmony import */ var app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6165);
/* harmony import */ var app_core_components_shared_Button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6509);
/* harmony import */ var app_core_components_shared_Grid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8820);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([app_chefs_mutations_destroyMenuItem__WEBPACK_IMPORTED_MODULE_3__, app_chefs_mutations_decreaseMenuItemQuantity__WEBPACK_IMPORTED_MODULE_4__, app_chefs_mutations_increaseMenuItemQuantity__WEBPACK_IMPORTED_MODULE_5__]);
([app_chefs_mutations_destroyMenuItem__WEBPACK_IMPORTED_MODULE_3__, app_chefs_mutations_decreaseMenuItemQuantity__WEBPACK_IMPORTED_MODULE_4__, app_chefs_mutations_increaseMenuItemQuantity__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











const QuantityContainer = (0,integrations_material_ui__WEBPACK_IMPORTED_MODULE_6__/* .styled */ .zo)("div")({
    alignItems: "center",
    display: "flex"
});
const CartItems = ({ selectedCartItems  })=>{
    const [destroyMenuItem] = (0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__.useMutation)(app_chefs_mutations_destroyMenuItem__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);
    const [decreaseMenuItemQuantity] = (0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__.useMutation)(app_chefs_mutations_decreaseMenuItemQuantity__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z);
    const [increaseMenuItemQuantity] = (0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__.useMutation)(app_chefs_mutations_increaseMenuItemQuantity__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z);
    return selectedCartItems.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(app_core_components_shared_Grid__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                    container: true,
                    sx: {
                        alignItems: "center",
                        flexDirection: "row",
                        paddingTop: 2
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Grid__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                            item: true,
                            xs: 4,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                variant: "body2",
                                children: item.name
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Grid__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                            item: true,
                            xs: true,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(QuantityContainer, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Button__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                                        variant: "text",
                                        onClick: ()=>decreaseMenuItemQuantity({
                                                id: item.id,
                                                quantity: 1
                                            }),
                                        children: "-"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Button__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                                        variant: "text",
                                        onClick: ()=>increaseMenuItemQuantity({
                                                id: item.id,
                                                quantity: 1
                                            }),
                                        children: "+"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                        children: [
                                            "x",
                                            item.quantity
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Grid__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                            item: true,
                            xs: true,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                sx: {
                                    float: "right"
                                },
                                children: [
                                    "$",
                                    item.quantity * item.price
                                ]
                            })
                        })
                    ]
                }, item.id),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Button__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                    variant: "text",
                    size: "small",
                    onClick: ()=>destroyMenuItem({
                            menuItemId: item.id
                        }),
                    children: "Delete"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Divider__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {})
            ]
        }, item.id));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartItems);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8393:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* reexport safe */ _CartItems__WEBPACK_IMPORTED_MODULE_0__.Z)
/* harmony export */ });
/* harmony import */ var _CartItems__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1573);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_CartItems__WEBPACK_IMPORTED_MODULE_0__]);
_CartItems__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8779:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7897);
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_auth__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _blitzjs_next__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1990);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(580);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_final_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2411);
/* harmony import */ var react_final_form__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_final_form__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var integrations_material_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2868);
/* harmony import */ var app_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7255);
/* harmony import */ var app_core_components_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5252);
/* harmony import */ var app_core_components_shared_Button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6509);
/* harmony import */ var app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6165);
/* harmony import */ var _cartItems__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8393);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_cartItems__WEBPACK_IMPORTED_MODULE_11__]);
_cartItems__WEBPACK_IMPORTED_MODULE_11__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];














const Root = (0,integrations_material_ui__WEBPACK_IMPORTED_MODULE_6__/* .styled */ .zo)("div")({
    padding: 2
});
const Content = (0,integrations_material_ui__WEBPACK_IMPORTED_MODULE_6__/* .styled */ .zo)("div")({
    width: "100%"
});
const CartItemsContainer = (props)=>{
    const formState = (0,react_final_form__WEBPACK_IMPORTED_MODULE_5__.useFormState)();
    const time = [
        ...app_helpers__WEBPACK_IMPORTED_MODULE_7__/* .todAM */ .jg,
        ...app_helpers__WEBPACK_IMPORTED_MODULE_7__/* .todPM */ .$K
    ];
    const selectedEventDate = formState.values?.eventDate;
    const selectedDayOfWeek = selectedEventDate?.getDay();
    let startTime;
    let startTimeIndex;
    let endTime;
    let endTimeIndex;
    let availableTime;
    const disableDaysOff = (date)=>{
        const daysOfWeek = [
            0,
            1,
            2,
            3,
            4,
            5,
            6
        ];
        const workingDays = [];
        props.hours.map((hourBlock)=>hourBlock.daysOfWeek.map((day)=>{
                const matchedDay = (0,app_helpers__WEBPACK_IMPORTED_MODULE_7__/* .convertDayToInt */ .bD)(day);
                workingDays.push(matchedDay);
            }));
        const offDays = daysOfWeek.filter((day)=>!workingDays.includes(day));
        return offDays.includes(date.getDay());
    };
    if (!props.checkoutPage) {
        const selectedTime = props.hours.find((hourBlock)=>hourBlock.daysOfWeek.find((dayOfWeek)=>(0,app_helpers__WEBPACK_IMPORTED_MODULE_7__/* .convertDayToInt */ .bD)(dayOfWeek) === selectedDayOfWeek));
        startTime = time.find((t)=>t.key === selectedTime?.startTime);
        startTimeIndex = time.indexOf(startTime);
        endTime = time.find((t)=>t.key === selectedTime?.endTime);
        endTimeIndex = time.indexOf(endTime);
        availableTime = time.slice(startTimeIndex, endTimeIndex + 1);
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), {
        children: [
            !props.checkoutPage && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                        variant: "subtitle1",
                        children: "Date"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_form__WEBPACK_IMPORTED_MODULE_8__/* .DatePicker */ .Mt, {
                        name: "eventDate",
                        disablePast: true,
                        required: true,
                        views: [
                            "month",
                            "day"
                        ],
                        inputVariant: "outlined",
                        shouldDisableDate: disableDaysOff
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                        variant: "subtitle1",
                        children: "Time"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_form__WEBPACK_IMPORTED_MODULE_8__/* .Select */ .Ph, {
                        name: "eventTime",
                        items: availableTime,
                        required: true
                    })
                ]
            }),
            props.cartItems?.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Content, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                        variant: "h6",
                        sx: {
                            mt: 4,
                            fontWeight: "545"
                        },
                        children: "Your Items"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_cartItems__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                        selectedCartItems: props.cartItems
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                        variant: "h6",
                        sx: {
                            my: 4
                        },
                        children: [
                            "Total: ",
                            (0,app_helpers__WEBPACK_IMPORTED_MODULE_7__/* .formatNumberToCurrency */ .vx)(props.total)
                        ]
                    }),
                    props.buttonText && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: _blitzjs_next__WEBPACK_IMPORTED_MODULE_12__/* .Routes.Checkout */ .Z5.Checkout({
                            cid: 1,
                            eventDate: selectedEventDate && new Date(selectedEventDate).toISOString(),
                            eventTime: formState.values?.eventTime
                        }),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Button__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                            variant: "contained",
                            color: "primary",
                            size: "large",
                            disabled: !selectedEventDate || !formState.values?.eventTime,
                            children: props.buttonText
                        })
                    })
                ]
            })
        ]
    });
};
const CartSummary = (props)=>{
    const session = (0,_blitzjs_auth__WEBPACK_IMPORTED_MODULE_2__.useSession)();
    const { checkoutPage , buttonText , dishes  } = props;
    const cartItems = session?.cart?.pendingCartItems;
    const total = session?.cart?.total || 0;
    const hours = dishes[0]?.chef?.hours;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Root, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(app_core_components_form__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .ZP, {
            children: [
                buttonText && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                    fontWeight: "550",
                    variant: "h5",
                    children: "Your Reservation"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CartItemsContainer, {
                    buttonText: buttonText,
                    checkoutPage: checkoutPage,
                    cartItems: cartItems,
                    hours: hours,
                    total: total
                })
            ]
        })
    });
};
CartSummary.defaultProps = {
    checkoutPage: false,
    dishes: []
};
CartSummary.PropTypes = {
    checkoutPage: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool),
    dishes: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().array)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartSummary);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4955:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* reexport safe */ _CartSummary__WEBPACK_IMPORTED_MODULE_0__.Z)
/* harmony export */ });
/* harmony import */ var _CartSummary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8779);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_CartSummary__WEBPACK_IMPORTED_MODULE_0__]);
_CartSummary__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4694:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5481);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3262);
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

/***/ }),

/***/ 7294:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5481);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3262);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_validations__WEBPACK_IMPORTED_MODULE_1__]);
_validations__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const __internal_rpcHandler = _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.resolver.pipe(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.resolver.zod(_validations__WEBPACK_IMPORTED_MODULE_1__/* .DestroyMenuItem */ ._P), async (input, ctx)=>{
    const cartItems = ctx.session.cart?.pendingCartItems || [];
    const updatedCartItems = cartItems.filter((item)=>item.id !== input.menuItemId);
    const sum = updatedCartItems.reduce((total, currentVal)=>{
        return total += currentVal.quantity * currentVal.price;
    }, 0);
    await ctx.session.$setPublicData({
        cart: {
            pendingCartItems: [
                ...updatedCartItems
            ],
            total: sum
        }
    });
});
__internal_rpcHandler._resolverName = "destroyMenuItem";
__internal_rpcHandler._resolverType = "mutation";
__internal_rpcHandler._routePath = "/api/rpc/destroyMenuItem";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8869:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5481);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3262);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_validations__WEBPACK_IMPORTED_MODULE_1__]);
_validations__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const __internal_rpcHandler = _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.resolver.pipe(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.resolver.zod(_validations__WEBPACK_IMPORTED_MODULE_1__/* .UpdateMenuItem */ .L8), async (input, ctx)=>{
    const { id , quantity  } = input;
    if (ctx.session?.cart?.pendingCartItems === undefined) {
        return;
    }
    const cartItems = ctx.session.cart.pendingCartItems;
    const index = cartItems.findIndex((elem)=>elem?.id === id);
    let updatedArray = [
        ...cartItems
    ];
    if (updatedArray[index]) {
        updatedArray[index].quantity += quantity;
    } else {
        throw new Error("Error finding index for selected item");
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
__internal_rpcHandler._resolverName = "increaseMenuItemQuantity";
__internal_rpcHandler._resolverType = "mutation";
__internal_rpcHandler._routePath = "/api/rpc/increaseMenuItemQuantity";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;