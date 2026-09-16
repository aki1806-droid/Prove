# Skillplate External API

> Generato da `docs/openapi.json` con `tools/generate_api_docs.py`. Non modificare a mano: rigenera.

- **Versione spec:** 1.0.0 (OpenAPI 3.0.3)
- **Base URL:** `https://api.skillplate.com/v1/external`
- **Spec sorgente:** <https://api.skillplate.com/v1/external/openapi.json>

External API for managing users, enrollments, orders, subscriptions, and discounts.

## Authentication

All requests require a **Personal Access Token (PAT)** passed as a Bearer token:

```
Authorization: Bearer 30301d6451xxxxxxxxxxxxxxxx
```

The tenant context is automatically resolved from the PAT — no need to specify the tenant separately. Generate tokens from your dashboard under **Settings → API Tokens**.

## API Versioning

The API uses URL-based versioning:

| Version | Base URL |
|---------|----------|
| v1 (current) | `https://api.skillplate.com/v1/external` |

All responses include an `X-API-Supported-Versions` header listing currently supported versions.

### Deprecation

When a version is deprecated, responses will include:
- `Deprecation: true` — Indicates the version is deprecated
- `Sunset: <date>` — RFC 7231 date when the version will be removed
- `X-API-Deprecation-Info` — Human-readable migration guidance

Monitor these headers to plan migrations before sunset dates.

## IDs

All resource IDs (users, products, orders, etc.) are **hashed strings**, not plain integers. Always treat them as opaque identifiers.

## Rate Limits

| Operation | Limit |
|-----------|-------|
| Read (GET) | 100 requests/minute |
| Write (POST, PUT, PATCH, DELETE) | 30 requests/minute |
| Burst | 10 requests/second |

Rate limit status is returned in response headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.

## Scopes

Tokens can be created with specific scopes to limit access:

| Scope | Access |
|-------|--------|
| `users:read` | Read user data and list users |
| `users:write` | Create, update, delete users and manage enrollments |
| `discounts:read` | Read discount codes |
| `discounts:write` | Create, update, activate/deactivate discount codes |
| `products:read` | Read product catalog |
| `subscriptions:write` | Create, update, cancel subscriptions and report payments |
| `orders:write` | Create orders and update order status |

## Webhooks

Skillplate can send webhook events to your configured endpoint URL when important events occur. Webhook payloads are signed using **HMAC-SHA256** — verify the `X-Skillplate-Signature` header to ensure authenticity.

**Supported webhook events:**

| Event | Description |
|-------|-------------|
| `payment.succeeded` | A payment was successfully processed |
| `payment.failed` | A payment attempt failed |
| `subscription.started` | A new subscription was activated |
| `subscription.cancelled` | A subscription was cancelled |
| `user.created` | A new user was created |
| `user.updated` | A user's profile was updated |
| `lesson.completed` | A user completed a lesson |
| `module.completed` | A user completed a course module |
| `course.completed` | A user completed an entire course |

`payment.succeeded` and `payment.failed` payloads include an `items[]` array; each item contains a `product_id` (hashed) identifying the purchased product.

Configure webhook endpoints in your dashboard under **Settings → Webhooks**.

## Indice

