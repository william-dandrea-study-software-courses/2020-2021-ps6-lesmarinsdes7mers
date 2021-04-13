require('source-map-support/register');
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/API/BasicErrors/IdMustBeANumber.js":
/*!************************************************!*\
  !*** ./src/API/BasicErrors/IdMustBeANumber.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IdMustBeANumber; });
/* harmony import */ var _Errors_BadRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Errors/BadRequest */ "./src/Errors/BadRequest.js");

class IdMustBeANumber extends _Errors_BadRequest__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.httpContent = {
      success: false,
      message: "The parameter id is a number but the provided wasn't",
      statusCode: 400.3
    };
  }

}

/***/ }),

/***/ "./src/API/BasicErrors/IdParameterNotFound.js":
/*!****************************************************!*\
  !*** ./src/API/BasicErrors/IdParameterNotFound.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IdParameterNotFound; });
/* harmony import */ var _Errors_BadRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Errors/BadRequest */ "./src/Errors/BadRequest.js");

class IdParameterNotFound extends _Errors_BadRequest__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.httpContent = {
      success: false,
      message: "The parameter id is required but was not found",
      statusCode: 400.3
    };
  }

}

/***/ }),

/***/ "./src/API/Quizz/Errors/QuizzIdParameterMustBeInt.js":
/*!***********************************************************!*\
  !*** ./src/API/Quizz/Errors/QuizzIdParameterMustBeInt.js ***!
  \***********************************************************/
/*! exports provided: QuizzIdParameterMustBeInt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuizzIdParameterMustBeInt", function() { return QuizzIdParameterMustBeInt; });
/* harmony import */ var _BasicErrors_IdMustBeANumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BasicErrors/IdMustBeANumber */ "./src/API/BasicErrors/IdMustBeANumber.js");

class QuizzIdParameterMustBeInt extends _BasicErrors_IdMustBeANumber__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.message = "The quizz id is a number but the provided wasn't";
    this.statusCode = "400.4.1";
  }

}

/***/ }),

/***/ "./src/API/Quizz/Errors/QuizzIdParameterNotFound.js":
/*!**********************************************************!*\
  !*** ./src/API/Quizz/Errors/QuizzIdParameterNotFound.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QuizzIdParameterNotFound; });
/* harmony import */ var _BasicErrors_IdParameterNotFound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BasicErrors/IdParameterNotFound */ "./src/API/BasicErrors/IdParameterNotFound.js");

class QuizzIdParameterNotFound extends _BasicErrors_IdParameterNotFound__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.message = "The quizz id parameter is required but was not found";
    this.statusCode = "400.3.1";
  }

}

/***/ }),

/***/ "./src/API/Quizz/Question/Errors/QuestionIdParameterNotFound.js":
/*!**********************************************************************!*\
  !*** ./src/API/Quizz/Question/Errors/QuestionIdParameterNotFound.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QuestionIdParameterNotFound; });
/* harmony import */ var _BasicErrors_IdParameterNotFound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../BasicErrors/IdParameterNotFound */ "./src/API/BasicErrors/IdParameterNotFound.js");

class QuestionIdParameterNotFound extends _BasicErrors_IdParameterNotFound__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.statusCode = "400.3.2";
    this.message = "The question id parameter is required but was not found";
  }

}

/***/ }),

/***/ "./src/API/Quizz/Question/getters.js":
/*!*******************************************!*\
  !*** ./src/API/Quizz/Question/getters.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Errors/HttpMessage */ "./src/Errors/HttpMessage.js");
/* harmony import */ var _question_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./question.middleware */ "./src/API/Quizz/Question/question.middleware.js");



const questionsGettersRouter = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
questionsGettersRouter.get('/:question', _question_middleware__WEBPACK_IMPORTED_MODULE_2__["default"],
/**
 * @param {Request & { params: { id: string }, quizz: import('../../../Models/quizz.model').Quizz, question: import('../../../Models/quizz.model').Question }} req 
 * @param {*} res 
 */
(req, res) => {
  new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_1__["default"](req.question).send(res);
});
/* harmony default export */ __webpack_exports__["default"] = (questionsGettersRouter);

/***/ }),

/***/ "./src/API/Quizz/Question/index.js":
/*!*****************************************!*\
  !*** ./src/API/Quizz/Question/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _getters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getters */ "./src/API/Quizz/Question/getters.js");
/* harmony import */ var _manage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manage */ "./src/API/Quizz/Question/manage.js");



