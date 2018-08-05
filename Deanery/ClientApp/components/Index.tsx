import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Logout } from './Logout'
const serverUri = "/api/";


export class Index extends React.Component<RouteComponentProps<{}>> {
    constructor(props: any) {
        super(props);
    }
  

    public render() {
        return <div>
            Witamy w stronie dla zalogowanych użytkowników
            <Logout />
        </div>;
    }
}





