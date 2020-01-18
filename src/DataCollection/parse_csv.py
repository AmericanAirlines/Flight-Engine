"""
run this to update the airports_clean data to add to airports.ts

airport data is
"""
import json
import wikipedia

MIN_DIRECT_FLIGHTS_PER_DAY = 10
ALLOWED_COUNTRIES = ["United States"]

#typescript around the airport list
START_OF_FILE = "export default"
END_OF_FILE = "as Airport[];"


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
        if airport.get("country") in ALLOWED_COUNTRIES and int(airport.get("direct_flights")) > MIN_DIRECT_FLIGHTS_PER_DAY and airport.get("name") in destinations:
            # reformat location data to fit FlightExpress format
            airport["location"] = {"latitude": airport.get("lat"), "longitude": airport.get("lon")}
            clean.append(airport)
            print(airport, end=",\n")


    new_file = open("airports_temp.json", "w+")
    json.dump(clean, new_file)

    # cleans up the json to fit the format for airports.ts
    # there's definitely a cleaner way to do this -- but it's 3am
    with open('airports_temp.json', 'r') as f, open('aiports_clean', 'w') as fo:
        for line in f:
            fo.write(line.replace("\"code\"", "code").replace("\"city\"", "city").replace("\"location\"", "location").replace("\"tz\"", "timezone").replace("\"latitude\"", "latitude").replace("\"longitude\"", "longitude"))

get_airports()



