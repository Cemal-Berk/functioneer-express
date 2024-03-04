# Functioneer-express

Helper functions for [Functioneer](https://github.com/Cemal-Berk/functioneer) - for use with Express framework.

## Installation

Run `npm install functioneer-express` and import to your project.

## Usage

Declare a function:

    import {Functioneer} from "functioneer";
    import { getExpressHandler} from "functioneer-express";
    const func = new Functioneer();
    //Declare a function to add two numbers
    func.registerFunction("add", "Adds two numbers", (a: number, b: number) => {
        return a + b;
    })
    .addField("a", "number", "The first number to add")
    .addField("b", "number", "The second number to add");

Use the express handler for a path

    const app = express();
    app.post("/functions", getExpressHandler(func, "BODY");
    await app.listen(8080);

## Exposed methods

Both methods exposed by functioneer-express run a declared function based on request parameters:


`getExpressHandler(functioneerInstance,dataSource,functionName?)`

`getExpressMiddleware(functioneerInstance,dataSource,functionName?)`

| arguement           | type        |                                                                                       |
| ------------------- | ----------- | ------------------------------------------------------------------------------------- |
| functioneerInstance | Functioneer | An instance of Functioneer                                                            |
| dataSource          | string      | Where to get the function arguements from ("BODY" or "PARAMS" or "QUERY") |
| functionName        | string?     | The function to be called. If null then select the function name from the data source |

The behavior after running the exposed methods is different:
| method | description |
|--------|--------|
| getExpressHandler | Runs function and retuns result to client as request body with 200 status |
| getExpressMiddleware | Runs a function and stores the result in request.functionResult. When function execution execution of the middleware stack continues

## Dynamic function selection

As mentioned before you can either hardcode the function to run or parse it through the dataSource:

    const func = new Functioneer();
    func.registerFunction("add", "Adds two numbers", (a: number, b: number) => { return a + b; }).
    addField("a", "number", "The first number to add").
    addField("b", "number", "The second number to add");

    const app = express();
    // This will run the add function
    app.post("/functionsAdd", getExpressHandler(func,"BODY","add"));

    // This will run any function specified in request.body.functionName
    app.post("/functionsAll", getExpressHandler(func,"BODY"));

## Data sources

The following data sources are supported:

| Data source    | value    |                                                                                                                                                                     |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Request body   | "BODY"   | JSON data from request body                                                                                                                                         |
| URL parameters | "PARAMS" | URL parameters as set up in express. For example : `app.post("/functionsAdd/:a/:b",getExpressHandler(func,"PARAMS","add"));`                                        |
| Query string   | "QUERY"  | Query string parameters as set by client. For example a request to /functionsAdd?a=1&b=2 will match `app.get("/funtionsAdd",getExpressHandler(func,"QUERY","add"))` |

# Building and testing

You can build the project by running `npm run build`.
Tests are run by running `npm run test`

# License

Functioneer-express is licensed under MIT license
