import { Project, User } from './types';
import { NotificationService } from './notification';

export class ProjectManager {
  private projects: Project[] = [];
  private notifier: NotificationService;

  constructor(notifier: NotificationService) {
    this.notifier = notifier;
  }

  addProject(project: Project): void {
    this.projects.push(project);
    this.notifier.notify(`Project '${project.name}' added.`);
  }

  removeProject(id: number): void {
    const idx = this.projects.findIndex(p => p.id === id);
    if (idx !== -1) {
      const [removed] = this.projects.splice(idx, 1);
      this.notifier.notify(`Project '${removed.name}' removed.`);
    }
  }

  addUserToProject(projectId: number, user: User): void {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;
    if (project.members.some(m => m.id === user.id)) {
      this.notifier.notify(`User '${user.name}' already in project '${project.name}'.`);
      return;
    }
    project.members.push(user);
    this.notifier.notify(`User '${user.name}' added to project '${project.name}'.`);
  }

  listProjects(): Project[] {
    return this.projects;
  }
} 