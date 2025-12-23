import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ticketService } from '@/services/ticketService';
import { worklogService } from '@/services/worklogService';
import { userService } from '@/services/userService';
import { Ticket, Worklog, User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Trash2, Plus } from 'lucide-react';

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [worklogs, setWorklogs] = useState<Worklog[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [worklogDialogOpen, setWorklogDialogOpen] = useState(false);
  const [worklogDate, setWorklogDate] = useState('');
  const [worklogTime, setWorklogTime] = useState('');
  const [worklogDescription, setWorklogDescription] = useState('');

  useEffect(() => {
    if (id) {
      loadTicket();
      loadWorklogs();
      loadUsers();
    }
  }, [id]);

  const loadTicket = async () => {
    if (!id) return;
    try {
      const data = await ticketService.getById(id);
      setTicket(data);
    } catch (error) {
      console.error('Failed to load ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadWorklogs = async () => {
    if (!id) return;
    try {
      const data = await worklogService.getAll({ ticketId: id });
      setWorklogs(data);
    } catch (error) {
      console.error('Failed to load worklogs:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (!id || !ticket) return;
    setUpdating(true);
    try {
      await ticketService.update(id, { status: status as any });
      await loadTicket();
    } catch (error) {
      console.error('Failed to update ticket:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateAssignee = async (assigneeId: string) => {
    if (!id) return;
    setUpdating(true);
    try {
      await ticketService.update(id, { assigneeId: assigneeId || undefined });
      await loadTicket();
    } catch (error) {
      console.error('Failed to update ticket:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this ticket?')) return;
    try {
      await ticketService.delete(id);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to delete ticket:', error);
    }
  };

  const handleCreateWorklog = async () => {
    if (!id || !worklogDate || !worklogTime || !worklogDescription) return;
    
    // Convert time to minutes (assuming format like "2h 30m" or "150")
    let minutes = 0;
    if (worklogTime.includes('h')) {
      const parts = worklogTime.split('h');
      const hours = parseInt(parts[0]) || 0;
      const mins = parts[1] ? parseInt(parts[1].replace('m', '').trim()) || 0 : 0;
      minutes = hours * 60 + mins;
    } else {
      minutes = parseInt(worklogTime) || 0;
    }

    try {
      await worklogService.create({
        ticketId: id,
        date: worklogDate,
        timeSpent: minutes,
        description: worklogDescription,
      });
      setWorklogDialogOpen(false);
      setWorklogDate('');
      setWorklogTime('');
      setWorklogDescription('');
      await loadWorklogs();
      await loadTicket();
    } catch (error) {
      console.error('Failed to create worklog:', error);
    }
  };

  const handleDeleteWorklog = async (worklogId: string) => {
    if (!window.confirm('Are you sure you want to delete this worklog?')) return;
    try {
      await worklogService.delete(worklogId);
      await loadWorklogs();
      await loadTicket();
    } catch (error) {
      console.error('Failed to delete worklog:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!ticket) {
    return <div className="text-center py-8">Ticket not found</div>;
  }

  const canEdit = user?.role === 'ADMIN' || user?.id === ticket.assigneeId;
  const canDelete = user?.role === 'ADMIN';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">{ticket.title}</h2>
          <p className="text-muted-foreground">Ticket Details</p>
        </div>
        {canDelete && (
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Ticket
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {ticket.description ? (
                  <p className="whitespace-pre-wrap">{ticket.description}</p>
                ) : (
                  <p className="text-muted-foreground">No description provided</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Worklogs</CardTitle>
                <Dialog open={worklogDialogOpen} onOpenChange={setWorklogDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Worklog
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Worklog</DialogTitle>
                      <DialogDescription>
                        Log time spent on this ticket
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="worklog-date">Date</Label>
                        <Input
                          id="worklog-date"
                          type="date"
                          value={worklogDate}
                          onChange={(e) => setWorklogDate(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="worklog-time">Time Spent (e.g., "2h 30m" or "150" minutes)</Label>
                        <Input
                          id="worklog-time"
                          value={worklogTime}
                          onChange={(e) => setWorklogTime(e.target.value)}
                          placeholder="2h 30m"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="worklog-description">Description</Label>
                        <Textarea
                          id="worklog-description"
                          value={worklogDescription}
                          onChange={(e) => setWorklogDescription(e.target.value)}
                          required
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setWorklogDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateWorklog}>Add Worklog</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {worklogs.length === 0 ? (
                <p className="text-muted-foreground">No worklogs yet</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {worklogs.map((worklog) => (
                      <TableRow key={worklog.id}>
                        <TableCell>{format(new Date(worklog.date), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>
                          {Math.floor(worklog.timeSpent / 60)}h {worklog.timeSpent % 60}m
                        </TableCell>
                        <TableCell>{worklog.description}</TableCell>
                        <TableCell>{worklog.user?.name || 'Unknown'}</TableCell>
                        <TableCell>
                          {user?.id === worklog.userId && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteWorklog(worklog.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Type</Label>
                <div className="mt-1">
                  <Badge variant="outline">{ticket.type}</Badge>
                </div>
              </div>

              <div>
                <Label>Status</Label>
                {canEdit ? (
                  <Select
                    value={ticket.status}
                    onValueChange={handleUpdateStatus}
                    disabled={updating}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Blocked">Blocked</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="mt-1">
                    <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                  </div>
                )}
              </div>

              <div>
                <Label>Priority</Label>
                <div className="mt-1">
                  <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                </div>
              </div>

              <div>
                <Label>Assignee</Label>
                {(canEdit || user?.role === 'ADMIN') ? (
                  <Select
                    value={ticket.assigneeId || ''}
                    onValueChange={handleUpdateAssignee}
                    disabled={updating}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Unassigned" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Unassigned</SelectItem>
                      {users.map((u) => (
                        <SelectItem key={u.id} value={u.id}>
                          {u.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="mt-1">
                    {ticket.assignee ? ticket.assignee.name : 'Unassigned'}
                  </div>
                )}
              </div>

              <div>
                <Label>Reporter</Label>
                <div className="mt-1 text-sm">{ticket.reporter?.name || 'Unknown'}</div>
              </div>

              <div>
                <Label>Due Date</Label>
                <div className="mt-1 text-sm">
                  {ticket.dueDate ? format(new Date(ticket.dueDate), 'MMM dd, yyyy') : 'No due date'}
                </div>
              </div>

              <div>
                <Label>Total Time Spent</Label>
                <div className="mt-1 text-sm font-semibold">
                  {ticket.totalTimeSpent
                    ? `${Math.floor(ticket.totalTimeSpent / 60)}h ${ticket.totalTimeSpent % 60}m`
                    : '0h'}
                </div>
              </div>

              <div>
                <Label>Created</Label>
                <div className="mt-1 text-sm">
                  {format(new Date(ticket.createdAt), 'MMM dd, yyyy HH:mm')}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

