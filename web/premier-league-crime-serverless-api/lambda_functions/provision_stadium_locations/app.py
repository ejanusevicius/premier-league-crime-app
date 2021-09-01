from FootbalDataApi import FootballDataApi
from DynamoDB import DynamoDB
from PostcodeApi import PostCodeApi
import json

def lambda_handler(event, context):

    """
        This function is invoked by Terraform to load the location table in dynamoDB table.
        Data  fetched from the 3rd party APIs.
    """
    
    fd_api = FootballDataApi()
    team_data = fd_api.get_premier_league_teams()
    
    list_of_locations = map_team_data_to_dynamodb_objects(team_data)

    dynamodb = DynamoDB()
    dynamodb.write_locations_to_location_table(list_of_locations)


def map_team_data_to_dynamodb_objects(list_of_teams):
    dynamodb_objects = []
    for team in list_of_teams:
        dynamodb_object = create_dynamodb_object_from_team_data(team)
        dynamodb_objects.append(dynamodb_object)

    return dynamodb_objects


def create_dynamodb_object_from_team_data(team):
    post_code = parse_postcode_from_address(team['address'])
    longitude, latitute = PostCodeApi.get_coordinates_for_post_code(post_code)

    parsed_location_dict = {
        "id": team["id"],
        "crestUrl": team["crestUrl"],
        "fullAddress": team["address"],
        "postCode": post_code,
        "longitude": str(longitude),
        "latitude": str(latitute)
    }

    return parsed_location_dict


def parse_postcode_from_address(address: str):
    print(address)
    address_as_list_of_words = address.split(" ")

    first_part_of_address = address_as_list_of_words[-2]
    last_part_of_address = address_as_list_of_words[-1]
    full_post_code = first_part_of_address + " " + last_part_of_address

    return full_post_code



