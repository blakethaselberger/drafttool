# Security Group for the ALB
resource "aws_security_group" "alb_sg" {
  name        = "Application-Load-Balancer-SG"
  description = "Security Group for the Application Load Balancer"
  vpc_id      = var.vpc_id

  ingress {
    description = "Allow HTTP traffic from the internet"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTPS traffic from the internet"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ALB_SG"
  }
}

# Security Group for the EC2 instances in the ASG
resource "aws_security_group" "ec2_asg_sg" {
  name        = "EC2-Auto-Scaling-Group-SG"
  description = "Security Group for the EC2 ASG"
  vpc_id      = var.vpc_id

  ingress {
    description = "Allow HTTP traffic from the ALB"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Adjust this if needed to restrict traffic from ALB
  }

  ingress {
    description = "Allow HTTPS traffic from the ALB"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Adjust this if needed to restrict traffic from ALB
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "EC2_ASG_SG"
  }

  # Ensure this security group is managed after the ALB SG
  depends_on = [aws_security_group.alb_sg]
}

# Security Group for the Database
resource "aws_security_group" "db_sg" {
  name        = "db_sg"
  description = "Enable MySQL access on port 3306 from EC2 ASG"
  vpc_id      = var.vpc_id

  ingress {
    description     = "MySQL access"
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2_asg_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "MySQL_DB_SG"
  }

  # Ensure this security group is managed after the EC2 ASG SG
  depends_on = [aws_security_group.ec2_asg_sg]
}
