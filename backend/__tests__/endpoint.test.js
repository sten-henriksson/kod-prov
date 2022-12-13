//https://zellwk.com/blog/endpoint-testing/
// const app = require('./index') // Link to your server file
// const supertest = require('supertest')
// const request = supertest(app)

import app from "../src/app"
import request from "supertest";

describe("GET / - a simple api endpoint", () => {
    it("Hello API Request", async () => {
        const res = await request(app)
            .get("/urls")
        console.log(typeof res.body[0].url);
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body[0].url).toEqual("string")
    });
});

describe("GET / - a simple api endpoint", () => {
    it("Hello API Request", async () => {
        const res = await request(app)
            .get("/search").query({url:"facebook"})
        console.log(res.body);
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body[0].url).toEqual("string")
    });
});

