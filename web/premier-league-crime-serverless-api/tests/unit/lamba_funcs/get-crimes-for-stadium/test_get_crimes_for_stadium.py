# from lambda_functions.get_crimes_for_stadium.app import get_crimes_for_date_range_and_coordinates, CrimeRequestConfigForRange
# from layers.code_utilities.python.DateNavigator import DateNavigator

# def test_if_crime_data_is_retrieved():
#     longitude = -1.573102
#     latitude = 53.777714
    
#     list_of_crimes = get_crimes_for_date_range_and_coordinates(
#         CrimeRequestConfigForRange(
#             list_of_dates=DateNavigator.get_list_of_date_query_strings_for_last_year(), # returns list of dates as type -> List['YYYY-MM']
#             longitude=longitude,
#             latitude=latitude
#         )
#     )

#     assert type(list_of_crimes) == type(list())
#     assert len(list_of_crimes) > 0
