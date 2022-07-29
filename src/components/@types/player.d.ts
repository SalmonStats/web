export interface Player {
  nsaid: string;
  nickname: string;
  thumbnail_url: string;
  shifts_worked: number;
  is_clear: number;
  is_failure: number;
  is_verified: boolean;
  is_friend_code_public: boolean;
  is_twitter_id_public: boolean;
  is_imperial_scholars: boolean;
  golden_ikura_num: number;
  ikura_num: number;
  kuma_point: number;
  grade_point: number;
  stage_results: StageResult[];
}

interface StageResult {
  stage_id: number;
  night: Result;
  nightless: Result;
}

interface Result {
  stage_id: number;
  nightless: boolean;
  grade_point_max: number;
  shifts_worked: number;
  kuma_point_total: number;
  player_results: EggsResult;
  team_results: EggsResult;
}

interface EggsResult {
  golden_ikura_num: number;
  ikura_num: number;
}
