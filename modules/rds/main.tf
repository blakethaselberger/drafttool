resource "aws_db_subnet_group" "db-subnet-group" {
  name       = var.db_sub_name
  subnet_ids = [var.pri_sub_5a_id, var.pri_sub_6b_id] # Replace with your private subnet IDs
}

resource "aws_db_instance" "db" {
  identifier              = "drafttool-db-instance"
  engine                  = "mysql"
  engine_version          = "8.0"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  username                = var.db_username
  password                = var.db_password
  db_name                 = var.db_name
  multi_az                = true
  storage_type            = "gp2"
  storage_encrypted       = false
  publicly_accessible     = false
  skip_final_snapshot     = true
  backup_retention_period = 0

  vpc_security_group_ids = [var.db_sg_id] # Replace with your desired security group ID

  db_subnet_group_name = aws_db_subnet_group.db-subnet-group.name

  provisioner "local-exec" {
    command = <<EOT
      mysql -h ${self.endpoint} -u ${self.username} -p${self.password} ${self.db_name} < "${path.module}/initialize_db.sql"
    EOT
  }

  tags = {
    Name = "drafttooldb"
  }
}
