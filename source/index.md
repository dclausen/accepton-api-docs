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
Please only use HTTPS to ensure data privacy.

Client libraries:

* [Ruby](https://github.com/dclausen/accepton-ruby)

# Environments

In order to allow for testing, the AcceptOn API is available in the following locations:

* Staging: https://staging-checkout.accepton.com
* Production: https://checkout.accepton.com

The staging environment should be used for testing. Please keep in mind that 
the data can be deleted at any time.

To actually process payments, the production environment must be used.

# Getting Started

1. If you haven't done so already, please create an account in the Staging environment
[https://staging.accepton.com](https://staging.accepton.com)
1. Retrieve your API key here: <TODO>
1. Make a request to ping the client using your API key <TODO>

# Authentication
> To authorize, use this code:

```ruby
require 'accepton-ruby'

API_KEY     = 'pkey_5e37fbc4d108f542'
environment = :production
client = AcceptOn::Client.new(api_key: API_KEY, environment: environment)
```

```shell
# With shell, you can just pass the correct header with each request
curl "https://checkout.accepton.com/v1/ping" -H "Authorization: <INSERT API KEY HERE>"
```

> Make sure to replace `<API KEY>` with your API key.

AcceptOn requires an API key to gain access to the API. After logging into accepton.com, you'll find your API key by clicking your email address in the top right, My Profile, and then Edit.

AcceptOn expects for the API key to be included in all API requests to the server in a header that looks like the following:

`Authorization: <API KEY>`

<aside class="notice">
You must replace API KEY with your personal API key.
</aside>

