from dataclasses import dataclass
import boto3
from typing import List

@dataclass
class Location: # Type for the location dict
    id: int
    crestUrl: str
    fullAddress: str
    postCode: str
    longitude: str
    latitude: str

class DynamoDB:

    def __init__(self) -> None:
        self._dynamo_client = boto3.resource('dynamodb')
        self._location_table = self._dynamo_client.Table("TABLE_NAME_GOES_HERE")

    def write_locations_to_location_table(self, list_of_locations: List[Location]):
        with self._location_table.batch_writer() as batch:
            for location in list_of_locations:
                batch.put_item(
                    Item=location
                )

    def get_all_locations_from_location_table(self) -> List[Location]:
        scan_response = self._location_table.scan()
        locations = scan_response['Items']
        return locations

