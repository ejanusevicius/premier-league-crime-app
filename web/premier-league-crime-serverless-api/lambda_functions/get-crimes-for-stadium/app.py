import json
from typing import List
from layers.api_interfaces.python.PoliceDataApiTypes import CrimeRequestConfig
from layers.api_interfaces.python.PoliceDataApi import PoliceDataApi
from layers.code_utilities.python.DateNavigator import DateNavigator
from layers.code_utilities.python.RequestResponseUtilities import ResponseUtilities
from layers.code_utilities.python.RequestResponseUtilitiesTypes import ResponseObject
from dataclasses import dataclass, astuple

@dataclass
class CrimeRequestConfigForRange:
    list_of_dates: List[str] 
    longitude: float
    latitute: float

def lambda_handler(event, context):

    """
        This function returns the crimes that have happened nearby the football stadiums of the Premier League teams for the last year.
        Query parameters:
            longitude -> float
            latitude -> float
    """
    
    longitude = -1.573102
    latitude = 53.777714

    list_of_crimes = get_crimes_for_date_range_and_coordinates(
        CrimeRequestConfigForRange(
            list_of_dates=DateNavigator.get_list_of_date_query_strings_for_last_year(), # returns list of dates as type -> List['YYYY-MM']
            longitude=longitude,
            latitute=latitude
        )
    )

    return ResponseUtilities.create_response_object(
        ResponseObject(
            status_code=200,
            message="success",
            body=list_of_crimes
        )
    )

def get_crimes_for_date_range_and_coordinates(config: CrimeRequestConfigForRange):
    list_of_dates, longitude, latitude = astuple(config)
    list_of_crimes_for_location = []

    for date in list_of_dates:
        crimes_for_single_month = PoliceDataApi.get_crimes_for_date_and_coordinates(
            CrimeRequestConfig(
                date=date,
                latitute=longitude,
                longitude=latitude
            )
        )
        list_of_crimes_for_location.append(crimes_for_single_month)

    return list_of_crimes_for_location
