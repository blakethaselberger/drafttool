# resource "aws_instance" "test-server" {
#   ami           = "ami-07d9cf938edb0739b"
#   instance_type = "t2.micro"
# }

module "vpc" {
  source          = "../modules/vpc"
  project_name    = var.project_name
  vpc_cidr        = var.vpc_cidr
  pub_sub_1a_cidr = var.pub_sub_1a_cidr
  pub_sub_2b_cidr = var.pub_sub_2b_cidr
  pri_sub_3a_cidr = var.pri_sub_3a_cidr
  pri_sub_4b_cidr = var.pri_sub_4b_cidr
  pri_sub_5a_cidr = var.pri_sub_5a_cidr
  pri_sub_6b_cidr = var.pri_sub_6b_cidr
}

module "nat" {
  source = "../modules/nat"

  pub_sub_1a_id = module.vpc.pub_sub_1a_id
  pub_sub_2b_id = module.vpc.pub_sub_2b_id
  vpc_id        = module.vpc.vpc_id
  pri_sub_3a_id = module.vpc.pri_sub_3a_id
  pri_sub_4b_id = module.vpc.pri_sub_4b_id
  pri_sub_5a_id = module.vpc.pri_sub_5a_id
  pri_sub_6b_id = module.vpc.pri_sub_6b_id
  igw           = module.vpc.igw
}

module "alb" {
  source        = "../modules/alb"
  alb_sg_id     = module.sg.alb_sg_id
  project_name  = var.project_name
  vpc_id        = module.vpc.vpc_id
  pub_sub_1a_id = module.vpc.pub_sub_1a_id
  pub_sub_2b_id = module.vpc.pub_sub_2b_id
}

module "asg" {
  source = "../modules/asg"

  tg_arn           = module.alb.tg_arn
  instance_type    = "t2.micro"
  max_size         = 4
  min_size         = 0
  desired_capacity = 2
  ec2_sg_id        = module.sg.ec2_asg_sg_id
  project_name     = var.project_name
  pri_sub_3a_id    = module.vpc.pri_sub_3a_id
  pri_sub_4b_id    = module.vpc.pri_sub_5a_id
}

module "sg" {
  source = "../modules/sg"

  vpc_id       = module.vpc.vpc_id
  project_name = var.project_name
  my_laptop_ip = var.my_laptop_ip
}

module "rds" {
  source        = "../modules/rds"
  db_sg_id      = module.sg.db_sg_id
  db_password   = var.db_password
  db_username   = var.db_username
  pri_sub_5a_id = module.vpc.pri_sub_5a_id
  pri_sub_6b_id = module.vpc.pri_sub_6b_id
}

module "secrets_manager" {
  source = "../modules/secrets-manager"

  rds_password_length = 16
  rds_username_length = 16
}
