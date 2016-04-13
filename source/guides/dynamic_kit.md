---
title: AcceptOn Dynamic Kit Setup Guide

language_tabs:
  - ruby
  - python
  - php

toc_footers:
 - <a href='/guides/dynamic_kit_full_api.html'>DynamicKit Complete API Reference</a>

includes:
  - support

breadcrums:
  - Documentation Overview: "/"
  - DynamicKit Guide: "lol"

search: true
---

<div class='hidden-attr'></div>
#DynamicKit

<div class='full-banner-attr'></div>
![Dynamic Kit](getting_started_guide.png)

DynamicKit is for your server personal backend.  This kit isn't required to process payments in AcceptOn, but you do need *DynamicKit* for things such as:

### Examples where you might need DynamicKit
  - Generating transaction tokens dynamically
  - Verify that a charge completed and for the correct amount
  - List and search charges
  - Refunding a charge dynamically
  - Create, read, and list plans dynamically
  - Cancel, retrieve, and list subscriptions dynamically
  - Modify promotional codes dynamically

### Looking for the complete API Docs?

<table>
<tr style='border-bottom-color: rgba(0, 0, 0, 0);'>
<td style='width: 100px;'>
<img src='/images/docs.png' />
</td>

<td>
To view the complete <em>REST</em>ful API for the DynamicKit, along with all API calls for supported languages, see:
<a href='/guides/dynamic_kit_full_api.html' class='btn'><i class='api-icon'></i>DynamicKit API Reference</a>
</td>
</tr>
</table>

## Installation
DynamicKit comes in several editions, one for each of our supported programming languages.  Before continuing, please install one of these editions:

<a href='https://github.com/accepton/accepton-ruby' class='pretty_btn dk_bg'><i class='ruby-icon'></i>Rubyist Edition</a>
<a href='https://github.com/accepton/accepton-python' class='pretty_btn dk_bg'><i class='python-icon'></i>Python Edition</a>
<a href='https://github.com/accepton/accepton-php' class='pretty_btn dk_bg'><i class='php-icon'></i>PHP Edition</a>

### Language not supported?

<table>
<tr style='border-bottom-color: rgba(0, 0, 0, 0);'>
<td style='width: 100px;'>
<img src='/images/diy.png' />
</td>

<td>
If the language you are working in is not supported, you can put togeather your own <em>DynamicKit</em>.
See the <em>shell</em> column in the full DynamicKit API reference:
<a href='/guides/dynamic_kit_full_api.html' class='btn'><i class='api-icon'></i>DynamicKit API Reference</a>
</td>
</tr>
</table>

# Environments

### Staging vs. Production

In order to allow for testing, the AcceptOn DynamicKit can operate on the following two
locations:

* Staging: https://staging-checkout.accepton.com
* Production: https://checkout.accepton.com

The staging environment should be used for testing. Please keep in mind that
the data can be deleted at any time.


### Staging Credentials have limitations
Your staging credentials do not work in the production environment
and vice versa. Thus, in order to test, you will need to create an account in
staging and then create an account in production when you're ready to deploy.

To actually process payments, the production environment must be used. To
switch to production, simply update the URL and corresponding API key, and if
the moon is in the right (meaning both correct and directional) quadrant of the
sky, it should "Just Work"!


# Using DynamicKit

## Create a Client
For all flavors of DynamicKit, you will first need to create a new client.

You have a choice between `staging` and `production` environments. Please note that 
your staging credentials do not work in the production environment
and vice versa. Staging is also unable to process payments.

###Code Sample
```ruby 
require 'accepton'

#Located under 'My Profile' in your accepton.com dashboard
ACCEPTON_SECRET_KEY = 'skey_xxx'

#The environment may be either 'production' or 'staging'
client = AcceptOn::Client.new(api_key: ACCEPTON_SECRET_KEY, environment: :staging)
```

```python
from accepton import Client

#Located under 'My Profile' in your accepton.com dashboard
ACCEPTON_SECRET_KEY = 'skey_xxx'

#The environment may be either 'production' or 'staging'
client = Client(api_key=ACCEPTON_SECRET_KEY, environment='staging')
```

```php
```

## Create a transaction token
All payment forms accept a transaction token that they are able to load from. This transaction token
encodes the name, description, and price of an item. If you created a payment form through
the web interface, your payment form is using a static transaction token generated at the time of the form creation.

