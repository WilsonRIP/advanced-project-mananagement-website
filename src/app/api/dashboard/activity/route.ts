import { NextResponse } from 'next/server';

// Define Type
interface RecentActivity {
    id: number;
    user: string;
    action: string;
    target: string;
    time: string;
}

// Placeholder data
const recentActivity: RecentActivity[] = [
    { id: 1, user: 'Alice', action: 'created project', target: 'New Marketing Site', time: '2 hours ago' },
    { id: 2, user: 'Bob', action: 'completed task', target: 'Draft initial proposal', time: '5 hours ago' },
    { id: 3, user: 'You', action: 'updated task', target: 'Schedule kick-off meeting', time: 'Yesterday' },
    { id: 4, user: 'Alice', action: 'commented on task', target: 'Deploy staging server', time: 'Yesterday' },
];

export async function GET(request: Request) {
  try {
    return NextResponse.json(recentActivity);
  } catch (error) {
    console.error("Error fetching activity:", error);
    return NextResponse.json({ message: 'Error fetching activity' }, { status: 500 });
  }
} 