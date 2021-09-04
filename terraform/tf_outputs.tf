output "api_url" {
    value = "${aws_api_gateway_deployment.employees_rest_api_deployment.invoke_url}"
}

# output "dynamodb_provisioning_result" {
#   value = jsondecode(data.aws_lambda_invocation.example.result)["key1"]
# }