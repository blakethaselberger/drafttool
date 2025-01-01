resource "random_password" "rds_password" {
  length  = var.rds_password_length
  special = true
}

resource "random_string" "rds_username" {
  length  = var.rds_username_length
  upper   = false
  special = false
}

resource "aws_secretsmanager_secret" "rds_credentials" {
  name        = "rds_credentials"
  description = "RDS username and password"
}

resource "aws_secretsmanager_secret_version" "rds_credentials" {
  secret_id = aws_secretsmanager_secret.rds_credentials.id
  secret_string = jsonencode({
    username = random_string.rds_username.result
    password = random_password.rds_password.result
  })
}
