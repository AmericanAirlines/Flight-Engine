"""
run this to update the airports_clean data to add to airports.ts
"""
import json

def is_destination(name, dest):
    # checks if an airport is an American Airlines destination on their Wikipedia page
    for line in dest:
    	if(name in line):
    		return True

    return False

def get_airports():
	filename = "airports.json"
	wikipedia_article = "destinations.txt"

	file = open(filename)
	dest = open(wikipedia_article).readlines()
	data = json.load(file)
	clean = []
	for airport in data:
		# valid airports are American Airlines destinations in the US with more than 10 direct flights a day
		if(airport.get("country") == "United States" and int(airport.get("direct_flights")) > 10 and is_destination(airport.get("name"), dest)):
			# reformat location data to fit FlightExpress format
			airport["location"] = {"latitude": airport.get("lat"), "longitude": airport.get("lon")}
			clean.append(airport)
			print(airport, end=",\n")


	new_file = open("airports_temp.json", "w+")
	json.dump(clean, new_file)

	# cleans up the json to fit the format for airports.ts
	# there's definitely a cleaner way to do this -- but it's 3am
	with open('airports_temp.json', 'r') as f, open('airports_clean.json', 'w') as fo:
		for line in f:
			fo.write(line.replace("\"code\"", "code").replace("\"city\"", "city").replace("\"location\"", "location").replace("\"tz\"", "timezone").replace("\"latitude\"", "latitude").replace("\"longitude\"", "longitude"))

get_airports()



