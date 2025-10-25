import { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => { (async () => {
            try{
                const response = await fetch("http://localhost:8080/api/employee");
                const data = await response.json();
                setEmployees(data);
            }
            catch(error){
                console.error("Error fetching Employee", error.message);
            }
        })();
    },[]);

    const handleUpdate = (employeeId) => {
        navigate(`/employee/${employeeId}`)
    }

    const handleDelete = async(employeeId) => {
        try{
            const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`, {
                method: "DELETE",
            });
            console.log(employeeId + " deleted");

            if(response.ok){
                setEmployees((prevEmployee) => prevEmployee.filter(employee => employee.id !== employeeId));
            }
        }
        catch(error){
            console.error("error in deleting " + employeeId);
        }
    }

    const handlePost = () => {
        navigate(`/employee`)
    }

    return(
    <>
    <Container className="mt-5">
        <Row>
            <Col>
                <h1 className="text-center">Employees</h1>
                <Table striped bordered hover responsive className="mt-5">
                <thead >
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.department}</td>
                        <td><Button variant="outline-secondary" onClick={() => {handleUpdate(employee.id)}}>Update</Button> {" "}
                        <Button variant="outline-danger" onClick={() => {handleDelete(employee.id)}}>Delete</Button></td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
    </>
    )
}



export default Dashboard;