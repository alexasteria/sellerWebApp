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

export interface HandlersAdminAuthRequest {
  code: string;
  tg_login: string;
}

export interface HandlersSendAuthCodeRequest {
  tg_login: string;
}

export interface ModelsCartItem {
  price: number;
  productID: string;
  quantity: number;
  tenantID: string;
  variantID: string;
}

export interface ModelsCategory {
  created_at?: string;
  id?: string;
  name?: string;
  tenant_id?: string;
  updated_at?: string;
}

export interface ModelsCreateOrderRequest {
  cart: ModelsCartItem[];
  contactInfo?: string;
  tenantID: string;
  tgUser: ModelsTgBotUser;
}

export interface ModelsOrder {
  created_at: string;
  id: number;
  order_items?: ModelsOrderItem[];
  status: string;
  tenant_id: string;
  total_amount: number;
  updated_at: string;
  user?: ModelsUser;
  /** This is the internal user ID (UUID) */
  user_id: string;
}

export interface ModelsOrderItem {
  price?: number;
  productID?: string;
  productTitle?: string;
  quantity?: number;
  variantID?: string;
  variantValue?: string;
}

export interface ModelsProduct {
  /** New field */
  category_id: string;
  created_at?: string;
  description?: string;
  discount?: number;
  id: string;
  img?: string;
  tags?: ModelsProductTagGroup;
  tenantID: string;
  title: string;
  updated_at?: string;
  variants: ModelsProductVariant[];
}

export interface ModelsProductTagGroup {
  name: string;
  tags: string[];
}

export interface ModelsProductVariant {
  cost: number;
  id: string;
  stock: number;
  value: string;
}

export interface ModelsTenant {
  created_at?: string;
  id?: string;
  is_active?: boolean;
  name: string;
  updated_at?: string;
}

export interface ModelsTgBotUser {
  created_at?: string;
  first_name: string;
  id: number;
  is_bot?: boolean;
  language_code?: string;
  last_name?: string;
  photo_url?: string;
  tenant: string;
  updated_at?: string;
  username?: string;
}

export interface ModelsUpdateOrderStatusRequest {
  status: string;
}

export interface ModelsUpdateOrderStatusResponse {
  message?: string;
}

