import React from "react";
import { FoodItem } from "../Data";
import { FirebaseProps, withFirebase } from "./FirebaseContext";

interface FoodItemEditProps extends FirebaseProps {
    editedItem?: FoodItem;
}

interface FoodItemEditState {
    editedItem: FoodItem;
}

class FoodItemEdit extends React.Component<FoodItemEditProps, FoodItemEditState> {    

    static getDerivedStateFromProps(props: FoodItemEditProps, current_state: FoodItemEditState) {
        if(props.editedItem) {
            if(props.editedItem.key == current_state.editedItem.key) 
                return current_state;
            else
                return {
                    editedItem: props.editedItem
                };
        } else if(current_state.editedItem.key !== ""){
            return { 
                editedItem: {
                    key: "",
                    name: "",
                    addedByUser: "react@app.js",
                    completed: false
                }
            }
        }
        return null;
      }

    constructor(props: Readonly<FoodItemEditProps>){
        super(props);
        this.state = { 
            editedItem: {
                key: "",
                name: "",
                addedByUser: "react@app.js",
                completed: false
            }
        }
    }

    private saveItem() {
        if(this.props.firebase != null) {
            this.props.firebase.saveOrUpdateItem(this.state.editedItem.key,
                this.state.editedItem.name,
                this.state.editedItem.addedByUser,
                this.state.editedItem.completed);
            this.resetEditedItem();
        }
    }

    private resetEditedItem() {
        this.setState({
            editedItem: {
                key: "",
                name: "",
                addedByUser: "react@app.js",
                completed: false
            }
        });
    }

    private nameChanged(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            editedItem : {
                ...this.state.editedItem,
                name: event.currentTarget.value
            }
        })
    }

    private completedChanged(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            editedItem : {
                ...this.state.editedItem,
                completed: event.currentTarget.checked
            }
        })
    }

    render() {
        return (<div>
            <form>
                <div>
                    <label htmlFor="nameInput">Name: </label>
                    <input id ="nameInput" type="text" value={this.state.editedItem.name} onChange={this.nameChanged.bind(this)}/> 
                </div>
                <div>
                    <label htmlFor="completedCheckbox">Completed: </label>
                    <input id="completedCheckbox" type="checkbox" checked={this.state.editedItem.completed} onChange={this.completedChanged.bind(this)}/> <br/>
                </div>
                <input type="button" onClick={this.saveItem.bind(this)} value="Save"/>
            </form>
        </div>)
    }
}

export default withFirebase(FoodItemEdit);