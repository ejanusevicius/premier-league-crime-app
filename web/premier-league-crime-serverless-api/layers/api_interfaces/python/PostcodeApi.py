import requests

class PostCodeApi:

    def get_coordinates_for_post_code(postcode: str):
        postcode_without_spaces = PostCodeApi._format_postcode(postcode)
        endpoint_for_postcode = f"https://api.postcodes.io/postcodes/{postcode_without_spaces}"
        response = requests.get(endpoint_for_postcode)
        data_for_postcode = response.json()

        longitude, latitude = PostCodeApi._parse_longitude_and_latitute(data_for_postcode)
        return longitude, latitude

    def _format_postcode(post_code: str): # Remove spaces
        formatted_post_code = post_code.replace(" ", "")
        return  formatted_post_code

    def _parse_longitude_and_latitute(postcode_data):
        longitude = postcode_data['result']['longitude']
        latitude = postcode_data['result']['latitude']
        return longitude, latitude