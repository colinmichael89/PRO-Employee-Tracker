INSERT INTO department (name)
VALUES ("Research and Development"), ("Sales"),
("Marketing"), ("Accounting"),
("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Developer", 120000, 1),
("Lead Developer", 160000, 1),
("Sales Lead", 150000, 2),
("Salesperson", 100000, 2),
("Head of Marketing", 100000, 3),
("Graphic Designer", 80000, 3), 
("Accountant", 125000, 4),
("Account Manager", 120000, 4),
("Engineer", 125000, 5),
("Lead Engineer", 160000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Mama", 1, 1), 
("Johnny", "Cash", 2, 2), 
("Jimi", "Hendricks", 3, NULL), 
("Marty", "McFly", 4, NULL),
("John", "Jacob", 5, 3), 
("Jim", "James", 6, NULL),
("Robert", "Plant", 7, NULL), 
("Edward", "Scissorhands", 8, NULL),
("Seymore", "Butts", 9, NULL), 
("Sam", "Hill", 10, 4);
