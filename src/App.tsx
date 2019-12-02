import React from 'react';
import {withFirebase, FirebaseProps} from './Components/FirebaseContext';
import {FoodItem} from './Data';
import FoodItemList from './Components/FoodItemList';
import FoodItemDetail from './Components/FoodItemDetail';
import FoodItemEdit from './Components/FoodItemEdit';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Navbar, Col, Row, Modal} from 'react-bootstrap';
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

const faker = require('faker');

library.add(faPlusCircle);

interface AppState {
    selectedItem?: FoodItem,
    editedItem?: FoodItem,
    showModal: boolean
}

class App extends React.Component<FirebaseProps, AppState> {

    constructor(props: FirebaseProps) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    private selectItem(item: FoodItem) {
        const clone = Object.assign({}, item);
        this.setState({
            ...this.state,
            selectedItem: clone
        });
    }

    private createNewItem() {
        this.setState({
            ...this.state,
            editedItem: undefined,
            showModal: true
        });
    }

    private editItem(item: FoodItem) {
        const clone = Object.assign({}, item);
        this.setState({
            ...this.state,
            editedItem: clone,
            showModal: true
        });
    }

    private deleteItem(item: FoodItem) {
        let result = window.confirm(`Do you really want to delete item ${item.name}?`);
        if (result) {
            if (this.props.firebase != null) {
                this.props.firebase.removeItem(item.id);
            }
        }
    }

    private addMutltipleItems() {
        for (let i = 0; i < 10; i++) {
            const name = faker.name.firstName();
            const email = faker.internet.email();
            const completed = false;
            this.props.firebase && this.props.firebase.saveOrUpdateItem("", name, email, completed);
        }
    }

    render() {
        let date = new Date();
        let timestamp = date.getTime();
        return (
            <div className="App">
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Navbar.Brand href="#">Grocr</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Button onClick={this.createNewItem.bind(this)} variant="outline-success">
                            <FontAwesomeIcon icon="plus-circle"/>
                            Add new item
                        </Button>
                        <Button onClick={() => this.addMutltipleItems()}>
                            <FontAwesomeIcon icon="plus-circle"/>
                            Add 10 fake items
                        </Button>
                    </Navbar.Collapse>
                </Navbar>
                <Container fluid className="app-container">
                    <Row>
                        <Col xs={12} sm={3}>
                            <FoodItemList key={timestamp} firebase={this.props.firebase} onItemSelected={item => this.selectItem(item)}/>
                        </Col>
                        <Col xs={12} sm={9}>
                            <FoodItemDetail item={this.state.selectedItem}
                                            editItemCallback={item => this.editItem(item)}
                                            deleteItemCallback={item => this.deleteItem(item)}/>
                        </Col>
                    </Row>
                </Container>
                <Modal show={this.state.showModal} onHide={() => this.setState({...this.state, showModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FoodItemEdit editedItem={this.state.editedItem}
                                      onFinished={() => this.setState({...this.state, showModal: false})} />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default withFirebase(App);
