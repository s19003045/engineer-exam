import type { RoleLevel } from "../../types/domain";

export interface ScoreInput {
  questionScore: number;
  weight: number;
}

export const roleProfiles: Record<RoleLevel, { traditional: number; ai: number }> = {
  Junior: { traditional: 0.8, ai: 0.2 },
  Senior: { traditional: 0.6, ai: 0.4 },
  Lead: { traditional: 0.5, ai: 0.5 },
};

export function calcWeightedTotal(scores: ScoreInput[]): number {
  const ws = scores.reduce((acc, s) => acc + s.weight, 0);
  if (!ws) return 0;
  return scores.reduce((acc, s) => acc + s.questionScore * s.weight, 0) / ws;
}

export function applyRoleProfile(
  role: RoleLevel,
  traditionalScore: number,
  aiScore: number,
): number {
  const profile = roleProfiles[role];
  return traditionalScore * profile.traditional + aiScore * profile.ai;
}
