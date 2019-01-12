webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/Layout.js":
/*!******************************!*\
  !*** ./components/Layout.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/AppBar */ "./node_modules/@material-ui/core/AppBar/index.js");
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Toolbar */ "./node_modules/@material-ui/core/Toolbar/index.js");
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/Typography/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/IconButton/index.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/AccountCircle */ "./node_modules/@material-ui/icons/AccountCircle.js");
/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = "/Users/shakhor/Projects/Web/slyderz/components/Layout.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var useStyles = function useStyles(theme) {
  return {
    main: {
      padding: '40px 24px',
      maxWidth: 1032,
      margin: 'auto'
    },
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
    }
  };
};

var Layout = function Layout(_ref) {
  var children = _ref.children,
      classes = _ref.classes;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true),
      _useState2 = _slicedToArray(_useState, 2),
      user = _useState2[0],
      setUser = _useState2[1];

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.root,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_3___default.a, {
    position: "static",
    color: "primary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_4___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
    variant: "h6",
    color: "inherit",
    className: classes.grow,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, "Slyderz"), user && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6___default.a, {
    color: "inherit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_7___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
    className: classes.main,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, children));
};

Layout.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape().isRequired,
  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape().isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(useStyles)(Layout));

/***/ }),

/***/ "./node_modules/@emotion/hash/dist/hash.browser.esm.js":
false,

/***/ "./node_modules/@material-ui/styles/StylesProvider.js":
false,

/***/ "./node_modules/@material-ui/styles/ThemeContext.js":
false,

/***/ "./node_modules/@material-ui/styles/ThemeProvider.js":
false,

/***/ "./node_modules/@material-ui/styles/createGenerateClassName.js":
false,

/***/ "./node_modules/@material-ui/styles/createStyles.js":
false,

/***/ "./node_modules/@material-ui/styles/getStylesCreator.js":
false,

/***/ "./node_modules/@material-ui/styles/getThemeProps.js":
false,

/***/ "./node_modules/@material-ui/styles/hoistInternalStatics.js":
false,

/***/ "./node_modules/@material-ui/styles/index.es.js":
false,

/***/ "./node_modules/@material-ui/styles/indexCounter.js":
false,

/***/ "./node_modules/@material-ui/styles/install.js":
false,

/***/ "./node_modules/@material-ui/styles/jssPreset.js":
false,

/***/ "./node_modules/@material-ui/styles/makeStyles.js":
false,

/***/ "./node_modules/@material-ui/styles/mergeClasses.js":
false,

/***/ "./node_modules/@material-ui/styles/multiKeyStore.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/index.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/plugins/appearence.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/plugins/break-props-old.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/plugins/color-adjust.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/plugins/flex-2009.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/plugins/flex-2012.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/plugins/index.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/plugins/inline-logical-old.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/plugins/mask.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/plugins/overscroll-behavior.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/plugins/prefixed.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/plugins/scroll-snap.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/plugins/transform.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/plugins/transition.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/plugins/unprefixed.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/plugins/writing-mode.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/prefix.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/supported-keyframes.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/supported-property.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/supported-value.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/utils/camelize.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/css-vendor/lib/utils/pascalize.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/jss-plugin-camel-case/dist/jss-plugin-camel-case.esm.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/jss-plugin-default-unit/dist/jss-plugin-default-unit.esm.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/jss-plugin-global/dist/jss-plugin-global.cjs.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/jss-plugin-nested/dist/jss-plugin-nested.cjs.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/jss-plugin-props-sort/dist/jss-plugin-props-sort.esm.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/jss-plugin-rule-value-function/dist/jss-plugin-rule-value-function.esm.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/jss-plugin-vendor-prefixer/dist/jss-plugin-vendor-prefixer.esm.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/jss/dist/jss.esm.js":
false,

/***/ "./node_modules/@material-ui/styles/node_modules/warning/warning.js":
false,

/***/ "./node_modules/@material-ui/styles/styled.js":
false,

/***/ "./node_modules/@material-ui/styles/useTheme.js":
false,

/***/ "./node_modules/@material-ui/styles/withStyles.js":
false,

/***/ "./node_modules/@material-ui/styles/withTheme.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/arrayWithHoles.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/extends.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/nonIterableRest.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/slicedToArray.js":
false,

/***/ "./node_modules/tiny-warning/dist/tiny-warning.esm.js":
false

})
//# sourceMappingURL=index.js.3193a1c2d5aee0478089.hot-update.js.map