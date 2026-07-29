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

export interface InternalApiUploadProductImageResponse {
  filePath?: string;
}

export interface SellerGoApiInternalApientAuthTgWebAppRequest {
  initData?: string;
}

export interface SellerGoApiInternalApientCategoryCreateRequest {
  name?: string;
}

export interface SellerGoApiInternalApientCategoryListResponse {
  list?: SellerGoApiInternalApientCategoryResponse[];
}

export interface SellerGoApiInternalApientCategoryResponse {
  created_at?: string;
  id?: number;
  name?: string;
  tenant_id?: number;
  updated_at?: string;
}

export interface SellerGoApiInternalApientCategoryUpdateRequest {
  name?: string;
}

export interface SellerGoApiInternalApientCreateAddressRequest {
  addressText?: string;
  isDefault?: boolean;
}

export interface SellerGoApiInternalApientCreateOrderRequest {
  cart?: SellerGoApiInternalApientOrderCartItem[];
  delivery_address?: string;
  userID?: number;
}

export interface SellerGoApiInternalApientDashboardResponse {
  newClients?: SellerGoApiInternalApientKPICardResponse;
  ordersToday?: SellerGoApiInternalApientKPICardResponse;
  recentOrders?: SellerGoApiInternalApientRecentOrderResponse[];
  revenue?: SellerGoApiInternalApientKPICardResponse;
  topProducts?: SellerGoApiInternalApientTopProductResponse[];
}

export interface SellerGoApiInternalApientKPICardResponse {
  change?: number;
  isPositive?: boolean;
  value?: number;
}

export interface SellerGoApiInternalApientLoginRequest {
  login?: string;
  password?: string;
}

export interface SellerGoApiInternalApientLoginResponse {
  token?: string;
}

export interface SellerGoApiInternalApientOrderCartItem {
  price?: number;
  productID?: number;
  quantity?: number;
  variantID?: number;
}

export interface SellerGoApiInternalApientOrderItemResponse {
  created_at?: string;
  order_id?: number;
  price?: number;
  product?: SellerGoApiInternalApientProductResponse;
  quantity?: number;
  tenant_id?: number;
  total_price?: number;
  variant?: SellerGoApiInternalApientProductVariantResponse;
}

export interface SellerGoApiInternalApientOrderListResponse {
  items?: SellerGoApiInternalApientOrderResponse[];
}

export interface SellerGoApiInternalApientOrderResponse {
  created_at?: string;
  delivery_address?: string;
  id?: number;
  order_items?: SellerGoApiInternalApientOrderItemResponse[];
  payment_id?: string;
  payment_link?: string;
  status?: string;
  tenant_id?: number;
  tg_user?: SellerGoApiInternalApientTgUserResponse;
  total_amount?: number;
  updated_at?: string;
}

export interface SellerGoApiInternalApientProductCreateRequest {
  categoryID?: number;
  description?: string;
  discount?: number;
  img?: string;
  tags?: SellerGoApiInternalApientProductTagGroupRequest[];
  title?: string;
  variants?: SellerGoApiInternalApientProductVariantRequest[];
}

export interface SellerGoApiInternalApientProductListResponse {
  list?: SellerGoApiInternalApientProductResponse[];
}

export interface SellerGoApiInternalApientProductResponse {
  categoryID?: number;
  created_at?: string;
  description?: string;
  discount?: number;
  id?: number;
  img?: string;
  tags?: SellerGoApiInternalApientProductTagGroupResponse[];
  tenant_id?: number;
  title?: string;
  updated_at?: string;
  variants?: SellerGoApiInternalApientProductVariantResponse[];
}

export interface SellerGoApiInternalApientProductTagGroupRequest {
  name?: string;
  tags?: SellerGoApiInternalApientProductTagRequest[];
}

export interface SellerGoApiInternalApientProductTagGroupResponse {
  id?: number;
  name?: string;
  tags?: SellerGoApiInternalApientProductTagResponse[];
}

export interface SellerGoApiInternalApientProductTagRequest {
  tag?: string;
}

export interface SellerGoApiInternalApientProductTagResponse {
  id?: number;
  tag?: string;
}

export interface SellerGoApiInternalApientProductUpdateRequest {
  categoryID?: number;
  description?: string;
  discount?: number;
  img?: string;
  tags?: SellerGoApiInternalApientProductTagGroupRequest[];
  title?: string;
  variants?: SellerGoApiInternalApientProductVariantRequest[];
}

export interface SellerGoApiInternalApientProductVariantRequest {
  cost?: number;
  stock?: number;
  value?: string;
}

export interface SellerGoApiInternalApientProductVariantResponse {
  cost?: number;
  id?: number;
  product_id?: number;
  stock?: number;
  value?: string;
}

