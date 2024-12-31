terraform {
  backend "s3" {
    bucket         = "tfstate-bucket-bh"
    key            = "backend/drafttool.tfstate"
    region         = "us-west-2"
    dynamodb_table = "remote-backend"
  }
}
