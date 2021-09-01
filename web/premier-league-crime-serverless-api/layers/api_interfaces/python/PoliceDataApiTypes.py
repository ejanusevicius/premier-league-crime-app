from dataclasses import dataclass

@dataclass
class CrimeRequestConfig: # Input Variables for "get_crimes_for_date_range_and_coordinates
    date: str 
    longitude: float
    latitute: float