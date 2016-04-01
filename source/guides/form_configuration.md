---
title: AcceptOn Form Configuration Guide

search: true

toc_footers:
 - <a href="/">API docs</a>
 - <a href="/guides/applications.html">Applications guide</a>

---

# Configuring the Form

When using the AcceptOn form, you can pass configuration values into the form
via `data` attributes. These are all added to the `script` element for the
form's JavaScript.

```html
<div id="my-container"></div>
<script src="https://js.accepton.com/scripts/accepton.js"
  data-public-key="pkey_xxxxxxxxxxxxxxxx"
  data-token="txn_yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
  data-additional-fields="name,phone,billing_address,shipping_address"
  data-customer-email="customer@example.com"
  data-redirect-uri="https://example.com"
  data-success-callback="myCallback"
  data-target="my-container">
</script>
```

 Attribute                                  | Description
--------------------------------------------|-------------
 **data-public-key** <br> *required*        | Your AcceptOn public key. Of the form `pkey_xxxxxx`.
 **data-token** <br> *required*             | Your transaction token representing the transaction for this form. Of the form `txn_xxxxxx` (transaction) or `rtx_xxxxxx` (recurring).
 **data-additional-fields** <br> *optional* | A comma-separated list of additional fields to collect. Valid values are: *name*, *phone*, *billing_address*, and *shipping_address*.
 **data-customer-email** <br> *optional*    | The customer's email address, which is used to pre-populate the email field.
 **data-redirect-uri** <br> *optional*      | The URI to which the form should POST a successful charge.
 **data-target** <br> *optional*            | The HTML id of the containing element for an inline form.
 **data-success-callback** <br> *optional*  | The name of a function on `window` to call after a successful charge.

# Required Attributes

## Public Key

```html
<script data-public-key="pkey_xxxxxxxxxxxxxxxx">
</script>
```

The public key associates the form to your account. You can retrieve your
public key from within the AcceptOn web application.

## Token

```html
<script data-token="txn_yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy">
</script>
```

The transaction token sets up the form for the specific transaction you want to
make. You can generate this using the form builder within the AcceptOn web
application or via our API libraries.

# Optional Attributes

## Additional Fields

```html
<script data-additional-fields="name">
</script>
```

The form can gather metadata about the transaction for you. If any particular
piece of information is required for your payment processor(s), we
automatically configure the form to ask for it.

However, if you wish to gather more information from your customer and want
that data to be attached to your charge, you can specify that we include those
fields in the form via the "additional fields" configuration.

The attribute should be a comma-separated list of values. The list of values we
can collect include:

* `name` - The customer's full name.
* `phone` - The customer's telephone number.
* `billing_address` - The customer's billing address.
* `shipping_address` - The customer's shipping address.

## Customer Email

```html
<script data-customer-email="customer@example.com">
</script>
```

If you have a dynamic system where you already know the customer's email
address, you can prepopulate the form with it by passing it as a value to the
`customer-email` attribute.

## Redirect URI

```html
<script data-redirect-uri="https://example.com">
</script>
```

The `redirect-uri` designates the URI to which we should POST any resulting
charges from the form. We POST the redirect as a `x-www-form-urlencoded` POST
with a `response` key with a URI-escaped JSON document value.

We POST the form as a redirect, so you must process the charge and show your
customer a page acknowledging the payment.

We **highly** recommend that this endpoint be SSL-enabled with a strong
certificate.

## Success Callback

```html
<script data-success-callback="myFunction">
</script>
<script>
  window.myFunction = function (response) {
    var charge = response.charge;

    playThatFunkyMusic(charge);

    return false;
  };
</script>
```

If you need to perform some behavior on the current page after a charge is
successful, you can use a success callback. Specify a success callback as the
name of a function on the global `window` object. The form calls this function
after a successful charge, but before performing a redirect.

The callback function should take one argument that is the response from the
form's charging API. That parameter has a `charge` property that is a JSON
representation of the successful charge action.

By default the callback does not prevent a redirect after it fires. To prevent
a redirect to the `redirect-uri`, return `false` from the callback.

## Target

```html
<div id="my-identifier"></div>
<script data-target="my-identifier">
</script>
```

Specifying a `target` turns the form into an inline iframe instead of a modal.
The `target` should be the ID of the container in which you'd like the form to
appear. For optimal results, the container should be a block-level element that
has a minimum width of at least 300px.

The `target` can appear anywhere on the page. By default the form generator
creates the `target` immediately prior to the `script` element to keep them
logically grouped.
