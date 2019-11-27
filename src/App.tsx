import React from 'react';
import { withFirebase, FirebaseProps } from './Components/FirebaseContext';
import { FoodItem } from './Data';
import FoodItemList from './Components/FoodItemList';
import FoodItemDetail from './Components/FoodItemDetail';
import FoodItemEdit from './Components/FoodItemEdit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container , Navbar, Col, Row, Modal } from 'react-bootstrap';

interface AppState {
  items: FoodItem[],
  selectedItem?: FoodItem,
  editedItem?: FoodItem,
  showModal: boolean
}

class App extends React.Component<FirebaseProps, AppState> {

  constructor(props: FirebaseProps) {
    super(props);
    this.state = {
      items: [],
      showModal: false
    };
  }

  componentDidMount() {
    if (this.props.firebase == null) return;
    this.props.firebase.getGroceryItemsReference().on('value', (snapshot) => {
      let value = snapshot.val();
      let items = Object.keys(value).map(key => {
        let foodItem: FoodItem = {
          key: key,
          ...value[key]
        };
        return foodItem;
      });
      this.setState({
        items: items,
        selectedItem: undefined,
        editedItem: undefined
      });
    });
  }

  private selectItem(item: FoodItem) {
    this.setState({
      ...this.state,
      selectedItem: item
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
    this.setState({
      ...this.state, 
      editedItem: item,
      showModal: true
    });
  }

  private deleteItem(item: FoodItem) {
    let result = window.confirm(`Do you really want to delete item ${item.name}?`);
    if(result) {
      if(this.props.firebase != null) {
        this.props.firebase.removeItem(item.key);
      }
    }
  }
 
  render() {
    return (
      <div className="App">
        <Navbar bg="dark" expand="lg">
          <Navbar.Brand href="#">Grocr</Navbar.Brand>
          <Button onClick={this.createNewItem.bind(this)} variant="outline-success">
            Add new item
          </Button>
        </Navbar>
        <Container fluid>
          <Row>
            <Col>
              <FoodItemList items={this.state.items} onItemSelected={item => this.selectItem(item)} />
            </Col>
            <Col>
              <FoodItemDetail item={this.state.selectedItem} editItemCallback={item => this.editItem(item)} deleteItemCallback={item => this.deleteItem(item) } />
            </Col>
          </Row>
        </Container>
        <Modal show={this.state.showModal} onHide={() => this.setState({ ...this.state, showModal: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Edit item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FoodItemEdit editedItem={this.state.editedItem} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
export default withFirebase(App);
