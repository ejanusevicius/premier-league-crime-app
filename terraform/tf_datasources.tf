# Export Lambda ARNs from CloudFormation template (after stack is built)
data "aws_cloudformation_export" "api_lambda_arn_cfn_exports" {
    for_each = toset(var.api_lambda_functions)
    depends_on = [aws_cloudformation_stack.premier_league_crime_api_sam_stack]
    name = "${local.application_name}-${each.value}-arn"
}

# Create API Gateway Trust Policy
data "aws_iam_policy_document" "apigateway_trust_policy"  {
    statement {
        effect = "Allow"

        principals {
            type = "Service"
            identifiers = ["apigateway.amazonaws.com"]
        }

        actions = ["sts:AssumeRole"]
    }
}

# Lambda Execution Policy
data "aws_iam_policy_document" "apigateway_lambda_policy" {
    statement {
        effect = "Allow"
        actions = ["lambda:InvokeFunction"]
        resources = values(data.aws_cloudformation_export.api_lambda_arn_cfn_exports)[*].value
    }
}