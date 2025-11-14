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

export interface ModelsCreateOrderRequest {
  cart: ModelsCartItem[];
  userID: number;
}

export interface ModelsOrder {
  created_at: string;
  id: number;
  status: string;
  tenant_id: string;
  total_amount: number;
  updated_at: string;
  user_id: number;
}

export interface ModelsProduct {
  description?: string;
  discount?: number;
  id: string;
  img?: string;
  tags?: ModelsProductTagGroup;
  title: string;
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

export interface ModelsTgBotUser {
  chat_id?: number;
  first_name?: string;
  id?: number;
  is_bot?: boolean;
  language_code?: string;
  last_name?: string;
  photo_url?: string;
  tenant?: string;
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
     * @description Authenticates a user from the Telegram Web App. If the user does not exist, it creates a new user.
     *
     * @tags users
     * @name TgWebAppCreate
     * @summary Authenticate a Telegram Web App user
     * @request POST:/auth/tg-web-app
     */
    tgWebAppCreate: (user: ModelsTgBotUser, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/auth/tg-web-app`,
        method: "POST",
        body: user,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  orders = {
    /**
     * @description Create a new order with the provided cart items.
     *
     * @tags orders
     * @name OrdersCreate
     * @summary Create a new order
     * @request POST:/orders
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
        format: "json",
        ...params,
      }),
  };
}
