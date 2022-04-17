import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { EditProfile } from './EditProfile';
import { url } from './../utils/auth';
import axios from 'axios';


export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: { id: 0, userName: ""},
            editUserShow: false
        }
    }

    getUser() {
        let userName = sessionStorage.getItem("userName");
        axios.get(url + `users/byUserName/${userName}`)
        .then(response => {
            this.setState({profile: response.data});
        })
    }

    componentDidMount() {
        this.getUser();
    }

    componentDidUpdate() {
        this.getUser();
    }
	
    logOut() {
        sessionStorage.removeItem("logged");
        sessionStorage.removeItem("id");
        window.location.reload();
        <Navigate to="/login" />
    }
    
    render() {
        let logged = JSON.parse(sessionStorage.getItem("logged"));
        if (!logged || logged === null) {
            return <Navigate to='/login'/>
        }
        let editUserClose = () => this.setState({editUserShow: false});
        return (
            <div class="row py-5 px-4">
                <div class="col-md-8 mx-auto">
                    <div class="bg-white shadow rounded overflow-hidden">
                        <div class="bg-light p-4 text-center">
                            <h4 class="mt-0 mb-0">Потребителско име: {this.state.profile.userName}</h4>
                        </div>
                        <ButtonToolbar>
                            <Button variant="outline-primary" onClick={() => this.setState({ editUserShow: true })}>Редактирай</Button>
                            <EditProfile show={this.state.editUserShow}
                                onHide={editUserClose}
                                user={this.state.profile} />
                            </ButtonToolbar>
                            <Button variant="outline-secondary" style={{float: "right", marginLeft: "10%"}} onClick={this.logOut}>Изход</Button>
                        </div>
                    </div>
                </div>
        );
    }

}