export interface IUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  password: string;
  avatarUrl?: string;
  headline?: string;
  bio?: string;
  skills?: string[];
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  joinDate?: string;
  lastActive?: string;
  followersCount?: number;
  followingCount?: number;
  connectionsCount?: number;
  status?: "active" | "inactive" | "banned";
}
