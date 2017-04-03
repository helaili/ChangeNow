drop table if exists changeNow;
create table changeNow (
  id int auto_increment,
  c1 int not null,
  c2 int not null,
  c3 int not null,
  primary key (id)
) auto_increment=1;


insert ignore into changeNow values (1110, 11, 23, 97);
insert ignore into changeNow values (2110, 13, 27, 61);
insert ignore into changeNow values (3110, 13, 27, 61);
