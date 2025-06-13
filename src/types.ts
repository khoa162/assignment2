export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DEVELOPER = 'DEVELOPER',
}

export type Status = 'ACTIVE' | 'INACTIVE';

export interface User {
  readonly id: number;
  name: string;
  email: string;
  role: Role;
  status: Status;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  members: User[];
}

export function isAdmin(user: User): user is User & { role: Role.ADMIN } {
  return user.role === Role.ADMIN;
} 