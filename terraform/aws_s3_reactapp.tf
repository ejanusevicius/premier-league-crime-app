resource "aws_s3_bucket" "reactapp_s3_bucket" {
    bucket = "${var.reactapp_bucket_name}"
    acl    = "public-read"
    policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:GetObjectVersion"
            ],
            "Resource": "arn:aws:s3:::${var.reactapp_bucket_name}/*"
        }
    ]
}
EOF

  website {
    index_document = "index.html"
    error_document = "index.html"

    routing_rules = <<EOF
[{
    "Condition": {
        "KeyPrefixEquals": "docs/"
    },
    "Redirect": {
        "ReplaceKeyPrefixWith": "documents/"
    }
}]
EOF
  }
}

resource "null_resource" "build_react_app" {
    depends_on = [
        aws_s3_bucket.reactapp_s3_bucket,
        aws_api_gateway_deployment.employees_rest_api_deployment,
    ]
    provisioner "local-exec" {
        command =  "cd .. && cd web && cd premier-league-crime-react-app && echo REACT_APP_TERRAFORM_PARAMS=${var.google_maps_api_key}_SPLITPARSEKEY_${aws_api_gateway_deployment.employees_rest_api_deployment.invoke_url} > .env && npm run build"
    }
}

resource "null_resource" "upload_reactapp_to_s3_bucket" {
    depends_on = [
        aws_s3_bucket.reactapp_s3_bucket,
        null_resource.build_react_app
    ]
    provisioner "local-exec" {
        command = "cd .. && cd web && cd premier-league-crime-react-app && aws s3 sync build s3://${var.reactapp_bucket_name}/"
    }
}