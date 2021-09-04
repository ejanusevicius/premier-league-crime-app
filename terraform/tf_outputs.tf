output "api_url" {
    value = "${aws_api_gateway_deployment.employees_rest_api_deployment.invoke_url}"
}

output "dynamodb_provisioning_result" {
  value = data.aws_lambda_invocation.load_stadium_locations_to_table.result
}