- **Users & Enrollments**
  - [Users](#users) — 5 endpoint
  - [Enrollments](#enrollments) — 2 endpoint
  - [Certificates](#certificates) — 1 endpoint
- **Commerce**
  - [Orders](#orders) — 4 endpoint
  - [Subscriptions](#subscriptions) — 7 endpoint
  - [Discounts](#discounts) — 6 endpoint
- **Catalog**
  - [Products](#products) — 1 endpoint
- [Schemi](#schemi)
- [Errori](#errori)

## Endpoint

### Users

Create, read, update, and delete users in your tenant.

**Required scopes:** `users:read` (GET), `users:write` (POST/PUT/DELETE)

> All user IDs are hashed strings. Use `filter[email]` to look up a user by email address.

#### `GET /users` — List users

Returns a paginated list of users. By default, only non-lead users are returned.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `page` | query | `integer` | no | Page number (default `1`; minimo 1) |
| `per_page` | query | `integer` | no | Items per page (max 100) (default `20`; intervallo 1–100) |
| `search` | query | `string` | no | Search by name or email (max 100 caratteri) |
| `filter[email]` | query | `string` (email) | no | Filter by exact email address |
| `filter[first_name]` | query | `string` | no | Filter by first name (max 100 caratteri) |
| `filter[last_name]` | query | `string` | no | Filter by last name (max 100 caratteri) |
| `filter[tags]` | query | `string` | no | Filter users by tag name. Accepts a comma-separated string (`filter[tags]=premium,vip`) or repeated array notation (`filter[tags][]=premium&filter[tags][]=vip`). Returns users that match **any** of the provided tags. |
| `lead` | query | `boolean` | no | Filter by lead status. Default is false (non-leads only). (default `false`) |
| `sort_by` | query | `string` | no | Field to sort by (valori: `created_at`, `email`, `first_name`, `last_name`) |
| `sort_order` | query | `string` | no | Sort direction (default `asc`; valori: `asc`, `desc`) |

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Paginated list of users | [`UserListResponse`](#userlistresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X GET "https://api.skillplate.com/v1/external/users" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

#### `POST /users` — Create user

Creates a new user in the tenant. Optionally enrolls them in products and sends a welcome email.

**Corpo della richiesta** (obbligatorio): [`CreateUserRequest`](#createuserrequest)

*Minimal — email and name only*

```json
{
  "email": "jane.doe@example.com",
  "first_name": "Jane",
  "last_name": "Doe"
}
```

*Full — all fields including enrollment*

```json
{
  "email": "jane.doe@example.com",
  "first_name": "Jane",
  "last_name": "Doe",
  "password": "SecurePass123",
  "phone": "+1-555-0100",
  "country": "US",
  "state": "CA",
  "city": "San Francisco",
  "address": "123 Market St",
  "zip": "94105",
  "tags": [
    "vip",
    "newsletter"
  ],
  "send_welcome_email": true,
  "product_ids": [
    "abc123",
    "def456"
  ]
}
```

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `201` | User created successfully | [`UserResponse`](#userresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `422` | Validation failed | `object` |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X POST "https://api.skillplate.com/v1/external/users" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email": "jane.doe@example.com", "first_name": "Jane", "last_name": "Doe"}'
```

---

#### `GET /users/{id}` — Get user

Retrieves a single user by their ID.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | User ID (hashed) |
| `include` | query | `string` | no | Comma-separated list of related resources to include. Tags are not included by default and must be requested explicitly. (valori: `products`, `certificates`, `orders`, `exams`, `tags`, `enrollments`) |

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | User details | [`UserResponse`](#userresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X GET "https://api.skillplate.com/v1/external/users/{id}" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

#### `PUT /users/{id}` — Update user

Updates an existing user. All fields are optional for partial updates.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | User ID (hashed) |

**Corpo della richiesta** (obbligatorio): [`UpdateUserRequest`](#updateuserrequest)

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | User updated successfully | [`UserResponse`](#userresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `422` | Validation failed | `object` |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X PUT "https://api.skillplate.com/v1/external/users/{id}" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

#### `DELETE /users/{id}` — Delete user

Deletes a user and all their related data. Cannot delete the tenant owner.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | User ID (hashed) |

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `204` | User deleted successfully | — |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X DELETE "https://api.skillplate.com/v1/external/users/{id}" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

### Enrollments

Enroll or unenroll users from products (courses, bundles, digital downloads, etc.).

**Required scope:** `users:write`

> Enrollment is **idempotent** — enrolling an already-enrolled user returns `already_enrolled` without error.

#### `POST /users/{id}/enroll` — Enroll user in products

Enrolls a user in one or more products. Idempotent - already enrolled products return 'already_enrolled' status.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | User ID (hashed) |

**Corpo della richiesta** (obbligatorio): [`EnrollmentRequest`](#enrollmentrequest)

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Enrollment results | [`EnrollmentResponse`](#enrollmentresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `422` | Validation failed | `object` |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X POST "https://api.skillplate.com/v1/external/users/{id}/enroll" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

#### `POST /users/{id}/unenroll` — Unenroll user from products

Unenrolls a user from one or more products. Idempotent - products not enrolled return 'not_enrolled' status.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | User ID (hashed) |

**Corpo della richiesta** (obbligatorio): [`EnrollmentRequest`](#enrollmentrequest)

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Unenrollment results | [`EnrollmentResponse`](#enrollmentresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `422` | Validation failed | `object` |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X POST "https://api.skillplate.com/v1/external/users/{id}/unenroll" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

### Certificates

Issue certificates to users for completing course modules. Certificate generation and email delivery are processed asynchronously.

**Required scope:** `users:write`

> Certification is **idempotent** — certifying an already-certified user returns `already_certified`.

#### `POST /users/{id}/certify` — Certify user

Issues a certificate for a user on a specific course module. Marks all lessons and the module as completed, then asynchronously generates the certificate PDF and emails the user. Idempotent - if the user already has a certificate for the module, returns 'already_certified' status.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | User ID (hashed) |

**Corpo della richiesta** (obbligatorio): [`CertifyUserRequest`](#certifyuserrequest)

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Certification result | [`CertifyUserResponse`](#certifyuserresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `422` | Validation failed | `object` |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X POST "https://api.skillplate.com/v1/external/users/{id}/certify" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

### Orders

Create orders for users and update their status. Orders automatically enroll users in purchased products when marked as `completed`.

**Required scope:** `orders:write`

> If `user_id` is omitted, a user is looked up or created using `email`, `first_name`, and `last_name`.

#### `GET /orders` — List orders

Returns a paginated list of orders. Requires the orders:read scope.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `page` | query | `integer` | no | Minimo 1 |
| `per_page` | query | `integer` | no | Default `20`; intervallo 1–100 |
| `status` | query | `string` | no | Valori: `completed`, `pending`, `created`, `cancelled`, `refunded` |
| `sort_by` | query | `string` | no | Valori: `created_at`, `status` |
| `sort_order` | query | `string` | no | Default `desc`; valori: `asc`, `desc` |
| `created_from` | query | `string` (date) | no | — |
| `created_to` | query | `string` (date) | no | — |

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Successful response | [`OrderListResponse`](#orderlistresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `429` | riferimento non risolto nella spec (`#/components/responses/TooManyRequests`) | — |

```bash
curl -X GET "https://api.skillplate.com/v1/external/orders" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

#### `POST /orders` — Create order

Creates a new order. If user_id is not provided, a user will be looked up or created using the email, first_name, and last_name fields.

**Corpo della richiesta** (obbligatorio): [`CreateOrderRequest`](#createorderrequest)

*New user order — creates user and order together*

```json
{
  "email": "john.smith@example.com",
  "first_name": "John",
  "last_name": "Smith",
  "country": "US",
  "line_items": [
    {
      "product_id": "abc123",
      "amount": 99,
      "quantity": 1
    }
  ],
  "status": "completed"
}
```

*Existing user with discount code applied*

```json
{
  "user_id": "usr_aBc123",
  "country": "GB",
  "state": "London",
  "discount_code": "SAVE20",
  "line_items": [
    {
      "product_id": "abc123",
      "amount": 99,
      "discount": 19.8
    }
  ],
  "status": "completed",
  "payment_reference": "pi_3OaBC12eZvKYlo2C1234ABCD"
}
```

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `201` | Order created successfully | [`OrderResponse`](#orderresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `422` | Validation failed | `object` |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X POST "https://api.skillplate.com/v1/external/orders" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email": "john.smith@example.com", "first_name": "John", "last_name": "Smith", "country": "US", "line_items": [{"product_id": "abc123", "amount": 99, "quantity": 1}], "status": "completed"}'
```

---

#### `POST /orders/{id}/status` — Update order status

Updates the status of an existing order.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | Order ID (hashed) |

**Corpo della richiesta** (obbligatorio): [`UpdateOrderStatusRequest`](#updateorderstatusrequest)

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Order status updated successfully | [`OrderResponse`](#orderresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `422` | Validation failed | `object` |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X POST "https://api.skillplate.com/v1/external/orders/{id}/status" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

#### `GET /orders/{id}` — Get an order

Returns a single order by ID. Requires the orders:read scope.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | Order ID (hashed) |

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Successful response | [`OrderResponse`](#orderresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `429` | riferimento non risolto nella spec (`#/components/responses/TooManyRequests`) | — |

```bash
curl -X GET "https://api.skillplate.com/v1/external/orders/{id}" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

### Subscriptions

Create and manage external subscriptions for users. Report payment success/failure to keep subscription state in sync with your payment processor.

**Required scope:** `subscriptions:write`

> If `user_id` is omitted, a user is looked up or created using `email`, `first_name`, and `last_name`.

#### `GET /subscriptions` — List subscriptions

Returns a paginated list of subscriptions. Requires the subscriptions:read scope.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `page` | query | `integer` | no | Minimo 1 |
| `per_page` | query | `integer` | no | Default `20`; intervallo 1–100 |
| `status` | query | `string` | no | Valori: `active`, `trial`, `cancelled`, `expired` |
| `active` | query | `boolean` | no | — |
| `sort_by` | query | `string` | no | Valori: `created_at`, `status`, `number_of_payments` |
| `sort_order` | query | `string` | no | Default `desc`; valori: `asc`, `desc` |
| `created_from` | query | `string` (date) | no | — |
| `created_to` | query | `string` (date) | no | — |

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Successful response | [`SubscriptionListResponse`](#subscriptionlistresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `429` | riferimento non risolto nella spec (`#/components/responses/TooManyRequests`) | — |

```bash
curl -X GET "https://api.skillplate.com/v1/external/subscriptions" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

#### `POST /subscriptions` — Create subscription

Creates a new external subscription for a user and product. If user_id is not provided, a user will be looked up or created using the email, first_name, and last_name fields.

**Corpo della richiesta** (obbligatorio): [`CreateSubscriptionRequest`](#createsubscriptionrequest)

*New user — active subscription*

```json
{
  "email": "jane.doe@example.com",
  "first_name": "Jane",
  "last_name": "Doe",
  "product_id": "prod_aBc123",
  "product_pricing_id": "price_xYz789",
  "amount": 29,
  "status": "active",
  "country": "US"
}
```

*Existing user — trial subscription*

```json
{
  "user_id": "usr_aBc123",
  "product_id": "prod_aBc123",
  "product_pricing_id": "price_xYz789",
  "amount": 0,
  "status": "trial",
  "trial_ends_at": "2026-03-24T00:00:00Z",
  "country": "US"
}
```

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `201` | Subscription created successfully | [`SubscriptionResponse`](#subscriptionresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `422` | Validation failed | `object` |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X POST "https://api.skillplate.com/v1/external/subscriptions" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email": "jane.doe@example.com", "first_name": "Jane", "last_name": "Doe", "product_id": "prod_aBc123", "product_pricing_id": "price_xYz789", "amount": 29, "status": "active", "country": "US"}'
```

---

#### `GET /subscriptions/{id}` — Get a subscription

Returns a single subscription by ID. Requires the subscriptions:read scope.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | Subscription ID (hashed) |

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Successful response | [`SubscriptionResponse`](#subscriptionresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `429` | riferimento non risolto nella spec (`#/components/responses/TooManyRequests`) | — |

```bash
curl -X GET "https://api.skillplate.com/v1/external/subscriptions/{id}" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

#### `PATCH /subscriptions/{id}` — Update subscription

Updates an existing subscription. Allows changing the next payment attempt date and billing period.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | Subscription ID (hashed) |

**Corpo della richiesta** (obbligatorio): [`UpdateSubscriptionRequest`](#updatesubscriptionrequest)

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Subscription updated successfully | [`SubscriptionResponse`](#subscriptionresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `422` | Validation failed | `object` |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X PATCH "https://api.skillplate.com/v1/external/subscriptions/{id}" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

#### `POST /subscriptions/{id}/cancel` — Cancel subscription

Cancels a subscription. The cancellation can take effect immediately, at the end of the current billing period, or on a specific date.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | Subscription ID (hashed) |

**Corpo della richiesta** (obbligatorio): [`CancelSubscriptionRequest`](#cancelsubscriptionrequest)

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Subscription cancelled successfully | [`SubscriptionResponse`](#subscriptionresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `422` | Validation failed | `object` |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X POST "https://api.skillplate.com/v1/external/subscriptions/{id}/cancel" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

#### `POST /subscriptions/{id}/payment-success` — Report payment success

Reports a successful payment for a subscription. Records the payment amount and resets the failed payment counter.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | Subscription ID (hashed) |

**Corpo della richiesta** (obbligatorio): [`SubscriptionPaymentRequest`](#subscriptionpaymentrequest)

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Payment recorded successfully | [`SubscriptionResponse`](#subscriptionresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `422` | Validation failed | `object` |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X POST "https://api.skillplate.com/v1/external/subscriptions/{id}/payment-success" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

#### `POST /subscriptions/{id}/payment-failed` — Report payment failure

Reports a failed payment for a subscription. Increments the failed payment counter.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | Subscription ID (hashed) |

**Corpo della richiesta** (obbligatorio): [`SubscriptionPaymentFailedRequest`](#subscriptionpaymentfailedrequest)

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Payment failure recorded | [`SubscriptionResponse`](#subscriptionresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `422` | Validation failed | `object` |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X POST "https://api.skillplate.com/v1/external/subscriptions/{id}/payment-failed" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

### Discounts

Manage discount codes for your products. Supports percentage and fixed-amount discounts with optional date ranges, usage limits, and subscription duration controls.

**Required scopes:** `discounts:read` (GET), `discounts:write` (POST/PUT)

> Either `percent_off` or `amount_off` is required when creating a discount — not both.

#### `GET /discounts` — List discounts

Returns a paginated list of discounts with optional filtering.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `page` | query | `integer` | no | Page number (default `1`; minimo 1) |
| `per_page` | query | `integer` | no | Items per page (max 100) (default `20`; intervallo 1–100) |
| `search` | query | `string` | no | Search by name or code (max 191 caratteri) |
| `code` | query | `string` | no | Filter by exact discount code (max 191 caratteri) |
| `name` | query | `string` | no | Filter by discount name (max 191 caratteri) |
| `status` | query | `string` | no | Filter by status (valori: `active`, `inactive`, `scheduled`, `expired`) |
| `type` | query | `string` | no | Filter by discount type (valori: `percentage`, `amount`) |
| `active` | query | `boolean` | no | Filter by active flag |
| `sort_by` | query | `string` | no | Field to sort by (valori: `created_at`, `name`, `code`, `uses`, `start`, `end`) |
| `sort_order` | query | `string` | no | Sort direction (default `desc`; valori: `asc`, `desc`) |
| `created_from` | query | `string` (date) | no | Filter by creation date start (inclusive) |
| `created_to` | query | `string` (date) | no | Filter by creation date end (inclusive, must be after or equal to created_from) |

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Paginated list of discounts | [`DiscountListResponse`](#discountlistresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X GET "https://api.skillplate.com/v1/external/discounts" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

#### `POST /discounts` — Create discount

Creates a new discount code. Either percent_off or amount_off must be provided, but not both.

**Corpo della richiesta** (obbligatorio): [`CreateDiscountRequest`](#creatediscountrequest)

*Percentage discount — 20% off, limited uses*

```json
{
  "code": "SUMMER20",
  "percent_off": 20,
  "max_uses": 500,
  "once_per_customer": true,
  "duration": "once"
}
```

*Fixed amount discount — $50 off, time-limited*

```json
{
  "code": "SAVE50",
  "amount_off": 50,
  "start": "2026-03-01T00:00:00Z",
  "end": "2026-03-31T23:59:59Z",
  "duration": "once"
}
```

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `201` | Discount created successfully | [`DiscountResponse`](#discountresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `422` | Validation failed | `object` |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X POST "https://api.skillplate.com/v1/external/discounts" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"code": "SUMMER20", "percent_off": 20, "max_uses": 500, "once_per_customer": true, "duration": "once"}'
```

---

#### `GET /discounts/{id}` — Get discount

Retrieves a single discount by its ID.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | Discount ID (hashed) |

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Discount details | [`DiscountResponse`](#discountresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X GET "https://api.skillplate.com/v1/external/discounts/{id}" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

#### `PUT /discounts/{id}` — Update discount

Updates an existing discount. All fields are optional for partial updates.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | Discount ID (hashed) |

**Corpo della richiesta** (obbligatorio): [`UpdateDiscountRequest`](#updatediscountrequest)

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Discount updated successfully | [`DiscountResponse`](#discountresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `422` | Validation failed | `object` |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X PUT "https://api.skillplate.com/v1/external/discounts/{id}" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

#### `POST /discounts/{id}/activate` — Activate discount

Activates a discount by setting active=true and clearing the end date.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | Discount ID (hashed) |

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Discount activated successfully | [`DiscountResponse`](#discountresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X POST "https://api.skillplate.com/v1/external/discounts/{id}/activate" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

#### `POST /discounts/{id}/deactivate` — Deactivate discount

Deactivates a discount by setting active=false.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `id` | path | `string` | **sì** | Discount ID (hashed) |

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Discount deactivated successfully | [`DiscountResponse`](#discountresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `404` | Resource not found | [`Error`](#error) |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X POST "https://api.skillplate.com/v1/external/discounts/{id}/deactivate" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

### Products

Read your product catalog including courses, bundles, digital downloads, generics, and communities. Returns active pricing options for each product.

**Required scope:** `products:read`

> Use `item_id` parameter to find a product by its underlying course/bundle ID.

#### `GET /products` — List products

Returns all products grouped by type (courses, bundles, digital_downloads, generics, communities) with their active pricing options. The returned product IDs can be used with enrollment and discount endpoints. Price IDs can be used with the apply_for_prices field in discount endpoints. Use item_id parameter to search for a product by its underlying course/bundle ID.

**Parametri**

| Nome | In | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- | --- |
| `status` | query | `string` | no | Filter by product status (default `published`; valori: `published`, `draft`, `all`) |
| `type` | query | `string` | no | Filter by product type (valori: `course`, `bundle`, `digital_download`, `generic`, `community`) |
| `item_id` | query | `string` | no | Search by underlying item ID (course ID, bundle ID, etc.) to find matching products. Returns an array of matches (multiple products can share the same item_id across different types). |

**Risposte**

| Codice | Descrizione | Corpo |
| --- | --- | --- |
| `200` | Products grouped by type | [`ProductListResponse`](#productlistresponse) |
| `401` | Authentication failed | [`Error`](#error) |
| `403` | Insufficient permissions | [`Error`](#error) |
| `429` | Rate limit exceeded | [`Error`](#error) |

```bash
curl -X GET "https://api.skillplate.com/v1/external/products" \
  -H "Authorization: Bearer $SKILLPLATE_TOKEN"
```

---

## Schemi

### User

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `id` | `string` | no | Unique identifier (hashed) |
| `email` | `string` (email) | no | — |
| `first_name` | `string` | no | — |
| `last_name` | `string` | no | — |
| `phone` | `string` | no | — |
| `country` | `string` | no | — |
| `state` | `string` | no | — |
| `city` | `string` | no | — |
| `address` | `string` | no | — |
| `zip` | `string` | no | — |
| `source` | `string` | no | — |
| `amount_spent` | `number` | no | — |
| `number_of_enrollments` | `integer` | no | — |
| `lead` | `boolean` | no | — |
| `converted` | `boolean` | no | — |
| `last_login` | `string` (date-time) | no | — |
| `tags` | array di `string` | no | User tags. Returned when 'tags' is requested via the include parameter. |
| `created_at` | `string` (date-time) | no | — |
| `updated_at` | `string` (date-time) | no | — |
| `enrollments` | array di [`Enrollment`](#enrollment) | no | Active product enrollments for the user. Returned when 'enrollments' is requested via the include parameter. Note: this returns enrollment records with status/access info, whereas 'products' include returns product details. |

### Enrollment

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `product_id` | `string` | no | Product ID (hashed) |
| `product_type` | `string` | no | Type of product (e.g., Course, Bundle) |
| `status` | `string` | no | Valori: `active`, `expired`, `cancelled` |
| `access_type` | `string` | no | — |
| `enrolled_at` | `string` (date-time) | no | — |

### Discount

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `id` | `string` | no | Unique identifier (hashed) |
| `object` | `string` | no | Valori: `discount` |
| `code` | `string` | no | Unique discount code customers enter at checkout |
| `type` | `string` | no | Type of discount (valori: `percentage`, `amount`) |
| `value` | `number` | no | Discount value (percentage 1-100 or fixed amount) |
| `status` | `string` | no | Computed status based on active flag and dates (valori: `active`, `inactive`, `scheduled`, `expired`) |
| `active` | `boolean` | no | Whether the discount is enabled |
| `start` | `string` (date-time) | no | Start date/time when discount becomes valid |
| `expires` | `string` (date-time) | no | Expiration date/time (null for no expiration) |
| `uses` | `integer` | no | Number of times the discount has been used |
| `max_uses` | `integer` | no | Maximum number of uses allowed (null for unlimited) |
| `once_per_customer` | `boolean` | no | Whether each customer can only use this discount once |
| `duration` | `string` | no | How long the discount applies for subscriptions (valori: `forever`, `repeating`, `once`) |
| `duration_cycles` | `integer` | no | Number of billing cycles (when duration is 'repeating') |
| `gross` | `number` | no | Gross revenue generated by this discount code |
| `net` | `number` | no | Net revenue generated by this discount code (after discounts) |
| `apply_for_products` | array di `string` | no | Product IDs (hashed) this discount applies to |
| `apply_for_prices` | array di `string` | no | Price IDs (hashed) this discount applies to |
| `only_for` | array di `string` | no | Pricing types this discount is valid for. When set, the discount is rejected at checkout if the pricing type does not match. If apply_for_products is also provided, only_for will be ignored and stored as null. |
| `created_at` | `string` (date-time) | no | — |
| `updated_at` | `string` (date-time) | no | — |

### CreateUserRequest

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `email` | `string` (email) | **sì** | Max 191 caratteri |
| `first_name` | `string` | **sì** | Max 100 caratteri |
| `last_name` | `string` | **sì** | Max 100 caratteri |
| `password` | `string` | no | If not provided, user will need to reset password (lunghezza 8–191 caratteri) |
| `phone` | `string` | no | Max 30 caratteri |
| `country` | `string` | no | Country name or 2-letter ISO code (max 100 caratteri) |
| `state` | `string` | no | Max 100 caratteri |
| `city` | `string` | no | Max 100 caratteri |
| `address` | `string` | no | Max 255 caratteri |
| `zip` | `string` | no | Max 20 caratteri |
| `tags` | array di `string` | no | Tags to assign to the user |
| `send_welcome_email` | `boolean` | no | Default `false` |
| `product_ids` | array di `string` | no | Product IDs to enroll the user in upon creation |

### UpdateUserRequest

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `email` | `string` (email) | no | Max 191 caratteri |
| `first_name` | `string` | no | Max 100 caratteri |
| `last_name` | `string` | no | Max 100 caratteri |
| `password` | `string` | no | Lunghezza 8–191 caratteri |
| `phone` | `string` | no | Max 30 caratteri |
| `country` | `string` | no | Country name or 2-letter ISO code (max 100 caratteri) |
| `state` | `string` | no | Max 100 caratteri |
| `city` | `string` | no | Max 100 caratteri |
| `address` | `string` | no | Max 255 caratteri |
| `zip` | `string` | no | Max 20 caratteri |
| `tags` | array di `string` | no | Tags to assign to the user. Sync semantics: null or omitted preserves existing tags, empty array clears all tags. |

### CreateDiscountRequest

Either percent_off or amount_off is required (not both).

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `code` | `string` | no | Unique discount code. If not provided, a random 8-character code will be auto-generated. (max 191 caratteri) |
| `percent_off` | `number` | no | Percentage discount (1-100). Required if amount_off not provided. Cannot be used together with amount_off. (intervallo 1–100) |
| `amount_off` | `number` | no | Fixed amount discount. Required if percent_off not provided. Cannot be used together with percent_off. (minimo 1) |
| `start` | `string` (date-time) | no | Start date/time. Defaults to now. |
| `end` | `string` (date-time) | no | Expiration date/time. Must be after start. |
| `max_uses` | `integer` | no | Maximum number of uses allowed (minimo 1) |
| `once_per_customer` | `boolean` | no | Limit to one use per customer (default `false`) |
| `duration` | `string` | no | How long discount applies for subscriptions (default `forever`; valori: `forever`, `repeating`, `once`) |
| `duration_cycles` | `integer` | no | Number of billing cycles (required when duration is 'repeating') (minimo 1) |
| `apply_for_products` | array di `string` | no | Product IDs (hashed) to restrict discount to |
| `apply_for_prices` | array di `string` | no | Price IDs (hashed) to restrict discount to |
| `only_for` | array di `string` | no | Pricing types this discount is valid for. If apply_for_products is also provided, only_for will be ignored and stored as null. |

### UpdateDiscountRequest

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `code` | `string` | no | Unique discount code (max 191 caratteri) |
| `percent_off` | `number` | no | Percentage discount (1-100). Setting this will clear amount_off. Cannot be used together with amount_off. (intervallo 1–100) |
| `amount_off` | `number` | no | Fixed amount discount. Setting this will clear percent_off. Cannot be used together with percent_off. (minimo 1) |
| `start` | `string` (date-time) | no | Start date/time |
| `end` | `string` (date-time) | no | Expiration date/time |
| `max_uses` | `integer` | no | Maximum number of uses (minimo 1) |
| `once_per_customer` | `boolean` | no | Limit to one use per customer |
| `duration` | `string` | no | How long discount applies for subscriptions (valori: `forever`, `repeating`, `once`) |
| `duration_cycles` | `integer` | no | Number of billing cycles (minimo 1) |
| `apply_for_products` | array di `string` | no | Product IDs (hashed) to restrict discount to |
| `apply_for_prices` | array di `string` | no | Price IDs (hashed) to restrict discount to |
| `only_for` | array di `string` | no | Pricing types this discount is valid for. Pass an empty array to remove the restriction. If apply_for_products is also provided, only_for will be ignored and stored as null. |

### EnrollmentRequest

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `product_ids` | array di `string` | **sì** | Array of product IDs (hashed) |

### CertifyUserRequest

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `module_id` | `string` | **sì** | Course module ID (hashed) |

### CertifyUserResponse

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `data` | `object` | no | — |

### UserResponse

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `data` | [`User`](#user) | no | — |

### UserListResponse

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `data` | array di [`User`](#user) | no | — |
| `meta` | [`PaginationMeta`](#paginationmeta) | no | — |

### DiscountResponse

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `data` | [`Discount`](#discount) | no | — |

### DiscountListResponse

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `data` | array di [`Discount`](#discount) | no | — |
| `meta` | [`PaginationMeta`](#paginationmeta) | no | — |

### EnrollmentResponse

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `data` | `object` | no | — |

### EnrollmentResult

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `product_id` | `string` | no | — |
| `status` | `string` | no | Valori: `enrolled`, `unenrolled`, `already_enrolled`, `not_enrolled`, `error` |
| `message` | `string` | no | Error message if status is 'error' |

### ProductListResponse

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `data` | `object` | no | — |

### ProductItem

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `id` | `string` | no | Product ID (hashed) - use this with enrollment and discount endpoints |
| `item_id` | `string` | no | Underlying item ID (hashed) - the course/bundle/etc ID |
| `title` | `string` | no | Product title |
| `type` | `string` | no | Product type (valori: `course`, `bundle`, `digital_download`, `generic`, `community`) |
| `prices` | array di [`ProductPrice`](#productprice) | no | Active pricing options for this product |

### ProductPrice

A pricing option for a product

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `id` | `string` | no | Price ID (hashed) - use this with discount endpoints (apply_for_prices) |
| `name` | `string` | no | Price name/title (e.g., 'Basic Plan', 'Pro Plan') |
| `amount` | `number` | no | Price amount in the tenant's currency |

### Subscription

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `id` | `string` | no | Unique identifier (hashed) |
| `status` | `string` | no | Subscription status (valori: `active`, `trial`, `cancelled`, `expired`, `paused`) |
| `active` | `boolean` | no | Whether the subscription is currently active |
| `period` | `string` | no | Billing period (valori: `1 day`, `1 week`, `1 month`, `3 month`, `6 month`, `1 year`) |
| `number_of_payments` | `integer` | no | Total number of successful payments |
| `failed_payments` | `integer` | no | Number of consecutive failed payments |
| `trial_ends_at` | `string` (date-time) | no | Trial period end date |
| `ends_at` | `string` (date-time) | no | Subscription end date (set when cancelled) |
| `next_attempt` | `string` (date-time) | no | Next payment attempt date |
| `user_id` | `string` | no | User ID (hashed) |
| `product_id` | `string` | no | Product ID (hashed) |
| `order_id` | `string` | no | Order ID (hashed) |
| `created_at` | `string` (date-time) | no | — |
| `updated_at` | `string` (date-time) | no | — |
| `billing` | [`BillingAddress`](#billingaddress) | no | Billing address from the subscription's associated order. Present in detail and list responses. |
| `order` | `object` | no | Associated order details (included when the order relation is loaded) |

### SubscriptionResponse

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `data` | [`Subscription`](#subscription) | no | — |

### CreateSubscriptionRequest

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `product_id` | `string` | **sì** | Product ID (hashed) |
| `product_pricing_id` | `string` | **sì** | Product pricing ID (hashed). Must reference a pricing of type 'subscription'. |
| `amount` | `number` | no | Payment amount. Defaults to the product pricing amount if not provided. (minimo 0) |
| `discount` | `number` | no | Discount amount applied (minimo 0) |
| `user_id` | `string` | no | Existing user ID (hashed). If not provided, email/first_name/last_name are required to look up or create a user. |
| `email` | `string` (email) | no | User email. Required if user_id is not provided. (max 191 caratteri) |
| `first_name` | `string` | no | User first name. Required if user_id is not provided. (max 100 caratteri) |
| `last_name` | `string` | no | User last name. Required if user_id is not provided. (max 100 caratteri) |
| `status` | `string` | **sì** | Initial subscription status (valori: `active`, `trial`) |
| `trial_ends_at` | `string` (date-time) | no | Trial period end date (relevant when status is 'trial') |
| `metadata` | `object` | no | Key-value metadata to attach to the order created for this subscription |
| `country` | `string` | **sì** | Billing country (max 100 caratteri) |
| `state` | `string` | no | Billing state / region (max 100 caratteri) |
| `city` | `string` | no | Billing city (max 100 caratteri) |
| `address` | `string` | no | Billing street address (max 255 caratteri) |
| `zip` | `string` | no | Billing zip / postal code (max 20 caratteri) |
| `phone` | `string` | no | Phone number (max 30 caratteri) |
| `vat_number` | `string` | no | VAT number (max 50 caratteri) |

### UpdateSubscriptionRequest

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `next_attempt` | `string` (date-time) | no | Next payment attempt date |
| `period` | `string` | no | Billing period (valori: `1 day`, `1 week`, `1 month`, `3 month`, `6 month`, `1 year`) |
| `country` | `string` | no | Billing country (max 100 caratteri) |
| `state` | `string` | no | Billing state / region (max 100 caratteri) |
| `city` | `string` | no | Billing city (max 100 caratteri) |
| `address` | `string` | no | Billing street address (max 255 caratteri) |
| `zip` | `string` | no | Billing zip / postal code (max 20 caratteri) |
| `phone` | `string` | no | Phone number (max 30 caratteri) |
| `vat_number` | `string` | no | VAT number (max 50 caratteri) |

### CancelSubscriptionRequest

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `cancel` | `string` | **sì** | When to cancel: immediately, at end of current period, or on a specific date (valori: `now`, `at_end_of_period`, `on_date`) |
| `cancel_date` | `string` (date-time) | no | Specific cancellation date (required when cancel is 'on_date') |

### SubscriptionPaymentRequest

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `amount` | `number` | **sì** | Payment amount (minimo 0) |
| `discount` | `number` | no | Discount amount applied (minimo 0) |

### SubscriptionPaymentFailedRequest

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `amount` | `number` | no | Payment amount (minimo 0) |
| `discount` | `number` | no | Discount amount applied (minimo 0) |
| `failed_reason` | `string` | no | Human-readable reason for the payment failure (e.g. 'Card declined - insufficient funds'). Stored in the order's additional_status field. (max 255 caratteri) |

### Order

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `id` | `string` | no | Unique identifier (hashed) |
| `external` | `boolean` | no | Whether this order was created via the external API |
| `status` | `string` | no | Order status |
| `user_id` | `string` | no | User ID (hashed) |
| `user_email` | `string` | no | User email address |
| `discount_id` | `string` | no | Discount ID (hashed) |
| `billing` | [`BillingAddress`](#billingaddress) | no | — |
| `totals` | [`OrderTotals`](#ordertotals) | no | — |
| `items` | array di [`OrderItem`](#orderitem) | no | — |
| `metadata` | `object` | no | Key-value metadata attached to the order |
| `created_at` | `string` (date-time) | no | — |
| `updated_at` | `string` (date-time) | no | — |

### OrderItem

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `product_id` | `string` | no | Product ID (hashed) |
| `product_name` | `string` | no | Product name |
| `amount` | `number` | no | Item amount |
| `discount` | `number` | no | Discount applied to item |
| `tax` | `number` | no | Tax amount |
| `quantity` | `integer` | no | Item quantity |
| `type` | `string` | no | Product type |
| `access_type` | `string` | no | Access type granted |

### OrderResponse

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `data` | [`Order`](#order) | no | — |

### CreateOrderRequest

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `user_id` | `string` | no | Existing user ID (hashed). If not provided, email/first_name/last_name are required to look up or create a user. |
| `email` | `string` (email) | no | User email. Required if user_id is not provided. (max 191 caratteri) |
| `first_name` | `string` | no | User first name. Required if user_id is not provided. (max 100 caratteri) |
| `last_name` | `string` | no | User last name. Required if user_id is not provided. (max 100 caratteri) |
| `line_items` | array di `object` | **sì** | Order line items |
| `status` | `string` | no | Order status (valori: `completed`, `pending`, `created`) |
| `country` | `string` | **sì** | Billing country (max 100 caratteri) |
| `state` | `string` | no | Billing state (max 100 caratteri) |
| `city` | `string` | no | Billing city (max 100 caratteri) |
| `address` | `string` | no | Billing address (max 255 caratteri) |
| `zip` | `string` | no | Billing zip/postal code (max 20 caratteri) |
| `phone` | `string` | no | Phone number (max 30 caratteri) |
| `vat_number` | `string` | no | VAT number (max 50 caratteri) |
| `discount_code` | `string` | no | Discount code to apply (max 191 caratteri) |
| `discount_id` | `string` | no | Discount ID (hashed) to apply |
| `metadata` | `object` | no | Key-value metadata to attach to the order |
| `payment_reference` | `string` | no | External payment reference (max 255 caratteri) |
| `notes` | `string` | no | Order notes (max 1000 caratteri) |

### UpdateOrderStatusRequest

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `status` | `string` | **sì** | New order status (valori: `completed`, `cancelled`, `refunded`) |

### PaginationMeta

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `current_page` | `integer` | no | — |
| `from` | `integer` | no | — |
| `last_page` | `integer` | no | — |
| `per_page` | `integer` | no | — |
| `to` | `integer` | no | — |
| `total` | `integer` | no | — |

### Error

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `error` | `object` | no | — |

### BillingAddress

Billing address information attached to an order

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `country` | `string` | no | — |
| `state` | `string` | no | — |
| `city` | `string` | no | — |
| `address` | `string` | no | — |
| `zip` | `string` | no | — |
| `phone` | `string` | no | — |
| `vat_number` | `string` | no | — |

### OrderTotals

Computed totals for the order

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `subtotal` | `number` (float) | no | — |
| `discount` | `number` (float) | no | — |
| `tax` | `number` (float) | no | — |
| `tax_percentage` | `number` (float) | no | — |
| `total` | `number` (float) | no | — |

### Certificate

Certificate issued to a user upon completing a course module

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `id` | `string` | no | Certificate ID (hashed) |
| `object` | `string` | no | Valori: `certificate` |
| `certificate_url` | `string` (uri) | no | URL to the generated certificate PDF |
| `course_name` | `string` | no | Name of the course |
| `module_name` | `string` | no | Name of the module |
| `score` | `number` | no | Raw score achieved |
| `percentage` | `number` | no | Score as a percentage |
| `completed_at` | `string` (date-time) | no | Date the certificate was issued |

### CompletedExam

A completed exam record for a user

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `id` | `string` | no | Exam attempt ID (hashed) |
| `object` | `string` | no | Valori: `exam` |
| `name` | `string` | no | Exam name |
| `course` | `string` | no | Name of the associated course |
| `module` | `string` | no | Name of the associated module |
| `passed` | `boolean` | no | Whether the exam was passed |
| `points` | `number` | no | Points scored |
| `max_points` | `number` | no | Maximum possible points |
| `percentage` | `number` | no | Score as a percentage |
| `passing_grade` | `number` | no | Minimum percentage required to pass |
| `attempts` | `integer` | no | Number of attempts made |
| `max_attempts` | `integer` | no | Maximum attempts allowed (null for unlimited) |
| `completed_at` | `string` (date-time) | no | Date the exam was completed |

### SubscriptionListResponse

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `data` | array di [`Subscription`](#subscription) | no | — |
| `meta` | [`PaginationMeta`](#paginationmeta) | no | — |

### OrderListResponse

| Campo | Tipo | Obbligatorio | Descrizione |
| --- | --- | --- | --- |
| `data` | array di [`Order`](#order) | no | — |
| `meta` | [`PaginationMeta`](#paginationmeta) | no | — |

## Errori

Gli errori seguono lo schema [`Error`](#error). Riporta sempre `message` e `request_id` quando una chiamata fallisce.

| Risposta | Codice HTTP | Descrizione |
| --- | --- | --- |
| `VersionHeaders` | — | Common version headers included in all responses. X-API-Supported-Versions is always present. Deprecation, Sunset, and X-API-Deprecation-Info are only present when using a deprecated API version. |
| `Unauthorized` | 401 | Authentication failed |
| `Forbidden` | 403 | Insufficient permissions |
| `NotFound` | 404 | Resource not found |
| `ValidationError` | 422 | Validation failed |
| `RateLimited` | 429 | Rate limit exceeded |

## Problemi noti della spec

Questi riferimenti compaiono in `docs/openapi.json` ma non hanno una definizione corrispondente. La spec è conservata come viene servita da Skillplate, senza correzioni locali: vanno risolti a monte.

- `#/components/responses/TooManyRequests`
