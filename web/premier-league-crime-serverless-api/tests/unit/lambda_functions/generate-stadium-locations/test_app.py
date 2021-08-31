import json
from lambda_functions.generate_stadium_locations.app import create_dynamodb_object_from_team_data, lambda_handler
from unittest import mock
import os
# def test_if_team_data_is_parsed_correctly():
#     with open('/football_api_response.json') as data_file:
#         input_data = json.load(data_file)
#         output_data = create_dynamodb_object_from_team_data(input_data)

#         assert output_data["id"] is not None
#         assert output_data["crestUrl"] is not None
#         assert output_data["fullAddress"] is not None
#         assert output_data["postCode"] is not None
#         assert output_data["longitude"] is not None
#         assert output_data["latitude"] is not None

@mock.patch.dict(os.environ, {"API_KEY": "aee7452b2ba84dadb02437d4f90271c4"})
def test_if_endpoint_works():
    locations = lambda_handler({}, "")
    assert len(locations) > 1
