resource "aws_s3_bucket" "rating_generator_config" {
    bucket = "${var.config_bucket_name}"
    acl = "private"
    versioning {
        enabled = true
    }
}

resource "aws_s3_bucket_object" "sam_template" {
    bucket = var.sam_bucket_name
    key = "${local.application_name}-deployment-${timestamp()}.yaml"
    source = "../web/premier-league-crime-serverless-api/template.yaml"
    etag = filemd5("../web/premier-league-crime-serverless-api/template.yaml")
}

resource "aws_cloudformation_stack" "premier_league_crime_api_sam_stack" {
    name = "${local.application_name}-aws-sam-stack"
    capabilities = ["CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"]
    parameters = {
        AppName = local.application_name
    }

    template_url = "https://${var.sam_bucket_name}.s3-${var.aws_region}.amazonaws.com/${aws_s3_bucket_object.sam_template.id}"
} 