from pytest import mark
from layers.api_interfaces.python.FootbalDataApi import FootballDataApi
from unittest import mock
import os

@mock.patch.dict(os.environ, {"API_KEY": "aee7452b2ba84dadb02437d4f90271c4"})
def test_api_request_to_get_teams():
    fdapi = FootballDataApi()
    teams = fdapi.get_premier_league_teams()

    assert len(teams) > 1