const questionRouter = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
questionRouter.use(_manage__WEBPACK_IMPORTED_MODULE_2__["default"]);
questionRouter.use(_getters__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (questionRouter);

/***/ }),

/***/ "./src/API/Quizz/Question/manage.js":
/*!******************************************!*\
  !*** ./src/API/Quizz/Question/manage.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Errors_FileNotFound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Errors/FileNotFound */ "./src/Errors/FileNotFound.js");
/* harmony import */ var _Models_quizz_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Models/quizz.model */ "./src/Models/quizz.model.js");
/* harmony import */ var _Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Errors/ErrorSchield */ "./src/Errors/ErrorSchield.js");
/* harmony import */ var _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Errors/HttpMessage */ "./src/Errors/HttpMessage.js");
/* harmony import */ var _question_middleware__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./question.middleware */ "./src/API/Quizz/Question/question.middleware.js");






const questionManagementRouter = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
questionManagementRouter.post('/',
/**
 * 
 * @param {Request & { params: { id: string }, quizz: import('../../../Models/quizz.model').Quizz, question: import('../../../Models/quizz.model').Question }} req 
 * @param {*} res 
 */
(req, res) => {
  Object(_Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_3__["Execute"])(res, () => {
    const updatedQuizz = Object.assign({}, req.quizz);
    const id = req.quizz.questions.map(q => q.id).reduce((pv, cv) => pv > cv ? pv : cv, 0) + 1;
    req.body.id = id;
    updatedQuizz.questions.push(req.body);
    _Models_quizz_model__WEBPACK_IMPORTED_MODULE_2__["default"].update(updatedQuizz);
    new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_4__["default"]("Question successfully added !").send(res);
  });
});
questionManagementRouter.delete('/:question', _question_middleware__WEBPACK_IMPORTED_MODULE_5__["default"],
/**
 * @param {Request & { params: { id: string }, quizz: import('../../../Models/quizz.model').Quizz, question: import('../../../Models/quizz.model').Question }} req 
 * @param {*} res 
 */
(req, res) => {
  Object(_Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_3__["Execute"])(res, () => {
    const updatedQuizz = Object.assign({}, req.quizz);
    updatedQuizz.questions = updatedQuizz.questions.filter(q => q.id !== req.question.id);
    if (updatedQuizz.questions.length === req.quizz.questions.length) throw new _Errors_FileNotFound__WEBPACK_IMPORTED_MODULE_1__["default"]();
    _Models_quizz_model__WEBPACK_IMPORTED_MODULE_2__["default"].update(updatedQuizz);
    new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_4__["default"]("Question successfully deleted !").send(res);
  });
});
questionManagementRouter.put('/:question', _question_middleware__WEBPACK_IMPORTED_MODULE_5__["default"],
/**
 * @param {Request & { params: { id: string }, quizz: import('../../../Models/quizz.model').Quizz, question: import('../../../Models/quizz.model').Question }} req 
 * @param {*} res 
 */
(req, res) => {
  Object(_Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_3__["Execute"])(res, () => {
    const objToChange = req.body;
    delete objToChange.id;
    const result = Object.assign(req.question, objToChange);
    const index = req.quizz.questions.findIndex(q => q.id === result.id);
    const updatedQuizz = Object.assign({}, req.quizz);
    updatedQuizz.questions[index] = result;
    _Models_quizz_model__WEBPACK_IMPORTED_MODULE_2__["default"].update(updatedQuizz);
    new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_4__["default"]("Question successfully updated !").send(res);
  });
});
/* harmony default export */ __webpack_exports__["default"] = (questionManagementRouter);

/***/ }),

/***/ "./src/API/Quizz/Question/question.middleware.js":
/*!*******************************************************!*\
  !*** ./src/API/Quizz/Question/question.middleware.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Errors/ErrorSchield */ "./src/Errors/ErrorSchield.js");
/* harmony import */ var _Errors_QuestionIdParameterNotFound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Errors/QuestionIdParameterNotFound */ "./src/API/Quizz/Question/Errors/QuestionIdParameterNotFound.js");


/**
 * @param {Request & { quizz: import('../../../Models/quizz.model').Quizz }} req 
 * @param {*} res 
 * @param {*} next 
 */

/* harmony default export */ __webpack_exports__["default"] = (function (req, res, next) {
  Object(_Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_0__["Execute"])(res, () => {
    if (!req.params.question) throw new _Errors_QuestionIdParameterNotFound__WEBPACK_IMPORTED_MODULE_1__["default"]();
    const result = req.quizz.questions.find(q => q.id === req.params.question);
    if (!result) throw new FileNotFound();
    req.question = result;
    next();
  });
});

