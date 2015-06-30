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

Welcome to the AcceptOn's API! Our API is heavily inspired by [REST](https://en.wikipedia.org/wiki/Representational_state_transfer)
All responses from our API should be returned in [JSON](http://www.json.org) format.
Please only use HTTPS to ensure data privacy, otherwise, we will send flying monkeys to hunt you down.
Beware the monkeys! Seriously, they hurt.

Available client libraries are located at:

* [Ruby](https://github.com/accepton/accepton-ruby)
* [Python](https://github.com/accepton/accepton-python)
* More to come Real Soon Now, pinky swear!

# Environments

In order to allow for testing, the AcceptOn API is available in the following locations:

* Staging: https://staging-checkout.accepton.com
* Production: https://checkout.accepton.com

The staging environment should be used for testing. Please keep in mind that
the data can be deleted at any time.

To actually process payments, the production environment must be used.
To switch to production, simply update the URL and corresponding API KEY,
and if the moon is in the right (meaning both correct and directional) quadrant of the sky, it should "Just Work"!

# Getting Started

First, you'll need to create an account and retrieve your API credentials:

1. If you haven't done so already, please create an account in the Staging environment
[https://staging.accepton.com/sign_up](https://staging.accepton.com/sign_up)
1. Link a payment processor such as Stripe or Braintree
1. Retrieve your API key here: [https://staging.accepton.com/admin/user/profile](https://staging.accepton.com/admin/user/profile)

Next, create a payment form that you'll use to collect payment:

1. Click "Create a Form" in the bottom left area of the navigation
1. Copy and paste the generated code to your site

Then, make your first transaction using the form:

1. Generate a [transaction token](#create-a-transaction-token)
1. Pass the id attribute of the response (aka the token) into the configuration of the AcceptOn form
1. Profit!

# Authentication

> To authorize, use this code:

```shell
curl "https://staging-checkout.accepton.com/ping" \
  -H "Authorization: Bearer <API KEY>"
```

```ruby
require 'accepton-ruby'

environment = :production
client = AcceptOn::Client.new(api_key: API_KEY, environment: environment)
```

```python
from accepton import Client

client = Client(api_key=API_KEY, environment='staging')
```

AcceptOn requires an API key to gain access to, well, the actual API. After logging into accepton.com, you'll find your API key by clicking your email address in the top right, My Profile, and then use the Secret key found under the section entitled "API KEYS".

AcceptOn expects for this super secret API key to be included in all API requests found in a header that looks like the following:

`Authorization: Bearer <API KEY>`

For the work efficient types (aka lazy), you can also append your API KEY as a parameter named access_token to any request if modifying headers isn't your thing.

<aside class="notice">
  Remember, you must replace API KEY with your unique Secret API key.
</aside>

# Resources

## Transaction tokens
A transaction token is used to allow for details such as the amount to charge,
the currency, and application fee to be created dynamically from a trusted
source. This is to ensure that no tampering has been performed prior to
the charge being completed.

This can either be done one time using the "Create a Form" link after signing
in to https://staging.accepton.com. This is useful for creating a form
with a fixed price.

Or, these tokens can be generated programmatically to support dynamic pricing
using an API client. For instance, this allows for the price and relevant
options to be delayed until the end of the checkout process.

### The Transaction token object

#### Attributes
<table>
<tr><th>Attribute</th><th>Description</th></tr>
<tr><td><strong>id</strong><br/><em>string</em></td><td>A unique id.</td></tr>
<tr><td><strong>type</strong><br/><em>string</em></td><td>Always "transaction".</td></tr>
<tr><td><strong>created</strong><br/><em>string</em></td><td>When the token was created, in iso8601 format.</td></tr>
<tr><td><strong>amount</strong><br/><em>integer</em></td><td>The amount in cents of the transaction.</td></tr>
<tr><td><strong>application_fee</strong><br/><em>integer</em></td><td>The application fee in cents to be passed on to the processor. For use only by <a href="guides/applications.html">Applications</a></td></tr>
<tr><td><strong>currency</strong><br/><em>string</em></td><td>The currency to charge in ISO format (default: usd).</td></tr>
<tr><td><strong>description</strong><br/><em>string</em></td><td>A description of the transaction for your own identification purposes. It could be used to include a name of the item purchased, or a confirmation number, etc.</td></tr>
</table>

### Create a Transaction token
> Create a Transaction token request

```shell
curl https://staging-checkout.accepton.com/v1/tokens \
  -X POST \
  -H "Authorization: Bearer <API KEY>" \
  -d amount=1000 \
  -d description="Hipster Flannel Tshirt"
```

```ruby
require 'accepton-ruby'

environment = :production
client = AcceptOn::Client.new(api_key: API_KEY, environment: environment)
response = client.create_token(amount: 10_00, description: "Hipster Flannel Tshirt")
```

```python
from accepton import Client

client = Client(api_key=API_KEY, environment='staging')
response = client.create_token(amount=1000, currency='usd',
                               description='Hipster Flannel Tshirt')
```

> Create a Transaction token response

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
<table>
<tr><th>Argument</th><th>Description</th></tr>
<tr><td><strong>amount</strong><br/><em>integer, required</em></td><td>The amount in cents of the transaction.</td></tr>
<tr><td><strong>application_fee</strong><br/><em>integer, optional</em></td><td>The application fee in cents to be passed on to the processor.</td></tr>
<tr><td><strong>currency</strong><br/><em>string</em></td><td>The currency to charge in ISO format (default: usd).</td></tr>
<tr><td><strong>description</strong><br/><em>string, optional</em></td><td>A description of the transaction for your own identification purposes. It could be used to include a name of the item purchased, or a confirmation number, etc.</td></tr>
<tr><td><strong>merchant_paypal_account</strong><br/><em>string, optional</em></td><td>The merchant's Paypal account when you want to pay a merchant instead of yourself. Can be used with an application fee.</td></tr>
</table>

#### Returns
A transaction token object.

### Retrieve an existing Transaction token
> Retreive a Transaction token request

```shell
curl https://staging-checkout.accepton.com/v1/tokens/txn_643f20df91f94ff3b6cd614b63228419 \
  -X GET \
  -H "Authorization: Bearer <API KEY>"
```

```ruby
TODO
```

> Retreive a Transaction token response

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

Used to retrieve the details of a transaction token that has previously been
created.

#### Arguments
<table>
<tr><th>Argument</th><th>Description</th></tr>
<tr><td><strong>id</strong><br/><em>string, required</em></td><td>The unique id of the transaction.</td></tr>
</table>

#### Returns
A Transaction token object.

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
<table>
<tr><th>Attribute</th><th>Description</th></tr>
<tr><td><strong>id</strong><br/><em>string</em></td><td>A unique id.</td></tr>
<tr><td><strong>amount</strong><br/><em>integer</em></td><td>The amount in cents of the refund.</td></tr>
<tr><td><strong>created</strong><br/><em>datetime</em></td><td>The time the refund was created.</td></tr>
<tr><td><strong>currency</strong><br/><em>string</em></td><td>The currency to charge in ISO format (default: usd).</td></tr>
<tr><td><strong>metadata</strong><br/><em>hash</em></td><td>Any metadata associated with the refund.</td></tr>
<tr><td><strong>reason</strong><br/><em>string</em></td><td>The reason for the refund.</td></tr>
</table>

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
require 'accepton-ruby'

client = AcceptOn::Client.new(api_key: API_KEY, environment: :staging)
response = client.refund(amount: 10_00, charge_id: "chg_123")
```

```python
from accepton import Client

client = Client(api_key=API_KEY, environment='staging')
response = client.refund(amount=1000, charge_id="chg_123")
```

> Create a Transaction token response

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
<table>
<tr><th>Argument</th><th>Description</th></tr>
<tr><td><strong>amount</strong><br/><em>integer, required</em></td><td>The amount in cents to refund.</td></tr>
<tr><td><strong>charge_id</strong><br/><em>string, required</em></td><td>The id of the charge to associate with the refund.</td></tr>
</table>

#### Returns
A Refund object.
