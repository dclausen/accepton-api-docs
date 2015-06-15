---
title: AcceptOn API Reference

language_tabs:
  - shell
  - ruby

toc_footers:

includes:
  - errors

search: true
---

# Introduction

Welcome to the AcceptOn's API!

Client libraries:


* ruby: [https://github.com/dclausen/accepton-ruby](https://github.com/dclausen/accepton-ruby)

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

# Kittens

## Get All Kittens

```ruby
require 'accepton-ruby'

API_KEY     = 'pkey_5e37fbc4d108f542'
environment = :production
client = AcceptOn::Client.new(api_key: API_KEY, environment: environment)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get()
```

```shell
curl "https://checkout.accepton.com/v1/ping"
  -H "Authorization: <INSERT API KEY HERE>"
```

> The above command returns JSON structured like this:

```json
[
  {
    "id": 1,
    "name": "Fluffums",
    "breed": "calico",
    "fluffiness": 6,
    "cuteness": 7
  },
  {
    "id": 2,
    "name": "Isis",
    "breed": "unknown",
    "fluffiness": 5,
    "cuteness": 10
  }
]
```

This endpoint retrieves all kittens.

### HTTP Request

`GET http://example.com/kittens`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
include_cats | false | If set to true, the result will also include cats.
available | true | If set to false, the result will include kittens that have already been adopted.

<aside class="success">
Remember — a happy kitten is an authenticated kitten!
</aside>

## Get a Specific Kitten

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get(2)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get(2)
```

```shell
curl "http://example.com/api/kittens/3"
  -H "Authorization: meowmeowmeow"
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "name": "Isis",
  "breed": "unknown",
  "fluffiness": 5,
  "cuteness": 10
}
```

This endpoint retrieves a specific kitten.

<aside class="warning">If you're not using an administrator API key, note that some kittens will return 403 Forbidden if they are hidden for admins only.</aside>

### HTTP Request

`GET http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the cat to retrieve