/***/ }),

/***/ "./src/API/Quizz/getters.js":
/*!**********************************!*\
  !*** ./src/API/Quizz/getters.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Errors/HttpMessage */ "./src/Errors/HttpMessage.js");
/* harmony import */ var _quizz_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./quizz.middleware */ "./src/API/Quizz/quizz.middleware.js");



const quizzGettersRouter = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
quizzGettersRouter.get('/:quizz', _quizz_middleware__WEBPACK_IMPORTED_MODULE_2__["default"], (req, res) => {
  new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_1__["default"](req.quizz).send(res);
});
/* harmony default export */ __webpack_exports__["default"] = (quizzGettersRouter);

/***/ }),

/***/ "./src/API/Quizz/index.js":
/*!********************************!*\
  !*** ./src/API/Quizz/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _getters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getters */ "./src/API/Quizz/getters.js");
/* harmony import */ var _manage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manage */ "./src/API/Quizz/manage.js");
/* harmony import */ var _Question__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Question */ "./src/API/Quizz/Question/index.js");
/* harmony import */ var _quizz_middleware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./quizz.middleware */ "./src/API/Quizz/quizz.middleware.js");





const quizzRouter = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
quizzRouter.use(_manage__WEBPACK_IMPORTED_MODULE_2__["default"]);
quizzRouter.use(_getters__WEBPACK_IMPORTED_MODULE_1__["default"]);
quizzRouter.use('/:quizz/question', _quizz_middleware__WEBPACK_IMPORTED_MODULE_4__["default"], _Question__WEBPACK_IMPORTED_MODULE_3__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (quizzRouter);

/***/ }),

/***/ "./src/API/Quizz/manage.js":
/*!*********************************!*\
  !*** ./src/API/Quizz/manage.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Errors/ErrorSchield */ "./src/Errors/ErrorSchield.js");
/* harmony import */ var _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Errors/HttpMessage */ "./src/Errors/HttpMessage.js");
/* harmony import */ var _Models_quizz_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Models/quizz.model */ "./src/Models/quizz.model.js");
/* harmony import */ var _quizz_middleware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./quizz.middleware */ "./src/API/Quizz/quizz.middleware.js");
/* harmony import */ var _Models_user_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Models/user.model */ "./src/Models/user.model.js");
/* harmony import */ var _Errors_FileNotFound__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Errors/FileNotFound */ "./src/Errors/FileNotFound.js");







const quizzManageRouter = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
quizzManageRouter.get('/all', (req, res) => {
  const result = _Models_quizz_model__WEBPACK_IMPORTED_MODULE_3__["default"].getAll(u => u != null);
  if (!result) throw new _Errors_FileNotFound__WEBPACK_IMPORTED_MODULE_6__["default"]();
  new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_2__["default"](result).send(res);
});
quizzManageRouter.post('/', (req, res) => {
  Object(_Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_1__["Execute"])(res, () => {
    _Models_quizz_model__WEBPACK_IMPORTED_MODULE_3__["default"].add(req.body);
    new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_2__["default"]("Quizz added successfully !").send(res);
  });
});
quizzManageRouter.put('/:quizz', _quizz_middleware__WEBPACK_IMPORTED_MODULE_4__["default"],
/**
 * 
 * @param { import('express').Request & { quizz: import('../../Models/quizz.model').Quizz }} req 
 * @param {*} res 
 */
(req, res) => {
  Object(_Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_1__["Execute"])(res, () => {
    req.body.id = req.quizz.id;
    _Models_quizz_model__WEBPACK_IMPORTED_MODULE_3__["default"].update(req.body);
    new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_2__["default"]("Quizz updated successfully !").send(res);
  });
});
quizzManageRouter.delete('/:quizz', _quizz_middleware__WEBPACK_IMPORTED_MODULE_4__["default"], (req, res) => {
  Object(_Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_1__["Execute"])(res, () => {
    _Models_quizz_model__WEBPACK_IMPORTED_MODULE_3__["default"].delete(req.params.quizz);
    new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_2__["default"]("Quizz deleted successfully !").send(res);
  });
});
/* harmony default export */ __webpack_exports__["default"] = (quizzManageRouter);

/***/ }),

/***/ "./src/API/Quizz/quizz.middleware.js":
/*!*******************************************!*\
  !*** ./src/API/Quizz/quizz.middleware.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Errors/ErrorSchield */ "./src/Errors/ErrorSchield.js");
