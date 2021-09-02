terraform {
    backend "s3" {
        bucket = "${var.backend_bucket_name}"
        key = "${local.application_name}-state.tfstate"
        region = "${var.aws_region}"
        encrypt = "true"
    }
}