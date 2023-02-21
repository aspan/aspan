import {Flow} from "./generated/jar-resources/Flow";

export class PublicFlow extends Flow {
    get publicServerSideRoutes() {
        return [
            {
                path: '/signup',
                action: this.action
            }
        ];
    }
}