export interface ModelsUser {
  contact_info?: string;
  created_at?: string;
  delivery_address?: string;
  id?: string;
  tenant_id?: string;
  tg_user_id?: number;
  updated_at?: string;
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
      baseURL: axiosConfig.baseURL || "//localhost:8085",
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
  auth = {
    /**
     * @description Authenticates an administrator using a Telegram login and a one-time code.
     *
     * @tags users
     * @name AdminCreate
     * @summary Authenticate administrator
     * @request POST:/auth/admin
     */
    adminCreate: (
      request: HandlersAdminAuthRequest,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, string>, string>({
        path: `/auth/admin`,
        method: "POST",
        body: request,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Sends a one-time authentication code to the user's Telegram chat for admin panel login.
     *
     * @tags users
     * @name SendCodeCreate
     * @summary Send authentication code
     * @request POST:/auth/send-code
     */
    sendCodeCreate: (
      request: HandlersSendAuthCodeRequest,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, string>, string>({
        path: `/auth/send-code`,
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
    tgWebAppCreate: (
      query: {
        /** Tenant ID */
        tenant: string;
      },
      user: ModelsTgBotUser,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, string>, string>({
        path: `/auth/tg-web-app`,
        method: "POST",
        query: query,
        body: user,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  categories = {
    /**
     * @description Get a list of all categories for a tenant.
     *
     * @tags categories
     * @name CategoriesList
     * @summary List all categories
     * @request GET:/categories
     * @secure
     */
    categoriesList: (
      query: {
        /** Tenant ID */
        tenant: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelsCategory[], string>({
        path: `/categories`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new category for a tenant.
     *
     * @tags categories
     * @name CategoriesCreate
     * @summary Create a new category
     * @request POST:/categories
     * @secure
     */
    categoriesCreate: (category: ModelsCategory, params: RequestParams = {}) =>
      this.request<ModelsCategory, string>({
        path: `/categories`,
        method: "POST",
        body: category,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a category by its ID for a tenant.
     *
     * @tags categories
     * @name CategoriesDelete
     * @summary Delete a category
     * @request DELETE:/categories/{id}
     * @secure
     */
    categoriesDelete: (
      id: string,
      query: {
        /** Tenant ID */
        tenant: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, string>, string>({
        path: `/categories/${id}`,
        method: "DELETE",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a category by its ID for a tenant.
     *
     * @tags categories
     * @name CategoriesDetail
     * @summary Get a category by ID
     * @request GET:/categories/{id}
     * @secure
     */
    categoriesDetail: (
      id: string,
      query: {
        /** Tenant ID */
        tenant: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelsCategory, string>({
        path: `/categories/${id}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing category for a tenant.
     *
     * @tags categories
     * @name CategoriesUpdate
     * @summary Update a category
     * @request PUT:/categories/{id}
     * @secure
     */
    categoriesUpdate: (
      id: string,
      category: ModelsCategory,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, string>, string>({
        path: `/categories/${id}`,
        method: "PUT",
        body: category,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  customers = {
    /**
     * @description Get a list of customers (users) associated with a specific tenant.
     *
     * @tags users
     * @name CustomersList
     * @summary Get customers for a tenant
     * @request GET:/customers
     * @secure
     */
    customersList: (
      query: {
        /** Tenant ID */
        tenant: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelsUser[], string>({
        path: `/customers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  orders = {
    /**
     * @description Get a list of orders for a given tenant.
     *
     * @tags orders
     * @name OrdersList
     * @summary Get a list of orders
     * @request GET:/orders
     * @secure
     */
    ordersList: (
      query: {
        /** Tenant ID */
        tenant: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelsOrder[], string>({
        path: `/orders`,
        method: "GET",
        query: query,
        secure: true,
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
     * @secure
     */
    ordersCreate: (
      query: {
        /** Tenant ID */
        tenant: string;
      },
      order: ModelsCreateOrderRequest,
      params: RequestParams = {},
    ) =>
      this.request<ModelsOrder, string>({
        path: `/orders`,
        method: "POST",
        query: query,
        body: order,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a single order by its ID for a given tenant.
     *
     * @tags orders
     * @name OrdersDetail
     * @summary Get a single order by ID
     * @request GET:/orders/{id}
     * @secure
     */
    ordersDetail: (
      id: number,
      query: {
        /** Tenant ID */
        tenant: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelsOrder, string>({
        path: `/orders/${id}`,
        method: "GET",
        query: query,
        secure: true,
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
     * @secure
     */
    statusUpdate: (
      id: number,
      status: ModelsUpdateOrderStatusRequest,
      params: RequestParams = {},
    ) =>
      this.request<ModelsUpdateOrderStatusResponse, string>({
        path: `/orders/${id}/status`,
        method: "PUT",
        body: status,
        secure: true,
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
     * @secure
     */
    productsList: (
      query: {
        /** Tenant ID */
        tenant: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelsProduct[], string>({
        path: `/products`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new product for a tenant.
     *
     * @tags products
     * @name ProductsCreate
     * @summary Create a new product
     * @request POST:/products
     * @secure
     */
    productsCreate: (product: ModelsProduct, params: RequestParams = {}) =>
      this.request<ModelsProduct, string>({
        path: `/products`,
        method: "POST",
        body: product,
        secure: true,
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
     * @secure
     */
    productsDelete: (
      id: string,
      query: {
        /** Tenant ID */
        tenant: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, string>, string>({
        path: `/products/${id}`,
        method: "DELETE",
        query: query,
        secure: true,
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
     * @secure
     */
    productsDetail: (
      id: string,
      query: {
        /** Tenant ID */
        tenant: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelsProduct, string>({
        path: `/products/${id}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing product.
     *
     * @tags products
     * @name ProductsUpdate
     * @summary Update a product
     * @request PUT:/products/{id}
     * @secure
     */
    productsUpdate: (
      id: string,
      product: ModelsProduct,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, string>, string>({
        path: `/products/${id}`,
        method: "PUT",
        body: product,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  tenants = {
    /**
     * @description Get a list of all tenants. Admin only.
     *
     * @tags tenants
     * @name TenantsList
     * @summary List all tenants
     * @request GET:/tenants
     * @secure
     */
    tenantsList: (params: RequestParams = {}) =>
      this.request<ModelsTenant[], string>({
        path: `/tenants`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new tenant. Admin only.
     *
     * @tags tenants
     * @name TenantsCreate
     * @summary Create a new tenant
     * @request POST:/tenants
     * @secure
     */
    tenantsCreate: (tenant: ModelsTenant, params: RequestParams = {}) =>
      this.request<ModelsTenant, string>({
        path: `/tenants`,
        method: "POST",
        body: tenant,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a tenant by its ID. Admin only.
     *
     * @tags tenants
     * @name TenantsDelete
     * @summary Delete a tenant
     * @request DELETE:/tenants/{tenantID}
     * @secure
     */
    tenantsDelete: (tenantId: string, params: RequestParams = {}) =>
      this.request<Record<string, string>, string>({
        path: `/tenants/${tenantId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a tenant by its ID. Admin only.
     *
     * @tags tenants
     * @name TenantsDetail
     * @summary Get a tenant by ID
     * @request GET:/tenants/{tenantID}
     * @secure
     */
    tenantsDetail: (tenantId: string, params: RequestParams = {}) =>
      this.request<ModelsTenant, string>({
        path: `/tenants/${tenantId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing tenant. Admin only.
     *
     * @tags tenants
     * @name TenantsUpdate
     * @summary Update a tenant
     * @request PUT:/tenants/{tenantID}
     * @secure
     */
    tenantsUpdate: (
      tenantId: string,
      tenant: ModelsTenant,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, string>, string>({
        path: `/tenants/${tenantId}`,
        method: "PUT",
        body: tenant,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * @description Get a list of all registered users
     *
     * @tags users
     * @name UsersList
     * @summary Get all users
     * @request GET:/users
     */
    usersList: (params: RequestParams = {}) =>
      this.request<ModelsUser[], string>({
        path: `/users`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
