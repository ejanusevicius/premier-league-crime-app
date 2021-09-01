from layers.aws_interfaces.python.DynamoDB import DynamoDB
import boto3
from moto import mock_dynamodb2

@mock_dynamodb2
def test_if_all_locations_are_retrieved():
    pass
    # dynamodb = DynamoDB()
    # dynamodb.get_all_locations_from_location_table()

def test_if_locations_are_batch_written():
    dynamodb = DynamoDB()
    dynamodb.write_locations_to_location_table([])
