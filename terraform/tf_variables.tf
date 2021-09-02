# Provider configuration
variable "aws_region" {
    type = string
    default = "eu-west-2"
}

variable "aws_access_key" {
    type = string
}

variable "aws_secret_key" {
    type = string
}


# Backend configuration
variable "backend_bucket_name" {
    type = string
    default = "premier-league-crime-app-backend"
}


# Lambda functions
variable "api_lambda_functions" {
    type = list
    default = [
        "get-list-of-stadiums",
        "get-crimes-for-stadium",
        "provision-stadium-locations"
    ]
}

variable "lambda_invoke_url" {
    default = "arn:aws:apigateway:eu-west-2:lambda:path/2015-03-31/functions"
}


# dynamoDB
variable "dynamodb_stadium_table_name" {
    type = string
    default = "premier-league-crime-app-stadiums"
}


# AWS SAM
variable "sam_bucket_name" {
    type = string
    default = "premier-league-crime-app-sam-template"
}