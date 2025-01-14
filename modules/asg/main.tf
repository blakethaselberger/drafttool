resource "aws_launch_template" "lt_name" {
  name          = "${var.project_name}-tpl"
  image_id      = var.ami
  instance_type = var.instance_type
  user_data = base64encode(templatefile("${path.module}/userdata.tpl", {
    player_info_api_bucket_name = var.player_info_api_bucket_name
    sql_bucket_name             = var.sql_bucket_name
    rds_endpoint                = var.db_endpoint #aws_db_instance.db.endpoint,
    rds_db_name                 = var.db_name,
    rds_username                = var.db_username,
    rds_password                = var.db_password,
    scripts_bucket              = var.scripts_bucket
  }))

  vpc_security_group_ids = [var.ec2_sg_id]

  iam_instance_profile {
    name = aws_iam_instance_profile.ec2_asg_instance_profile.name
  }

  tags = {
    Name = "${var.project_name}-tpl"
  }
}

resource "aws_placement_group" "spread" {
  name     = "EC2-Spread-Placement-Group"
  strategy = "spread"
}

resource "aws_autoscaling_group" "asg" {
  name                      = "${var.project_name}-asg"
  max_size                  = var.max_size
  min_size                  = var.min_size
  desired_capacity          = var.desired_capacity
  health_check_grace_period = 300
  health_check_type         = var.asg_health_check_type
  vpc_zone_identifier       = [var.pri_sub_3a_id, var.pri_sub_4b_id]
  target_group_arns         = [var.tg_arn]

  enabled_metrics = [
    "GroupInServiceInstances",
    "GroupPendingInstances",
    "GroupStandbyInstances",
    "GroupTerminatingInstances"
  ]

  metrics_granularity = "1Minute"

  launch_template {
    id      = aws_launch_template.lt_name.id
    version = "$Latest"
  }

  timeouts {
    delete = "15m"
  }
}

