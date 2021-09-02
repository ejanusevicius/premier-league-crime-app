resource "aws_iam_role" "api_gateway_execution_role" {
    name = "${local.application_name}-apigateway-role"
    path = "/"
    description = "API Gateway role for premier-league-crimes app"
    assume_role_policy = data.aws_iam_policy_document.apigateway_trust_policy.json
}

resource "aws_iam_policy" "lambda_permissions_policy" {
    name = "${local.application_name}-lambda-permissions"
    path = "/"
    policy = data.aws_iam_policy_document.apigateway_lambda_policy.json
}

resource "aws_iam_role_policy_attachment" "lambda_permissions_policy_attach" {
    role = aws_iam_role.apigateway_execution_role.name
    policy_arn = aws_iam_policy.lambda_permissions_policy.arn
}

resource "aws_api_gateway_rest_api" "premier_league_crime_rest_api" {
    depends_on = [aws_cloudformation_stack.premier_league_crime_api_sam_stack]
    name = "${local.application_name}"
    endpoint_configuration {
        types = ["REGIONAL"]
    }
    body = templatefile("", {
        app_name = local.application_name,
        api_gateway_execution_role = aws_iam_role_apigateway_execution_role.arn
        get_list_of_stadiums_uri = 
        get_crimes_for_stadium_uri =   
    })
}

resource "aws_api_gateway_deployment" "employees_rest_api_deployment" {
    depends_on = [
        "${aws_api_gateway_rest_api.premier_league_crime_rest_api}"
    ]
    rest_api_id = "${aws_api_gateway_rest_api.premier_league_crime_rest_api.id}"
    stage_name = "v1"
    variables = {
        "deployed_at" = timestamp()
    }
}