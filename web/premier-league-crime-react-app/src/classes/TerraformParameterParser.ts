export class TerraformParameterParser {
    private static environment = process.env as unknown as { REACT_APP_TERRAFORM_PARAMS: string };
    private static terraformParameterArray = TerraformParameterParser.environment['REACT_APP_TERRAFORM_PARAMS'].split("_SPLITPARSEKEY_");
    private static googleApiKey = TerraformParameterParser.terraformParameterArray[0];
    private static apiInvokeUrl = TerraformParameterParser.terraformParameterArray[1];

    static getGoogleMapsApiKey() {
        return TerraformParameterParser.googleApiKey;
    }

    static getApiInvokeUrl() {
        return TerraformParameterParser.apiInvokeUrl;
    }
}