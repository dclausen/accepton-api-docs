---
title: AcceptOn API Reference

language_tabs:
  - shell
  - ruby

toc_footers:

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

Available client libraries:

* [Ruby](https://github.com/dclausen/accepton-ruby)
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
## Retrieve your API credentials

1. If you haven't done so already, please create an account in the Staging environment
[https://staging.accepton.com](https://staging.accepton.com)
1. Retrieve your API key here: TODO
1. Make a request to ping the client using your API key TODO
1. View all resources located at [Resources](#resources) for further API actions.

## Create your first transaction

1. Generate a [transaction token](#create-a-transaction-token)
1. Pass the token into the configuration of the AcceptOn form
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
response = client.create_token(amount: 10_00, description: "Hipster Flannel Tshirt")
```

AcceptOn requires an API key to gain access to the API. After logging into accepton.com, you'll find your API key by clicking your email address in the top right, My Profile, and then looking under the section entitled "API KEY".

AcceptOn expects for the API key to be included in all API requests to the server in a header that looks like the following:

`Authorization: Bearer <API KEY>`

For the super efficient types (aka lazy), you can also append your API KEY as a parameter named access_token to any request if modifying headers isn't your thing.

<aside class="notice">
  Remember, you must replace API KEY with your personal API key.
</aside>

# Resources

## Transaction tokens
A transaction token is used to allow for details such as the amount to charge, 
the currency, and application fee to be created dynamically from a trusted
source. This is to ensure that no tampering has been performed prior to
the charge being completed.

### The Transaction token object

#### Attributes
<table>
<tr><th>Attribute</th><th>Description</th></tr>
<tr><td><strong>id</strong><br/><em>string</em></td><td>A unique id.</td></tr>
<tr><td><strong>type</strong><br/><em>string</em></td><td>Always "transaction".</td></tr>
<tr><td><strong>created</strong><br/><em>string</em></td><td>When the token was created, in iso8601 format.</td></tr>
<tr><td><strong>amount</strong><br/><em>integer</em></td><td>The amount in cents of the transaction.</td></tr>
<tr><td><strong>application_fee</strong><br/><em>integer</em></td><td>The application fee in cents to be passed on to the processor.</td></tr>
<tr><td><strong>currency</strong><br/><em>string</em></td><td>The currency to charge in (default: usd).</td></tr>
<tr><td><strong>description</strong><br/><em>string</em></td><td>A description of the transaction for your own identification purposes. It could be used to include a name of the item purchased, or a confirmation number, etc.</td></tr>
</table>

### Create a Transaction token
> Create a Transaction token request

```shell
curl https://staging-checkout.accepton.com/v1/tokens/create \
  -X POST \
  -H "Authorization: Bearer <API KEY>" \
  -d amount=1000 \
  -d description="Hipster Flannel Tshirt"
```

```ruby
require 'accepton-ruby'

client = AcceptOn::Client.new(api_key: API_KEY, environment: :staging)
response = client.create_token(amount: 10_00, description: "Hipster Flannel Tshirt")
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
  "description":""
}
```

#### Attributes
<table>
<tr><th>Attribute</th><th>Description</th></tr>
<tr><td><strong>amount</strong><br/><em>integer, required</em></td><td>The amount in cents of the transaction.</td></tr>
<tr><td><strong>application_fee</strong><br/><em>integer, optional</em></td><td>The application fee in cents to be passed on to the processor.</td></tr>
<tr><td><strong>currency</strong><br/><em>string, optional</em></td><td>The currency to charge in (default: usd).</td></tr>
<tr><td><strong>description</strong><br/><em>string, optional</em></td><td>A description of the transaction for your own identification purposes. It could be used to include a name of the item purchased, or a confirmation number, etc.</td></tr>
<tr><td><strong>merchant_paypal_account</strong><br/><em>string, optional</em></td><td>The merchant's Paypal account when you want to pay a merchant instead of yourself. Can be used with an application fee.</td></tr>
</table>

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

```json
{
  "id":"txn_643f20df91f94ff3b6cd614b63228419",
  "type":"transaction",
  "created":"2015-01-16T20:08:17.837Z",
  "amount":1000,
  "application_fee":null,
  "currency":null,
  "description":""
}
```