export interface SellerGoApiInternalApientRecentOrderResponse {
  clientName?: string;
  date?: string;
  id?: number;
  status?: string;
  total?: number;
}

export interface SellerGoApiInternalApientShopOwnerCreateRequest {
  email?: string;
  first_name?: string;
  last_name?: string;
  login?: string;
  password?: string;
  phone_number?: string;
}

export interface SellerGoApiInternalApientShopOwnerListResponse {
  items?: SellerGoApiInternalApientShopOwnerResponse[];
  total?: number;
}

export interface SellerGoApiInternalApientShopOwnerResponse {
  email?: string;
  first_name?: string;
  id?: number;
  last_name?: string;
  login?: string;
  phone_number?: string;
}

export interface SellerGoApiInternalApientTenantCreateRequest {
  bot_token?: string;
  code?: string;
  is_active?: boolean;
  name?: string;
  yookassa_token?: string;
}

export interface SellerGoApiInternalApientTenantListResponse {
  items?: SellerGoApiInternalApientTenantResponse[];
  total?: number;
}

export interface SellerGoApiInternalApientTenantResponse {
  admin_chat_id?: number;
  bot_token?: string;
  code?: string;
  contact_email?: string;
  contact_phone?: string;
  created_at?: string;
  delivery_cost?: number;
  id?: number;
  is_active?: boolean;
  min_order_for_free_delivery?: number;
  name?: string;
  shop_owner_id?: number;
  welcome_message?: string;
  working_hours?: string;
  yookassa_token?: string;
}

export interface SellerGoApiInternalApientTenantUpdateRequest {
  admin_chat_id?: number;
  bot_token?: string;
  code?: string;
  contact_email?: string;
  contact_phone?: string;
  delivery_cost?: number;
  is_active?: boolean;
  min_order_for_free_delivery?: number;
  name?: string;
  welcome_message?: string;
  working_hours?: string;
  yookassa_token?: string;
}

export interface SellerGoApiInternalApientTgUserAddressResponse {
  addressText?: string;
  createdAt?: string;
  id?: number;
  isDefault?: boolean;
  tenantId?: number;
  tgUserId?: number;
}

export interface SellerGoApiInternalApientTgUserListResponse {
  items?: SellerGoApiInternalApientTgUserResponse[];
}

export interface SellerGoApiInternalApientTgUserResponse {
  auth_date?: string;
  contact_info?: string;
  created_at?: string;
  deleted_at?: string;
  delivery_address?: string;
  email?: string;
  first_name?: string;
  id?: number;
  is_bot?: boolean;
  language_code?: string;
  last_name?: string;
  photo_url?: string;
  role?: string;
  tenant_id?: number;
  token?: string;
  updated_at?: string;
  username?: string;
}

export interface SellerGoApiInternalApientTopProductResponse {
  name?: string;
  revenue?: number;
  totalSales?: number;
}

export interface SellerGoApiInternalApientUpdateOrderStatusRequest {
  payment_id?: string;
  status?: string;
}

export interface SellerGoApiInternalModelsCreateSubscriptionRequest {
  plan_code: string;
}

export interface SellerGoApiInternalModelsSubscription {
  created_at?: string;
  expires_at?: string;
  id?: number;
  is_active?: boolean;
  plan?: SellerGoApiInternalModelsSubscriptionPlan;
  plan_id?: number;
  shop_owner_id?: number;
  starts_at?: string;
  updated_at?: string;
}

export interface SellerGoApiInternalModelsSubscriptionPlan {
  code?: string;
  description?: string;
  /** nil = нет акции */
  discount_price?: number;
  id?: number;
  is_custom?: boolean;
  /** nil = unlimited */
  max_products_per_tenant?: number;
  /** nil = unlimited */
  max_tenants?: number;
  name?: string;
  price?: number;
}

export interface SellerGoApiInternalModelsSubscriptionStatus {
  current_tenant_count?: number;
  has_active_subscription?: boolean;
  max_products_per_tenant?: number;
  max_tenants?: number;
  subscription?: SellerGoApiInternalModelsSubscription;
}

