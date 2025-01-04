output "rds_username" {
  value     = random_string.rds_username.result
  sensitive = true
}

output "rds_password" {
  value     = random_password.rds_password.result
  sensitive = true
}
