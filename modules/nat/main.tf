resource "aws_eip" "eip-nat-a" {
  tags = {
    Name = "eip-nat-a"
  }
}

resource "aws_eip" "eip-nat-b" {
  tags = {
    Name = "eip-nat-b"
  }
}

resource "aws_nat_gateway" "nat-pub-sub-a" {
  allocation_id = aws_eip.eip-nat-a.id
  subnet_id     = var.pub_sub_1a_id

  tags = {
    Name = "pub-sub-a-NAT-gw"
  }

  depends_on = [var.igw]
}

resource "aws_nat_gateway" "nat-pub-sub-b" {
  allocation_id = aws_eip.eip-nat-b.id
  subnet_id     = var.pub_sub_2b_id

  tags = {
    Name = "pub-sub-b-NAT-gw"
  }

  depends_on = [var.igw]
}

resource "aws_route_table" "pri_sub_3a_to_nat" {
  vpc_id = var.vpc_id

  route {
    cidr_block = var.pri_sub_3a_cidr
    gateway_id = aws_nat_gateway.nat-pub-sub-a.id
  }

  tags = {
    Name = "Private-Subnet-3a-to-NAT"
  }
}

resource "aws_route_table" "pri_sub_5a_to_nat" {
  vpc_id = var.vpc_id

  route {
    cidr_block = var.pri_sub_5a_cidr
    gateway_id = aws_nat_gateway.nat-pub-sub-a.id
  }

  tags = {
    Name = "Private-Subnet-5a-to-NAT"
  }
}

resource "aws_route_table" "pri_sub_4b_to_nat" {
  vpc_id = var.vpc_id

  route {
    cidr_block = var.pri_sub_4b_cidr
    gateway_id = aws_nat_gateway.nat-pub-sub-b.id
  }

  tags = {
    Name = "Private-Subnet-4b-to-NAT"
  }
}

resource "aws_route_table" "pri_sub_6b_to_nat" {
  vpc_id = var.vpc_id

  route {
    cidr_block = var.pri_sub_6b_cidr
    gateway_id = aws_nat_gateway.nat-pub-sub-b.id
  }

  tags = {
    Name = "Private-Subnet-6b-to-NAT"
  }
}

resource "aws_route_table_association" "pri-sub-3a-nat-association" {
  subnet_id      = var.pri_sub_3a_id
  route_table_id = aws_route_table.pri_sub_3a_to_nat.id
}

resource "aws_route_table_association" "pri-sub-5a-nat-association" {
  subnet_id      = var.pri_sub_5a_id
  route_table_id = aws_route_table.pri_sub_5a_to_nat.id
}

resource "aws_route_table_association" "pri-sub-4b-nat-association" {
  subnet_id      = var.pri_sub_4b_id
  route_table_id = aws_route_table.pri_sub_4b_to_nat.id
}

resource "aws_route_table_association" "pri-sub-6b-nat-association" {
  subnet_id      = var.pri_sub_6b_id
  route_table_id = aws_route_table.pri_sub_6b_to_nat.id
}
