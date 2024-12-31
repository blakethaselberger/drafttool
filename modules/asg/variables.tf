variable "project_name" {}
variable "ec2_sg_id" {}
variable "ami" {
  default = "ami-0d16a00c70ee279b8"
}
variable "instance_type" {}
variable "max_size" {}
variable "min_size" {}
variable "desired_capacity" {}
variable "asg_health_check_type" {
  default = "EC2"
}
variable "pri_sub_3a_id" {}
variable "pri_sub_4b_id" {}
variable "tg_arn" {}
