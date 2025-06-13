import { User, Role } from './types';

export function describeUser(user: User): string {
  return `User #${user.id}: ${user.name} <${user.email}> [${user.role}] - ${user.status}`;
} 