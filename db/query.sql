SELECT department.name AS department, FROM department JOIN name ON department.id = role.department_id;

SELECT role.title AS title, FROM role JOIN role.title ON role.id = employee.role_id;

CONCAT(employee.first_name, ' ', employee.last_name) AS employee, FROM employee JOIN employee.employee ON employee.id = employee.manager_id;

