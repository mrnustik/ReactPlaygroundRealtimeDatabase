import React from "react";
import { FoodItem } from "../Data";
import { ListGroup } from 'react-bootstrap';
import '../App.css';

interface FoodItemListProps {
    items: FoodItem[];
    onItemSelected: ((item: FoodItem) => void);
}

class FoodItemList extends React.Component<FoodItemListProps> {
    render() {
        const renderedItems = this.props.items.map(item =>
            (<ListGroup.Item key={item.key} action onClick={() => this.props.onItemSelected(item)}>{item.name}</ListGroup.Item>)
        );

        return (
            <ListGroup className="item-list" variant="flush">
                {renderedItems}
            </ListGroup>
        )
    }
}


export default FoodItemList;