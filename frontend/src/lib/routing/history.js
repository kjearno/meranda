import { createBrowserHistory } from "history";
import { config } from "@src/config";

export const history = createBrowserHistory({ basename: config.basename });
