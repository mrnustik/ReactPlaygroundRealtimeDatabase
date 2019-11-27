import React from "react";
import { FoodItem } from "../Data";
import { Table } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faEdit);

interface FoodItemDetailProps {
    item?: FoodItem,
    editItemCallback: ((item: FoodItem) => void);
    deleteItemCallback: ((item: FoodItem) => void);
}

class FoodItemDetail extends React.Component<FoodItemDetailProps> {
    render() {
        if (this.props.item != null) {
            return (
                <div>
                    <h2>
                        Item detail
                    </h2>
                    <FontAwesomeIcon icon="edit" onClick={() => this.props.item && this.props.editItemCallback(this.props.item)} />
                        <FontAwesomeIcon icon="trash" onClick={() => this.props.item && this.props.deleteItemCallback(this.props.item)} />
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td> {this.props.item.name}</td>
                            </tr>
                            <tr>
                                <td> Added by user</td>
                                <td>{this.props.item.addedByUser}</td>
                            </tr>
                            <tr>
                                <td>
                                    Completed</td>
                                <td>
                                    <input type="checkbox"
                                        checked={this.props.item.completed}
                                        readOnly />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
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