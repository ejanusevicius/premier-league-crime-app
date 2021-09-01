from dataclasses import astuple
from PoliceDataApiTypes import CrimeRequestConfig
import requests

class PoliceDataApi:

    def get_crimes_for_date_and_coordinates(config: CrimeRequestConfig):
        date, longitude, latitude = astuple(config)
        endpoint_url = f"https://data.police.uk/api/crimes-at-location?date={date}&lat={latitude}&lng={longitude}"
        response = requests.get(endpoint_url)
        response_body = response.json()
        return response_body

        
    
    





