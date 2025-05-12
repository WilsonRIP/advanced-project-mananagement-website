import { NextResponse } from 'next/server';

// Define Type (can be moved to a shared types file later)
interface Project {
  id: number;
  name: string;
  status: "In Progress" | "Planning" | "Completed";
}

// Placeholder data (move this to a database later)
// NOTE: In a real app, this in-memory array won't persist between requests.
// A database is necessary for proper data storage.
let allProjects: Project[] = [
  { id: 1, name: "Website Redesign", status: "In Progress" },
  { id: 2, name: "Mobile App Launch", status: "Planning" },
  { id: 3, name: "Marketing Campaign", status: "Completed" },
  { id: 4, name: "API Integration", status: "In Progress" },
];

export async function GET(request: Request) {
  // In a real app, you'd fetch from a database here, potentially based on user session
  // For now, just return the placeholder data
  try {
    // Simulate network delay (optional)
    // await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json(allProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ message: 'Error fetching projects' }, { status: 500 });
  }
}

// --- POST Handler --- 
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const projectName = body.name;

    if (!projectName || typeof projectName !== 'string') {
      return NextResponse.json({ message: 'Project name is required and must be a string' }, { status: 400 });
    }

    const newProject: Project = {
      // Simple ID generation (prone to issues in real apps)
      id: Math.max(0, ...allProjects.map(p => p.id)) + 1, 
      name: projectName,
      status: "Planning", // Default status
    };

    allProjects.push(newProject);

    console.log("Added project:", newProject);
    console.log("Current projects:", allProjects);

    return NextResponse.json(newProject, { status: 201 }); // Return the created project

  } catch (error: any) {
    console.error("Error creating project:", error);
     if (error instanceof SyntaxError) {
        return NextResponse.json({ message: 'Invalid JSON in request body' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error creating project' }, { status: 500 });
  }
}

// TODO: Add PUT, DELETE handlers later for CRUD operations 