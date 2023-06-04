# NestJS Practice Demo

This application was built using [NEST](https://nestjs.com/).

## Configuration

To install and set up project, follow the steps below:

1. **Clone the repository to your local machine**

   ```
   git clone https://github.com/nap4sov/nestjs-practice.git
   ```

2. **Navigate to the project directory**

   ```
   cd nestjs-practice
   ```

3. **Install the necessary dependencies using Yarn**

   ```
   yarn
   ```

4. **Set up local `.env` file**

   This app uses environment variables to configure port, access keys, DB connection uri etc. You need to create new `.env` file in your local project root directory. You can find all variables required for enabling complete set of features in `.env.example` file.

## Local Development

To run the app locally for development purposes, use the following command:

```
yarn start:dev
```

This command starts a local development server. Any changes you make to the code will be reflected live without the need to restart the server.

## Live docs

When the app is running locally, you can find **Swagger docs** by navigating in your browser to

```
http://localhost:{PORT}/
```

To visit **GraphQl playground**, navigate to

```
http://localhost:{PORT}/graphql
```

_PORT either is configured in `.env` or is `3000` by default._

<hr>

<sub>Heroku deployment is down because I'm greedy enough not to pay 7$/month for it :)</sub>
