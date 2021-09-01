from layers.api_interfaces.python.PoliceDataApi import PoliceDataApi, CrimeRequestConfig 


def test_if_crime_data_is_retrieved():
    crime_data = PoliceDataApi.get_crimes_for_date_and_coordinates(
        CrimeRequestConfig(
            date="2020-11",
            longitude=-1.573102,
            latitute=53.777714
        )
    )

    assert type(crime_data) == type(list()) # API returns a list of crimes (sometimes an empty list)