# Airport Information

Get the details of a given airport by its IATA (Airport Code)

**URL** : `/airports?code=<IATA-CODE>`

**Method**: `GET`

**Auth required**: No

**Permissions required**: None

### <a id="success-response"></a> Success Response

**Code**: `200 OK`

**Examples**

##

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
