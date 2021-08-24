INSERT INTO department (name)
VALUES  ('General Management'),
        ('Human Resources'),
        ('Sales & Marketing'),
        ('Development'),
        ('Test/QA'),
        ('Customer Support');

INSERT INTO role (title, salary, department_id)
VALUES  ('CEO', 300000, 1),
        ('Operations Manager', 120000, 1),
        ('CFO', 260000, 1),
        ('HR Assistant', 35000, 2),
        ('HR Supervisor', 55000, 2),
        ('Marketing Assistant', 40000, 3),
        ('Marketing Manager', 52500, 3),
        ('Account Executive', 65000, 3),
        ('Junior Developer', 60000, 4),
        ('Senior Developer', 115000, 4),
        ('Junior Test Engineer', 57500, 5),
        ('QA Engineer', 68000, 5),
        ('Senior Test Analyst', 11000, 5),
        ('Level 1 Support Analyst', 45000, 6),
        ('Level 2 Support Analyst', 55000, 6);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ('Marian', 'Mcgregor', 1, NULL),
        ('Xander', 'Oliver', 2, 1),
        ('Isabelle', 'Mullins', 3, 1),
        ('Alastair', 'Battle', 5, 2),
        ('Dev', 'Parra', 4, 4),
        ('Harlee', 'Cornish', 4, 4),
        ('Izzy', 'Markman', 7, 3),
        ('Gracie-Leigh', 'Martinez', 6, 7),
        ('Jett', 'Donald', 6, 7),
        ('Carrie', 'Singh', 8, 3),
        ('Ray', 'Atkins', 10, 2),
        ('Aariz', 'Saunders', 9, 11),
        ('Leila', 'Kouma', 9, 11),
        ('Hannah', 'Alfaro', 9, 11),
        ('Eoghan', 'Chase', 13, 2),
        ('Irfan', 'King', 12, 15),
        ('Lexi', 'Croft', 11, 16),
        ('Ira', 'Ayala', 11, 16),
        ('Shannan', 'Metcalfe', 15, 2),
        ('Peter', 'Bates', 14, 19),
        ('Rafi', 'Wills', 14, 19);
        

