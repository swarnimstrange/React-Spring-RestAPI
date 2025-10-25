import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";

const Update = () =>{
    const { id: employeeId } = useParams()
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
    });

    useEffect(() => { (async () => {
                try{
                    const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`);
                    const data = await response.json();
                    setFormData(data);
                }
                catch(error){
                    console.error("Error fetching Employee", error.message);
                }
            })();
        },[]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
        ...formData,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            navigate('/');
        }
        catch(error){
            console.error("Error Updating Employee", error.message);
        }
    };

    return(
        <>
        <h1 className="text-center">Update Employee</h1>
        <Container>
        <Row>
            <Col>
            <Form onSubmit={(e) => {handleSubmit(e)}}>
                <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={formData.name}
                    name="name"
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="text"
                    value={formData.phone}
                    name="phone"
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Department</Form.Label>
                <Form.Control
                    type="text"
                    value={formData.department}
                    name="department"
                    onChange={handleChange}
                />
                </Form.Group>

                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
            </Col>
        </Row>
    </Container>
        </>
    )
}

export default Update;