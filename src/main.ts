import { Role, User, Project } from './types';
import { describeUser } from './describeUser';
import { ProjectManager } from './projectManager';
import { ConsoleNotificationService } from './notification';
import { findById } from './utils';
import { isAdmin } from './types';

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: Role.ADMIN, status: 'ACTIVE' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: Role.MANAGER, status: 'ACTIVE' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: Role.DEVELOPER, status: 'INACTIVE' },
];

const projects: Project[] = [
  { id: 101, name: 'Project A', members: [] },
  { id: 102, name: 'Project B', description: 'Important project', members: [] },
];

const notifier = new ConsoleNotificationService();
const pm = new ProjectManager(notifier);

projects.forEach(p => pm.addProject(p));

pm.addUserToProject(101, users[0]);
pm.addUserToProject(101, users[1]);
pm.addUserToProject(101, users[0]); 
pm.addUserToProject(102, users[2]);

pm.listProjects().forEach(project => {
  console.log(`\nProject: ${project.name}`);
  project.members.forEach(member => {
    console.log('  ' + describeUser(member));
    if (isAdmin(member)) {
      console.log('    -> This user is an ADMIN');
    }
  });
});

const foundUser = findById(users, 2);
if (foundUser) {
  console.log('\nFound user:', describeUser(foundUser));
} 