from layers.api_interfaces.PostcodeApi import PostCodeApi
from pytest import mark

def test_if_longitude_and_latitude_is_fetched():
    longitude, latitude = PostCodeApi.get_coordinates_for_post_code("LS8 5RA")
    
    assert longitude is not None
    assert latitude is not None
