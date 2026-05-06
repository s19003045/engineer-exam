import type { RoleLevel } from "../../types/domain";

export const roleRubricProfiles: Record<RoleLevel, { correctness: number; maintainability: number; aiMaturity: number }> = {
  Junior: { correctness: 0.6, maintainability: 0.3, aiMaturity: 0.1 },
  Senior: { correctness: 0.45, maintainability: 0.35, aiMaturity: 0.2 },
  Lead: { correctness: 0.35, maintainability: 0.35, aiMaturity: 0.3 },
};
