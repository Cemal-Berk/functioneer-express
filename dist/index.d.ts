import { Request, Response, NextFunction } from 'express';
import { Functioneer } from 'functioneer';

/**
 * Gets an express middleware for running a function. The function result
 * will be sent as a response
 * @param runner The function runner
 * @param dataSource Where to get the input data from
 * @param functionName The function name to be executed. If null the function name will be taken from the input data
 * @returns async (req: Request, res: Response, next: NextFunction)
 */
declare function getExpressHandler(runner: Functioneer, dataSource: "BODY" | "PARAMS" | "QUERY", functionName?: string): (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Gets an express middleware for running a function. The function result
 * will be stored in req.functionResult
 * @param runner The function runner
 * @param dataSource Where to get the input data from
 * @param functionName The function name to be executed, if null the function name will be taken from the input data
 * @returns async (req: Request, res: Response, next: NextFunction)
 */
declare function getExpressMiddleware(runner: Functioneer, dataSource: "BODY" | "PARAMS" | "QUERY", functionName?: string): (req: Request, res: Response, next: NextFunction) => Promise<void>;

export { getExpressHandler, getExpressMiddleware };
