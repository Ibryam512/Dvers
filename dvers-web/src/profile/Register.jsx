import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert, Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { url } from './../utils/auth';
import axios from 'axios';
import './../App.css';

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            data: {userName: '', password: '', passwordConfirm: ''},
            showError: false,
            showSuccess: false,
            message: ''
        };
        this.Registration = this.Registration.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    Registration(e) {
        if (this.checkIfFieldsAreEmpty() && this.checkIfPasswordsAreEqual() && this.checkPasswordMinLength()) {
            e.preventDefault();
            const { data } = this.state;
            axios.post(url + 'users/add', data)
                .then((result) => {
                    this.setState({showSuccess: true});           
                })
                .catch(err => {
                    this.setState({showError: true});
                    this.setState({message: "Има профил със същото потребителско име."});
                });
        }
        else { 
            this.validate(e);
        }
        
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

    validate(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({validated: true});
    }

    checkIfFieldsAreEmpty() {
        if (this.state.data.userName !== '' && this.state.data.password !== '' && this.state.data.passwordConfirm !== '') {
            return true;
        }
        return false;
    }

    checkIfPasswordsAreEqual() {
        if (this.state.data.password === this.state.data.passwordConfirm) {
            return true;
        }
        this.setState({showError: true});
        this.setState({message: "Паролите не съвпадат!"});
        return false;
    }

    checkPasswordMinLength() {
        if (this.state.data.password.length >= 6) {
            return true;
        }
        this.setState({showError: true});
        this.setState({message: "Паролата трябва да е минимум 6 символа!"});
        return false;
    }

    showError(message) {
        if (this.state.showError) {
            window.scrollTo({top: 0, behavior: 'smooth'});
            return (
                <Alert className="alert" show={this.state.showError} variant="danger" onClose={() => this.setState({ showError: false })} dismissible>
                    <Alert.Heading>Грешка!</Alert.Heading>
                    <p>
                        {message}
                    </p>
                </Alert>
            );
        }
    }

    showSuccess() {
        if (this.state.showSuccess) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return (
                <Alert className="alert" show={this.state.showSuccess} variant="success" onClose={() => this.setState({ showSuccess: false })} dismissible>
                    <Alert.Heading>Успешна регистрация!</Alert.Heading>
                    <p>
                        Успешно се регистрирахте! Сега може да влезете във вашия акаунт!
                    </p>
                </Alert>
            );
        }
    }

    render() {
        const { validated } = this.state;
        const { data } = this.state;
        let termsClose = () => this.setState({termsShow: false});

        if (sessionStorage.getItem("userData") !== null) {
            return <Navigate to="/profile" />
        }

        return (
            <div>
                {this.showError(this.state.message)}
                {this.showSuccess()}
                <Form noValidate validated={validated} onSubmit={this.Registration} className="form">
                    <h1 className="item">Регистрация</h1>
                    <Row className="mb-3 item">
                        <Form.Group as={Col} md="7" controlId="validationCustomUsername">
                            <Form.Label>Потребителско име</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Потребителско име"
                                    aria-describedby="inputGroupPrepend"
                                    name="userName"
                                    value={data.userName}
                                    onChange={this.onChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Моля, напишете потребителско име.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="7" controlId="validationCustom04">
                            <Form.Label>Парола</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Парола"
                                name="password"
                                value={data.password}
                                onChange={this.onChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Моля, напишете парола.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="7" controlId="validationCustom05">
                            <Form.Label>Повтори паролата</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Повтори паролата"
                                name="passwordConfirm"
                                value={data.passwordConfirm}
                                onChange={this.onChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Моля, повторете паролата.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="submit" className="item-button">Регистрирай се</Button>
                </Form>
            </div>
        );
    }
}