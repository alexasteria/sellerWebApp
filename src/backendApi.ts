/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ModelsCartItem {
  price: number;
  productID: string;
  quantity: number;
  variantID: string;
}

export interface ModelsCategory {
  created_at?: string;
  id?: string;
  name?: string;
  updated_at?: string;
}

export interface ModelsCreateOrderRequest {
  cart: ModelsCartItem[];
  userID: number;
}

export interface ModelsCreateProductRequest {
  categoryID: string;
  description?: string;
  discount?: number;
  img?: string;
  tags?: ModelsProductTagGroup;
  title: string;
  variants: ModelsProductVariant[];
}

export interface ModelsLoginRequest {
  login: string;
  password: string;
}

export interface ModelsOrder {
  created_at: string;
  id: number;
  order_items?: ModelsOrderItem[];
  status: string;
  tg_user_id: number;
  total_amount: number;
  updated_at: string;
}

export interface ModelsOrderItem {
  created_at?: string;
  order_id?: number;
  price?: number;
  product_id?: string;
  quantity?: number;
  total_price?: number;
  variant_id?: string;
}

export interface ModelsProduct {
  categoryID: string;
  createdAt?: string;
  description?: string;
  discount?: number;
  id?: string;
  img?: string;
  tags?: ModelsProductTagGroup;
  title: string;
  updatedAt?: string;
  variants: ModelsProductVariant[];
}

export interface ModelsProductTagGroup {
  id?: string;
  name: string;
  product_id?: string;
  tags: string[];
}

export interface ModelsProductVariant {
  cost: number;
  createdAt?: string;
  id?: string;
  product_id?: string;
  stock: number;
  updatedAt?: string;
  value: string;
}

export interface ModelsShopOwner {
  created_at?: string;
  email?: string;
  first_name?: string;
  id?: string;
  /** Nullable */
  last_name?: string;
  login?: string;
  /** Plain text password for requests */
  password?: string;
  /** Nullable */
  phone_number?: string;
  updated_at?: string;
}

export interface ModelsTenant {
  code?: string;
  created_at?: string;
  id?: string;
  is_active?: boolean;
  name?: string;
  updated_at?: string;
}

export interface ModelsTgBotUser {
  auth_date?: string;
  contact_info?: string;
  created_at?: string;
  delivery_address?: string;
  email?: string;
  first_name?: string;
  id?: number;
  is_bot?: boolean;
  language_code?: string;
  last_name?: string;
  photo_url?: string;
  role?: string;
  updated_at?: string;
  username?: string;
}

