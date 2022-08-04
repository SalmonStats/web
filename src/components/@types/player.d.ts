export namespace SalmonStats {
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

  export interface Results {
    /** ステージID */
    stage_id: number;
    /** 夜記録 */
    night: Result;
    /** 昼記録 */
    nightless: Result;
  }

  interface Result {
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

  interface Record {
    /** 金イクラ納品数 */
    golden_ikura_num: number;
    /** イクラ獲得数 */
    ikura_num: number;
  }
}
