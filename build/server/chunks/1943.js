"use strict";
exports.id = 1943;
exports.ids = [1943];
exports.modules = {

/***/ 1943:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var blitz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4405);
/* harmony import */ var blitz__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(blitz__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3747);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9926);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zod__WEBPACK_IMPORTED_MODULE_2__]);
zod__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const GetHours = zod__WEBPACK_IMPORTED_MODULE_2__.object({
    daysOfWeek: zod__WEBPACK_IMPORTED_MODULE_2__.array(zod__WEBPACK_IMPORTED_MODULE_2__["enum"]([
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY"
    ])),
    endTime: zod__WEBPACK_IMPORTED_MODULE_2__.string(),
    startTime: zod__WEBPACK_IMPORTED_MODULE_2__.string()
});
const __internal_rpcHandler = async function createHoursMutation(input, ctx) {
    const data = GetHours.parse(input);
    const userId = ctx.session.userId;
    const selectedWeekdays = [];
    ctx.session.$authorize();
    if (!userId) {
        throw new blitz__WEBPACK_IMPORTED_MODULE_0__.AuthorizationError();
    }
    const chef = await db__WEBPACK_IMPORTED_MODULE_1__["default"].chef.findFirst({
        where: {
            userId
        },
        select: {
            id: true
        }
    });
    if (!chef) {
        throw new blitz__WEBPACK_IMPORTED_MODULE_0__.AuthorizationError();
    }
    const allChefHours = await db__WEBPACK_IMPORTED_MODULE_1__["default"].hours.findMany({
        where: {
            chefId: chef.id
        },
        include: {
            daysOfWeek: true
        }
    });
    // create array with days of week thats already created
    allChefHours.map((hourBlock)=>{
        hourBlock.daysOfWeek.map((dayOfWeek)=>selectedWeekdays.push(dayOfWeek.day));
    });
    data.daysOfWeek.map((dayOfWeek)=>{
        if (selectedWeekdays.includes(dayOfWeek)) {
            throw new Error(`${dayOfWeek} is already being used in a time block`);
        }
    });
    const hours = await db__WEBPACK_IMPORTED_MODULE_1__["default"].hours.create({
        data: {
            chefId: chef.id,
            ...data
        }
    });
    return hours;
};
__internal_rpcHandler._resolverName = "createHoursMutation";
__internal_rpcHandler._resolverType = "mutation";
__internal_rpcHandler._routePath = "/api/rpc/createHoursMutation";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;