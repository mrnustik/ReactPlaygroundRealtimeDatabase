import React from 'react';
import './App.css';
import { withFirebase, FirebaseProps } from './Components/FirebaseContext';
import { FoodItem } from './Data';
import FoodItemList from './Components/FoodItemList';
import FoodItemDetail from './Components/FoodItemDetail';
import FoodItemEdit from './Components/FoodItemEdit';


interface AppState {
  items: FoodItem[],
  selectedItem?: FoodItem,
  editedItem?: FoodItem
}

class App extends React.Component<FirebaseProps, AppState> {

  constructor(props: FirebaseProps) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    if(this.props.firebase == null) return;
    this.props.firebase.getGroceryItemsReference().on('value', (snapshot) => {
      let value = snapshot.val();
      let items = Object.keys(value).map(key => {
        let foodItem : FoodItem = {
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
      selectedItem: item,
      editedItem: item
    });
  }

  private createNewItem() {
    this.setState({
      ...this.state,
      editedItem: undefined
    });
  }

  render() {
    return (
      <div className="App">
        <FoodItemList items={this.state.items}
                      onItemSelected={item => this.selectItem(item)}/>
        <FoodItemDetail item={this.state.selectedItem} />
        <FoodItemEdit editedItem={this.state.editedItem} />
        <input type="button" onClick={this.createNewItem.bind(this)} value="Craete new item"/>
      </div>
    )
  }
}
export default withFirebase(App);
