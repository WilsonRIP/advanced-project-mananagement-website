import { NextResponse } from 'next/server';

// --- Re-use or import Task definition ---
interface Task {
  id: number;
  projectId: number;
  description: string;
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
}

// --- Temporary in-memory storage (Must be consistent with GET/POST route) ---
// Ideally, this would be a shared module or database connection
let tasks: Task[] = [
  { id: 1, projectId: 1, description: 'Draft initial proposal', dueDate: 'Tomorrow', status: 'In Progress', priority: 'High' },
  { id: 2, projectId: 1, description: 'Review proposal with team', dueDate: 'Next Week', status: 'To Do', priority: 'Medium' },
  { id: 3, projectId: 2, description: 'Setup project repository', dueDate: 'Today', status: 'Done', priority: 'High' },
  { id: 4, projectId: 3, description: 'Create wireframes', dueDate: 'Tomorrow', status: 'In Progress', priority: 'Medium' },
  { id: 5, projectId: 4, description: 'Develop login screen', dueDate: 'Next Week', status: 'To Do', priority: 'Low' },
  { id: 6, projectId: 1, description: 'Finalize budget', dueDate: 'Tomorrow', status: 'To Do', priority: 'High' },
];
// Make sure nextTaskId logic is handled correctly if POST is also used

// --- PUT Handler for updating a task ---
export async function PUT(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const taskId = parseInt(params.taskId, 10);

  if (isNaN(taskId)) {
    return NextResponse.json({ message: 'Invalid task ID' }, { status: 400 });
  }

  try {
    const body = await request.json();

    // Validate incoming data (add more checks as needed)
    if (!body || typeof body !== 'object') {
        return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    const { description, dueDate, status, priority, projectId } = body;

    // Find the task index
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    // Create the updated task object, preserving original ID and merging changes
    const updatedTask: Task = {
      ...tasks[taskIndex], // Start with original task data
      // Update fields if they are provided in the request body
      ...(description !== undefined && { description: String(description).trim() }),
      ...(dueDate !== undefined && { dueDate: String(dueDate) }), // Basic string assignment
      ...(status !== undefined && ['To Do', 'In Progress', 'Done'].includes(status) && { status }),
      ...(priority !== undefined && ['Low', 'Medium', 'High'].includes(priority) && { priority }),
      ...(projectId !== undefined && typeof projectId === 'number' && { projectId }),
    };

    // Validate description after potential update
     if (!updatedTask.description) {
        return NextResponse.json({ message: 'Task description cannot be empty' }, { status: 400 });
    }

    // Update the task in the array
    tasks[taskIndex] = updatedTask;

    console.log(`Updated task ${taskId}:`, updatedTask);

    return NextResponse.json(updatedTask);

  } catch (error) {
    console.error(`Error updating task ${taskId}:`, error);
     if (error instanceof SyntaxError) {
         return NextResponse.json({ message: 'Invalid JSON in request body' }, { status: 400 });
     }
    return NextResponse.json({ message: 'Error updating task' }, { status: 500 });
  }
}

// --- Optional: GET handler for a single task (might not be needed if project endpoint returns tasks) ---
// export async function GET(...) { ... }

// --- Optional: DELETE handler for a task ---
// export async function DELETE(...) { ... } 