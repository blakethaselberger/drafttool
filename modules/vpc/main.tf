resource "aws_vpc" "aws_vpc" {
  cidr_block           = var.vpc_cidr
  instance_tenancy     = "default"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "${var.project_name}-vpc"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.aws_vpc.id

  tags = {
    Name = "${var.project_name}-igw"
  }
}

data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_subnet" "pub_sub_1a" {
  vpc_id            = aws_vpc.aws_vpc.id
  cidr_block        = var.pub_sub_1a_cidr
  availability_zone = data.aws_availability_zones.available.names[0]

  tags = {
    Name = "${var.project_name}-pub-sub-1a"
  }
}

resource "aws_subnet" "pub_sub_2b" {
  vpc_id            = aws_vpc.aws_vpc.id
  cidr_block        = var.pub_sub_2b_cidr
  availability_zone = data.aws_availability_zones.available.names[1]

  tags = {
    Name = "${var.project_name}-pub-sub-2b"
  }
}

resource "aws_route_table" "public-rt" {
  vpc_id = aws_vpc.aws_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "public-rt"
  }
}

resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.pub_sub_1a.id
  route_table_id = aws_route_table.public-rt.id
}

resource "aws_route_table_association" "b" {
  subnet_id      = aws_subnet.pub_sub_2b.id
  route_table_id = aws_route_table.public-rt.id
}

resource "aws_subnet" "pri_sub_3a" {
  vpc_id            = aws_vpc.aws_vpc.id
  cidr_block        = var.pri_sub_3a_cidr
  availability_zone = data.aws_availability_zones.available.names[0]

  tags = {
    Name = "${var.project_name}-pri-sub-3a"
  }
}

resource "aws_subnet" "pri_sub_5a" {
  vpc_id            = aws_vpc.aws_vpc.id
  cidr_block        = var.pri_sub_5a_cidr
  availability_zone = data.aws_availability_zones.available.names[0]

  tags = {
    Name = "${var.project_name}-pri-sub-5a"
  }
}

resource "aws_subnet" "pri_sub_4b" {
  vpc_id            = aws_vpc.aws_vpc.id
  cidr_block        = var.pri_sub_4b_cidr
  availability_zone = data.aws_availability_zones.available.names[1]

  tags = {
    Name = "${var.project_name}-pri-sub-4b"
  }
}

resource "aws_subnet" "pri_sub_6b" {
  vpc_id            = aws_vpc.aws_vpc.id
  cidr_block        = var.pri_sub_6b_cidr
  availability_zone = data.aws_availability_zones.available.names[1]

  tags = {
    Name = "${var.project_name}-pri-sub-6b"
  }
}
