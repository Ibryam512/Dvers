import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { AddDeliver } from './AddDeliver';
import { ErrorPage } from './../ErrorPage';
import { url } from '../utils/auth';
import axios from 'axios';

export class Delivers extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            delivers: [],
            addPostShow: false
          };

          this.deleteDeliver = this.deleteDeliver.bind(this);
    }

    refreshDelivers() {
        let logged = sessionStorage.getItem("logged");
        if (!logged || logged == null) {
            return <Navigate to='/login' />
        }
        axios.get(url + 'delivers')
        .then(response => {
            this.setState({delivers: response.data});
        })
        .catch(err =>{
            alert(err);
        });
    }

    deleteDeliver(id) {
        axios.delete(url + 'delivers/delete' + id);
    }

    componentDidMount() {
        this.refreshDelivers();
     }
 
     componentDidUpdate() {
        this.refreshDelivers();
     }

     addRows(deliver) {
        const path = `/delivers/${deliver.id}`;
        return (
            <tr>
                <td>{deliver.id}</td>
                <td>{deliver.name}</td>
                <td>{deliver.quantity}</td>
                <td>{deliver.mesaureUnit}</td>
                <td>{deliver.price}</td>
                <td>
                    <Link to={path} className="link">Детайли</Link>
                </td>
            </tr>
        );
     }

    render() {
        let addPostClose = () => this.setState({addPostShow: false});
        return (
            <div>
                <Table striped bordered hover className="tables">
                    <thead>
                        <tr>
                            <th>Инд. номер</th>
                            <th>Име</th>
                            <th>Количество</th>
                            <th>Мерна единица</th>
                            <th>Цена</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.delivers.map(deliver => this.addRows(deliver))}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button style={{marginLeft: '5%'}} variant="primary" onClick={() => this.setState({addPostShow: true})}>Добави доставка</Button>
                    <AddDeliver show={this.state.addPostShow}
                    onHide={addPostClose}/>
                </ButtonToolbar>
            </div>
        );
    }
}