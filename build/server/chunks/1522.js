"use strict";
exports.id = 1522;
exports.ids = [1522];
exports.modules = {

/***/ 5252:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "XZ": () => (/* reexport */ form_Checkbox),
  "Mt": () => (/* reexport */ form_DatePicker),
  "Ck": () => (/* reexport */ external_final_form_.FORM_ERROR),
  "Ph": () => (/* reexport */ form_Select),
  "nv": () => (/* reexport */ form_TextField),
  "ZP": () => (/* reexport */ form_Form)
});

// UNUSED EXPORTS: TimePicker

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "blitz"
var external_blitz_ = __webpack_require__(4405);
// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(580);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);
// EXTERNAL MODULE: external "react-final-form"
var external_react_final_form_ = __webpack_require__(2411);
// EXTERNAL MODULE: external "final-form"
var external_final_form_ = __webpack_require__(2774);
// EXTERNAL MODULE: ./app/core/components/shared/Button.tsx
var Button = __webpack_require__(6509);
;// CONCATENATED MODULE: ./app/core/components/form/Form.tsx






function Form({ children , submitText , schema , initialValues , mutation , toVariables , onSubmit , onSuccess , ...props }) {
    const _handleSubmit = (values, formApi, cb)=>{
        async function handleMutation(variables) {
            try {
                await mutation.schema(variables);
                if (typeof onSuccess === "function") {
                    return onSuccess(variables);
                }
            } catch (error) {
                if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                    // This error comes from Prisma
                    return {
                        email: "This email is already being used"
                    };
                } else if (error instanceof external_blitz_.AuthenticationError) {
                    return {
                        [external_final_form_.FORM_ERROR]: "Sorry, those credentials are invalid"
                    };
                } else {
                    return {
                        [external_final_form_.FORM_ERROR]: error.toString()
                    };
                }
            }
        }
        if (mutation && mutation.toVariables) {
            const variables = mutation.toVariables(values);
            return handleMutation(variables);
        }
        if (typeof onSubmit === "function") {
            return onSubmit(values, formApi, cb);
        }
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(external_react_final_form_.Form, {
        initialValues: initialValues,
        validate: (0,external_blitz_.validateZodSchema)(schema),
        onSubmit: _handleSubmit,
        render: ({ handleSubmit , submitting , submitError  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                onSubmit: handleSubmit,
                className: "form",
                ...props,
                children: [
                    children,
                    submitError && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        role: "alert",
                        style: {
                            color: "red"
                        },
                        children: submitError
                    }),
                    submitText && /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                        type: "submit",
                        disabled: submitting,
                        children: submitText
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("style", {
                        global: true,
                        jsx: true,
                        children: `
            .form > * + * {
              margin-top: 1rem;
            }
          `
                    })
                ]
            })
    });
}
Form.defaultProps = {
    mutation: {},
    onSuccess: ()=>{}
};
Form.propTypes = {
    submitText: (external_prop_types_default()).string.isRequired,
    children: (external_prop_types_default()).any.isRequired,
    mutation: external_prop_types_default().shape({
        schema: (external_prop_types_default()).any,
        toVariables: (external_prop_types_default()).func
    }),
    onSuccess: (external_prop_types_default()).func
};
/* harmony default export */ const form_Form = (Form);

// EXTERNAL MODULE: external "mui-rff"
var external_mui_rff_ = __webpack_require__(9138);
// EXTERNAL MODULE: ./app/core/components/shared/Grid.jsx
var Grid = __webpack_require__(8820);
;// CONCATENATED MODULE: ./app/core/components/form/Checkbox.tsx




