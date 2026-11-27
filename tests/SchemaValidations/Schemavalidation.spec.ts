import {request ,test,expect} from '@playwright/test';

import Ajv from "ajv";


test("Id Parameter Test", async ({ request }) => {
    const response = await request.get('/booking');
    console.log(await response.json());
});

test("GET Curl ",async({request})=>{
    
    const req=await request.get('/booking/101');
    const reqbody=await req.json();
    console.log(reqbody);

    expect(reqbody).toMatchObject({


        firstname:expect.any(String),
        lastname:expect.any(String),
        totalprice:expect.any(Number),
        depositpaid:expect.any(Boolean),
        bookingdates:
        {

            checkin:expect.any(String),
            checkout:expect.any(String)

        },
         additionalneeds:expect.any(String)

    });
});


test( "AJV Schema Validation",async({request})=>{


const response = await request.get('/booking/69');
    const responseBody = await response.json();


    const schema={
  "type": "object",
  "properties": {
    "firstname": {
      "type": "string"
    },
    "lastname": {
      "type": "string"
    },
    "totalprice": {
      "type": "integer"
    },
    "depositpaid": {
      "type": "boolean"
    },
    "bookingdates": {
      "type": "object",
      "properties": {
        "checkin": {
          "type": "string"
        },
        "checkout": {
          "type": "string"
        }
      },
      "required": [
        "checkin",
        "checkout"
      ]
    },
    "additionalneeds": {
      "type": "string"
    }
  },
  "required": [
    "firstname",
    "lastname",
    "totalprice",
    "depositpaid",
    "bookingdates",
    "additionalneeds"
  ]
}

  console.log(responseBody);

  
const ajv = new Ajv();
const validatebody = ajv.compile(schema);
const result = validatebody(responseBody);


console.log(result);
if (!result) {
  console.log(validatebody.errors);
}
  

});
