import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withFirebase, FirebaseProps } from './Components/FirebaseContext';
import { FoodItem } from './Data';
import FoodItemList from './Components/FoodItemList';
import FoodItemDetail from './Components/FoodItemDetail';


interface AppState {
  items: FoodItem[],
  selectedItem?: FoodItem
}

class App extends React.Component<FirebaseProps, AppState> {

  constructor(props: FirebaseProps) {
    super(props);
    this.state = {
      items: [],
      selectedItem: undefined
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
        items: items
      });
    });
  }

  private selectItem(item: FoodItem) {
    this.setState({
      ...this.state,
      selectedItem: item
    });
  }

  render() {
    let name = "";
    for(let food of this.state.items) {
      name += food.name;
    }
    return (
      <div className="App">
        <FoodItemList items={this.state.items}
                      onItemSelected={item => this.selectItem(item)}/>
        <FoodItemDetail item={this.state.selectedItem} />
      </div>
    )
  }
}
export default withFirebase(App);
