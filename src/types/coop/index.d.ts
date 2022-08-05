/**
 * バイトリザルト
 */
export namespace CoopResult {
  /*
   * リザルト概要
   */
  export interface Result {
    /** バイトID */
    salmon_id: number;
    /** オオモノ出現数 */
    boss_counts: number[];
    /** オオモノ討伐数 */
    boss_kill_counts: number[];
    /** キケン度 */
    danger_rate: number;
    /** 金イクラ数 */
    golden_ikura_num: number;
    /** イクラ数 */
    ikura_num: number;
    /** バイト結果 */
    job_result: JobResult;
    /** メンバーID */
    members: string[];
    /** プレイヤーリザルト */
    players: PlayerResult[];
    /** 夜WAVEを含むかどうか */
    no_night_waves: boolean;
    /** プレイ時間 */
    play_time: Date;
    /** シフト情報 */
    schedule: Schedule;
    /** WAVEリザルト */
    waves: WaveResult[];
  }

  /**
   * プレイヤーリザルト
   */
  export interface PlayerResult {
    /** オオモノ討伐数 */
    boss_kill_counts: number[];
    /** 被救助数 */
    dead_count: number;
    /** 金イクラ納品数 */
    golden_ikura_num: number;
    /** イクラ獲得数 */
    ikura_num: number;
    /** 評価ID */
    grade_id: number;
    /** 評価レート */
    grade_point: number;
    /** 救助数 */
    help_count: number;
    /** プレイヤー名 */
    name: string;
    /** プレイヤーID */
    nsaid: string;
    /** スペシャル使用回数 */
    special_counts: number[];
    /** スペシャルID */
    special_id: number;
    /** 支給ブキIDリスト */
    weapon_list: number[];
  }

  /**
   * WAVEリザルト
   */
  export interface WaveResult {
    /** 潮位ID */
    water_level: number;
    /** イベントID */
    event_type: number;
    /** 金イクラ数 */
    golden_ikura_num: number;
    /** イクラ数 */
    ikura_num: number;
    /** ノルマ数 */
    quota_num: number;
    /** 金イクラドロップ数 */
    golden_ikura_pop_num: number;
  }

  /**
   * バイトリザルト
   */
  export interface JobResult {
    /** クリアしたか */
    is_clear: boolean;
    /** 失敗理由 */
    failure_reason?: string;
    /** 失敗したWAVE数  */
    failure_wave?: number;
  }

  /**
   * スケジュール
   */
  export interface Schedule {
    /** 開始時刻 */
    start_time: string;
    /** ステージID */
    stage_id: number;
    /** 終了時刻 */
    end_time: string;
    /** レアブキID */
    rare_weapon?: number;
    /** 支給ブキIDリスト */
    weapon_list: number[];
  }
}
