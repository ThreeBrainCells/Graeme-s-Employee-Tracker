USE company_db;


INSERT INTO departments (department_name)
VALUES ("Finance"),
        ("Marketing"),
        ("Research/Development"),
        ("Engineering"),
        ("Human Resources");

INSERT INTO roles (title, salary, department_id)
VALUES ("Finance Manager", 100.69, 1),
        ("Marketing Manager", 100.69, 2),
        ("Research Manager", 100.69, 3),
        ("Engineering Manager", 100.69, 4),
        ("HR Manager", 100.69, 5),
        ("Accountant", 15.01, 1),
        ("Commercial Writer", 13.99, 2),
        ("Designer", 25.23, 3),
        ("Engineer", 27.12, 4),
        ("Hiring Coordinator", 26.51, 5);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("Graeme", "Montrose", 3, NULL),
        ("Remy", "Linguini", 1, NULL),
        ("Anton", "Gemans", 2, NULL),
        ("Tremas", "Scylla", 4, NULL),
        ("Hal", "Kavanaugh", 5, NULL),
        ("Jacob", "Coleman", 8, 1);
        