/* harmony import */ var _Models_quizz_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Models/quizz.model */ "./src/Models/quizz.model.js");
/* harmony import */ var _Errors_QuizzIdParameterMustBeInt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Errors/QuizzIdParameterMustBeInt */ "./src/API/Quizz/Errors/QuizzIdParameterMustBeInt.js");
/* harmony import */ var _Errors_QuizzIdParameterNotFound__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Errors/QuizzIdParameterNotFound */ "./src/API/Quizz/Errors/QuizzIdParameterNotFound.js");




/* harmony default export */ __webpack_exports__["default"] = ((req, res, next) => {
  Object(_Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_0__["Execute"])(res, () => {
    if (!req.params.quizz) throw new _Errors_QuizzIdParameterNotFound__WEBPACK_IMPORTED_MODULE_3__["default"]();
    req.params.quizz = parseInt(req.params.quizz);
    if (isNaN(req.params.quizz)) throw new _Errors_QuizzIdParameterMustBeInt__WEBPACK_IMPORTED_MODULE_2__["QuizzIdParameterMustBeInt"]();
    const result = _Models_quizz_model__WEBPACK_IMPORTED_MODULE_1__["default"].getOne(q => q.id === req.params.quizz);
    if (!result) throw new FileNotFound();
    req.quizz = result;
    next();
  });
});

/***/ }),

/***/ "./src/API/User/getters.js":
/*!*********************************!*\
  !*** ./src/API/User/getters.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Errors/ErrorSchield */ "./src/Errors/ErrorSchield.js");
/* harmony import */ var _Errors_FileNotFound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Errors/FileNotFound */ "./src/Errors/FileNotFound.js");
/* harmony import */ var _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Errors/HttpMessage */ "./src/Errors/HttpMessage.js");
/* harmony import */ var _Models_user_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Models/user.model */ "./src/Models/user.model.js");
/* harmony import */ var _BasicErrors_IdMustBeANumber__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../BasicErrors/IdMustBeANumber */ "./src/API/BasicErrors/IdMustBeANumber.js");
/* harmony import */ var _Models_userAndQuizModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Models/userAndQuizModel */ "./src/Models/userAndQuizModel.js");







const gettersUsersRouter = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
gettersUsersRouter.get('/all', (req, res) => {
  const result = _Models_user_model__WEBPACK_IMPORTED_MODULE_4__["default"].getAll(u => u != null);
  if (!result) throw new _Errors_FileNotFound__WEBPACK_IMPORTED_MODULE_2__["default"]();
  new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_3__["default"](result).send(res);
});
gettersUsersRouter.get('/:id', (req, res, next) => {
  Object(_Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_1__["Execute"])(res, () => {
    if (!req.params.id) throw new IdParameterNotFound();
    req.params.id = parseInt(req.params.id);
    if (isNaN(req.params.id)) throw new _BasicErrors_IdMustBeANumber__WEBPACK_IMPORTED_MODULE_5__["default"]();
    const result = _Models_user_model__WEBPACK_IMPORTED_MODULE_4__["default"].getOne(u => u.id === req.params.id);
    if (!result) throw new _Errors_FileNotFound__WEBPACK_IMPORTED_MODULE_2__["default"]();
    new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_3__["default"](result).send(res);
  });
  next();
});
/* harmony default export */ __webpack_exports__["default"] = (gettersUsersRouter);

/***/ }),

/***/ "./src/API/User/index.js":
/*!*******************************!*\
  !*** ./src/API/User/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _getters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getters */ "./src/API/User/getters.js");
/* harmony import */ var _manage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manage */ "./src/API/User/manage.js");



const userRouter = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
userRouter.use(_getters__WEBPACK_IMPORTED_MODULE_1__["default"]);
userRouter.use(_manage__WEBPACK_IMPORTED_MODULE_2__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (userRouter);

/***/ }),

/***/ "./src/API/User/manage.js":
/*!********************************!*\
  !*** ./src/API/User/manage.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Errors/ErrorSchield */ "./src/Errors/ErrorSchield.js");
/* harmony import */ var _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Errors/HttpMessage */ "./src/Errors/HttpMessage.js");
/* harmony import */ var _Models_user_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Models/user.model */ "./src/Models/user.model.js");
/* harmony import */ var _BasicErrors_IdParameterNotFound__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../BasicErrors/IdParameterNotFound */ "./src/API/BasicErrors/IdParameterNotFound.js");





