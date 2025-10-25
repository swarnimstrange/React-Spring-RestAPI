import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import "./Header.css";

const Header = () => {
    return(
        <>
        <Navbar>
        <Container>
        <Navbar.Brand as={Link} to="/"><strong>Employee Management System</strong></Navbar.Brand>
        <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="nav-link">Employees</Nav.Link>
            <Nav.Link as={Link} to="/employee" className="nav-link">Post Employees</Nav.Link>
        </Nav>
        </Container>
        </Navbar>
        </>
    )
}

export default Header; 