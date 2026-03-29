import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitOrder } from "./OrderService";
import { apiClient } from "@/apiClient";
import { CartState } from "@/types";
import { ModelsProduct, ModelsOrder } from "@/backendApi";
import { AxiosResponse } from "axios";

// Mock the apiClient
vi.mock("@/apiClient", () => ({
  apiClient: {
    orders: {
      ordersCreate: vi.fn(),
    },
  },
}));

describe("OrderService", () => {
  const mockProducts = [
    {
      id: 1,
      title: "Product 1",
      variants: [{ id: 101, cost: 10.00, stock: 10, value: "Small", product_id: 1, tenant_id: 1 }],
      discount: 0,
    },
    {
      id: 2,
      title: "Product 2",
      variants: [{ id: 201, cost: 20.00, stock: 10, value: "Standard", product_id: 2, tenant_id: 1 }],
      discount: 10, // 10%
    },
  ] as unknown as ModelsProduct[];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not submit an empty order", async () => {
    const cart: CartState = {};
    const result = await submitOrder(cart, mockProducts, 123, null);
    
    expect(apiClient.orders.ordersCreate).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("should skip products or variants that do not exist", async () => {
    // Product 99 doesn't exist, variant 901 doesn't exist
    const cart: CartState = { "99": { "901": 1 } };
    const result = await submitOrder(cart, mockProducts, 123, null);
    
    expect(apiClient.orders.ordersCreate).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("should create order payload correctly with discounts", async () => {
    const cart: CartState = {
      "1": { "101": 2 }, // Product 1, Variant 101 (cost 10, discount 0) -> price 10
      "2": { "201": 1 }, // Product 2, Variant 201 (cost 20, discount 10) -> price 18
    };

    const mockResponseData = { id: 999, total_amount: 38 } as unknown as ModelsOrder;
    const mockResponse: AxiosResponse<ModelsOrder> = {
      data: mockResponseData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    };
    vi.mocked(apiClient.orders.ordersCreate).mockResolvedValueOnce(mockResponse);

    const result = await submitOrder(cart, mockProducts, 123, null);

    expect(apiClient.orders.ordersCreate).toHaveBeenCalledWith({
      userID: 123,
      cart: [
        { productID: 1, variantID: 101, quantity: 2, price: 10.00 },
        { productID: 2, variantID: 201, quantity: 1, price: 18.00 },
      ],
    });
    expect(result).toEqual(mockResponseData);
  });

  it("should return null on API error", async () => {
    const cart: CartState = { "1": { "101": 1 } };
    vi.mocked(apiClient.orders.ordersCreate).mockRejectedValueOnce(new Error("API Error"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    
    const result = await submitOrder(cart, mockProducts, 123, null);
    
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });
});
