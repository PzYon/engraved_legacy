import { Request } from "express-serve-static-core";
import { ServiceFactory } from "./services/ServiceFactory";

export interface IRequest extends Request {
  serviceFactory: ServiceFactory;
}
