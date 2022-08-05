/**
 * ページネーションで取得するレスポンス
 */
export interface Paginated<T> {
  /** オフセット */
  offset: number;
  /** 取得数 */
  limit: number;
  /** 取得結果 */
  results: T[];
}

export interface PlayerRank {
  rank: number;
  shifts_worked: number;
  nsaid: string;
  thumbnail_url?: string;
}