const Checkbox = (props)=>{
    const { label , data , name  } = props;
    return /*#__PURE__*/ jsx_runtime_.jsx(Grid/* default */.Z, {
        item: true,
        xs: props.xs,
        md: props.md,
        children: /*#__PURE__*/ jsx_runtime_.jsx(external_mui_rff_.Checkboxes, {
            label: label,
            name: name,
            data: data,
            formGroupProps: {
                row: true
            }
        })
    });
};
Checkbox.defaultProps = {
    xs: 12,
    required: false
};
Checkbox.propTypes = {
    data: external_prop_types_default().arrayOf(external_prop_types_default().shape({
        label: (external_prop_types_default()).string,
        value: external_prop_types_default().oneOfType([
            (external_prop_types_default()).string,
            (external_prop_types_default()).number
        ])
    })).isRequired,
    label: (external_prop_types_default()).string.isRequired,
    name: (external_prop_types_default()).string.isRequired,
    xs: (external_prop_types_default()).number
};
/* harmony default export */ const form_Checkbox = (Checkbox);

;// CONCATENATED MODULE: ./app/core/components/form/TextField.tsx



const TextField = (props)=>/*#__PURE__*/ jsx_runtime_.jsx(Grid/* default */.Z, {
        item: true,
        xs: props.xs,
        md: props.md,
        children: /*#__PURE__*/ jsx_runtime_.jsx(external_mui_rff_.TextField, {
            ...props
        })
    });
TextField.defaultProps = {
    xs: 12
};
/* harmony default export */ const form_TextField = (TextField);

// EXTERNAL MODULE: external "date-fns"
var external_date_fns_ = __webpack_require__(4146);
// EXTERNAL MODULE: external "@mui/x-date-pickers/AdapterDateFns"
var AdapterDateFns_ = __webpack_require__(4046);
// EXTERNAL MODULE: external "@mui/x-date-pickers/LocalizationProvider"
var LocalizationProvider_ = __webpack_require__(5753);
;// CONCATENATED MODULE: ./app/core/components/form/DatePicker.tsx







const DatePicker = (props)=>/*#__PURE__*/ jsx_runtime_.jsx(Grid/* default */.Z, {
        item: true,
        xs: props.xs,
        md: props.md,
        children: /*#__PURE__*/ jsx_runtime_.jsx(LocalizationProvider_.LocalizationProvider, {
            dateAdapter: AdapterDateFns_.AdapterDateFns,
            children: /*#__PURE__*/ jsx_runtime_.jsx(external_mui_rff_.DatePicker, {
                label: props.label,
                name: props.name,
                required: props.required,
                ...props
            })
        })
    });
DatePicker.defaultProps = {
    label: "",
    name: "",
    xs: 12,
    required: false
};
DatePicker.propTypes = {
    label: (external_prop_types_default()).string.isRequired,
    name: (external_prop_types_default()).string.isRequired,
    required: (external_prop_types_default()).bool
};
/* harmony default export */ const form_DatePicker = (DatePicker);

// EXTERNAL MODULE: external "@date-io/date-fns"
var date_fns_ = __webpack_require__(7031);
var date_fns_default = /*#__PURE__*/__webpack_require__.n(date_fns_);
;// CONCATENATED MODULE: ./app/core/components/form/TimePicker.tsx






const TimePicker = (props)=>/*#__PURE__*/ jsx_runtime_.jsx(Grid/* default */.Z, {
        item: true,
        xs: props.xs,
        md: props.md,
        children: /*#__PURE__*/ jsx_runtime_.jsx(external_mui_rff_.TimePicker, {
            label: props.label,
            name: props.name,
            required: props.required,
            dateFunsUtils: (date_fns_default()),
            ...props
        })
    });
TimePicker.defaultProps = {
    label: "Pick a time",
    name: "",
    xs: 12,
    required: false
};
TimePicker.propTypes = {
    label: (external_prop_types_default()).string.isRequired,
    name: (external_prop_types_default()).string.isRequired,
    required: (external_prop_types_default()).bool
};
/* harmony default export */ const form_TimePicker = ((/* unused pure expression or super */ null && (TimePicker)));

// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
;// CONCATENATED MODULE: ./app/core/components/form/Select.tsx







