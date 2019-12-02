import React from "react";
import {FoodItem} from "../Data";
import {ListGroup} from 'react-bootstrap';
import '../App.css';
import {FirebaseProps} from "./FirebaseContext";

interface FoodItemListProps extends FirebaseProps {

    onItemSelected: ((item: FoodItem) => void);
}

interface FoodItemListState {
    items: FoodItem[]
}

class FoodItemList extends React.Component<FoodItemListProps, FoodItemListState> {
    constructor(props: FoodItemListProps) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount(): void {
        this.props.firebase && this.props.firebase.getGroceryItemsReference().on('value', (snapshot) => {
            const value = snapshot.val();
            const items = Object.keys(value).map(key => {
                let foodItem: FoodItem = {
                    id: key,
                    ...value[key]
                };
                return foodItem;
            }).slice();
            this.setState({
                items: items
            });
        });
    }

    render() {
        const renderedItems = this.state.items.map(item =>
            (<ListGroup.Item key={item.name} action
                             onClick={() => this.props.onItemSelected(item)}>{item.name}</ListGroup.Item>)
        );
        return (
            <ListGroup className="item-list" variant="flush">
                {renderedItems}
            </ListGroup>
        )
    }
}


export default FoodItemList;