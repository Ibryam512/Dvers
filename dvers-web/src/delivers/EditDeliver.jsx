import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { url } from './../utils/auth';
import axios from 'axios'; 

export class EditDeliver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            data: { id: this.props.deliver.id, name: this.props.deliver.name, mesaureUnit: this.props.deliver.mesaureUnit, quantity: this.props.deliver.quantity, price: this.props.deliver.price, delivererId: this.props.deliver.delivererId, delivererUserName: this.props.deliver.delivererUserName, deliverDate: this.props.deliver.delivererDate},
          };
        this.editDeliver = this.editDeliver.bind(this);
        this.deleteDeliver = this.deleteDeliver.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    editDeliver(e) {
        e.preventDefault();
        const { data } = this.state;
        axios.put(url + 'delivers/edit/' + data.id, data)
            .then(() => {
                this.props.onHide();
            })
            .catch(err => {
                alert(err);
            });            
    }

    deleteDeliver(e) {
        e.preventDefault();
        axios.delete(url + 'delivers/delete/' + this.props.deliver.id);
        window.location.reload();
        return <Navigate to='/' />
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
                    Редактирай доставка
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12}>
                            <Form onSubmit={this.editDeliver}>
                                <Form.Group controlId="DeliverTitle" className="add-edit-deliver">
                                    <Form.Label>Име</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="name" 
                                    placeholder="Име"
                                    value={data.name}
                                    onChange={this.onChange}
                                    required
                                    />
                                </Form.Group>                                
                                 <Form.Group controlId="DeliverQuantity" className="add-edit-deliver">
                                    <Form.Label>Количество</Form.Label>
                                    <Form.Control 
                                    type="number" 
                                    name="quantity"
                                    placeholder="Количество"
                                    value={data.quantity}
                                    onChange={this.onChange}
                                    required
                                    />
                                 </Form.Group>
                                <Form.Group controlId="DeliverMeasureUnit" className="add-edit-deliver">
                                    <Form.Label>Мерна единица</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="mesaureUnit"
                                    placeholder="Мерна единица"
                                    value={data.mesaureUnit}
                                    onChange={this.onChange}
                                    required
                                    />
                                </Form.Group>
                                <Form.Group controlId="DeliverPrice" className="add-edit-post">
                                    <Form.Label>Цена (в лева)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        placeholder="Цена"
                                        value={data.price}
                                        onChange={this.onChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="DeliverDate" className="add-edit-post">
                                    <Form.Label>Дата на доставка</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="deliverDate"
                                        placeholder="Дата"
                                        value={data.deliverDate}
                                        onChange={this.onChange}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" className="add-edit-deliver">
                                    Добави
                                </Button>
                                <Modal.Footer>
                                    <Button variant="outline-danger" onClick={this.deleteDeliver}>Изтрий</Button>
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