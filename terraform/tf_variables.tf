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


# dynamoDB
variable "dynamodb_stadium_table_name" {
    type = string
    default "${local.application_name}-stadiums"
}


# AWS SAM
variable "sam_bucket_name" {
    type = string
    default
}