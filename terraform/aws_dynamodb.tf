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
  depends_on = [
    aws_dynamodb_table.stadium_location_table,
    aws_cloudformation_stack.premier_league_crime_api_sam_stack
  ]

  function_name = data.aws_cloudformation_export.provisioning_lambda_name.value
  input = <<JSON
{}
JSON
}