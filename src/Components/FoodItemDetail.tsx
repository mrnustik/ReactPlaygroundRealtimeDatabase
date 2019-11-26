import React from "react";
import { FoodItem } from "../Data";

interface FoodItemDetailProps {
    item?: FoodItem
}

class FoodItemDetail extends React.Component<FoodItemDetailProps> {
    render() {
        if (this.props.item != null) {
            return (
                <div>
                    Name: {this.props.item.name} <br />
                    Added by user: {this.props.item.addedByUser} <br />
                    Completed <input type="checkbox" checked={this.props.item.completed} />
                </div>
            )
        } else {
            return (
                <span>Vyberte polozku</span>
            )
        }
    }
}


export default FoodItemDetail;