import requests
import os

class FootballDataApi:

    def __init__(self) -> None:
        PREMIER_LEAGUE_ID = 2021

        self._endpoint_to_get_all_teams = f"https://api.football-data.org/v2/competitions/{PREMIER_LEAGUE_ID}/teams"
        self._authentication_header = { 'X-Auth-Token': os.environ['API_KEY'] }

    def get_premier_league_teams(self):
        response = requests.get(self._endpoint_to_get_all_teams, headers=self._authentication_header)
        response_data = response.json()
        return response_data['teams']