const manageUser = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
manageUser.post('/', (req, res) => {
  Object(_Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_1__["Execute"])(res, () => {
    _Models_user_model__WEBPACK_IMPORTED_MODULE_3__["default"].add(req.body);
    new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_2__["default"]("User added successfully !").send(res);
  });
});
manageUser.put('/:id', (req, res) => {
  Object(_Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_1__["Execute"])(res, () => {
    if (!req.params.id) throw new _BasicErrors_IdParameterNotFound__WEBPACK_IMPORTED_MODULE_4__["default"]();
    req.body.id = req.params.id;
    _Models_user_model__WEBPACK_IMPORTED_MODULE_3__["default"].update(req.body);
    new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_2__["default"]("User udpated successfully").send(res);
  });
});
manageUser.delete('/:id', (req, res) => {
  Object(_Errors_ErrorSchield__WEBPACK_IMPORTED_MODULE_1__["Execute"])(res, () => {
    if (!req.params.id) throw new _BasicErrors_IdParameterNotFound__WEBPACK_IMPORTED_MODULE_4__["default"]();
    _Models_user_model__WEBPACK_IMPORTED_MODULE_3__["default"].delete(req.params.id);
    new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_2__["default"]("User deleted successfully").send(res);
  });
});
/* harmony default export */ __webpack_exports__["default"] = (manageUser);

/***/ }),

/***/ "./src/API/UserAndQuiz/getters.js":
/*!****************************************!*\
  !*** ./src/API/UserAndQuiz/getters.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Models_userAndQuizModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Models/userAndQuizModel */ "./src/Models/userAndQuizModel.js");
/* harmony import */ var _Errors_FileNotFound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Errors/FileNotFound */ "./src/Errors/FileNotFound.js");
/* harmony import */ var _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Errors/HttpMessage */ "./src/Errors/HttpMessage.js");
/* harmony import */ var _BasicErrors_IdMustBeANumber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../BasicErrors/IdMustBeANumber */ "./src/API/BasicErrors/IdMustBeANumber.js");





const gettersUserAndQuizRouter = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
gettersUserAndQuizRouter.get('/all', (req, res, next) => {
  const result = _Models_userAndQuizModel__WEBPACK_IMPORTED_MODULE_1__["default"].getAll(u => u != null);
  if (!result) throw new _Errors_FileNotFound__WEBPACK_IMPORTED_MODULE_2__["default"]();
  new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_3__["default"](result).send(res);
  next();
});
gettersUserAndQuizRouter.get('/user/:id', (req, res, next) => {
  if (!req.params.id) throw new IdParameterNotFound();
  req.params.id = parseInt(req.params.id);
  if (isNaN(req.params.id)) throw new _BasicErrors_IdMustBeANumber__WEBPACK_IMPORTED_MODULE_4__["default"]();
  const result = _Models_userAndQuizModel__WEBPACK_IMPORTED_MODULE_1__["default"].getOne(u => u.id_user === req.params.id);
  if (!result) throw new _Errors_FileNotFound__WEBPACK_IMPORTED_MODULE_2__["default"]();
  new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_3__["default"](result).send(res);
  next();
});
gettersUserAndQuizRouter.get('/quiz/:id', (req, res, next) => {
  if (!req.params.id) throw new IdParameterNotFound();
  req.params.id = parseInt(req.params.id);
  if (isNaN(req.params.id)) throw new _BasicErrors_IdMustBeANumber__WEBPACK_IMPORTED_MODULE_4__["default"]();
  const result = _Models_userAndQuizModel__WEBPACK_IMPORTED_MODULE_1__["default"].getAll(u => u.answer.some(quiz => quiz.id_question === id));
  if (!result) throw new _Errors_FileNotFound__WEBPACK_IMPORTED_MODULE_2__["default"]();
  new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_3__["default"](result).send(res);
  next();
});
/* harmony default export */ __webpack_exports__["default"] = (gettersUserAndQuizRouter);

/***/ }),

/***/ "./src/API/UserAndQuiz/index.js":
/*!**************************************!*\
  !*** ./src/API/UserAndQuiz/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _getters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getters */ "./src/API/UserAndQuiz/getters.js");
/* harmony import */ var _manage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manage */ "./src/API/UserAndQuiz/manage.js");



const userAndQuizRouter = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
userAndQuizRouter.use(_getters__WEBPACK_IMPORTED_MODULE_1__["default"]);
userAndQuizRouter.use(_manage__WEBPACK_IMPORTED_MODULE_2__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (userAndQuizRouter);

/***/ }),

/***/ "./src/API/UserAndQuiz/manage.js":
/*!***************************************!*\
  !*** ./src/API/UserAndQuiz/manage.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Models_userAndQuizModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Models/userAndQuizModel */ "./src/Models/userAndQuizModel.js");
