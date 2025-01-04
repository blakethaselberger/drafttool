resource "aws_s3_bucket" "player_info_api_bucket" {
  bucket = var.player_info_api_bucket_name

  tags = {
    Name = "${var.player_info_api_bucket_name}"
  }
}

resource "aws_s3_bucket" "sql_bucket" {
  bucket = var.sql_bucket_name

  tags = {
    Name = "${var.sql_bucket_name}"
  }
}

resource "aws_s3_object" "player_info_api" {
  for_each = fileset("${path.module}/player-api", "**")

  bucket = aws_s3_bucket.player_info_api_bucket.id
  key    = each.value
  source = "${path.module}/player-api/${each.value}"
  etag   = filemd5("${path.module}/player-api/${each.value}")
}

resource "aws_s3_object" "sql" {
  for_each = fileset("${path.module}/sql", "**")

  bucket = aws_s3_bucket.sql_bucket.id
  key    = each.value
  source = "${path.module}/sql/${each.value}"
  etag   = filemd5("${path.module}/sql/${each.value}")
}

