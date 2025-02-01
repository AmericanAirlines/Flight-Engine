# Flight Engine

Mock flight data delivered simply and quickly without a database.

## Let's Get Started

### 👉 [I just want flight data](#deploy-flight-engine-and-use-now)

### 👉 [I want a backend that I can customize](./docs/LOCAL_DEVELOPMENT.MD)

---

## Deploy Flight Engine and Use Now

If you would like to just use Flight Engine as we have designed it, you can deploy directly to one of the following hosting services:

### Render
Render is an easy-to-use hosting platform. It has a free Hobby tier, which should be more than sufficient for your hackathon needs.

<details><summary> <b><i>Expand for instructions on deploying with Render</i></b> </summary>

To get started, [create an account](https://dashboard.render.com/register) on Render, or log in with another account such as Google or Github.

After creating an account, use the dashboard to create a new "Web Service". It should open up a form for you to fill out. (*Click [this link](https://dashboard.render.com/web/new) if you have trouble getting to it*)

#### **Fill out Details**

For the `Source Code` option, select the `Public Git Repository` option and then paste the following into the url field: 
```
https://github.com/AmericanAirlines/Flight-Engine
```

Then click `Connect`. Render will then auto-populate some fields after inspecting the repo you provided.

In the new fields that appear, change the following:
- `Build Command` ➡️ Change to:
    ```
    npm install && npm run build
    ```
- `Instance Type` ➡️ Select the Free option.

Finally, click `Deploy Web Service`, and you should be up and running in a few minutes! Render will generate a URL where you can reach your app.
</details>

---

### Heroku
Heroku is another good option for hosting - however, unless you have enrolled in the [Github Student Developer Pack](https://education.github.com/discount_requests/application?type=student), it will cost $5 a month for the basic tier.
> :information_source: **Heroku no longer supports free dyno hours for all users.** However, you can still get a free dyno by signing up to their collab with the [Github Student program](https://www.heroku.com/github-students/signup).

If you wish to use Heroku, click the button below to deploy Flight Engine in your Heroku account:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/AmericanAirlines/Flight-Engine)


> :warning: If you choose to deploy Flight Engine to Heroku, you will not be able to customize Flight Engine.

---

### Railway

Railway is a additional hosting option offering easy deploymeny - however, it does require purchasing a minimum of $5/mo in credits.

If you wish to use Railway, click the button below to deploy Flight Engine in your Railway account:

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/2N2RdE)

---

# Retrieving Data

Once your app is up and running (either locally or hosted somewhere like Heroku), make HTTP requests to retrieve the data documented below.

## Airport Information

Each endpoint displays information related to the airport whose IATA (Airport Code) is provided with the request:

<details><summary> Examples </summary>

### **Get the details of a given airport by its IATA (Airport Code)**

**URL** : `/airports?code=<IATA-CODE>`

**Method**: `GET`

**Auth required**: No

**Permissions required**: None

**Success Response**:

**Code**: `200 OK`

**Respones**

```json
{
  "code": "DFW",
  "city": "Dallas-Fort Worth",
  "timezone": "America/Chicago",
  "location": {
    "latitude": 32.8998,
    "longitude": 97.0403
  }
}
```

## 404 Response

```html
Airport not found
```

## Malformed Request Response

```html
Please enter a valid flight code i.e. DFW, GSO, ATL...
```

### **Get the details of all supported airports**

**URL** : `/airports/all`

**Method**: `GET`

**Auth required**: No

**Permissions required**: None

**Success Response**:

**Code**: `200 OK`

**Respones**

```json
[
  {
    "code": "DFW",
    "city": "Dallas-Fort Worth",
    "timezone": "America/Chicago",
    "location": {
      "latitude": 32.8998,
      "longitude": 97.0403
    }
  },
  {
    "code": "JFK",
    "city": "New York City",
    "timezone": "America/New_York",
    "location": {
      "latitude": 40.6413,
      "longitude": 73.7781
    }
  }
  //...
]
```

</details>

---

## Flight Information

<details><summary> Examples </summary>

Get the details of a given airport by its IATA (Airport Code)

## Default Request

**URL** : `/flights?date=YYYY-MM-DD`

**Method**: `GET`

**Auth required**: No

**Permissions required**: None

### <a id="default-success-response"></a> Success Response

**Code**: `200 OK`

```json
[
  {
    "flightNumber": "0978",
    "origin": {
      "code": "DFW",
      "city": "Dallas-Fort Worth",
      "timezone": "America/Chicago",
      "location": {
        "latitude": 32.8998,
        "longitude": 97.0403
      }
    },
    "destination": {
      "code": "PHL",
      "city": "Philadelphia",
      "timezone": "America/New_York",
      "location": {
        "latitude": 39.8729,
        "longitude": -75.2437
      }
    },
    "distance": 7393,
    "duration": {
      "locale": "18h 36m",
      "hours": 18,
      "minutes": 36
    },
    "departureTime": "2017-08-29T02:36:00.000-05:00",
    "arrivalTime": "2017-08-29T22:12:00.000-04:00",
    "aircraft": {
      "model": "321",
      "passengerCapacity": {
        "total": 181,
        "main": 165,
        "first": 16
      },
      "speed": 400
    }
  },
  "..."
]
```

---

## Flight Record From Specified Airport Destination Request

Will display flights filtered by airport destination

**URL** : `/flights?date=YYYY-MM-DD&destination=<IATA-CODE>`

**Method**: `GET`

**Auth required**: No

**Permissions required**: None

### <a id="desitnation-success-response"></a> Success Response

**Code**: `200 OK`

**Examples**

<details><summary> Flights by Destination</summary>

**Sample Endpoint** : `/flights?date=YYYY-MM-DD&destination=GSO`

```json
[
  {
    "flightNumber": "8124",
    "origin": {
      "code": "DFW",
      "city": "Dallas-Fort Worth",
      "timezone": "America/Chicago",
      "location": {
        "latitude": 32.8998,
        "longitude": 97.0403
      }
    },
    "destination": {
      "code": "GSO",
      "city": "Greensboro",
      "timezone": "America/New_York",
      "location": {
        "latitude": 36.0726,
        "longitude": -79.792
      }
    },
    "distance": 7675,
    "duration": {
      "locale": "21h 46m",
      "hours": 21,
      "minutes": 46
    },
    "departureTime": "2021-08-29T05:10:00.000-05:00",
    "arrivalTime": "2021-08-30T03:56:00.000-04:00",
    "aircraft": {
      "model": "757",
      "passengerCapacity": {
        "total": 176,
        "main": 160,
        "first": 16
      },
      "speed": 380
    }
  },
  {
    "flightNumber": "1643",
    "origin": {
      "code": "DFW",
      "city": "Dallas-Fort Worth",
      "timezone": "America/Chicago",
      "location": {
        "latitude": 32.8998,
        "longitude": 97.0403
      }
    },
    "destination": {
      "code": "GSO",
      "city": "Greensboro",
      "timezone": "America/New_York",
      "location": {
        "latitude": 36.0726,
        "longitude": -79.792
      }
    },
    "distance": 7675,
    "duration": {
      "locale": "20h 50m",
      "hours": 20,
      "minutes": 50
    },
    "departureTime": "2021-08-29T09:25:00.000-05:00",
    "arrivalTime": "2021-08-30T07:15:00.000-04:00",
    "aircraft": {
      "model": "321",
      "passengerCapacity": {
        "total": 181,
        "main": 165,
        "first": 16
      },
      "speed": 400
    }
  },
  "..."
]
```

</details>

---

## Flight Record From Specified Airport Origin Request

Will display flights filtered by airport destination

**URL** : `/flights?date=YYYY-MM-DD&origin=IATA-CODE`

**Method**: `GET`

**Auth required**: No

**Permissions required**: None

### <a id="origin-success-response"></a> Success Response

**Code**: `200 OK`

**Examples**

<details><summary> Flights by Origin</summary>
<p>

**Sample Endpoint** : `/flights?date=YYYY-MM-DD&origin=PHL`

```json
[
  {
    "flightNumber": "0216",
    "origin": {
      "code": "PHL",
      "city": "Philadelphia",
      "timezone": "America/New_York",
      "location": {
        "latitude": 39.8729,
        "longitude": -75.2437
      }
    },
    "destination": {
      "code": "SAN",
      "city": "San Diego",
      "timezone": "America/Los_Angeles",
      "location": {
        "latitude": 32.7338,
        "longitude": -117.1933
      }
    },
    "distance": 2368,
    "duration": {
      "locale": "6h 38m",
      "hours": 6,
      "minutes": 38
    },
    "departureTime": "2021-08-29T02:18:00.000-04:00",
    "arrivalTime": "2021-08-29T05:56:00.000-07:00",
    "aircraft": {
      "model": "757",
      "passengerCapacity": {
        "total": 176,
        "main": 160,
        "first": 16
      },
      "speed": 380
    }
  },
  {
    "flightNumber": "3815",
    "origin": {
      "code": "PHL",
      "city": "Philadelphia",
      "timezone": "America/New_York",
      "location": {
        "latitude": 39.8729,
        "longitude": -75.2437
      }
    },
    "destination": {
      "code": "SAN",
      "city": "San Diego",
      "timezone": "America/Los_Angeles",
      "location": {
        "latitude": 32.7338,
        "longitude": -117.1933
      }
    },
    "distance": 2368,
    "duration": {
      "locale": "6h 1m",
      "hours": 6,
      "minutes": 1
    },
    "departureTime": "2021-08-29T03:48:00.000-04:00",
    "arrivalTime": "2021-08-29T06:49:00.000-07:00",
    "aircraft": {
      "model": "738",
      "passengerCapacity": {
        "total": 160,
        "main": 144,
        "first": 16
      },
      "speed": 400
    }
  },
  "..."
]
```

</p>
</details>

---
## Flight Record For Specific Flight Number Request

Will display flights filtered by flight number

**URL** : `/flights?date=YYYY-MM-DD&flightNumber=<flight_number>`

**Method**: `GET`

**Auth required**: No

**Permissions required**: None

### <a id="origin-success-response"></a> Success Response

**Code**: `200 OK`

**Examples**

<details><summary> Flights by Number</summary>
<p>

**Sample Endpoint** : `/flights?date=YYYY-MM-DD&flightNumber=4211`

```json
[
  {
    "flightNumber": "4211",
    "origin": {
      "code": "DFW",
      "city": "Dallas-Fort Worth",
      "timezone": "America/Chicago",
      "location": {
        "latitude": 32.8998,
        "longitude": -97.0403
      }
    },
    "destination": {
      "code": "PHL",
      "city": "Philadelphia",
      "timezone": "America/New_York",
      "location": {
        "latitude": 39.8729,
        "longitude": -75.2437
      }
    },
    "distance": 1302,
    "duration": {
      "locale": "3h 28m",
      "hours": 3,
      "minutes": 28
    },
    "departureTime": "2024-01-26T02:37:32.307-06:00",
    "arrivalTime": "2024-01-26T07:05:32.307-05:00",
    "aircraft": {
      "model": "757",
      "passengerCapacity": {
        "total": 176,
        "main": 160,
        "first": 16
      },
      "speed": 380
    }
  },
  {
    "flightNumber": "4211",
    "origin": {
      "code": "GSO",
      "city": "Greensboro",
      "timezone": "America/New_York",
      "location": {
        "latitude": 36.0726,
        "longitude": -79.792
      }
    },
    "destination": {
      "code": "TPA",
      "city": "Tampa",
      "timezone": "America/New_York",
      "location": {
        "latitude": 36.1043,
        "longitude": -79.935
      }
    },
    "distance": 8,
    "duration": {
      "locale": "0h 1m",
      "hours": 0,
      "minutes": 1
    },
    "departureTime": "2024-01-26T16:33:51.420-05:00",
    "arrivalTime": "2024-01-26T16:34:51.420-05:00",
    "aircraft": {
      "model": "757",
      "passengerCapacity": {
        "total": 176,
        "main": 160,
        "first": 16
      },
      "speed": 380
    }
  }
]
```

</p>
</details>

---

## Malformed Request Response

```html
'date' value (2017-08-299) is malformed; 'date' must use the following format: YYYY-MM-DD
```

## Missing Date Response

```html
'date' is a required parameter and must use the following format: YYYY-MM-DD
```

</details>

---

## Testing

This project utilizes framework uses Facebook's [Jest](https://facebook.github.io/jest/) framework for testing.

Writing a test is as simple as creating a `*.test.ts` file in the `./src` directory along with an associated `describe()` and `it()` function.

Simply run `npm run test` to run the existing test suite or use it to execute your own tests once you've created new ones.

Additional testing scripts:

- `test`: runs all tests
- `test:changed`: runs tests related to uncommited git changes only

---

## Contributing

Interested in contributing to the project? Check out our [Contributing Guidelines](.github/CONTRIBUTING.md).
