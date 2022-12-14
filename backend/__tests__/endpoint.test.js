//https://zellwk.com/blog/endpoint-testing/
// const app = require('./index') // Link to your server file
// const supertest = require('supertest')
// const request = supertest(app)

import app from "../src/app"
import request from "supertest";
import { expect } from "@playwright/test";

describe("get all db", () => {
    it("/urls", async () => {
        const res = await request(app)
            .get("/urls")
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body[0].url).toEqual("string")
    });
});

describe("search quary", () => {
    it("/search", async () => {
        const res = await request(app)
            .get("/search").query({ url: "https://www.facebook.com/" })
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body[0].url).toEqual("string")
    });
});

describe("post request", () => {
    it("/speedurl", async () => {
        const res = await request(app)
            .post("/speedurl").send({ url: "https://www.blocket.se/", match: "face" })
        expect(res.statusCode).toEqual(200);
        expect(res.body[0].url).toEqual("https://www.blocket.se/")
        expect(parseInt(res.body[0].matches)).toBeGreaterThan(-1)
    });
});