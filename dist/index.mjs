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
export {
  getExpressHandler,
  getExpressMiddleware
};
//# sourceMappingURL=index.mjs.map