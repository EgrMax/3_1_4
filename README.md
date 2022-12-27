# Task-7
SQL запросы

insert into users (age, email, first_name, last_name, password, username) VALUES ('22','user@gmail.com','user','user','$2a$12$XoPvkf6qC11kQgw0y/hPCuyb6hO9bNJUcwmYHEei/1P.ExRnAUEI2','user');
insert into users (age, email, first_name, last_name, password, username) VALUES ('33','admin@gmail.com','admin','admin','$2a$12$Iox3V6DZa5KGfuIM31bOmOOcinJdvGEmWJ9AndPPSe8Vs1LTOHCR.','admin');
insert into roles(role_name) values ('ROLE_USER'), ('ROLE_ADMIN');
insert into users_roles (user_id, role_id) VALUES (1,1);
insert into users_roles (user_id, role_id) VALUES (2,1),(2,2);
