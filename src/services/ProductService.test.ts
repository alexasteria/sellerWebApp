import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProductService } from "./ProductService";
import { Api } from "@/backendApi";
import { AxiosResponse } from "axios";
import { SellerGoApiInternalApientProductResponse } from "@/backendApi";

describe("ProductService", () => {
  let apiMock: any;
  let productService: ProductService;

  beforeEach(() => {
    apiMock = {
      products: {
        productsList: vi.fn(),
      },
    };
    productService = new ProductService(apiMock as unknown as Api<unknown>);
    vi.clearAllMocks();
  });

  it("should fetch products without categoryId", async () => {
    const mockData = [{ id: 1, title: "Product 1" }] as unknown as SellerGoApiInternalApientProductResponse[];
    const mockResponse: AxiosResponse<SellerGoApiInternalApientProductResponse[]> = {
      data: mockData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    };
    apiMock.products.productsList.mockResolvedValueOnce(mockResponse);

    const result = await productService.fetchProducts();
    
    expect(apiMock.products.productsList).toHaveBeenCalledWith({ category_id: undefined, visible_only: true });
    expect(result).toEqual(mockData);
  });

  it("should fetch products with categoryId", async () => {
    const mockData = [{ id: 2, title: "Product 2" }] as unknown as SellerGoApiInternalApientProductResponse[];
    const mockResponse: AxiosResponse<SellerGoApiInternalApientProductResponse[]> = {
      data: mockData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    };
    apiMock.products.productsList.mockResolvedValueOnce(mockResponse);

    const result = await productService.fetchProducts(5);
    
    expect(apiMock.products.productsList).toHaveBeenCalledWith({ category_id: 5, visible_only: true });
    expect(result).toEqual(mockData);
  });

  it("should throw error on API error", async () => {
    apiMock.products.productsList.mockRejectedValueOnce(new Error("Network error"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    
    await expect(productService.fetchProducts()).rejects.toThrow("Network error");
    
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
});
