import { NextResponse } from 'next/server';

// Define Type
interface Task {
  id: number;
  projectId: number;
  description: string;
  dueDate: string; // Simple string for now - consider using Date object later
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
}

// Temporary in-memory storage
// NOTE: We need a way to associate tasks with projects. Assuming projectId for now.
let tasks: Task[] = [
  { id: 1, projectId: 1, description: 'Draft initial proposal', dueDate: 'Tomorrow', status: 'In Progress', priority: 'High' },
  { id: 2, projectId: 1, description: 'Review proposal with team', dueDate: 'Next Week', status: 'To Do', priority: 'Medium' },
  { id: 3, projectId: 2, description: 'Setup project repository', dueDate: 'Today', status: 'Done', priority: 'High' },
  { id: 4, projectId: 3, description: 'Create wireframes', dueDate: 'Tomorrow', status: 'In Progress', priority: 'Medium' },
  { id: 5, projectId: 4, description: 'Develop login screen', dueDate: 'Next Week', status: 'To Do', priority: 'Low' },
];
let nextTaskId = 6;

// GET all tasks (can add filtering later, e.g., by projectId)
export async function GET() {
  // In a real app, you might filter based on user session or query params
  return NextResponse.json(tasks);
}

// POST a new task
export async function POST(request: Request) {
  try {
    const { description, projectId /*, dueDate, status, priority */ } = await request.json();

    if (!description || typeof description !== 'string' || description.trim() === '') {
      return NextResponse.json({ message: 'Invalid task description' }, { status: 400 });
    }

    // Basic validation/defaulting for projectId
    const assignedProjectId = (typeof projectId === 'number' && projectId > 0) ? projectId : 1; // Default to project 1 if not provided/invalid

    const newTask: Task = {
      id: nextTaskId++,
      projectId: assignedProjectId, // Assign project ID
      description: description.trim(),
      // Provide default values for new fields
      dueDate: 'Not Set',          // Default due date
      status: 'To Do',             // Default status
      priority: 'Medium',           // Default priority
    };

    tasks.push(newTask);
    return NextResponse.json(newTask, { status: 201 });

  } catch (error) {
    console.error("Create task error:", error);
    return NextResponse.json({ message: 'Error creating task' }, { status: 500 });
  }
} 