const Select = (props)=>{
    const menuItems = props.items.map((item, index)=>{
        return /*#__PURE__*/ jsx_runtime_.jsx(material_.MenuItem, {
            value: item.value,
            children: item.key
        }, item.key);
    });
    return /*#__PURE__*/ jsx_runtime_.jsx(Grid/* default */.Z, {
        item: true,
        xs: props.xs,
        md: props.md,
        children: /*#__PURE__*/ jsx_runtime_.jsx(external_mui_rff_.Select, {
            label: props.label,
            name: props.name,
            required: props.required,
            dateFunsUtils: (date_fns_default()),
            ...props,
            children: menuItems
        })
    });
};
Select.defaultProps = {
    name: "",
    xs: 12,
    required: false
};
Select.propTypes = {
    items: external_prop_types_default().arrayOf(external_prop_types_default().shape({
        key: (external_prop_types_default()).string,
        value: (external_prop_types_default()).string
    })).isRequired,
    label: (external_prop_types_default()).string,
    name: (external_prop_types_default()).string.isRequired,
    required: (external_prop_types_default()).bool,
    xs: (external_prop_types_default()).number
};
/* harmony default export */ const form_Select = (Select);

;// CONCATENATED MODULE: ./app/core/components/form/index.js









/***/ }),

/***/ 583:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* reexport default from dynamic */ _mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default.a)
/* harmony export */ });
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Box__WEBPACK_IMPORTED_MODULE_0__);



/***/ }),

/***/ 6509:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3819);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7934);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(580);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);




const Button = ({ children , ...props })=>{
    const { ariaLabel , type  } = props;
    switch(type){
        case "icon":
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_2___default()), {
                "aria-label": ariaLabel,
                ...props,
                size: "large",
                children: children
            });
        default:
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Button__WEBPACK_IMPORTED_MODULE_1___default()), {
                "aria-label": ariaLabel,
                ...props,
                children: children
            });
    }
};
Button.defaultProps = {
    ariaLabel: "button",
    type: "default",
    variant: "contained"
};
Button.propTypes = {
    ariaLabel: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
    type: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf([
        "icon",
        "default"
    ]),
    variant: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf([
        "text",
        "outlined",
        "contained",
        undefined
    ])
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);


/***/ }),

/***/ 8820:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* reexport default from dynamic */ _mui_material_Grid__WEBPACK_IMPORTED_MODULE_0___default.a)
/* harmony export */ });
/* harmony import */ var _mui_material_Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5612);
/* harmony import */ var _mui_material_Grid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_0__);



/***/ }),

/***/ 6165:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* reexport default from dynamic */ _mui_material_Typography__WEBPACK_IMPORTED_MODULE_0___default.a)
/* harmony export */ });
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7163);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_0__);



/***/ }),

/***/ 2868:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rS": () => (/* binding */ theme),
/* harmony export */   "zo": () => (/* reexport safe */ _mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.styled)
/* harmony export */ });
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5574);
/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_colors__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_styles_makeStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8409);
/* harmony import */ var _mui_styles_makeStyles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_styles_makeStyles__WEBPACK_IMPORTED_MODULE_2__);




const MuiTheme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.createTheme)({
    palette: {
        primary: {
            main: "#E54E44"
        },
        secondary: {
            main: "#14A3A5"
        },
        white: {
            main: "#FFF"
        },
        error: _mui_material_colors__WEBPACK_IMPORTED_MODULE_1__.red,
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2
    },
    typography: {
        fontSize: 14,
        h1: {
            fontSize: 50,
            fontWeight: 500
        },
        h2: {
            fontSize: 40,
            fontWeight: 500
        }
    },
    components: {
        MuiDatePicker: {
            styleOverrides: {
                root: {
                    backgroundColor: "red"
                }
            }
        }
    }
});
const theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.responsiveFontSizes)(MuiTheme);


/***/ })

};
;