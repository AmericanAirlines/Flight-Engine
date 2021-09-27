import { Router } from 'express';
import { airports } from '../data/airports';

export const airportRouter = Router();

function validAirportRegex(code: string) {
  const matchedCodes = code.match(/^[A-Z]{3}$/gi);
  return matchedCodes?.[0] === code;
}

airportRouter.get('/', (req, res) => {
  const { code } = req.query;
  if (!code || !validAirportRegex(code.toString())) {
    res.status(400).send('Please enter a valid flight code i.e. DFW, GSO, ATL...');
    return;
  }

  const airport = airports.find((port) => port.code.toLowerCase() === code.toString().toLowerCase());

  if (airport) {
    res.json(airport);
  } else {
    res.status(404).send('Airport not found');
  }
});
