export const GOOGLE_OAUTH_URL =
  "https://www.googleapis.com/oauth2/v1/userinfo?access_token=";

export interface IUserProfile {
  id: string;
  family_name: string;
  given_name: string;
  picture: string;
  name: string;
  email: string;
}
