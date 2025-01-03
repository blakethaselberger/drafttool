
resource "aws_s3_bucket" "bucket" {
  bucket = "my-node-api-bucket"

  tags = {
    Name = "MyNodeApiBucket"
  }
}

# resource "aws_s3_bucket_object" "zip_object" {
#   bucket = aws_s3_bucket.bucket.bucket
#   key    = "node-crud-api.zip"
#   source = "/path/to/your/local/node-crud-api.zip" # Adjust the path to your zip file
#   acl    = "private"
# }

# output "s3_bucket_name" {
#   value = aws_s3_bucket.bucket.bucket
# }

# output "s3_bucket_url" {
#   value = "s3://${aws_s3_bucket.bucket.bucket}/node-crud-api.zip"
# }