export interface SellerGoApiInternalPkgMsgMessageError {
  /** http response code */
  code?: number;
  /** errors messages as map of lists */
  maps?: Record<string, string[]>;
  /** errors messages as list */
  messages?: string[];
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
 * API for managing seller department services.
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
      this.request<
        SellerGoApiInternalApientShopOwnerListResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
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
    usersCreate: (
      shopOwner: SellerGoApiInternalApientShopOwnerCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        SellerGoApiInternalApientShopOwnerResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
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
    usersDelete: (id: number, params: RequestParams = {}) =>
      this.request<string, SellerGoApiInternalPkgMsgMessageError>({
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
    usersDetail: (id: number, params: RequestParams = {}) =>
      this.request<
        SellerGoApiInternalApientShopOwnerResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
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
      id: number,
      shopOwner: SellerGoApiInternalApientShopOwnerCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        SellerGoApiInternalApientShopOwnerResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
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
    loginCreate: (
      request: SellerGoApiInternalApientLoginRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        SellerGoApiInternalApientLoginResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
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
     * @tags auth
     * @name TgWebAppCreate
     * @summary Authenticate a Telegram Web App user
     * @request POST:/auth/tg-web-app
     */
    tgWebAppCreate: (
      user: SellerGoApiInternalApientAuthTgWebAppRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        SellerGoApiInternalApientTgUserResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
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
     * @description Get a list of all categories for the tenant
     *
     * @tags categories
     * @name CategoriesList
     * @summary Get a list of categories
     * @request GET:/categories
     */
    categoriesList: (params: RequestParams = {}) =>
      this.request<
        SellerGoApiInternalApientCategoryListResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
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
    categoriesCreate: (
      category: SellerGoApiInternalApientCategoryCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        SellerGoApiInternalApientCategoryResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
        path: `/categories`,
        method: "POST",
        body: category,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a category by its ID (soft delete)
     *
     * @tags categories
     * @name CategoriesDelete
     * @summary Delete a category
     * @request DELETE:/categories/{id}
     */
    categoriesDelete: (id: number, params: RequestParams = {}) =>
      this.request<string, SellerGoApiInternalPkgMsgMessageError>({
        path: `/categories/${id}`,
        method: "DELETE",
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
      category: SellerGoApiInternalApientCategoryUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        SellerGoApiInternalApientCategoryResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
        path: `/categories/${id}`,
        method: "PUT",
        body: category,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  dashboard = {
    /**
     * @description Returns KPI cards, recent orders, and top products for the specified tenant
     *
     * @tags dashboard
     * @name DashboardList
     * @summary Get dashboard data
     * @request GET:/dashboard
     */
    dashboardList: (params: RequestParams = {}) =>
      this.request<
        SellerGoApiInternalApientDashboardResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
        path: `/dashboard`,
        method: "GET",
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
      this.request<
        SellerGoApiInternalApientOrderListResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
        path: `/orders`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new order with the provided cart items
     *
     * @tags orders
     * @name OrdersCreate
     * @summary Create a new order
     * @request POST:/orders
     */
    ordersCreate: (
      order: SellerGoApiInternalApientCreateOrderRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        SellerGoApiInternalApientOrderResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
        path: `/orders`,
        method: "POST",
        body: order,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a single order by its ID with items
     *
     * @tags orders
     * @name OrdersDetail
     * @summary Get a single order
     * @request GET:/orders/{id}
     */
    ordersDetail: (id: number, params: RequestParams = {}) =>
      this.request<
        SellerGoApiInternalApientOrderResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
        path: `/orders/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update the status of an existing order
     *
     * @tags orders
     * @name StatusUpdate
     * @summary Update order status
     * @request PUT:/orders/{id}/status
     */
    statusUpdate: (
      id: number,
      status: SellerGoApiInternalApientUpdateOrderStatusRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        SellerGoApiInternalApientOrderResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
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
     * @description Get a list of products for a given tenant, optionally filtered by category
     *
     * @tags products
     * @name ProductsList
     * @summary Get a list of products
     * @request GET:/products
     */
    productsList: (
      query?: {
        /** Category ID to filter products */
        category_id?: number;
        /** Search query */
        query?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SellerGoApiInternalApientProductListResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
        path: `/products`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new product with the provided details
     *
     * @tags products
     * @name ProductsCreate
     * @summary Create a new product
     * @request POST:/products
     */
    productsCreate: (
      product: SellerGoApiInternalApientProductCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        SellerGoApiInternalApientProductResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
        path: `/products`,
        method: "POST",
        body: product,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a product by its ID (soft delete)
     *
     * @tags products
     * @name ProductsDelete
     * @summary Delete a product
     * @request DELETE:/products/{id}
     */
    productsDelete: (id: number, params: RequestParams = {}) =>
      this.request<string, SellerGoApiInternalPkgMsgMessageError>({
        path: `/products/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing product with the provided details
     *
     * @tags products
     * @name ProductsUpdate
     * @summary Update an existing product
     * @request PUT:/products/{id}
     */
    productsUpdate: (
      id: number,
      product: SellerGoApiInternalApientProductUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        SellerGoApiInternalApientProductResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
        path: `/products/${id}`,
        method: "PUT",
        body: product,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  subscription = {
    /**
     * @description Get current subscription status for the authorized shop owner.
     *
     * @tags subscriptions
     * @name CurrentList
     * @summary Get current subscription status
     * @request GET:/subscription/current
     */
    currentList: (params: RequestParams = {}) =>
      this.request<SellerGoApiInternalModelsSubscriptionStatus, any>({
        path: `/subscription/current`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of all subscription plans available for shop owners.
     *
     * @tags subscriptions
     * @name PlansList
     * @summary Get all subscription plans
     * @request GET:/subscription/plans
     */
    plansList: (params: RequestParams = {}) =>
      this.request<SellerGoApiInternalModelsSubscriptionPlan[], any>({
        path: `/subscription/plans`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Renews the current active subscription for another month.
     *
     * @tags subscriptions
     * @name RenewCreate
     * @summary Renew subscription
     * @request POST:/subscription/renew
     */
    renewCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/subscription/renew`,
        method: "POST",
        ...params,
      }),

    /**
     * @description Creates a mock subscription to the specified plan code.
     *
     * @tags subscriptions
     * @name SubscribeCreate
     * @summary Subscribe to a plan
     * @request POST:/subscription/subscribe
     */
    subscribeCreate: (
      request: SellerGoApiInternalModelsCreateSubscriptionRequest,
      params: RequestParams = {},
    ) =>
      this.request<SellerGoApiInternalModelsSubscription, any>({
        path: `/subscription/subscribe`,
        method: "POST",
        body: request,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  tenants = {
    /**
     * @description Get a list of tenants for the current shop owner
     *
     * @tags tenants
     * @name TenantsList
     * @summary Get a list of tenants
     * @request GET:/tenants
     */
    tenantsList: (params: RequestParams = {}) =>
      this.request<
        SellerGoApiInternalApientTenantListResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
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
    tenantsCreate: (
      tenant: SellerGoApiInternalApientTenantCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        SellerGoApiInternalApientTenantResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
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
      this.request<string, SellerGoApiInternalPkgMsgMessageError>({
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
      this.request<
        SellerGoApiInternalApientTenantResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
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
      tenant: SellerGoApiInternalApientTenantUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        SellerGoApiInternalApientTenantResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
        path: `/tenants/${id}`,
        method: "PUT",
        body: tenant,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get all tenants with DEMO_ prefix codes
     *
     * @tags tenants
     * @name DemoList
     * @summary Get a list of demo tenants
     * @request GET:/tenants/demo
     */
    demoList: (params: RequestParams = {}) =>
      this.request<SellerGoApiInternalApientTenantListResponse, any>({
        path: `/tenants/demo`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  tgUsers = {
    /**
     * @description Get a list of all Telegram users for a given tenant
     *
     * @tags tg-users
     * @name TgUsersList
     * @summary Get a list of Telegram users
     * @request GET:/tg-users
     */
    tgUsersList: (params: RequestParams = {}) =>
      this.request<
        SellerGoApiInternalApientTgUserListResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
        path: `/tg-users`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of addresses for a Telegram user
     *
     * @tags addresses
     * @name AddressesList
     * @summary Get user addresses
     * @request GET:/tg-users/{tg_user_id}/addresses
     */
    addressesList: (tgUserId: number, params: RequestParams = {}) =>
      this.request<
        SellerGoApiInternalApientTgUserAddressResponse[],
        SellerGoApiInternalPkgMsgMessageError
      >({
        path: `/tg-users/${tgUserId}/addresses`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new address for a Telegram user
     *
     * @tags addresses
     * @name AddressesCreate
     * @summary Create a user address
     * @request POST:/tg-users/{tg_user_id}/addresses
     */
    addressesCreate: (
      tgUserId: number,
      address: SellerGoApiInternalApientCreateAddressRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        SellerGoApiInternalApientTgUserAddressResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
        path: `/tg-users/${tgUserId}/addresses`,
        method: "POST",
        body: address,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete an address for a Telegram user
     *
     * @tags addresses
     * @name AddressesDelete
     * @summary Delete a user address
     * @request DELETE:/tg-users/{tg_user_id}/addresses/{id}
     */
    addressesDelete: (
      tgUserId: number,
      id: number,
      params: RequestParams = {},
    ) =>
      this.request<string, SellerGoApiInternalPkgMsgMessageError>({
        path: `/tg-users/${tgUserId}/addresses/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
  upload = {
    /**
     * @description Upload an image file for a product
     *
     * @tags upload
     * @name ProductImageCreate
     * @summary Upload a product image
     * @request POST:/upload/product-image
     */
    productImageCreate: (
      data: {
        /**
         * Image file
         * @format binary
         */
        image: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InternalApiUploadProductImageResponse,
        SellerGoApiInternalPkgMsgMessageError
      >({
        path: `/upload/product-image`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
}
