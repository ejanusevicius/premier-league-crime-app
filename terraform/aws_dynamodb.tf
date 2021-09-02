resource "aws_dynamodb_table" "stadium_location_table" {
    name = "${var.dynamodb_stadium_table_name}"
    billing_mode = "PROVISIONED"
    read_capacity = 5
    write_capacity = 5
    hash_key = "id"

    attribute {
        name = "id"
        type = "S"
    }

    tags = {
        Description = "dynamoDB table that holds all of the stadium location data for the current Premier League teams."
    }
}


data "aws_lambda_invocation" "load_stadium_locations_to_table" {
  function_name = aws_lambda_function.lambda_function_test.function_name

  input = <<JSON
{}
JSON
}

output "result_entry" {
  value = jsondecode(data.aws_lambda_invocation.example.result)["key1"]
}