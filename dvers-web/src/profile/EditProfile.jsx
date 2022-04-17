import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { url } from './../utils/auth';
import axios from 'axios'; 

export class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            data: {userName: this.props.user.userName, password: ""}
          };
        this.editUser = this.editUser.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    editUser(e) {
        e.preventDefault();
        const { data } = this.state;
        axios.put(url + 'users/edit/' + this.props.user.id, data)
            .then(() => {
                this.props.onHide();
            });          
        sessionStorage.setItem("userName", data.userName);
    }

    onChange(e) {  
        e.persist();
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        const { data } = this.state;
        return (
            <Modal
            {...this.props}
            aria-tabelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header clooseButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{margin: "0 auto"}}>
                    Редактирай профил
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12}>
                            <Form onSubmit={this.editUser}>
                                <Form.Group controlId="PostTitle" className="add-edit-post">
                                    <Form.Label>Потребителско име</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="userName" 
                                    placeholder="Потребителко име"
                                    value={data.userName}
                                    onChange={this.onChange}
                                    required
                                    />
                                </Form.Group>
                                 <Form.Group controlId="PostDescription" className="add-edit-post">
                                    <Form.Label>Парола</Form.Label>
                                    <Form.Control 
                                    type="password" 
                                    name="password"
                                    placeholder="Нова парола"
                                    value={data.password}
                                    onChange={this.onChange}
                                    required
                                    />
                                </Form.Group>
                                <Button type="submit" className="add-edit-deliver">
                                Редактирай
                                </Button>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={this.props.onHide}>Затвори</Button>
                                </Modal.Footer>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        )
    }
}