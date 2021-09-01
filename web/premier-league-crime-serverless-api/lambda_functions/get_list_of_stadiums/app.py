from DynamoDB import DynamoDB
from RequestResponseUtilities import ResponseUtilities, ResponseObject

def lambda_handler(event, context):
    
    dynamodb = DynamoDB()
    list_of_locations = dynamodb.get_all_locations_from_location_table()

    return ResponseUtilities(
        ResponseObject(
            status_code=200,
            message="success",
            body=list_of_locations
        )
    )


