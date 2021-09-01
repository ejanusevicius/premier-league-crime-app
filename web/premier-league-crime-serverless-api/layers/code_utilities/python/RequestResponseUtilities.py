from dataclasses import dataclass, astuple
import json
from typing import Any

@dataclass
class ResponseObject:
    """
        Maps a HTTP response that is sent back to the front-end
    """
    status_code: int
    message: str
    body: Any = None

class ResponseUtilities:
    def create_response_object(response_object: ResponseObject):
        status_code, body, message = astuple(response_object)

        response_body = {
            "statusCode": status_code
        }

        if body is not None:
            response_body['body'] = body
        if message is not None:
            response_body['message'] = message

        response = {
            "statusCode": status_code,
            "headers": {
                "Access-Control-Allow-Headers" : "Content-Type", # ADD CORS HEADERS
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps(response_body)
        }
        return response

