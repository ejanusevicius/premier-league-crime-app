# Premier-League-Crime-App

An application that fetches all of the last-year crimes that happened in the Premier League team stadiums. Written in Python3.8, TypeScript and HCL.
It is a fully deployable application, however the "null_resource"."build_react_app" may not work in Linux environments (only tested in Windows)

## Prerequisites
1) Google Maps API key.
2) An AWS IAM USER that has administrator access and programmatic access (access key & secret).

## How to deploy
1) Create the AWS S3 bucket that will hold the Terraform Back-End.
2) Create the AWS S3 bucket that will hold the AWS SAM package
3) Navigate to web/premier-league-crimes-serverless-api/ and run SAM BUILD command.
4) Upload the package to the S3 bucket created in (2)
5) Navigate to terraform/ and run "terraform apply"

## Live version:

Live version of the app can be found here:
http://premier-league-crime-app-reactapp-bucket.s3-website.eu-west-2.amazonaws.com/