export namespace OAuth {
  export interface CoopSummary {
    golden_ikura_total: number;
    ikura_total: number;
    help_total: number;
    job_num: number;
    kuma_point: number;
    kuma_point_total: number;
  }

  export interface APIError {
    error: string;
    error_description: string;
    errorMessage: string;
  }

  export interface SplatNet2 {
    nickname: string;
    nsaid: string;
    session_token: string;
    iksm_session: string;
    thumbnail_url: string;
    expires_in: number;
    friend_code: string;
    summary: CoopSummary;
  }

  export interface OAuth {
    oauthURL: string;
    session_token_verifier: string;
  }
}
