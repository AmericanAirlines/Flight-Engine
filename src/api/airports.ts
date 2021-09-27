import { Router } from 'express';
import { airports } from '../data/airports';

export const airportRouter = Router();

airportRouter.get('/', (req, res) => {
  const airportCodeFormat = RegExp('[A-Za-z]{3}');
  const { code } = req.query;

  if (!code || !airportCodeFormat.test(code.toString())) {
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