/* harmony import */ var _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Errors/HttpMessage */ "./src/Errors/HttpMessage.js");
/* harmony import */ var _BasicErrors_IdParameterNotFound__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../BasicErrors/IdParameterNotFound */ "./src/API/BasicErrors/IdParameterNotFound.js");




const manageUserAndQuizRouter = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
manageUserAndQuizRouter.post('/', (req, res) => {
  _Models_userAndQuizModel__WEBPACK_IMPORTED_MODULE_1__["default"].add(req.body);
  new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_2__["default"]("UserAndQuiz added successfully !").send(res);
});
manageUserAndQuizRouter.put('/:id', (req, res) => {
  if (!req.params.id) throw new _BasicErrors_IdParameterNotFound__WEBPACK_IMPORTED_MODULE_3__["default"]();
  req.body.id = req.params.id; //userAndQuizModel.update_second(req.params.id, req.body)

  _Models_userAndQuizModel__WEBPACK_IMPORTED_MODULE_1__["default"].update(req.body);
  new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_2__["default"]("UserAndQuiz udpated successfully").send(res);
});
manageUserAndQuizRouter.delete('/:id', (req, res) => {
  if (!req.params.id) throw new _BasicErrors_IdParameterNotFound__WEBPACK_IMPORTED_MODULE_3__["default"]();
  _Models_userAndQuizModel__WEBPACK_IMPORTED_MODULE_1__["default"].delete(req.params.id);
  new _Errors_HttpMessage__WEBPACK_IMPORTED_MODULE_2__["default"]("UserAndQuiz deleted successfully").send(res);
});
/* harmony default export */ __webpack_exports__["default"] = (manageUserAndQuizRouter);

/***/ }),

/***/ "./src/API/index.js":
/*!**************************!*\
  !*** ./src/API/index.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Quizz__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Quizz */ "./src/API/Quizz/index.js");
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./User */ "./src/API/User/index.js");
/* harmony import */ var _UserAndQuiz__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UserAndQuiz */ "./src/API/UserAndQuiz/index.js");




const apiRouter = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
apiRouter.use('/quizz', _Quizz__WEBPACK_IMPORTED_MODULE_1__["default"]);
apiRouter.use('/user', _User__WEBPACK_IMPORTED_MODULE_2__["default"]);
apiRouter.use('/userandquiz', _UserAndQuiz__WEBPACK_IMPORTED_MODULE_3__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (apiRouter);

/***/ }),

/***/ "./src/Database/BaseModel.js":
/*!***********************************!*\
  !*** ./src/Database/BaseModel.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseModel; });
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hapi/joi */ "@hapi/joi");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Errors_FileNotFound__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Errors/FileNotFound */ "./src/Errors/FileNotFound.js");
/* harmony import */ var _Errors_IdAlreadyUsed__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Errors/IdAlreadyUsed */ "./src/Database/Errors/IdAlreadyUsed.js");
/* harmony import */ var _Errors_InvalidScheme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Errors/InvalidScheme */ "./src/Database/Errors/InvalidScheme.js");






/**
 * @class
 * @template T
 */

class BaseModel {
  /**
   * @param {string} name 
   * @param { Joi.ObjectSchema<any> } model 
   */
  constructor(name, model) {
    this.name = name;
    this.filename = path__WEBPACK_IMPORTED_MODULE_2___default.a.resolve(`Database/${name}.dbb.json`);
    console.log(this.name);
    console.log(this.filename);
    this.model = model;
    this.content = [];
    if (!fs__WEBPACK_IMPORTED_MODULE_1___default.a.existsSync(this.filename)) fs__WEBPACK_IMPORTED_MODULE_1___default.a.writeFileSync(this.filename, '[]');
  }
  /**
   * @param {T} obj 
   */


  add(obj) {
    this.load();
    if (!obj.id) obj.id = this.content.map(o => o.id).reduce((pv, cv) => pv > cv ? pv : cv, 0) + 1;
    const result = this.model.validate(obj);
    if (result.error) throw new _Errors_InvalidScheme__WEBPACK_IMPORTED_MODULE_5__["default"](result.error);
    console.log(this.content.find(d => parseInt(d.id) === parseInt(result.value.id)));
    if (this.content.find(d => d.id === result.value.id)) throw new _Errors_IdAlreadyUsed__WEBPACK_IMPORTED_MODULE_4__["default"]();
    console.log("bonjour");
    this.content.push(result.value);
    this.save();
  }
  /**
   * @param {T} obj 
   */


