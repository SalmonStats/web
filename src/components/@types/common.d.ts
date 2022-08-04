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
