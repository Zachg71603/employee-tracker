use employer_tracker;

INSERT INTO department (department_name)
VALUES ("Sales"), 
("Programming"), 
("Legal"), 
("Marketing"), 
("Finance");

-- filler data

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Programmer", 120000, 02), 
("Lead Programmer", 120000, 02), 
("Sales Lead", 60000, 01),
("Salesperson", 50000, 01), 
("Lawyer", 160000, 03), 
("Lawyer", 160000, 03), 
("Chief Marketing Officer", 200000, 04), 
("Chief Financial Officer", 210000, 05);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Farley", "Chicken", 01, 08), 
("C9", "Perkz", 03, 01), 
("Daenerys", "Targaryen", 01, 08), 
("Tony", "Stark", 05, 03), 
("Mace", "Windu", 03, 08), 
("Jerome", "luvsCats", 02, 05), 
("Cheng", "Tang", 02, 08), 
("John", "Wick", 04, 01);