Through *DynamicKit*, you can create a dynamic transaction token which you can forward to your client 
to display a payment form based on the dynamic transaction token's bound information (description, price, etc.).

This is necessary if you have a large inventory or products that need tight integration with other APIs for their 
pricing.

Let's create a dynamic transaction token through *DynamicKit* on our server:


###Code Sample
```ruby
require 'accepton'

#Located under 'My Profile' in your accepton.com dashboard
ACCEPTON_SECRET_KEY = 'skey_xxx'

#The environment may be either 'production' or 'staging'
client = AcceptOn::Client.new(api_key: ACCEPTON_SECRET_KEY, environment: :staging)

transaction_token = client.create_token(amount: 10_00, description: "Hipster T-Shirt")

#Pass this along to your payment form
txn_id = transaction_token.id
```

```python
from accepton import Client

#Located under 'My Profile' in your accepton.com dashboard
ACCEPTON_SECRET_KEY = 'skey_xxx'

#The environment may be either 'production' or 'staging'
client = Client(api_key=ACCEPTON_SECRET_KEY, environment='staging')

transaction_token = client.create_token(amount=1000, description='Hipster T-Shirt')

#Pass this along to your payment form
txn_id = transaction_token.id
```

```php
```

####See [Transaction Token Object](/guides/dynamic_kit_full_api.html#transaction-tokens) for a complete description of the retrieved transaction object

## Retrieve and verify a charge
When a charge has been completed on a client running an *AcceptOn* payment form, the client will receive a `charge identifier`
through a callback. 

This `charge identifier` can then be passed along to your server running *DynamicKit*, through your own web-service 
endpoint.  

Once your server receives the `charge identifier`, your server can use *DynamicKit* to retrieve the trustable `charge object` of the 
`charge identifier`. 

Let's lookup a charge and verify the charge amount for a completed transaction:

###Code Sample
```ruby
require 'accepton'

#Located under 'My Profile' in your accepton.com dashboard
ACCEPTON_SECRET_KEY = 'skey_xxx'

#The environment may be either 'production' or 'staging'
client = AcceptOn::Client.new(api_key: ACCEPTON_SECRET_KEY, environment: :staging)

#The charge identifier to lookup
charge_id = "chg_xxx"

#Lookup the charge
charge = client.charge(charge_id)

#Retrieve information on charge
amount = charge.amount
status = charge.status

#Verify charge was for the correct amount ($10.00 ~ 1000 cents)
if amount != 1000
  puts "Charge was invalid"
else
  puts "Charge was valid"
end
```

```python
from accepton import Client

#Located under 'My Profile' in your accepton.com dashboard
ACCEPTON_SECRET_KEY = 'skey_xxx'

#The environment may be either 'production' or 'staging'
client = Client(api_key=ACCEPTON_SECRET_KEY, environment='staging')

#The charge identifier to lookup
charge_id = "chg_xxx"

#Lookup the charge
charge = client.charge(charge_id)

#Retrieve information on charge
amount = charge.amount
status = charge.status

#Verify charge was for the correct amount ($10.00 ~ 1000 cents)
if amount != 1000:
  print("Charge was invalid")
else:
  print("Charge was valid")

```

```php
```

####See [Charge Object](/guides/dynamic_kit_full_api.html#charges) for a complete description of the retrieved charge object

## Refunding a charge
Given a *charge identifier*, you are able to refund a charge in partial increments up to the value of the original charge.

###Code Sample
```ruby
require 'accepton'

#Located under 'My Profile' in your accepton.com dashboard
ACCEPTON_SECRET_KEY = 'skey_xxx'

#The environment may be either 'production' or 'staging'
client = AcceptOn::Client.new(api_key: ACCEPTON_SECRET_KEY, environment: :staging)

#The charge identifier for the charge that you want to refund
charge_id = "chg_xxxx"

#Refund some amount, multiple partial refunds are allowed up-to the original charge.
client.refund(amount: 10_00, charge_id: charge_id)
```

