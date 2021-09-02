resource "aws_s3_bucket" "sam_template_bucket" {
    bucket = "${var.sam_bucket_name}"
    acl = "private"
    versioning {
        enabled = true
    }
}

resource "aws_s3_bucket_object" "sam_template_object" {
    depends_on=[
        aws_s3_bucket.sam_template_bucket
    ]
    bucket = var.sam_bucket_name
    key = "premier-league-crime-app-deployment-${timestamp()}.yaml"
    source = "../web/premier-league-crime-serverless-api/template.yaml"
    etag = filemd5("../web/premier-league-crime-serverless-api/template.yaml")
}

resource "aws_cloudformation_stack" "premier_league_crime_api_sam_stack" {
    name = "premier-league-crime-app-aws-sam-stack"
    capabilities = ["CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"]
    parameters = {
        AppName = local.application_name
    }

    template_url = "https://${var.sam_bucket_name}.s3-${var.aws_region}.amazonaws.com/${aws_s3_bucket_object.sam_template_object.id}"
} 