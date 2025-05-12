import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from './ui/dialog'; // Assuming path
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'; // Assuming path
import { Textarea } from './ui/textarea'; // Assuming path
import { Loader2 } from 'lucide-react';

// Re-define Task Type here or import from a shared types file
interface Task {
    id: number;
    projectId: number;
    description: string;
    dueDate: string;
    status: 'To Do' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
}

interface TaskDetailModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  task: Task | null;
  onSave: (updatedTask: Task) => Promise<void>; // Function to handle saving changes
}

export function TaskDetailModal({ isOpen, onOpenChange, task, onSave }: TaskDetailModalProps) {
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // --- Form State ---
  // Initialize form state when the task prop changes
  const [description, setDescription] = React.useState(task?.description || '');
  const [status, setStatus] = React.useState<Task['status']>(task?.status || 'To Do');
  const [priority, setPriority] = React.useState<Task['priority']>(task?.priority || 'Medium');
  const [dueDate, setDueDate] = React.useState(task?.dueDate || '');

  React.useEffect(() => {
    if (task) {
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate);
      setError(null); // Reset error when task changes
    } else {
        // Optionally reset fields if task is null (modal closed/reopened without task)
        setDescription('');
        setStatus('To Do');
        setPriority('Medium');
        setDueDate('');
    }
  }, [task]); // Dependency array includes task

  const handleSaveChanges = async () => {
    if (!task) return; // Should not happen if modal is open with a task

    // Basic validation
    if (!description.trim()) {
        setError('Description cannot be empty.');
        return;
    }

    setIsSaving(true);
    setError(null);

    const updatedTask: Task = {
        ...task, // Keep original id and projectId
        description: description.trim(),
        status: status,
        priority: priority,
        dueDate: dueDate, // Handle date formatting/validation if using a date picker
    };

    try {
      await onSave(updatedTask);
      onOpenChange(false); // Close modal on successful save
    } catch (err: any) {
      console.error("Save task error:", err);
      setError(err.message || 'Could not save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  // Render nothing if task is null (might flash briefly, but safer)
  if (!task) {
      return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>
            View and edit the details for this task.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Description */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="task-description" className="text-right pt-2">
              Description
            </Label>
            {/* Using Textarea for potentially longer descriptions */}
            <Textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 h-24"
              placeholder="Enter task description..."
              disabled={isSaving}
            />
          </div>

          {/* Status */}
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task-status" className="text-right">
              Status
            </Label>
            <Select
                value={status}
                onValueChange={(value: Task['status']) => setStatus(value)}
                disabled={isSaving}
            >
                <SelectTrigger id="task-status" className="col-span-3">
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
            </Select>
          </div>

          {/* Priority */}
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task-priority" className="text-right">
              Priority
            </Label>
             <Select
                value={priority}
                onValueChange={(value: Task['priority']) => setPriority(value)}
                disabled={isSaving}
            >
                <SelectTrigger id="task-priority" className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                </SelectContent>
            </Select>
          </div>

           {/* Due Date (Simple Input for now) */}
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task-dueDate" className="text-right">
              Due Date
            </Label>
            <Input
              id="task-dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Tomorrow, Next Week, YYYY-MM-DD"
              disabled={isSaving}
              // Consider using a proper Date Picker component here later
            />
          </div>

           {/* TODO: Add Assignee Dropdown later */}
        </div>

        {error && (
            <p className="text-sm text-red-600 dark:text-red-500 text-center mb-2 px-6">Error: {error}</p>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" disabled={isSaving}>Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 