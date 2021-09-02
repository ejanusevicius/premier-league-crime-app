terraform {
    backend "s3" {
        bucket = "premier-league-crime-app-backend"
        key = "premier-league-crime-app-state.tfstate"
        region = "eu-west-2"
        encrypt = "true"
    }
}