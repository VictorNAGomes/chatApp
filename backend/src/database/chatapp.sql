DROP DATABASE IF EXISTS chatapp;

CREATE DATABASE IF NOT EXISTS chatapp;

use chatapp;

create table users(
  id int not null primary key auto_increment,
  userName varchar(60) not null unique,
  password varchar(120) not null
);

create table contacts(
  id int not null primary key auto_increment,
  user1 int not null,
  user2 int not null,
  chatting boolean not null default false,
  CONSTRAINT fk_user1 FOREIGN KEY (user1) REFERENCES users(id)
    on update cascade 
    on delete cascade,
  CONSTRAINT fk_user2 FOREIGN KEY (user2) REFERENCES users(id)
    on update cascade 
    on delete cascade 
);

create table chat(
  id int not null primary key auto_increment,
  from_user int not null,
  to_user int not null,
  msg text not null,
  CONSTRAINT fk_from FOREIGN KEY (from_user) REFERENCES users(id)
    on update cascade 
    on delete cascade,
  CONSTRAINT fk_to FOREIGN KEY (to_user) REFERENCES users(id)
    on update cascade 
    on delete cascade 
);