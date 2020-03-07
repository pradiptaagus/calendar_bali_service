# calendar_bali_service

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

The purpose of the project is to provide base knowledge about Balines Calendar. Client make request with paramaters to API and it will return response to client.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

```
Node.js version 8.* or higher
MySQL version 8.* or higher
```

### Installing

A step by step series of examples that tell you how to get a development env running.

Make sure you have installed Node JS and MySQL in your machine.

Create database and import `calender_bali.sql` into the database you created.

You have to configure connection to database. Open `connection.js`. Adjust the configuration with your database.

Run project with command bellow.

```
node index.js
```
And that's all.

### How to make request with API?
There 2 request endpoint you can use. 
```
https://www.pengarah-site.com/api/hari-raya
https://www.pengarah-site.com/api/dewasa
```
Each endpoint has query parameters to passed. The parameters is listed bellow

`tanggal`
Example request with `tanggal` is `https://www.pengarah-site.com/api/hari-raya?tanggal=1`.

`bulan`
Example request with `tanggal` is `https://www.pengarah-site.com/api/hari-raya?bulan=1`.

`tahun`
Example request with `tahun` is `https://www.pengarah-site.com/api/hari-raya?tahun=2020`.

`nama`
Example request with `nama` is `https://www.pengarah-site.com/api/hari-raya?nama=galungan`.

#### Combination parameters
You can make request with combination parameters. Bellow is example of request with paramaters `tanggal`, `bulan`, and `tanggal`.
```
https://www.api.calendar-bali.pengarah-site.com/api/hari-raya?tanggal=1&bulan=2&tahun=2020
```