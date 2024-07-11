# Custom Next.js Foundation App with Authentication

Welcome to the Custom Next.js Foundation App! This repository provides a foundational setup for building Next.js applications with authentication. You can use this as a base template to kickstart your projects.

## Features

- **Authentication**: Integrated authentication system using NextAuth.js with OAuth providers (Google).
- **Database Integration**: Prisma ORM with any Database integration of your choice.
- **Email Services**: Utilizes Resend for email services with configurations set via environment variables.

## Environment Variables

Before getting started, make sure to set up your environment variables. Create a `.env` file in the root of your project and add the following variables:

```plaintext
# Base URL for your application
BASE_URL:******


# Company name
COMPANY_NAME="****"

# Company Email until you develop host on a domain, leave as it is
COMPANY_EMAIL="onboarding@resend.dev"

# Database connection string, we use Prisma ORM
DATABASE_URL="****"

# NextAuth secret key
AUTH_SECRET="secret"

# OAuth Providers
#Get more information from your Oauth provider, eg. Google
GOOGLE_CLIENT_ID=***
GOOGLE_CLIENT_SECRET=*****

# Resend API key for email verification, from Resend
RESEND_API_KEY=*********
```
# myrepo
# next-foundations