export interface ModelsUpdateOrderStatusRequest {
  status: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || import.meta.env.VITE_API_BASE_URL || "/api",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title SellerGo API
 * @version 1.0
 * @baseUrl //localhost:8085
 * @contact
 *
 * This is a sample API for managing users.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  admin = {
    /**
     * @description Get a list of all registered shop owners
     *
     * @tags shop-owners
     * @name UsersList
     * @summary Get a list of shop owners
     * @request GET:/admin/users
     */
    usersList: (params: RequestParams = {}) =>
      this.request<ModelsShopOwner[], string>({
        path: `/admin/users`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new shop owner with the provided details
     *
     * @tags shop-owners
     * @name UsersCreate
     * @summary Create a new shop owner
     * @request POST:/admin/users
     */
    usersCreate: (shopOwner: ModelsShopOwner, params: RequestParams = {}) =>
      this.request<ModelsShopOwner, string>({
        path: `/admin/users`,
        method: "POST",
        body: shopOwner,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a shop owner by its ID
     *
     * @tags shop-owners
     * @name UsersDelete
     * @summary Delete a shop owner
     * @request DELETE:/admin/users/{id}
     */
    usersDelete: (id: string, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/admin/users/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a single shop owner by its ID
     *
     * @tags shop-owners
     * @name UsersDetail
     * @summary Get a single shop owner
     * @request GET:/admin/users/{id}
     */
    usersDetail: (id: string, params: RequestParams = {}) =>
      this.request<ModelsShopOwner, string>({
        path: `/admin/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing shop owner with the provided details
     *
     * @tags shop-owners
     * @name UsersUpdate
     * @summary Update an existing shop owner
     * @request PUT:/admin/users/{id}
     */
    usersUpdate: (
      id: string,
      shopOwner: ModelsShopOwner,
      params: RequestParams = {},
    ) =>
      this.request<ModelsShopOwner, string>({
        path: `/admin/users/${id}`,
        method: "PUT",
        body: shopOwner,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * @description Authenticates a shop owner with login and password, returning a JWT token.
     *
     * @tags auth
     * @name LoginCreate
     * @summary Shop owner login
     * @request POST:/auth/login
     */
    loginCreate: (request: ModelsLoginRequest, params: RequestParams = {}) =>
      this.request<Record<string, string>, string>({
        path: `/auth/login`,
        method: "POST",
        body: request,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Authenticates a user from the Telegram Web App. If the user does not exist, it creates a new user.
     *
     * @tags users
     * @name TgWebAppCreate
     * @summary Authenticate a Telegram Web App user
     * @request POST:/auth/tg-web-app
     */
    tgWebAppCreate: (user: ModelsTgBotUser, params: RequestParams = {}) =>
      this.request<Record<string, string>, string>({
        path: `/auth/tg-web-app`,
        method: "POST",
        body: user,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  categories = {
    /**
     * @description Get a list of all registered categories
     *
     * @tags categories
     * @name CategoriesList
     * @summary Get a list of categories
     * @request GET:/categories
     */
    categoriesList: (params: RequestParams = {}) =>
      this.request<ModelsCategory[], string>({
        path: `/categories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new category with the provided details
     *
     * @tags categories
     * @name CategoriesCreate
     * @summary Create a new category
     * @request POST:/categories
     */
    categoriesCreate: (category: ModelsCategory, params: RequestParams = {}) =>
      this.request<ModelsCategory, string>({
        path: `/categories`,
        method: "POST",
        body: category,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a category by its ID
     *
     * @tags categories
     * @name CategoriesDelete
     * @summary Delete a category
     * @request DELETE:/categories/{id}
     */
    categoriesDelete: (id: number, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/categories/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a single category by its ID
     *
     * @tags categories
     * @name CategoriesDetail
     * @summary Get a single category
     * @request GET:/categories/{id}
     */
    categoriesDetail: (id: number, params: RequestParams = {}) =>
      this.request<ModelsCategory, string>({
        path: `/categories/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing category with the provided details
     *
     * @tags categories
     * @name CategoriesUpdate
     * @summary Update an existing category
     * @request PUT:/categories/{id}
     */
    categoriesUpdate: (
      id: number,
      category: ModelsCategory,
      params: RequestParams = {},
    ) =>
      this.request<ModelsCategory, string>({
        path: `/categories/${id}`,
        method: "PUT",
        body: category,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  orders = {
    /**
     * @description Get a list of all orders for a given tenant
     *
     * @tags orders
     * @name OrdersList
     * @summary Get a list of orders
     * @request GET:/orders
     */
    ordersList: (params: RequestParams = {}) =>
      this.request<ModelsOrder[], string>({
        path: `/orders`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new order with the provided cart items.
     *
     * @tags orders
     * @name OrdersCreate
     * @summary Create a new order
     * @request POST:/orders
     */
    ordersCreate: (
      order: ModelsCreateOrderRequest,
      params: RequestParams = {},
    ) =>
      this.request<ModelsOrder, string>({
        path: `/orders`,
        method: "POST",
        body: order,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update the status of an existing order.
     *
     * @tags orders
     * @name StatusUpdate
     * @summary Update order status
     * @request PUT:/orders/{id}/status
     */
    statusUpdate: (
      id: number,
      status: ModelsUpdateOrderStatusRequest,
      params: RequestParams = {},
    ) =>
      this.request<string, string>({
        path: `/orders/${id}/status`,
        method: "PUT",
        body: status,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  products = {
    /**
     * @description Get a list of products for a given tenant.
     *
     * @tags products
     * @name ProductsList
     * @summary Get a list of products
     * @request GET:/products
     */
    productsList: (params: RequestParams = {}) =>
      this.request<ModelsProduct[], string>({
        path: `/products`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new product with the provided details.
     *
     * @tags products
     * @name ProductsCreate
     * @summary Create a new product
     * @request POST:/products
     */
    productsCreate: (
      product: ModelsCreateProductRequest,
      params: RequestParams = {},
    ) =>
      this.request<ModelsProduct, string>({
        path: `/products`,
        method: "POST",
        body: product,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a product by its ID.
     *
     * @tags products
     * @name ProductsDelete
     * @summary Delete a product
     * @request DELETE:/products/{id}
     */
    productsDelete: (id: string, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/products/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a single product by its ID for a given tenant.
     *
     * @tags products
     * @name ProductsDetail
     * @summary Get a single product
     * @request GET:/products/{id}
     */
    productsDetail: (id: string, params: RequestParams = {}) =>
      this.request<ModelsProduct, string>({
        path: `/products/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing product with the provided details.
     *
     * @tags products
     * @name ProductsUpdate
     * @summary Update an existing product
     * @request PUT:/products/{id}
     */
    productsUpdate: (
      id: string,
      product: ModelsProduct,
      params: RequestParams = {},
    ) =>
      this.request<ModelsProduct, string>({
        path: `/products/${id}`,
        method: "PUT",
        body: product,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  shopOwners = {
    /**
     * @description Get a list of all registered shop owners.
     *
     * @tags shop-owners
     * @name ShopOwnersList
     * @summary Get a list of shop owners
     * @request GET:/shop-owners
     */
    shopOwnersList: (params: RequestParams = {}) =>
      this.request<ModelsShopOwner[], string>({
        path: `/shop-owners`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new shop owner with the provided details.
     *
     * @tags shop-owners
     * @name ShopOwnersCreate
     * @summary Create a new shop owner
     * @request POST:/shop-owners
     */
    shopOwnersCreate: (
      shopOwner: ModelsShopOwner,
      params: RequestParams = {},
    ) =>
      this.request<ModelsShopOwner, string>({
        path: `/shop-owners`,
        method: "POST",
        body: shopOwner,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a shop owner by its ID.
     *
     * @tags shop-owners
     * @name ShopOwnersDelete
     * @summary Delete a shop owner
     * @request DELETE:/shop-owners/{id}
     */
    shopOwnersDelete: (id: string, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/shop-owners/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a single shop owner by its ID.
     *
     * @tags shop-owners
     * @name ShopOwnersDetail
     * @summary Get a single shop owner
     * @request GET:/shop-owners/{id}
     */
    shopOwnersDetail: (id: string, params: RequestParams = {}) =>
      this.request<ModelsShopOwner, string>({
        path: `/shop-owners/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing shop owner with the provided details.
     *
     * @tags shop-owners
     * @name ShopOwnersUpdate
     * @summary Update an existing shop owner
     * @request PUT:/shop-owners/{id}
     */
    shopOwnersUpdate: (
      id: string,
      shopOwner: ModelsShopOwner,
      params: RequestParams = {},
    ) =>
      this.request<ModelsShopOwner, string>({
        path: `/shop-owners/${id}`,
        method: "PUT",
        body: shopOwner,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  tenants = {
    /**
     * @description Get a list of all registered tenants
     *
     * @tags tenants
     * @name TenantsList
     * @summary Get a list of tenants
     * @request GET:/tenants
     */
    tenantsList: (params: RequestParams = {}) =>
      this.request<ModelsTenant[], string>({
        path: `/tenants`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new tenant with the provided details
     *
     * @tags tenants
     * @name TenantsCreate
     * @summary Create a new tenant
     * @request POST:/tenants
     */
    tenantsCreate: (tenant: ModelsTenant, params: RequestParams = {}) =>
      this.request<ModelsTenant, string>({
        path: `/tenants`,
        method: "POST",
        body: tenant,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a tenant by its ID
     *
     * @tags tenants
     * @name TenantsDelete
     * @summary Delete a tenant
     * @request DELETE:/tenants/{id}
     */
    tenantsDelete: (id: number, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/tenants/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a single tenant by its ID
     *
     * @tags tenants
     * @name TenantsDetail
     * @summary Get a single tenant
     * @request GET:/tenants/{id}
     */
    tenantsDetail: (id: number, params: RequestParams = {}) =>
      this.request<ModelsTenant, string>({
        path: `/tenants/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing tenant with the provided details
     *
     * @tags tenants
     * @name TenantsUpdate
     * @summary Update an existing tenant
     * @request PUT:/tenants/{id}
     */
    tenantsUpdate: (
      id: number,
      tenant: ModelsTenant,
      params: RequestParams = {},
    ) =>
      this.request<ModelsTenant, string>({
        path: `/tenants/${id}`,
        method: "PUT",
        body: tenant,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
