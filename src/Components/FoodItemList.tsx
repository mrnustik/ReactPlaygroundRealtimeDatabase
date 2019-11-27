import React from "react";
import { FoodItem } from "../Data";

interface FoodItemListProps {
    items: FoodItem[];
    onItemSelected: ((item: FoodItem) => void);
}

class FoodItemList extends React.Component<FoodItemListProps> {
    render() {
        const renderedItems = this.props.items.map(item => 
            (<li key={item.key} onClick={()=>this.props.onItemSelected(item)}>{item.name}</li>)
        );

        return (
            <ul>
                {renderedItems}
            </ul>
        )
    }
}


export default FoodItemList;