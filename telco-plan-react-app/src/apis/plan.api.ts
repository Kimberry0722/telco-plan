import axios from 'axios';
import type { Plan } from '../models/plan.model';


export const PlanApi = {
  async getAllPlans(): Promise<Plan[]> {
    const response = await axios.get<Plan[]>('/api/plan');
    return response.data;
  },

  async getPlanById(id: number): Promise<Plan> {
    const response = await axios.get<Plan>(`/api/plan/${id}`);
    return response.data;
  },
};