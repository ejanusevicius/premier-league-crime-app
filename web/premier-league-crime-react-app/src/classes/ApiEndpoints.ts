import { TerraformParameterParser } from "./TerraformParameterParser";

export class ApiEndpoints {
    private static API_PATH = TerraformParameterParser.getApiInvokeUrl();
    static geStadiumLocations = `${ApiEndpoints.API_PATH}/get-list-of-stadiums`;
    static getCrimesForStadiumCoorindates(latitude: number, longitude: number) {
        return `${ApiEndpoints.API_PATH}/get-crimes-for-stadium?longitude=${longitude}&latitude=${latitude}`;
    }
};

