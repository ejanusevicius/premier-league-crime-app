import json
from typing import List
from PoliceDataApi import PoliceDataApi, CrimeRequestConfig
from DateNavigator import DateNavigator
from RequestResponseUtilities import ResponseUtilities, ResponseObject
from dataclasses import dataclass, astuple

@dataclass
class CrimeRequestConfigForRange:
    list_of_dates: List[str] 
    longitude: float
    latitude: float

def lambda_handler(event, context):

    """
        This function returns the crimes that have happened nearby the football stadiums of the Premier League teams for the last year.
        Query parameters:
            longitude -> float
            latitude -> float
    """
    query_parameters = event["queryStringParameters"]
    longitude = query_parameters['longitude']
    latitude = query_parameters['latitude']

    list_of_crimes = get_crimes_for_date_range_and_coordinates(
        CrimeRequestConfigForRange(
            list_of_dates=DateNavigator.get_list_of_date_query_strings_for_last_year(), # returns list of dates as type -> List['YYYY-MM']
            longitude=longitude,
            latitude=latitude
        )
    )

    return ResponseUtilities.create_response_object(
        ResponseObject(
            status_code=200,
            message="success",
            body={
                "numberOfCrimes": len(list_of_crimes),
                "crimes": list_of_crimes
            }
        )
    )


def get_crimes_for_date_range_and_coordinates(config: CrimeRequestConfigForRange):
    list_of_dates, longitude, latitude = astuple(config)
    list_of_crimes_for_location = []

    for date in list_of_dates:
        crimes_for_single_month = PoliceDataApi.get_crimes_for_date_and_coordinates(
            CrimeRequestConfig(
                date=date,
                latitude=latitude,
                longitude=longitude
            )
        )
        cleaned_up_crime_data = clean_up_raw_crime_data(crimes_for_single_month)
        list_of_crimes_for_location = list_of_crimes_for_location + cleaned_up_crime_data

    return list_of_crimes_for_location


def clean_up_raw_crime_data(list_of_crime_data):
    list_of_clean_data = []

    for crime_data in list_of_crime_data:
        clean_crime_data = {
            "category": crime_data["category"],
            "exactLocation": parse_location(crime_data['location']),
            "outcomeStatus": parse_crime_status(crime_data['outcome_status']),
            "date": crime_data["month"]
        }
        list_of_clean_data.append(clean_crime_data)
        
    return list_of_clean_data


def parse_crime_status(outcome_status):
    outcome_status_dict = {}
    if outcome_status is not None:
        outcome_status_dict = {
            "date": outcome_status.get("date", None),
            "status": outcome_status.get("category", None)
        }
    return outcome_status_dict


def parse_location(location):
    location_dict = {}
    if location is not None:
        location_dict = {
            "latitude": location.get("latitude", None),
            "longitude": location.get("longitude", None)
        }
    return location_dict
