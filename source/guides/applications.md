---
title: AcceptOn Application Guide

search: true

toc_footers:
 - <a href='/'>API docs</a>

---

# Introduction

AcceptOn allows businesses and individuals alike to organize users and
transactions created on their behalf by creating what we refer to as
an "Application". This scenario applies best to a business that 
identifies as a marketplace where they desire to use AcceptOn on behalf
of their customer.

If that's you, then great, it's a pretty simple process to complete!

# Getting Started

First off, if you haven't already, create an account at 
[https://staging.accepton.com/sign_up](https://staging.accepton.com/sign_up)

Next, create a new Application by clicking on your email address, then Apps, then Create. TODO

# Retrieve your signup URL

After you've created an Application, you can register users under your
application by distributing the Signup URL found when you created the
Application on your website. Anyone who creates an AcceptOn account
using this URL will be associated with your Application.

As well, any payment providers that allow for application fees to be
collected by a Marketplace will work as expected when using AcceptOn
by ensuring that the application_fee argument is used when [creating a 
Transaction Token](/#create-a-transaction-token)
