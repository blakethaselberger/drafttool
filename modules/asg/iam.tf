# Create IAM Role
resource "aws_iam_role" "ec2_asg_role" {
  name = "EC2_ASG_Role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

# resource "aws_iam_policy" "EC2InsancePolicy" {
#   name = "EC2InstancePolicy"
#   description = "Permission Set for EC2 Instances that operate as the compute of the drafttool"
#   policy = jsondecode({
#     version = "2012-10-17"
#     Statement = [
#         {
#         Action = "ssm:*"
#         Effect = "Allow"
#         Resource = "*"
#         }
#     ]
#   })
# }

resource "aws_iam_role_policy_attachment" "EC2FullAccessAttach" {
  role       = aws_iam_role.ec2_asg_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2FullAccess"
}

resource "aws_iam_role_policy_attachment" "SSMManagedInstanceCoreAttach" {
  role       = aws_iam_role.ec2_asg_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}
resource "aws_iam_role_policy_attachment" "AmazonS3FullAccess" {
  role       = aws_iam_role.ec2_asg_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

resource "aws_iam_instance_profile" "ec2_asg_instance_profile" {
  name = "EC2_ASG_Instance_Profile"
  role = aws_iam_role.ec2_asg_role.name
}
