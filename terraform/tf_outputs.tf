output "api_url" {
    value = "${aws_api_gateway_deployment.employees_rest_api_deployment.invoke_url}"
}

output "dynamodb_provisioning_result" {
  value = data.aws_lambda_invocation.load_stadium_locations_to_table.result
}

output "front_end_url" {
  value = "http://${var.reactapp_bucket_name}.s3-website.${var.aws_region}.amazonaws.com/"
}