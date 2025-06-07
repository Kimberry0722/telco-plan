import type { PlanType } from "../constants/plan-type.enum";

export interface Plan {
  id: number;
  name: string;
  type: PlanType;
  dataLimit: string;
  dataSpeed: string;  
  currency: string;
  price: number;
  validity: string;  
  descriptions: string[];
}