  update(obj) {
    this.load();
    const result = this.model.validate(obj);
    if (result.error) throw new _Errors_InvalidScheme__WEBPACK_IMPORTED_MODULE_5__["default"](result.error);
    const i = this.content.findIndex(o => parseInt(o.id) === parseInt(obj.id));
    if (i === -1) throw new _Errors_FileNotFound__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.content[i] = obj;
    this.save();
  }

  delete(objId) {
    this.load();
    const i = this.content.findIndex(p => p.id === objId);
    if (i === -1) throw new _Errors_FileNotFound__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.content = this.content.filter(o => o.id !== objId);
    this.save();
  }
  /**
   * @param {(any) => boolean} predicate 
   */


  deleteAll(predicate) {
    this.load();
    this.content = this.content.filter(o => !predicate(o));
    this.save();
  }
  /**
   * @param {(any) => boolean} predicate
   * @returns {T}
   */


  getOne(predicate) {
    this.load();
    return this.content.find(predicate);
  }
  /**
   * @param {(any) => boolean} predicate 
   * @returns {T}
   */


  getAll(predicate) {
    this.load();
    return this.content.filter(predicate);
  }

  save() {
    fs__WEBPACK_IMPORTED_MODULE_1___default.a.writeFileSync(this.filename, JSON.stringify(this.content));
  }

  load() {
    const json = fs__WEBPACK_IMPORTED_MODULE_1___default.a.readFileSync(this.filename);
    this.content = JSON.parse(json);
  }

}

/***/ }),

/***/ "./src/Database/Errors/IdAlreadyUsed.js":
/*!**********************************************!*\
  !*** ./src/Database/Errors/IdAlreadyUsed.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IdAlreadyUsed; });
/* harmony import */ var _Errors_BadRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Errors/BadRequest */ "./src/Errors/BadRequest.js");

class IdAlreadyUsed extends _Errors_BadRequest__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.statusCode = "400.2";
    this.message = "The id provided for this object already used for another one";
  }

}

/***/ }),

/***/ "./src/Database/Errors/InvalidScheme.js":
/*!**********************************************!*\
  !*** ./src/Database/Errors/InvalidScheme.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InvalidSchemeError; });
/* harmony import */ var _Errors_BadRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Errors/BadRequest */ "./src/Errors/BadRequest.js");

class InvalidSchemeError extends _Errors_BadRequest__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(error) {
    super();
    this.statusCode = "400.1";
    this.data = error;
    this.message = "The provided object is invalid";
  }

}

/***/ }),

/***/ "./src/Errors/BadRequest.js":
/*!**********************************!*\
  !*** ./src/Errors/BadRequest.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BadRequest; });
/* harmony import */ var _HttpMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HttpMessage */ "./src/Errors/HttpMessage.js");

class BadRequest extends _HttpMessage__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({});
    this.code = 400;
    this.success = false;
    this.statusCode = "400";
  }

}

/***/ }),

/***/ "./src/Errors/ErrorSchield.js":
/*!************************************!*\
  !*** ./src/Errors/ErrorSchield.js ***!
  \************************************/
/*! exports provided: Execute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Execute", function() { return Execute; });
function Execute(res, action) {
  try {
    action();
  } catch (error) {
    if (error.send) error.send(res);else {
      console.error(error);
      res.sendStatus(500);
    }
  }
}

/***/ }),

/***/ "./src/Errors/FileNotFound.js":
/*!************************************!*\
  !*** ./src/Errors/FileNotFound.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FileNotFound; });
/* harmony import */ var _HttpMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HttpMessage */ "./src/Errors/HttpMessage.js");

class FileNotFound extends _HttpMessage__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super("File not found");
    this.code = 404;
    this.success = false;
    this.statusCode = "404";
    this.message = "The element you search for were not found.";
  }

}

/***/ }),

/***/ "./src/Errors/HttpMessage.js":
/*!***********************************!*\
  !*** ./src/Errors/HttpMessage.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HttpMessage; });
class HttpMessage {
  constructor(data) {
    this.success = true;
    this.message = "Success";
    this.statusCode = "200";
    this.data = data;
    this.code = 200;
  }

  send(res) {
    res.status(this.code).json({
      success: this.success,
      statusCode: this.statusCode,
      message: this.message,
      data: this.data
    });
  }

}

/***/ }),

/***/ "./src/Models/quizz.model.js":
/*!***********************************!*\
  !*** ./src/Models/quizz.model.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Database_BaseModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Database/BaseModel */ "./src/Database/BaseModel.js");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hapi/joi */ "@hapi/joi");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_1__);


