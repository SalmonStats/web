import { PlayerRank } from "./common";

export namespace SalmonStats {
  /**
   * シフトごとの統計
   */
  export interface ShiftStats {
    job_results: JobResult;
    wave_results: WaveRank[][];
    boss_results: BossRank[];
    weapon_results: WeaponRank[];
    grade_results: GradeRank[];
  }

  /**
   * シフトごとの失敗理由統計
   */
  export interface JobResult {
    /** 成功回数 */
    is_clear: number;
    /** 失敗回数 */
    is_failure: number;
    /** 失敗したWAVE */
    is_failure_waves: FailureWave[];
  }

  /**
   * シフトごとの失敗理由詳細
   */
  export interface FailureWave {
    /** 失敗したWAVE */
    failure_wave: number;
    /** 時間切れ回数 */
    time_limit: number;
    /** ゼンメツ回数 */
    wipe_out: number;
  }

  /**
   * 潮位とイベントの統計
   */
  export interface WaveRank {
    /** 金イクラ数 */
    golden_ikura_num: number;
    /** イクラ数 */
    ikura_num: number;
    /** 回数 */
    count: number;
    /** イベントID */
    event_type?: number;
    /** 潮位ID */
    water_level?: number;
    /** ランク */
    rank?: number;
    /** プレイヤー名 */
    names?: string[];
  }

  /**
   * オオモノシャケ統計
   */
  export interface BossRank {
    /** 出現オオモノ合計 */
    boss_counts: number;
    /** 討伐オオモノ合計 */
    boss_kill_counts: number;
    /** 出現オオモノ最高値 */
    boss_counts_max: number;
    /** 討伐オオモノ最高値 */
    boss_kill_counts_max: number;
  }

  /**
   * 支給ブキランキング
   */
  export interface WeaponRank extends PlayerRank {
    /** 支給されたブキの数 */
    supplied_weapon_counts: number;
  }

  /**
   * 評価レートランキング
   */
  export interface GradeRank extends PlayerRank {
    /** 評価レート */
    grade_point_max: number;
  }

  /**
   * Salmon Statsに登録されているプレイヤー情報
   */
  export interface Player {
    /** プレイヤーID */
    nsaid: string;
    /** プレイヤー名 */
    nickname: string;
    /** サムネイルURL */
    thumbnail_url: string;
    /** バイト回数 */
    shifts_worked: number;
    /** クリア回数 */
    is_clear: number;
    /** 失敗回数 */
    is_failure: number;
    /** 認証済みかどうか */
    is_verified: boolean;
    /** フレンドコードが公開設定かどうか */
    is_friend_code_public: boolean;
    /** TwitterIDが公開設定かどうか */
    is_twitter_id_public: boolean;
    /** 特待生どうか */
    is_imperial_scholars: boolean;
    /** 総合金イクラ納品数 */
    golden_ikura_num: number;
    /** 総合イクラ獲得数 */
    ikura_num: number;
    /** 総合クマサンポイント獲得数 */
    kuma_point: number;
    /** 最高評価 */
    grade_point: number;
    /** ステージごとの最高納品数記録 */
    stage_results: Results[];
  }

  /**
   * Salmon Stats登録プレイヤーのステージごとの記録
   */
  export interface Results {
    /** ステージID */
    stage_id: number;
    /** 夜記録 */
    night: Result;
    /** 昼記録 */
    nightless: Result;
  }

  /**
   * ステージごとのリザルト詳細
   */
  export interface Result {
    /** ステージID */
    stage_id: number;
    /** 夜イベントを含むかどうか */
    nightless: boolean;
    /** 最高評価 */
    grade_point_max: number;
    /** バイト回数 */
    shifts_worked: number;
    /** 合計クマサンポイント獲得数 */
    kuma_point_total: number;
    /** 個人記録 */
    player_results: Record;
    /** チーム記録 */
    team_results: Record;
  }

  /**
   * ステージごとの記録
   */
  export interface Record {
    /** 金イクラ納品数 */
    golden_ikura_num: number;
    /** イクラ獲得数 */
    ikura_num: number;
  }

  /**
   * 総合納品数記録
   */
  export interface TotalRank {
    /** 金イクラ納品数 */
    golden_ikura_num: number;
    /** 順位 */
    rank: number;
    /** メンバーIDリスト */
    members: string[];
    /** プレイヤー名リスト */
    names: string[];
  }

  enum Status {
    Updated = "updated",
    Created = "created",
  }

  export interface UploadResults {
    results: UploadResult[];
  }

  export interface UploadResult {
    salmon_id: number;
    status: Status;
  }
}
