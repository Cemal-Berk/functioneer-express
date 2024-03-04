import { Request, Response, NextFunction } from "express";
import { Functioneer, FunctionObjectCall } from "functioneer";

/**
 * Gets an express middleware for running a function. The function result
 * will be sent as a response
 * @param runner The function runner
 * @param dataSource Where to get the input data from
 * @param functionName The function name to be executed. If null the function name will be taken from the input data
 * @returns async (req: Request, res: Response, next: NextFunction)
 */
export function getExpressHandler(
  runner: Functioneer,
  dataSource: "BODY" | "PARAMS" | "QUERY",
  functionName?: string
) {
  if (functionName) {
    if (dataSource === "QUERY") {
      return async (req: Request, res: Response, next: NextFunction) => {
        const queryObject: FunctionObjectCall = { functionName };
        for (let q in req.query) {
          queryObject[q] = req.query[q];
        }
        queryObject.functionName = functionName;
        const result = await runner.runObj(queryObject);
        res.send(result);
      };
    } else if (dataSource === "PARAMS") {
      return async (req: Request, res: Response, next: NextFunction) => {
        const queryObject: FunctionObjectCall = { functionName };
        for (let q in req.params) {
          queryObject[q] = req.params[q];
        }
        queryObject.functionName = functionName;
        const result = await runner.runObj(queryObject);
        res.send(result);
      };
    } else {
      return async (req: Request, res: Response, next: NextFunction) => {
        const result = await runner.runObj({ ...req.body, functionName });

        res.send(result);
      };
    }
  } else {
    if (dataSource === "QUERY") {
      return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.functionName) {
          throw "functionName is required in query";
        }
        const queryObject: FunctionObjectCall = {
          functionName: req.query.functionName as string,
        };
        for (let q in req.query) {
          queryObject[q] = req.query[q];
        }

        const result = await runner.runObj(queryObject);
        res.send(result);
      };
    } else if (dataSource === "PARAMS") {
      return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.functionName) {
          throw "functionName is required in query";
        }
        const queryObject: FunctionObjectCall = {
          functionName: req.params.functionName as string,
        };
        for (let q in req.params) {
          queryObject[q] = req.params[q];
        }

        const result = await runner.runObj(queryObject);
        res.send(result);
      };
    } else {
      return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.functionName) {
          throw "functionName is required in body";
        }
        const result = await runner.runObj({ ...req.body });

        res.send(result);
      };
    }
  }
}

/**
 * Gets an express middleware for running a function. The function result
 * will be stored in req.functionResult
 * @param runner The function runner
 * @param dataSource Where to get the input data from
 * @param functionName The function name to be executed, if null the function name will be taken from the input data
 * @returns async (req: Request, res: Response, next: NextFunction)
 */
export function getExpressMiddleware(
  runner: Functioneer,
  dataSource: "BODY" | "PARAMS" | "QUERY",
  functionName?: string
) {
  if (functionName) {
    if (dataSource === "QUERY") {
      return async (req: Request, res: Response, next: NextFunction) => {
        const queryObject: FunctionObjectCall = { functionName };
        for (let q in req.query) {
          queryObject[q] = req.query[q];
        }
        queryObject.functionName = functionName;
        const result = await runner.runObj(queryObject);
        req["functionResult"] = result;
        next();
      };
    } else if (dataSource === "PARAMS") {
      return async (req: Request, res: Response, next: NextFunction) => {
        const queryObject: FunctionObjectCall = { functionName };
        for (let q in req.params) {
          queryObject[q] = req.params[q];
        }
        queryObject.functionName = functionName;
        const result = await runner.runObj(queryObject);
        req["functionResult"] = result;
        next();
      };
    } else {
      return async (req: Request, res: Response, next: NextFunction) => {
        const result = await runner.runObj({ ...req.body, functionName });
        req["functionResult"] = result;
        next();
      };
    }
  } else {
    if (dataSource === "QUERY") {
      return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.functionName) {
          throw "functionName is required in query";
        }
        const queryObject: FunctionObjectCall = {
          functionName: req.query.functionName as string,
        };
        for (let q in req.query) {
          queryObject[q] = req.query[q];
        }
        const result = await runner.runObj(queryObject);
        req["functionResult"] = result;
        next();
      };
    } else if (dataSource === "PARAMS") {
      return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.functionName) {
          throw "functionName is required in params";
        }
        const queryObject: FunctionObjectCall = {
          functionName: req.params.functionName as string,
        };
        for (let q in req.params) {
          queryObject[q] = req.params[q];
        }
        const result = await runner.runObj(queryObject);
        req["functionResult"] = result;
        next();
      };
    } else {
      return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.functionName) {
          throw "functionName is required in body";
        }
        const result = await runner.runObj({
          ...req.body,
          functionName: req.body.functionName as string,
        });
        req["functionResult"] = result;
        next();
      };
    }
  }
}
