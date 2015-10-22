---
title: AcceptOn API Reference

language_tabs:
  - shell
  - ruby
  - python

toc_footers:
 - <a href='guides/applications.html'>Applications guide</a>

includes:
  - errors
  - support

search: true
---

# Introduction

Welcome to AcceptOn's API! Our API is heavily inspired by [REST][rest]. All
responses from our API should be returned in [JSON][json] format. Please
only use HTTPS to ensure data privacy, otherwise, we will send flying monkeys
to hunt you down. Beware the monkeys! Seriously, they hurt.

Available client libraries are located at:

* [Ruby](https://github.com/accepton/accepton-ruby)
* [Python](https://github.com/accepton/accepton-python)
* More to come Real Soon Now, pinky swear!

[json]: http://www.json.org
[rest]: https://en.wikipedia.org/wiki/Representational_state_transfer

# Environments

In order to allow for testing, the AcceptOn API is available in the following
locations:

* Staging: https://staging-checkout.accepton.com
* Production: https://checkout.accepton.com

The staging environment should be used for testing. Please keep in mind that
the data can be deleted at any time.

To actually process payments, the production environment must be used. To
switch to production, simply update the URL and corresponding API key, and if
the moon is in the right (meaning both correct and directional) quadrant of the
sky, it should "Just Work"!

# Getting Started

First, you'll need to create an account and retrieve your API credentials:

1. If you haven't done so already, please create an account in the staging environment
[https://staging.accepton.com/sign_up](https://staging.accepton.com/sign_up)
1. Link a payment processor such as Stripe or PayPal
1. Retrieve your API key here: [https://staging.accepton.com/admin/user/profile](https://staging.accepton.com/admin/user/profile)

Next, create a payment form that you'll use to collect payment:

1. Click "Create a Form" in the bottom left area of the navigation
1. Copy and paste the generated code to your site

Then, make your first transaction using the form:

1. Generate a [transaction token](#create-a-transaction-token)
1. Pass the id attribute of the response (aka the token) into the configuration
   of the AcceptOn form
1. Profit!

# Authentication

> To authorize, use this code:

```shell
curl "https://staging-checkout.accepton.com/ping" \
  -H "Authorization: Bearer <API KEY>"
```

```ruby
require 'accepton'

client = AcceptOn::Client.new(api_key: API_KEY, environment: :staging)
```

```python
from accepton import Client

client = Client(api_key=API_KEY, environment='staging')
```

AcceptOn requires an API key to gain access to, well, the actual API. After
logging into accepton.com, you'll find your API key by clicking your email
address in the top right, My Profile, and then use the Secret key found under
the section entitled "API keys".

AcceptOn expects for this super secret API key to be included in all API
requests found in a header that looks like the following:

`Authorization: Bearer <API KEY>`

For the work efficient types (aka lazy), you can also append your API key as
a parameter named access_token to any request if modifying headers isn't your
thing.

<aside class="notice">
  Remember, you must replace &lt;API KEY&gt; with your unique Secret API key.
</aside>

# Resources

## Transaction Tokens

A transaction token is used to allow for details such as the amount to charge,
the currency, and application fee to be created dynamically from a trusted
source. This is to ensure that no one has tampered with your transaction prior
to the charge being completed.

This can either be done one time using the "Create a Form" link after signing
in to https://staging.accepton.com. This is useful for creating a form
with a fixed price.

Alternatively, these tokens can be generated programmatically to support
dynamic pricing using an API client. For instance, this allows for the price
and relevant options to be delayed until the end of the checkout process.

### The Transaction Token object

#### Attributes

 Attribute                          | Description
------------------------------------|--------------
 **id** <br> *string*               | A unique id.
 **type** <br> *string*             | Always "transaction".
 **created** <br> *string*          | When the token was created, in [ISO 8601][iso8601] format.
 **amount** <br> *integer*          | The amount in cents of the transaction.
 **application_fee** <br> *integer* | The application fee in cents to be passed on to the processor. For use only by [Applications][applications].
 **currency** <br> *string*         | The currency to charge in [ISO 4217][iso4217] format (default: usd).
 **description** <br> *string*      | A description of the transaction for your own identification purposes. It could be used to include a name of the item purchased, a confirmation number, or any other identifier you want to use.

[applications]: /guides/applications.html
[iso8601]: https://en.wikipedia.org/wiki/ISO_8601
[iso4217]: https://en.wikipedia.org/wiki/ISO_4217

### Create a Transaction Token

> Create a Transaction Token request

```shell
curl https://staging-checkout.accepton.com/v1/tokens \
  -X POST \
  -H "Authorization: Bearer <API KEY>" \
  -d amount=1000 \
  -d description="Hipster Flannel Tshirt"
```

```ruby
require 'accepton'

client = AcceptOn::Client.new(api_key: API_KEY, environment: :staging)
response = client.create_token(amount: 10_00, description: "Hipster Flannel Tshirt")
```

```python
from accepton import Client

client = Client(api_key=API_KEY, environment='staging')
response = client.create_token(amount=1000, currency='usd',
                               description='Hipster Flannel Tshirt')
```

> Create a Transaction Token response

```json
{
  "id":"txn_643f20df91f94ff3b6cd614b63228419",
  "type":"transaction",
  "created":"2015-01-16T20:08:17.837Z",
  "amount":1000,
  "application_fee":null,
  "currency":null,
  "description":"Hipster Flannel Tshirt"
}
```

#### Arguments

 Argument                           | Description
------------------------------------|----------------------------------------
 **amount** <br> *integer*          | The amount in cents of the transaction.
 **application_fee** <br> *integer* | The application fee in cents to be passed on to the processor. For use only by [Applications][applications].
 **currency** <br> *string*         | The currency to charge in [ISO 4217][iso4217] format (default: usd).
 **description** <br> *string*      | A description of the transaction for your own identification purposes. It could be used to include a name of the item purchased, a confirmation number, or any other identifier you want to use.
 **merchant_paypal_account** <br> *string, optional* | The merchant's Paypal account when you want to pay a merchant instead of yourself. Can be used with an application fee.

#### Returns

A transaction token object.

### Retrieve an existing Transaction Token

Used to retrieve the details of a transaction token that has previously been
created.

> Retreive a Transaction Token request

```shell
curl https://staging-checkout.accepton.com/v1/tokens/txn_643f20df91f94ff3b6cd614b63228419 \
  -X GET \
  -H "Authorization: Bearer <API KEY>"
```

```ruby
require 'accepton'

client = AcceptOn::Client.new(api_key: API_KEY, environment: :staging)
response = client.token('txn_b43a7e1e51410639979ab2047c156caa')
```

```python
from accepton import Client

client = Client(api_key=API_KEY, environment='staging')
response = client.token('txn_b43a7e1e51410639979ab2047c156caa')
```

> Retreive a Transaction Token response

```json
{
  "id":"txn_643f20df91f94ff3b6cd614b63228419",
  "type":"transaction",
  "created":"2015-01-16T20:08:17.837Z",
  "amount":1000,
  "application_fee":null,
  "currency":null,
  "description":"Hipster Flannel Tshirt"
}
```

#### Arguments

 Argument                       | Description
--------------------------------|-----------------------------------
 **id** <br> *string, required* | The unique id of the transaction.

#### Returns

A Transaction Token object.

## Charges
To charge a customer, you create a charge object using the AcceptOn form.
You can query charges singularly by the id or search through the history of
charges on your account.

### The Charge object
<table>
<tr><th>Attribute</th><th>Description</th></tr>
<tr><td><strong>id</strong><br/><em>string</em></td><td>The unique charge identifier.</td></tr>
<tr><td><strong>amount</strong><br/><em>integer</em></td><td>The amount charged in cents.</td></tr>
<tr><td><strong>created</strong><br/><em>datetime</em></td><td>The time the charge was created.</td></tr>
<tr><td><strong>currency</strong><br/><em>string</em></td><td>The currency to charge in ISO format (default: usd).</td></tr>
<tr><td><strong>description</strong><br/><em>string</em></td><td>The description of the charge.</td></tr>
<tr><td><strong>metadata</strong><br/><em>hash</em></td><td>Any metadata associated with the charge.</td></tr>
<tr><td><strong>refunded</strong><br/><em>boolean</em></td><td>Whether the charge has been refunded.</td></tr>
<tr><td><strong>remote_id</strong><br/><em>boolean</em></td><td>The identifier of the charge on the processor.</td></tr>
<tr><td><strong>status</strong><br/><em>string</em></td><td>The status of the charge.</td></tr>
</table>

> Retrieve a charge.

```shell
curl https://staging-checkout.accepton.com/v1/charges/chg_123 \
  -X GET \
  -H "Authorization: Bearer <API KEY>"
```

```ruby
require 'accepton-ruby'

client = AcceptOn::Client.new(api_key: API_KEY, environment: :staging)
response = client.charge('chg_123')
```

```python
from accepton import Client

client = Client(api_key=API_KEY, environment='staging')
response = client.charges("chg_123")
```

### Retrieve a Charge

Used to retrieve the details of a charge has previously been created.

#### Arguments
<table>
<tr><th>Argument</th><th>Description</th></tr>
<tr><td><strong>id</strong><br/><em>string, required</em></td><td>The unique id of the charge.</td></tr>
</table>

#### Returns
A Charge object.

> Search for previous charges within a data range, sorted by the field you
specify.

```shell
curl https://staging-checkout.accepton.com/v1/charges \
  -X GET \
  -H "Authorization: Bearer <API KEY>" \
  -d amount=1000 \
  -d charge_id="chg_123" \
  -d start_date="2015-06-01" \
  -d end_date="2015-07-01" \
  -d order_by="created_at" \
  -d order="asc"
```

```ruby
require 'accepton-ruby'

client = AcceptOn::Client.new(api_key: API_KEY, environment: :staging)
response = client.charges(start_date: '2015-06-01', end_date: '2015-07-01', order_by: 'created_at', order: 'asc')
```

```python
from accepton import Client

client = Client(api_key=API_KEY, environment='staging')
response = client.charges(start_date='2015-06-01', end_date='2015-07-01', order_by='created_at', order='asc')
```

### List Previous Charges

#### Arguments
<table>
<tr><th>Argument</th><th>Description</th></tr>
<tr><td><strong>amount</strong><br/><em>integer</em></td><td>List any charges with the amount.</td></tr>
<tr><td><strong>charge_id</strong><br/><em>string</em></td><td>The unique id of the charge.</td></tr>
<tr><td><strong>start_date</strong><br/><em>string</em></td><td>List any charges created after the date.</td></tr>
<tr><td><strong>end_date</strong><br/><em>string</em></td><td>List any charges created before the date.</td></tr>
<tr><td><strong>order_by</strong><br/><em>string</em></td><td>The name of the attribute to order by.</td></tr>
<tr><td><strong>order</strong><br/><em>string</em></td><td>The ordering of the list (asc, desc).</td></tr>
</table>

#### Returns
An array of Charges.

## Refunds

Refunds allow the reversal of a charge that has not already been fully
refunded. Partial refunds are accepted up to the total amount of the
original charge.

### The Refund object

#### Attributes

 Attribute                   | Description
-----------------------------|----------------------------------------------------------------------
 **id** <br> *string*        | A unique id.
 **amount** <br> *integer*   | The amount in cents of the refund.
 **created** <br> *datetime* | The time the refund was created, in [ISO 8601][iso8601] format.
 **currency** <br> *string*  | The currency to charge in [ISO 4217][iso4217] format (default: usd).
 **metadata** <br> *hash*    | Any metadata associated with the refund.
 **reason** <br> *string*    | The reason for the refund.

### Create a Refund

> Create a Refund request

```shell
curl https://staging-checkout.accepton.com/v1/refunds \
  -X POST \
  -H "Authorization: Bearer <API KEY>" \
  -d amount=1000 \
  -d charge_id="chg_123"
```

```ruby
require 'accepton'

client = AcceptOn::Client.new(api_key: API_KEY, environment: :staging)
response = client.refund(amount: 10_00, charge_id: "chg_123")
```

```python
from accepton import Client

client = Client(api_key=API_KEY, environment='staging')
response = client.refund(amount=1000, charge_id="chg_123")
```

> Create a Refund response

```json
{
  "id": "ref_123",
  "amount": 1000,
  "created_at": "2015-01-16T22:45:18.357Z",
  "currency": "usd",
  "metadata": null,
  "reason": "requested_by_customer"
}
```

#### Arguments

 Argument                              | Description
---------------------------------------|----------------------------------------------------
 **amount** <br> *integer, required*   | The amount in cents to refund.
 **charge_id** <br> *string, required* | The id of the charge to associate with the refund.

#### Returns

A Refund object.

## Promo Codes

Promo codes allow you to create a code that offers a discount to your
customers. When they are checking out, they will be offered the option on the
form to enter a promo code, which you can give to them in marketing materials.

### The Promo Code object

#### Attributes

 Attribute                          | Description
------------------------------------|----------------------------------------------------------------------
 **created_at** <br> *datetime*     | The time the promo code was created, in [ISO 8601][iso8601] format.
 **name** <br> *string*             | The promo code that you give your customers.
 **promo_type** <br> *string*       | The type of promotion. One of: "amount" (for amount off purchase), "fixed_price" (to set a transaction price, i.e. of $5.00), or "percentage" (for percent off purchase).
 **value** <br> *float or integer*  | The value of the promotion. For an "amount" or "fixed_price" type, the amount in cents (i.e. 1000 is $10.00). For a "percentage" type, the percent off as a decimal (i.e. 10.0 is 10%).

### Create a Promo Code

> Create a Promo Code request

```shell
curl https://staging-checkout.accepton.com/v1/promo_codes \
  -X POST \
  -H "Authorization: Bearer <API KEY>" \
  -d name="20OFF" \
  -d promo_type="amount" \
  -d value=2000
```

```ruby
require 'accepton'

client = AcceptOn::Client.new(api_key: API_KEY, environment: :staging)
response = client.create_promo_code(name: '20OFF', promo_type: 'amount', value: 20_00)
```

```python
from accepton import Client

client = Client(api_key=API_KEY, environment='staging')
response = client.create_promo_code(name="20OFF", promo_type="amount", value=2000)
```

> Create a Promo Code response

```json
{
  "object": "promo_code",
  "created_at": "2015-07-16T22:47:29.591+00:00",
  "name": "20OFF",
  "promo_type": "amount",
  "value": 2000
}
```

#### Arguments

 Attribute                          | Description
------------------------------------|----------------------------------------------
 **name** <br> *string*             | The promo code that you give your customers.
 **promo_type** <br> *string*       | The type of promotion. One of: "amount" (for amount off purchase), "fixed_price" (to set a transaction price, i.e. of $5.00), or "percentage" (for percent off purchase).
 **value** <br> *float or integer*  | The value of the promotion. For an "amount" or "fixed_price" type, the amount in cents (i.e. 1000 is $10.00). For a "percentage" type, the percent off as a decimal (i.e. 10.0 is 10%).

#### Returns

A Promo Code object.

### Retrieve a Promo Code

> Retrieve a Promo Code request

```shell
curl https://staging-checkout.accepton.com/v1/promo_codes/20OFF \
  -X GET \
  -H "Authorization: Bearer <API KEY>"
```

```ruby
require 'accepton'

client = AcceptOn::Client.new(api_key: API_KEY, environment: :staging)
response = client.promo_code('20OFF')
```

```python
from accepton import Client

client = Client(api_key=API_KEY, environment='staging')
response = client.promo_code("20OFF")
```

> Retrieve a Promo Code response

```json
{
  "object": "promo_code",
  "created_at": "2015-07-16T22:47:29.591+00:00",
  "name": "20OFF",
  "promo_type": "amount",
  "value": 2000
}
```

#### Arguments

 Argument                         | Description
----------------------------------|-----------------------------
 **name** <br> *string, required* | The name of the promo code.

#### Returns

A Promo Code object.

### List Promo Codes

> List Promo Codes request

```shell
curl https://staging-checkout.accepton.com/v1/promo_codes \
  -X GET \
  -H "Authorization: Bearer <API KEY>" \
  -d page=1 \
  -d per_page=20 \
  -d promo_type="amount"
```

```ruby
require 'accepton'

client = AcceptOn::Client.new(api_key: API_KEY, environment: :staging)
response = client.promo_codes(page: 1, per_page: 20, promo_type: 'amount')
```

```python
from accepton import Client

client = Client(api_key=API_KEY, environment='staging')
response = client.promo_codes(page=1, per_page=20, promo_type='amount')
```

> List Promo Codes response

```json
{
  "object": "list",
    "total": 2,
    "data": [
      {
        "object": "promo_code",
        "created_at": "2015-09-08T21:32:56.164+00:00",
        "name": "30OFF",
        "promo_type": "amount",
        "value": 3000
      },
      {
        "object": "promo_code",
        "created_at": "2015-07-16T22:47:29.591+00:00",
        "name": "20OFF",
        "promo_type": "amount",
        "value": 2000
      }
    ]
}
```

#### Arguments

 Argument                         | Description
----------------------------------|-----------------------------
 **order_by** <br> *string*       | The name of the attribute to order by.
 **order** <br> *string*          | The ordering of the list (asc, desc).
 **page** <br> *integer*          | The page number to retrieve.
 **per_page** <br> *integer*      | The size of the page to retrieve (max: 100).
 **promo_type** <br> *string*     | The type of promo code to filter by.

#### Returns

An array of Promo Codes.

### Update a Promo Code

> Update a Promo Code request

```shell
curl https://staging-checkout.accepton.com/v1/promo_codes/20OFF \
  -X PUT \
  -H "Authorization: Bearer <API KEY>" \
  -d name="21OFF" \
  -d promo_type="amount" \
  -d value=2100
```

```ruby
require 'accepton'

client = AcceptOn::Client.new(api_key: API_KEY, environment: :staging)
promo_code = client.promo_code('20OFF')
promo_code.name = '21OFF'
promo_code.value = 21_00
promo_code = client.update_promo_code(promo_code)
```

```python
from accepton import Client

client = Client(api_key=API_KEY, environment='staging')
promo_code = client.promo_code("20OFF")
promo_code.name = "21OFF"
promo_code.value = 2100
promo_code = client.update_promo_code(promo_code)
```

> Update a Promo Code response

```json
{
  "object": "promo_code",
  "created_at": "2015-07-16T22:47:29.591+00:00",
  "name": "21OFF",
  "promo_type": "amount",
  "value": 2100
}
```

#### Arguments

 Argument                           | Description
------------------------------------|-----------------------------
 **name** <br> *string*             | The new promo code that you give your customers.
 **promo_type** <br> *string*       | The new type of promotion. One of: "amount" (for amount off purchase), "fixed_price" (to set a transaction price, i.e. of $5.00), or "percentage" (for percent off purchase).
 **value** <br> *float or integer*  | The new value of the promotion. For an "amount" or "fixed_price" type, the amount in cents (i.e. 1000 is $10.00). For a "percentage" type, the percent off as a decimal (i.e. 10.0 is 10%).

#### Returns

The updated Promo Code object.

### Delete a Promo Code

> Delete a Promo Code request

```shell
curl https://staging-checkout.accepton.com/v1/promo_codes/20OFF \
  -X DELETE \
  -H "Authorization: Bearer <API KEY>"
```

```ruby
require 'accepton'

client = AcceptOn::Client.new(api_key: API_KEY, environment: :staging)
promo_code = client.promo_code('20OFF')
deleted = client.delete_promo_code(promo_code)
```

```python
from accepton import Client

client = Client(api_key=API_KEY, environment='staging')
promo_code = client.promo_code("20OFF")
deleted = client.delete_promo_code(promo_code)
```

> Delete a Promo Code response

```json
{
  "object": "promo_code",
  "created_at": "2015-07-16T22:47:29.591+00:00",
  "name": "20OFF",
  "promo_type": "amount",
  "value": 2000
}
```

#### Arguments

 Argument                           | Description
------------------------------------|-----------------------------------------------------
 **name** <br> *string*             | The name of the promo code that you want to delete.

#### Returns

The deleted Promo Code object.
