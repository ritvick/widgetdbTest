# WigetDB Simulation

### Goal
To use in memory DB https://github.com/stuartking/widgetdb abnd create a web service around it to GET, PUT and Create resource on the server.

### Run
Please execute following commands 
```
npm run setup
npm start
```
This will install all the node dependencies and will start ther server on port 3000. 

### Test
You can use postman to fire api requests on the server. 
Following are the sample request and response objects for different requests

Note: Please set Content-type to application-json in request headers

1. [POST] http://localhost:3000/api/v1/widgetdb
    
    Request Object 
    {
      "value": "234"
    }

    Response:
    {
        "id": "bda65841-b965-4905-a268-a2819c005d14"
    }
    
      Error: 422 - If the "value" key does not exists. 
    
2. [GET] http://localhost:3000/api/v1/widgetdb/bda65841-b965-4905-a268-a2819c005d14

    Response:
    {
        "id": "bda65841-b965-4905-a268-a2819c005d14",
        "value": "234"
    }

      Error: 404 - if the resource is not found on the server. 

3. [PUT] http://localhost:3000/api/v1/widgetdb/bda65841-b965-4905-a268-a2819c005d14

    Request
    {
      "value": "newValue"
    }

    Response
    {
        "id": "bda65841-b965-4905-a268-a2819c005d14",
        "value": "newValue"
    }
    
      Error: 
      404 - If the resource is not found on the server
      422 - If the "value" key does not exists.
