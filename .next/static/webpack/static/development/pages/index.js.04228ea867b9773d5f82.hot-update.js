webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/BasicModal.js":
/*!**********************************!*\
  !*** ./components/BasicModal.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Modal */ "./node_modules/@material-ui/core/Modal/index.js");
/* harmony import */ var _material_ui_core_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/shakhor/Projects/Web/slyderz/components/BasicModal.js";





var styles = function styles(theme) {
  return {
    modal: {
      position: 'absolute',
      maxWidth: 568,
      width: '90%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none'
    }
  };
};

var BasicModal = function BasicModal(_ref) {
  var children = _ref.children,
      classes = _ref.classes,
      open = _ref.open,
      onClose = _ref.onClose;

  function getModalStyle() {
    var top = 50;
    var left = 50;
    return {
      top: "".concat(top, "%"),
      left: "".concat(left, "%"),
      transform: "translate(-".concat(top, "%, -").concat(left, "%)")
    };
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Modal__WEBPACK_IMPORTED_MODULE_1___default.a, {
    "aria-labelledby": "simple-modal-title",
    "aria-describedby": "simple-modal-description",
    open: open,
    onClose: onClose,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: getModalStyle(),
    className: classes.modal,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, children));
};

BasicModal.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.PropTypes.shape().isRequired,
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape().isRequired,
  open: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool.isRequired,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(BasicModal));

/***/ })

})
//# sourceMappingURL=index.js.04228ea867b9773d5f82.hot-update.js.map