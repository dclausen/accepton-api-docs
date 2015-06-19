---
title: AcceptOn Application Guide

search: true

toc_footers:
 - <a href='/'>API docs</a>

---

# Introduction

AcceptOn allows businesses and individuals alike to organize users and
transactions created on their behalf by creating what is referred to as
an "Application". This scenario applies best to a business that 
identifies as a marketplace where they desire to use AcceptOn on behalf
of their customer.

If that's you, then great, it's a pretty simple process to complete!

# Getting Started

First off, if you haven't already, create an account at 
[https://staging.accepton.com/sign_up](https://staging.accepton.com/sign_up)

Next, create a new Application by clicking on your email address, then Apps,
then Create. TODO

# Retrieve your signup URL

After you've created an Application, you can register users under your
application by distributing the Signup URL found when you created the
Application on your website. Anyone who creates an AcceptOn account
using this URL will be associated with your Application.

As well, any payment providers that allow for application fees to be
collected by a Marketplace will work as expected when using AcceptOn
by ensuring that the application_fee argument is used when [creating a 
Transaction Token](/#create-a-transaction-token)

# Store the keys

Once a user has created an account, they will be redirected back to
your system with a public and secret key pair. Please store these keys
within the marketplace as they will be used shortly. The public key
is passed into the form to identify the user. The secret key is used
to perform any API requests on the user's behalf.

# Configure the form

> If you'd like to use a modal popup to display the payment form, use this:

```html
<script src="https://staging-js.accepton.com/scripts/accepton.js" 
  class="accepton-button"
  data-public-key="PUBLIC_KEY"
  data-redirect-uri="REDIRECT_URI_OR_BLANK"
  data-token="GENERATED_TRANSACTION_TOKEN"
  data-customer-email="EMAIL_ADDRESS_OR_BLANK">
</script>
```

> Or, to use an inline iframe for the payment form, try this:

```html
<div id="accepton-form"></div> 
<script src="https://staging-js.accepton.com/scripts/accepton.js" 
  class="accepton-button"
  data-public-key="PUBLIC_KEY"
  data-redirect-uri="REDIRECT_URI_OR_BLANK"
  data-token="GENERATED_TRANSACTION_TOKEN"
  data-customer-email="EMAIL_ADDRESS_OR_BLANK"
  data-target="accepton-form">
</script>
```

Now, we need to configure the payment form. To do so, you'll need your 
user's public key, a Transaction token, and an optional URL to redirect
the user to once the transaction is successful. Please select from the 
following 2 methods of displaying the payment form: modal or iframe.

Please see [creating a Transaction Token](/#create-a-transaction-token)
for more information on the available options.

# Webhooks
TODO
