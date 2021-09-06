const API_KEY = process.env['API_ID'] || "b3mhp2e47h";
export class ApiEndpoints {
    private static API_PATH = `https://${API_KEY}.execute-api.eu-west-2.amazonaws.com/v1`;
    static geStadiumLocations = `${ApiEndpoints.API_PATH}/get-list-of-stadiums`;
    static getCrimesForStadiumCoorindates(latitude: number, longitude: number) {
        return `${ApiEndpoints.API_PATH}/get-crimes-for-stadium?longitude=${longitude}&latitude=${latitude}`;
    }
};