```python
from accepton import Client

#Located under 'My Profile' in your accepton.com dashboard
ACCEPTON_SECRET_KEY = 'skey_xxx'

#The environment may be either 'production' or 'staging'
client = Client(api_key=ACCEPTON_SECRET_KEY, environment='staging')

#The charge identifier for the charge that you want to refund
charge_id = "chg_xxx"

#Refund some amount, multiple partial refunds are allowed up-to the original charge.
client.refund(amount=1000, charge_id=charge_id)
```

```php
```

####See [Charge Object](/guides/dynamic_kit_full_api.html#charges) for a complete description of the retrieved charge object

## Create and retrieve plans
Plans are used as a prototype subscription that users are able to subscribe to. A *Subscription* is the instance of a *Plan*.

In this example, we're going to create a new plan, demonstrate how to retrieve the plan we just created,
and then list all of our plans:

###Code Sample
```ruby
require 'accepton'

#Located under 'My Profile' in your accepton.com dashboard
ACCEPTON_SECRET_KEY = 'skey_xxx'

#The environment may be either 'production' or 'staging'
client = AcceptOn::Client.new(api_key: ACCEPTON_SECRET_KEY, environment: :staging)

#Create a new plan for $10.00 that will be charged monthly
created_plan = client.create_plan(name: 'Test Plan', amount: 1000, currency: 'usd', period_unit: 'month')

#Retrieve that same plan
retrieved_plan = client.plan(created_plan.id)

#List all plans
plans = client.plans

def plan_to_s plan
  "#{plan.name} - #{plan.amount}#{plan.currency} every #{plan.period_unit}"
end

puts "Created plan: #{plan_to_s(created_plan)}"
puts "Retrieved plan: #{plan_to_s(retrieved_plan)}"

puts "Plans listing"
puts "-------------------------------------------"
plans.each do |plan|
  puts plan_to_s plan
end
```

```python
from accepton import Client

#Located under 'My Profile' in your accepton.com dashboard
ACCEPTON_SECRET_KEY = 'skey_xxx'

#The environment may be either 'production' or 'staging'
client = Client(api_key=ACCEPTON_SECRET_KEY, environment='staging')

#Create a new plan for $10.00 that will be charged monthly
created_plan = client.create_plan(name='Test Plan13', amount=1000, currency='usd', period_unit='month')

#Retrieve that same plan
retrieved_plan = client.plan(created_plan.id)

#List all plans
plans = client.plans()

def plan_to_s(plan):
  return "{} - {}{} every {}".format(plan.name, plan.amount , plan.currency , plan.period_unit)

print("Created plan: {}".format(plan_to_s(created_plan)))
print("Retrieved plan: {}".format(plan_to_s(retrieved_plan)))

print("Plans listing")
print("-------------------------------------------")

for plan in plans:
  print(plan_to_s(plan))

```

```php
```

####See [Plan Object](/guides/dynamic_kit_full_api.html#plans) for a complete description of the retrieved plan object

## Subscription Management
A *Subscriptions* is an instance of a *Plan* bound to a particular user.

In this example, we're going to show you how to cancel an active subscription,
retrieve a subscription, and then list all subscriptions:

###Code Sample
```ruby
require 'accepton'

#Located under 'My Profile' in your accepton.com dashboard
ACCEPTON_SECRET_KEY = 'skey_xxx'

#The environment may be either 'production' or 'staging'
client = AcceptOn::Client.new(api_key: ACCEPTON_SECRET_KEY, environment: :staging)

#Cancel a subscription by id
client.cancel_subscription('sub_123')

def subscription_to_s subscription
  plan = subscription.plan
  plan_str = "#{plan.name} - #{plan.amount}#{plan.currency} every #{plan.period_unit}"

  "#{subscription.active ? '[active]' : '[inactive]'} - #{plan_str}"
end

#Retrieve a subscription
retrieved_subscription = client.subscription('sub_123')

#List subscriptions, paged response
subscriptions = client.subscriptions(page: 1, per_page: 20, active: true)

puts "Retrieved subscription - #{subscription_to_s retrieved_subscription}"
subscriptions.each do |subscription|
  puts subscription_to_s subscription
end
```

