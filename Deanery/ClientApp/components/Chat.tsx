import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Logout } from './Logout'
const serverUri = "/api/";


export class Chat extends React.Component<RouteComponentProps<{}>> {
    constructor(props: any) {
        super(props);
    }


    public render() {
        return <div className="container">
            <div className="row">&nbsp;</div>
            <div className="row">
                <div className="col-6">&nbsp;</div>
                <div className="col-6">
                    User..........<input type="text" id="userInput" />
                    <br />
                    Message...<input type="text" id="messageInput" />
                    <input type="button" id="sendButton" value="Send Message" />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-6">&nbsp;</div>
                <div className="col-6">
                    <ul id="messagesList"></ul>
                </div>
            </div>
        </div>;
    }
}





