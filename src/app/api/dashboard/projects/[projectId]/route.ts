import { NextResponse } from 'next/server';

// Temporary in-memory storage (Simulating database tables)
let projects = [
  { id: 1, name: 'Project Alpha', status: 'In Progress' },
  { id: 2, name: 'Project Beta', status: 'Planning' },
  { id: 3, name: 'Website Redesign', status: 'Completed' },
  { id: 4, name: 'Mobile App Launch', status: 'In Progress' },
];

interface Task {
  id: number;
  projectId: number;
  description: string;
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
}

let tasks: Task[] = [
  { id: 1, projectId: 1, description: 'Draft initial proposal', dueDate: 'Tomorrow', status: 'In Progress', priority: 'High' },
  { id: 2, projectId: 1, description: 'Review proposal with team', dueDate: 'Next Week', status: 'To Do', priority: 'Medium' },
  { id: 3, projectId: 2, description: 'Setup project repository', dueDate: 'Today', status: 'Done', priority: 'High' },
  { id: 4, projectId: 3, description: 'Create wireframes', dueDate: 'Tomorrow', status: 'In Progress', priority: 'Medium' },
  { id: 5, projectId: 4, description: 'Develop login screen', dueDate: 'Next Week', status: 'To Do', priority: 'Low' },
  { id: 6, projectId: 1, description: 'Finalize budget', dueDate: 'Tomorrow', status: 'To Do', priority: 'High' },
];

// Define Activity Type (placeholder for now)
interface RecentActivity {
    id: number;
    projectId: number; // Assume activity is linked to projects
    action: string;
    target: string;
    time: string;
    user: string;
}

let activity: RecentActivity[] = [
    {id: 1, projectId: 1, user: 'Alice', action: 'created task', target: 'Draft initial proposal', time: '2 hours ago'},
    {id: 2, projectId: 2, user: 'Bob', action: 'completed task', target: 'Setup project repository', time: '1 day ago'},
    {id: 3, projectId: 1, user: 'Alice', action: 'updated project status', target: 'Project Alpha', time: '3 hours ago'},
];


export async function GET(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  const projectId = parseInt(params.projectId, 10);

  if (isNaN(projectId)) {
    return NextResponse.json({ message: 'Invalid project ID' }, { status: 400 });
  }

  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }

  // Find associated tasks
  const projectTasks = tasks.filter(t => t.projectId === projectId);

  // Find associated activity (Placeholder logic)
  const projectActivity = activity.filter(a => a.projectId === projectId);

  // Combine project data with its tasks and activity
  const responseData = {
    ...project,
    tasks: projectTasks,
    activity: projectActivity, // Include activity
  };

  return NextResponse.json(responseData);
}

// TODO: Implement PUT and DELETE handlers later for updating/deleting projects 