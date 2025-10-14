import request from "supertest";
import { app } from "../src/services/websocket";

describe("GET /", () => {
    it("should return the running message", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toContain("Express server is running");
    });
});
