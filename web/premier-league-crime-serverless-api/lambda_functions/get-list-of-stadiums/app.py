from layers.aws_interfaces.python.DynamoDB import DynamoDB
from layers.code_utilities.python.RequestResponseUtilities import ResponseUtilities, ResponseObject

def lambda_handler(event, context):

    list_of_locations = DynamoDB.get_all_locations_from_location_table()

    return ResponseUtilities(
        ResponseObject(
            status_code=200,
            message="success",
            body=list_of_locations
        )
    )