/**
 * @typedef {{
 * id: string,
 * question_name: string
 * type: number,
 * answer: {
 *      is_correct: boolean,
 *      data: string 
 * }[]
 * }} Question
 */

/**
 * @typedef {{
 * id: number,
 * name: string,
 * difficulty: number,
 * questions: Question[]
 * }} Quizz
 */

/** @type { BaseModel<Quizz> } */

const quizzModel = new _Database_BaseModel__WEBPACK_IMPORTED_MODULE_0__["default"]('quizz', _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({
  id: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().min(0).required(),
  name: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required(),
  difficulty: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().min(0).max(3).default(0),
  privacy: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({
    is_public: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.boolean().default(true),
    users_access: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.array().items(_hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.number())
  }),
  questions: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.array().items(_hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({
    id: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required(),
    question_name: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required(),
    type: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().min(0).max(1).default(0),
    // 0 pour txt, 1 pour image
    answer: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.array().items(_hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({
      id_answer: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().min(1).max(4).required(),
      is_correct: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.boolean().default(false),
      data: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required()
    })).max(4).required()
  })).default([])
}));
/* harmony default export */ __webpack_exports__["default"] = (quizzModel);

/***/ }),

/***/ "./src/Models/user.model.js":
/*!**********************************!*\
  !*** ./src/Models/user.model.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Database_BaseModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Database/BaseModel */ "./src/Database/BaseModel.js");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hapi/joi */ "@hapi/joi");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_1__);


/** 
 * @typedef {{ 
 * id: number, 
 * surname: string, 
 * name: string, 
 * handicap: number, 
 * font_size: number,
 * birthday: Date, 
 * size_font_config: { 
 *      name: string, 
 *      size: number, 
 *      default: boolean }[] 
 * }} User 
 * */

/** @type { BaseModel<User> } */

const userModel = new _Database_BaseModel__WEBPACK_IMPORTED_MODULE_0__["default"]('users', _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({
  id: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().min(0).required(),
  surname: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required(),
  name: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required(),
  handicap: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().min(0).max(5).default(5),
  font_size: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().default(40),
  birthday: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.date().default("1962-12-19"),
  image_url: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().default("https://unsplash.com/photos/75xPHEQBmvA/download?force=true&w=1920"),
  note: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().default("Aucune"),
  size_font_configs: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.array().items(_hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({
    name: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required(),
    size: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().required(),
    default: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.boolean().default(false)
  }))
}));
/* harmony default export */ __webpack_exports__["default"] = (userModel);

/***/ }),

/***/ "./src/Models/userAndQuizModel.js":
/*!****************************************!*\
  !*** ./src/Models/userAndQuizModel.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Database_BaseModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Database/BaseModel */ "./src/Database/BaseModel.js");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hapi/joi */ "@hapi/joi");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_1__);


const userAndQuizModel = new _Database_BaseModel__WEBPACK_IMPORTED_MODULE_0__["default"]('userAndQuiz', _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({
  id: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().min(0).required(),
  id_user: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().min(0).required(),
  maded_quizzes: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.array().items(_hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({
    id_quiz: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().min(0).required(),
    score_user: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().min(0).required(),
    user_answers: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.array().items(_hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({
      id_question: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().min(0).required(),
      response_user: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().min(1).max(4).required()
    })).default([])
  })).default([])
}));
/* harmony default export */ __webpack_exports__["default"] = (userAndQuizModel);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./API */ "./src/API/index.js");
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! morgan */ "morgan");
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_4__);





const PORT = process.env.PORT || 3000;
const app = express__WEBPACK_IMPORTED_MODULE_0___default()();
app.disable('x-powered-by');
app.use(cors__WEBPACK_IMPORTED_MODULE_1___default()({}));
app.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());
app.use(morgan__WEBPACK_IMPORTED_MODULE_4___default()('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'));
app.use(_API__WEBPACK_IMPORTED_MODULE_3__["default"]);
app.get('/', (req, res) => {
  res.sendStatus(200);
});
app.use('*', (req, res) => res.status(404).end());
app.listen(PORT, () => {
  console.log("Server started successfully on : http://localhost:" + PORT);
});

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/CanardNocturne/Documents/Programmation/Web/PolyQuiz_PS6/back-end/src/index.js */"./src/index.js");


/***/ }),

/***/ "@hapi/joi":
/*!****************************!*\
  !*** external "@hapi/joi" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@hapi/joi");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=main.map