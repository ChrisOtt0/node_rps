import { routes } from "../src/0_routes/routes";
import request from "supertest";

const api = routes;

describe("Products, The GET with /id", () => {
    it("GET should get a single product", async () => {
      
      const result = await request(api).get("/api/products/6");
      expect(result.body).toEqual({"no":78,"name":"sugar","price":37});
      expect(result.status).toEqual(200);
    });
});













