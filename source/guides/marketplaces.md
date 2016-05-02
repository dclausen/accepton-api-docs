---
title: Marketplaces Guide
search: true
breadcrums:
  - Documentation Overview: "/"
  - Marketplaces Guide: "guides/marketplaces.html"
includes:
  - support
toc_footers:
  - <a href='/'>Documentation Overview</a>
---

# Introduction

AcceptOn allows businesses and individuals alike to organize users and
transactions created on their behalf by creating what is referred to as
an "Application". This scenario applies best to a business that
identifies as a marketplace where they want to use AcceptOn on behalf
of their customer.

If that's you, then great, it's a pretty simple process to complete!

# Getting Started

> Create a test account at https://staging.accepton.com/sign_up

> Create a production account at https://accepton.com/sign_up

First off, if you haven't already, create an account.

The staging environment should be used for testing. Please keep in mind that
the data can be deleted at any time.

**Important**: Your staging credentials do not work in the production environment
and vice versa. Thus, in order to test, you will need to create an account in
staging and then create an account in production when you're ready to deploy.

Next, create a new Application by clicking on your email address in the
top-right corner, then "Applications", then "Create Application". Fill out the
form and we will create your application profile.

The required fields are as follows:

* *Application Name* - This is currently only for your organization.
* *Application URL* - This is the base URL of the website that hosts your
  marketplace. You will not be able to host the onboarding widget on any site
  except this one.
* *Webhook Endpoint* - This is the endpoint at your Application URL where you
  would like us to send any webhook notifications. Webhook notifications let
  you be notified whenever actions happen on your marketplace account, like
  a customer purchasing something from one of your merchants.
* *Logo URL* - This currently is only for your easy identification.
* *Enabled* - You can toggle your applications on or off, which enables or
  disables the onboarding of any new merchants.

# Nomenclature

We use specific nomenclature in this guide to describe each stakeholder in a
marketplace relationship.

* The **marketplace** is your service that you host to connect merchants to
  their customers.
* A **merchant** is the end user of your marketplace who sells a product or
  service to a customer.
* A **customer** is the end user of your marketplace who actually makes a
  purchase.

# Getting Started

First off, if you haven't already, create an account. You'll want to create an
account on the [staging environment][staging] first to test everything out.

When you're going through our onboarding process, make sure to select
"Marketplace Account". After selecting your account type you're ready to link
your processors.

[staging]: https://staging.accepton.com

# Linking Your Processors

During the onboarding process, you will be able to link the processors you
would like to use in your marketplace. After onboarding, you can access your
payment processors from the "Payment Processors" menu item on the left side of
the applications.

You can add a processor by clicking its logo. This brings you to a helpful
walkthrough for retrieving your credentials.

After linking your payment processors, you can create your application.

# Creating Your Application

An application allows you to add merchants to your account. It is limited to a
specific URL, so if you have multiple base URLs for your marketplace, you will
need to create multiple applications.

The required fields are as follows:

* *Application Name* - This is currently only for your organization.
* *Application URL* - This is the base URL of the website that hosts your
  marketplace. You will not be able to host the onboarding widget on any site
  except this one.
* *Webhook Endpoint* - This is the endpoint at your Application URL where you
  would like us to send notifications, like "a charge was created".
* *Logo URL* - This currently is only for your easy identification.
* *Enabled* - You can toggle your applications on or off, which enables or
  disables the onboarding of any new merchants.

# Creating the Onboarding Snippet

Once you have created an application, you can access its snippet from the
applications page ([staging][staging-apps] | [production][production-apps]). The
snippet looks similar to this:

```html
<script src="https://js.accepton.com/onboarding.js"
  id="accepton-onboarding"
  data-application-token="YOUR_APPLICATION_TOKEN"
  data-public-key="YOUR_PUBLIC_KEY"
  data-merchant-email="MERCHANT_EMAIL"
  data-notify-uri="NOTIFICATION_URL"></script>
```

Using this snippet you can register users under your application by embedding
our onboarding widget into your webpage. To embed a widget, copy this script
tag into your webpage and replace the values with ones appropriate for your
account.

* `APPLICATION_TOKEN` is shown on the Applications screen, which you can access
  from the links in the inset.
* `YOUR_PUBLIC_KEY` is your public API key, which you can access from the links
  in the inset.
* `MERCHANT_EMAIL` is the email address of the merchant you want to onboard.
  You must dynamically generate the snippet using the email address of the
  merchant who is currently logged in. This is how we correlate the account
  between your system and ours.
* `NOTIFICATION_URL` is the endpoint you want to be notified at when a merchant
  creates or changes their AcceptOn account. The request to this endpoint is
  made from our onboarding widget, so will contain the full session information
  for the merchant in your system. Please note: since it is a client-side
  request, it **must** be on the same domain on which you are onboarding your
  merchant.

Once you have your widget working, you will need to listen for notifications
at the `NOTIFICATION_URL` you specified.

[staging-apps]: https://staging.accepton.com/admin/applications
[production-apps]: https://accepton.com/admin/applications

# Listening for Notifications

Once your merchant begins the onboarding process and we have created their
AcceptOn account, you will be notified at the `NOTIFICATION_URL` you specified
in your onboarding snippet. The notification comes in the form of a client-side
POST message containing a JSON document with the merchant's public key and
secret key.

```json
{
  "publicKey": "pkey_xxxxxxxxxxxxxx",
  "secretKey": "skey_yyyyyyyyyyyyyy"
}
```

Since this request is a client-side request, you will have access to the full
session for the merchant on your site. You can use a combination of that
session and the posted JSON message to save the merchant's public key and
secret key in your database. You must save their keys because in order to
transact on their behalf, you must use their keys instead of your own, as we
will describe later.

# Configuring the Merchant's Form

Now you need to configure a payment form for your merchant. This is just like
configuring a payment form for yourself, but instead of using your public key
you will use your merchant's.

Please see the [form configuration documentation][form-docs] for more information.

[form-docs]: /guides/form_configuration.html

# Webhooks

Currently in private beta, we have a webhook system that notifies you of events
on your marketplace. Please let us know if you would like to be added to the
private beta!
