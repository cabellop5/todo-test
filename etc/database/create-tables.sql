CREATE TABLE todo
(
  id       uuid not null primary key,
  message  varchar(255),
  label    varchar(255),
  due_date timestamp(0) without time zone
);

INSERT INTO todo(id, message, label, due_date)
VALUES ('50fa217e-01e9-405e-8dea-f3b2499b8580', 'message 01', '0001', '2023-09-08 10:10:10'),
       ('dd4f931d-0692-4798-aa5d-307a41df2d57', 'message 02', '0002', '2023-09-08 10:11:10')
