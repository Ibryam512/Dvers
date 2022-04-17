import React, { Component } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { url } from './../utils/auth';
import axios from 'axios';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { EditDeliver } from './EditDeliver';

export function GetDeliverId() {
    const { id } = useParams();

    return (
        <div>
            <Deliver id={id} />
        </div>
    );
}

export class Deliver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deliver: { id: this.props.id, name: "", mesaureUnit: "", quantity: 0, price: 0, delivererId: 0, delivererUserName: "", deliverDate: ""},
            editDeliverShow: false
        };
    }

    getDeliver() {
        axios.get(url + 'delivers/' + this.props.id)
        .then(response => {
            this.setState({deliver: response.data});
        })
        .catch(err => {
            alert(err);
        })
    }

    componentDidMount() {
        this.getDeliver();
     }
 
     componentDidUpdate() {
        this.getDeliver();
     }

    render() {
        const { deliver } = this.state;
        let editDeliverClose = () => this.setState({editDeliverShow: false});
        return (
            <div className="post">
                <h1 className="post-item">Име: {deliver.name}</h1>
                <p className="post-item">Количество: {deliver.quantity}</p>
                <p className="post-item">Мерна единица: <b>{deliver.mesaureUnit}</b></p>
                <p className="post-item">Цена: <b>{deliver.price}</b></p>
                <p className="post-item">Доставчик: <b>{deliver.delivererUserName}</b></p>
                <p className="post-item">Дата на доставка: <b>{deliver.deliverDate}</b></p>
                <ButtonToolbar>
                    <Button variant="outline-primary" className="button-edit" onClick={() => this.setState({ editDeliverShow: true })}>Редактирай</Button>
                    <EditDeliver show={this.state.editDeliverShow}
                        onHide={editDeliverClose}
                        deliver={deliver} />
                </ButtonToolbar>
            </div>
        );
    }
}