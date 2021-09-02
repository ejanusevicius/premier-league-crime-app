output "api_url" {
    value = "${aws_api_gateway_deployment.employees_rest_api_deployment.invoke_url}"
}