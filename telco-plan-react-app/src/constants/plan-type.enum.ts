export const PlanType = {
  PREPAID: 'PREPAID',
  POSTPAID: 'POSTPAID',
} as const;

export type PlanType = (typeof PlanType)[keyof typeof PlanType];
