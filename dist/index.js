var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  getExpressHandler: () => getExpressHandler,
  getExpressMiddleware: () => getExpressMiddleware
});
module.exports = __toCommonJS(lib_exports);

// lib/functioneer-express.ts
function getExpressHandler(runner, dataSource, functionName) {
  if (functionName) {
    if (dataSource === "QUERY") {
      return async (req, res, next) => {
        const queryObject = { functionName };
        for (let q in req.query) {
          queryObject[q] = req.query[q];
        }
        queryObject.functionName = functionName;
        const result = await runner.runObj(queryObject);
        res.send(result);
      };
    } else if (dataSource === "PARAMS") {
      return async (req, res, next) => {
        const queryObject = { functionName };
        for (let q in req.params) {
          queryObject[q] = req.params[q];
        }
        queryObject.functionName = functionName;
        const result = await runner.runObj(queryObject);
        res.send(result);
      };
    } else {
      return async (req, res, next) => {
        const result = await runner.runObj({ ...req.body, functionName });
        res.send(result);
      };
    }
  } else {
    if (dataSource === "QUERY") {
      return async (req, res, next) => {
        if (!req.query.functionName) {
          throw "functionName is required in query";
        }
        const queryObject = {
          functionName: req.query.functionName
        };
        for (let q in req.query) {
          queryObject[q] = req.query[q];
        }
        const result = await runner.runObj(queryObject);
        res.send(result);
      };
    } else if (dataSource === "PARAMS") {
      return async (req, res, next) => {
        if (!req.params.functionName) {
          throw "functionName is required in query";
        }
        const queryObject = {
          functionName: req.params.functionName
        };
        for (let q in req.params) {
          queryObject[q] = req.params[q];
        }
        const result = await runner.runObj(queryObject);
        res.send(result);
      };
    } else {
      return async (req, res, next) => {
        if (!req.body.functionName) {
          throw "functionName is required in body";
        }
        const result = await runner.runObj({ ...req.body });
        res.send(result);
      };
    }
  }
}
function getExpressMiddleware(runner, dataSource, functionName) {
  if (functionName) {
    if (dataSource === "QUERY") {
      return async (req, res, next) => {
        const queryObject = { functionName };
        for (let q in req.query) {
          queryObject[q] = req.query[q];
        }
        queryObject.functionName = functionName;
        const result = await runner.runObj(queryObject);
        req["functionResult"] = result;
        next();
      };
    } else if (dataSource === "PARAMS") {
      return async (req, res, next) => {
        const queryObject = { functionName };
        for (let q in req.params) {
          queryObject[q] = req.params[q];
        }
        queryObject.functionName = functionName;
        const result = await runner.runObj(queryObject);
        req["functionResult"] = result;
        next();
      };
    } else {
      return async (req, res, next) => {
        const result = await runner.runObj({ ...req.body, functionName });
        req["functionResult"] = result;
        next();
      };
    }
  } else {
    if (dataSource === "QUERY") {
      return async (req, res, next) => {
        if (!req.query.functionName) {
          throw "functionName is required in query";
        }
        const queryObject = {
          functionName: req.query.functionName
        };
        for (let q in req.query) {
          queryObject[q] = req.query[q];
        }
        const result = await runner.runObj(queryObject);
        req["functionResult"] = result;
        next();
      };
    } else if (dataSource === "PARAMS") {
      return async (req, res, next) => {
        if (!req.params.functionName) {
          throw "functionName is required in params";
        }
        const queryObject = {
          functionName: req.params.functionName
        };
        for (let q in req.params) {
          queryObject[q] = req.params[q];
        }
        const result = await runner.runObj(queryObject);
        req["functionResult"] = result;
        next();
      };
    } else {
      return async (req, res, next) => {
        if (!req.body.functionName) {
          throw "functionName is required in body";
        }
        const result = await runner.runObj({
          ...req.body,
          functionName: req.body.functionName
        });
        req["functionResult"] = result;
        next();
      };
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getExpressHandler,
  getExpressMiddleware
});
//# sourceMappingURL=index.js.map