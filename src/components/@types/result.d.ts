import { Schedule, WaveResult } from "./response";

interface Result {
  salmon_id: number;
  boss_counts: number[];
  boss_kill_counts: number[];
  danger_rate: number;
  golden_ikura_num: number;
  ikura_num: number;
  job_result: JobResult;
  members: string[];
  players: PlayerResult[];
  no_night_waves: boolean;
  play_time: Date;
  schedule: Schedule;
  waves: WaveResult[];
}

interface PlayerResult {
  boss_kill_counts: number[];
  dead_count: number;
  golden_ikura_num: number;
  ikura_num: number;
  grade_id: number;
  grade_point: number;
  help_count: number;
  name: string;
  nsaid: string;
  special_counts: number[];
  special_id: number;
  weapon_list: number[];
}

interface WaveResult {
  water_level: number;
  event_type: number;
  golden_ikura_num: number;
  ikura_num: number;
  quota_num: number;
  golden_ikura_pop_num: number;
}
