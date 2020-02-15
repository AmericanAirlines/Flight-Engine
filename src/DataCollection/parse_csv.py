"""
run this to update the airports_clean data to add to airports.ts

airport data is from https://gist.github.com/tdreyno/4278655 and the American Airlines destinations
are filtered according to https://en.wikipedia.org/wiki/List_of_American_Airlines_destinations

if you recieve a "ModuleNotFoundError: No module named 'wikipedia' error, make sure you have
installed the wikipedia package: "pip install wikipedia" on the command line

this code requires a network connection to run.
"""
import json
import wikipedia

MIN_DIRECT_FLIGHTS_PER_DAY = 10
ALLOWED_COUNTRIES = ["United States"]
AIRPORT_KEYS = ["code", "city", "timezone", "location"]

#typescript around the airport list
START_OF_FILE = "export default "
END_OF_FILE = " as Airport[];"


# the wikipedia page to consult for valid airports
# need to use .html() because .content excludes tables
destinations = wikipedia.page("List_of_American_Airlines_destinations").html()


# courtesy https://gist.github.com/tdreyno/4278655
airport_data = open("airports.json")

def get_airports():
    data = json.load(airport_data)
    clean = []
    for airport in data:
        # valid airports are American Airlines destinations in the US with more than set value of direct flights a day
        if airport.get("country") in ALLOWED_COUNTRIES and \
            int(airport.get("direct_flights")) > MIN_DIRECT_FLIGHTS_PER_DAY and \
            airport.get("name") in destinations:
            # reformat location data to fit FlightExpress format
            airport["location"] = {"latitude": float(airport.get("lat")), "longitude": float(airport.get("lon"))}
            airport["timezone"] = airport["tz"]
            keys_to_remove = []
            for key in airport.keys():
                if key not in AIRPORT_KEYS:
                    keys_to_remove.append(key)
            for key in keys_to_remove:
                airport.pop(key)
            clean.append(airport)
            print(airport, end=",\n")


    new_file = open("../Data/airports.ts", "w+")
    new_file.write(START_OF_FILE)
    json.dump(clean, new_file)
    new_file.write(END_OF_FILE)


get_airports()



