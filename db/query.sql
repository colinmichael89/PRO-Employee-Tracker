SELECT department.name AS department, FROM department LEFT JOIN name ON department.id = role.department_id;

SELECT role.title AS title, FROM role LEFT JOIN role.title ON role.id = employee.role_id;

CONCAT(employee.first_name, ' ', employee.last_name) AS employee, FROM employee LEFT JOIN employee.employee ON employee.id = employee.manager_id;

