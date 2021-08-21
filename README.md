# Express REST API Docs

## Configurations

Before start you should have some configurations setups.

## Installation

```sh
npm install 
npm start
```

Or

```sh
yarn install
yarn start
```

Or

You could use Docker instead to deploy the API

## Open Endpoints

> Showing production errors.
> All getAll Enpoints are paginate you could use limits and offset to controll data response

### Restaurant related

Each endpoint manipulates or displays information related to the Restaurant.

* Get All Restaurants: `GET /api/v1/restaurants`
* Get One Restaurant: `GET /api/v1/restaurants/:id`
* Update Restaurant: `PATCH api/v1/restaurants/:id`
* Delete Restaurant:`DELETE api/v1/restaurants/:id`

### Reservation related

Endpoints for viewing and manipulating the Categories that the Authenticated User
has permissions to access.

* Get All Reservations: `GET /api/v1/reservations`
* Get One Reservation: `GET /api/v1/reservations/:id`
* Update Reservation: `PATCH api/v1/reservations/:id`
* Delete Reservation:`DELETE api/v1/reservations/:id`
