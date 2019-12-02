import React from 'react';
import Firebase from './Firebase';

const FirebaseContext = React.createContext<Firebase>(new Firebase());

export interface FirebaseProps {
    firebase?: Firebase
}

export const withFirebase = <P extends object>(Component: React.ComponentType<P>) =>
    class WithFirebase extends React.Component<P & FirebaseProps> {
        render() {
            const props = this.props;
            return (
                <FirebaseContext.Consumer>
                    {(firebase: Firebase) => <Component {...props} firebase={firebase}/>}
                </FirebaseContext.Consumer>
            )
        }
    };


export default FirebaseContext