```python
from accepton import Client

#Located under 'My Profile' in your accepton.com dashboard
ACCEPTON_SECRET_KEY = 'skey_xxx'

#The environment may be either 'production' or 'staging'
client = Client(api_key=ACCEPTON_SECRET_KEY, environment='staging')

#Cancel a subscription by id
client.cancel_subscription('sub_123')

def subscription_to_s(subscription):
  plan = subscription.plan
  plan_str = "{} - {}{} every {}".format(plan.name, plan.amount, plan.currency, plan.period_unit)

  return "{} - {}".format('[active]' if subscription.active else '[inactive]', plan_str)

#Retrieve a subscription
retrieved_subscription = client.subscription('sub_123')

#List subscriptions, paged response
subscriptions = client.subscriptions(page=1, per_page=20, active=true)

print("Retrieved subscription - {}".format(subscription_to_s(retrieved_subscription)))

for subscription in subscriptions:
  print(subscription_to_s(subscription))
```

```php
```

####See [Subscription Object](/guides/dynamic_kit_full_api.html#subscriptions) for a complete description of the retrieved subscription object

## Promo Code Management
Promotional codes are based on a percentage, amount, or fixed price. These apply to all items.

Promo-codes are usable on the payment forms and must be entered by the user themselves upon
purchasing in-order to be used on a transaction.

Here we're going to create a *promo-code* and then list all of our available *promo-codes*:

###Code Sample
```ruby
require 'accepton'
require 'securerandom'

#Located under 'My Profile' in your accepton.com dashboard
ACCEPTON_SECRET_KEY = 'skey_37b7e424a2682ff81ca772ae6fbd3642'

#The environment may be either 'production' or 'staging'
client = AcceptOn::Client.new(api_key: ACCEPTON_SECRET_KEY, environment: :production)

#Create a new promo-code. There are 3 `promo_type`s
#  promo_type
#    amount - `value` means take a N cents off purchase
#    fixed_price - `value` means new price
#    percentage - `value` is a percentage off, so 0.1 means 10% OFF (cost is 90%).
#Here we are creating a promo-code with $20.00 off
promo_name = "rad_discount"
client.create_promo_code(name: promo_name, promo_type: 'amount', value: 20_00)

#Lookup the code that we just made.  Un-necessary but we're just demonstrating an example
created_promo_code = client.promo_code(promo_name)

def promo_code_to_s pc
  case pc.promo_type
  when  'amount'
    "#{pc.name} - #{pc.value} cents off"
  when  'percentage'
    "#{pc.name} - #{pc.value}% off"
  when  'fixed_price'
    "#{pc.name} - price is #{pc.value}"
  end
end

#List all 'amount' type promo-code
promo_codes = client.promo_codes(page: 1, per_page: 20, promo_type: 'amount') 

puts "Created promo code - #{promo_code_to_s created_promo_code}"

puts "Listing promo codes"
puts "-----------------------------------------"
promo_codes.each do |promo_code|
  puts promo_code_to_s promo_code
end
```

```python
from accepton import Client

#Located under 'My Profile' in your accepton.com dashboard
ACCEPTON_SECRET_KEY = 'skey_xxx'

#The environment may be either 'production' or 'staging'
client = Client(api_key=ACCEPTON_SECRET_KEY, environment='staging')

#Create a new promo-code. There are 3 `promo_type`s
#  promo_type
#    amount - `value` means take a N cents off purchase
#    fixed_price - `value` means new price
#    percentage - `value` is a percentage off, so 0.1 means 10% OFF (cost is 90%).
#Here we are creating a promo-code with $20.00 off
promo_name = "rad_discount"
client.create_promo_code(name= promo_name, promo_type= 'amount', value=2000)

#Lookup the code that we just made.  Un-necessary but we're just demonstrating an example
created_promo_code = client.promo_code(promo_name)

def promo_code_to_s(pc):
  return {
    'amount': "{} - {} cents off".format(pc.name, pc.value),
    'percentage': "{} - {}% off".format(pc.name, pc.value),
    'fixed_price': "{} - price is {}".format(pc.name, pc.value)
  }[pc.promo_type]

#List all 'amount' type promo-code
promo_codes = client.promo_codes(page=1, per_page=20, promo_type='amount') 

print("Created promo code - {}".format(promo_code_to_s(created_promo_code)))

print("Listing promo codes")
print("-----------------------------------------")
for promo_code in promo_codes:
  print(promo_code_to_s(promo_code))

```

```php
```

####See [Promo Code Object](/guides/dynamic_kit_full_api.html#promo-codes) for a complete description of the promo-code object

