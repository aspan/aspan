import {Flow, NavigationParameters} from "@vaadin/flow-frontend";

interface PublicFlowRoute {
    action: (params: NavigationParameters) => Promise<HTMLRouterContainer>;
    path: string;
}

export declare class PublicFlow extends Flow {
    get publicServerSideRoutes(): [PublicFlowRoute];
}