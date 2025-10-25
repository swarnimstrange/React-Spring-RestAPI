import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PostUser = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
        ...formData,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        
        try{
            const response = await fetch("http://localhost:8080/api/employee", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            navigate('/');
        }
        catch(error){
            console.error("Error Creating Employee", error.message);
        }
    };

    return(
        <>
            <h1 className="text-center">Post Employee</h1>
            <Container>
            <Row>
                <Col>
                <Form onSubmit={(e) => {handleSubmit(e)}}>
                    <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Department"
                        name="department"
                        value={formData.department}
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

export default PostUser;