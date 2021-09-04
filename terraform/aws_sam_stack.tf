resource "aws_s3_bucket_object" "sam_template_object" {
    bucket = var.sam_bucket_name
    key = "premier-league-crime-app-deployment-${timestamp()}.yaml"
    source = "../web/premier-league-crime-serverless-api/sam-deploy.yaml"
    etag = filemd5("../web/premier-league-crime-serverless-api/sam-deploy.yaml")
}

resource "aws_cloudformation_stack" "premier_league_crime_api_sam_stack" {
    name = "premier-league-crime-app-aws-sam-stack"
    capabilities = ["CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"]
    parameters = {
        AppName = local.application_name,
        FootballApiKey = "aee7452b2ba84dadb02437d4f90271c4",
        StadiumTableName = var.dynamodb_stadium_table_name
    }

    template_url = "https://${var.sam_bucket_name}.s3-${var.aws_region}.amazonaws.com/${aws_s3_bucket_object.sam_template_object.id}"
} 