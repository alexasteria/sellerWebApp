import { describe, it, expect } from "vitest";
import { CartService } from "./CartService";
import { ModelsProduct } from "@/backendApi";
import { CartState } from "@/types";

describe("CartService", () => {
  const cartService = new CartService();

  const mockProducts = [
    {
      id: 1,
      title: "Test Product 1",
      variants: [
        { id: 101, cost: 10.00, stock: 10, value: "Small", product_id: 1, tenant_id: 1 },
        { id: 102, cost: 15.00, stock: 5, value: "Large", product_id: 1, tenant_id: 1 },
      ],
      discount: 0,
    },
    {
      id: 2,
      title: "Test Product 2",
      variants: [
        { id: 201, cost: 20.00, stock: 10, value: "Standard", product_id: 2, tenant_id: 1 },
      ],
      discount: 10, // 10% discount
    },
  ] as unknown as ModelsProduct[];

  describe("increment", () => {
    it("should add a new item to an empty cart", () => {
      let cart: CartState = {};
      cart = cartService.increment(cart, mockProducts[0], 101);
      expect(cart).toEqual({ "1": { "101": 1 } });
    });

    it("should increment quantity if item already exists", () => {
      let cart: CartState = {};
      cart = cartService.increment(cart, mockProducts[0], 101);
      cart = cartService.increment(cart, mockProducts[0], 101);
      expect(cart).toEqual({ "1": { "101": 2 } });
    });

    it("should add a different variant of the same product", () => {
      let cart: CartState = {};
      cart = cartService.increment(cart, mockProducts[0], 101);
      cart = cartService.increment(cart, mockProducts[0], 102);
      expect(cart).toEqual({ "1": { "101": 1, "102": 1 } });
    });
  });

  describe("decrement", () => {
    it("should decrement quantity", () => {
      let cart: CartState = {};
      cart = cartService.increment(cart, mockProducts[0], 101);
      cart = cartService.increment(cart, mockProducts[0], 101);
      cart = cartService.decrement(cart, mockProducts[0], 101);
      expect(cart).toEqual({ "1": { "101": 1 } });
    });

    it("should remove variant entry when quantity becomes 0", () => {
      let cart: CartState = {};
      cart = cartService.increment(cart, mockProducts[0], 101);
      cart = cartService.increment(cart, mockProducts[0], 102);
      cart = cartService.increment(cart, mockProducts[0], 102);
      cart = cartService.decrement(cart, mockProducts[0], 101);
      expect(cart).toEqual({ "1": { "102": 2 } });
    });

    it("should remove product entry entirely when no variants left", () => {
      let cart: CartState = {};
      cart = cartService.increment(cart, mockProducts[0], 101);
      cart = cartService.decrement(cart, mockProducts[0], 101);
      expect(cart).toEqual({});
    });

    it("should do nothing if item is not in cart", () => {
      let cart: CartState = {};
      cart = cartService.increment(cart, mockProducts[0], 101);
      cart = cartService.decrement(cart, mockProducts[1], 201);
      expect(cart).toEqual({ "1": { "101": 1 } });
    });
  });

  describe("calculateTotal", () => {
    it("should return 0 for an empty cart", () => {
      let cart: CartState = {};
      const total = cartService.calculateTotal(cart, mockProducts);
      expect(total).toBe(0);
    });

    it("should calculate correct total without discounts", () => {
      let cart: CartState = {};
      cart = cartService.increment(cart, mockProducts[0], 101);
      cart = cartService.increment(cart, mockProducts[0], 101);
      cart = cartService.increment(cart, mockProducts[0], 102);
      // (2 * 10) + (1 * 15) = 35
      const total = cartService.calculateTotal(cart, mockProducts);
      expect(total).toBe(35.00);
    });

    it("should calculate correct total with discounts", () => {
      let cart: CartState = {};
      cart = cartService.increment(cart, mockProducts[1], 201);
      cart = cartService.increment(cart, mockProducts[1], 201);
      // Discounted: 20 * 0.9 = 18. (2 * 18) = 36
      const total = cartService.calculateTotal(cart, mockProducts);
      expect(total).toBe(36.00);
    });

    it("should calculate complex cart total correctly", () => {
      let cart: CartState = {};
      cart = cartService.increment(cart, mockProducts[0], 101);
      cart = cartService.increment(cart, mockProducts[0], 102);
      cart = cartService.increment(cart, mockProducts[1], 201);
      // 25 + 18 = 43
      const total = cartService.calculateTotal(cart, mockProducts);
      expect(total).toBe(43.00);
    });
  });
});
