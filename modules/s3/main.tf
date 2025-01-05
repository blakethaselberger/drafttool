# S3 Bucket for Player Info API
resource "aws_s3_bucket" "player_info_api_bucket" {
  bucket = var.player_info_api_bucket_name

  tags = {
    Name = "${var.player_info_api_bucket_name}"
  }
}

# S3 Bucket for SQL Files
resource "aws_s3_bucket" "sql_bucket" {
  bucket = var.sql_bucket_name

  tags = {
    Name = "${var.sql_bucket_name}"
  }
}

# S3 Bucket for Userdata Scripts
resource "aws_s3_bucket" "scripts_bucket" {
  bucket = var.scripts_bucket

  tags = {
    Name = "Userdata Scripts Bucket"
  }
}

# Upload Player Info API Files to S3
resource "aws_s3_object" "player_info_api" {
  for_each = fileset("${path.module}/player-api", "**")

  bucket = aws_s3_bucket.player_info_api_bucket.id
  key    = each.value
  source = "${path.module}/player-api/${each.value}"
  etag   = filemd5("${path.module}/player-api/${each.value}")
}

# Upload SQL Files to S3
resource "aws_s3_object" "sql" {
  for_each = fileset("${path.module}/sql", "**")

  bucket = aws_s3_bucket.sql_bucket.id
  key    = each.value
  source = "${path.module}/sql/${each.value}"
  etag   = filemd5("${path.module}/sql/${each.value}")
}

# Upload All Userdata Scripts to S3
resource "aws_s3_object" "userdata_scripts" {
  for_each = fileset("${path.module}/userdata-scripts", "**")

  bucket = aws_s3_bucket.scripts_bucket.id
  key    = "userdata-scripts/${each.value}"
  source = "${path.module}/userdata-scripts/${each.value}"
  etag   = filemd5("${path.module}/userdata-scripts/${each.value}")
}
