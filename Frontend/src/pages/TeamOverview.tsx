import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ticketService } from '@/services/ticketService';
import { worklogService } from '@/services/worklogService';
import { userService } from '@/services/userService';
import { Ticket, Worklog, User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function TeamOverview() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [worklogs, setWorklogs] = useState<Worklog[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ticketsData, worklogsData, usersData] = await Promise.all([
        ticketService.getAll(),
        worklogService.getAll(),
        userService.getAll(),
      ]);
      setTickets(ticketsData);
      setWorklogs(worklogsData);
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Calculate stats
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status !== 'Done').length;
  const totalTimeSpent = worklogs.reduce((sum, w) => sum + w.timeSpent, 0);

  // User stats
  const userStats = users.map((user) => {
    const userTickets = tickets.filter((t) => t.assigneeId === user.id);
    const userWorklogs = worklogs.filter((w) => w.userId === user.id);
    const userTimeSpent = userWorklogs.reduce((sum, w) => sum + w.timeSpent, 0);
    return {
      user,
      ticketCount: userTickets.length,
      worklogCount: userWorklogs.length,
      timeSpent: userTimeSpent,
    };
  });

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Team Overview</h2>
        <p className="text-muted-foreground">Overview of all tickets and worklogs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalTickets}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {openTickets} open, {totalTickets - openTickets} done
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Worklogs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{worklogs.length}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Across {new Set(worklogs.map((w) => w.ticketId)).size} tickets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Time Logged</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {Math.floor(totalTimeSpent / 60)}h {totalTimeSpent % 60}m
            </p>
            <p className="text-sm text-muted-foreground mt-1">Team total</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Activity summary by user</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Tickets</TableHead>
                  <TableHead>Worklogs</TableHead>
                  <TableHead>Time Logged</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userStats.map((stat) => (
                  <TableRow key={stat.user.id}>
                    <TableCell className="font-medium">{stat.user.name}</TableCell>
                    <TableCell>
                      <Badge variant={stat.user.role === 'ADMIN' ? 'default' : 'secondary'}>
                        {stat.user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{stat.ticketCount}</TableCell>
                    <TableCell>{stat.worklogCount}</TableCell>
                    <TableCell>
                      {Math.floor(stat.timeSpent / 60)}h {stat.timeSpent % 60}m
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Worklogs</CardTitle>
            <CardDescription>Latest worklog entries</CardDescription>
          </CardHeader>
          <CardContent>
            {worklogs.length === 0 ? (
              <p className="text-muted-foreground">No worklogs yet</p>
            ) : (
              <div className="space-y-4">
                {worklogs
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map((worklog) => (
                    <div key={worklog.id} className="flex justify-between items-start border-b pb-3">
                      <div>
                        <p className="font-medium">
                          {worklog.ticket ? (
                            <Link
                              to={`/tickets/${worklog.ticket.id}`}
                              className="text-primary hover:underline"
                            >
                              {worklog.ticket.title}
                            </Link>
                          ) : (
                            'Ticket deleted'
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">{worklog.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {worklog.user?.name} • {format(new Date(worklog.date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {Math.floor(worklog.timeSpent / 60)}h {worklog.timeSpent % 60}m
                      </Badge>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
          <CardDescription>Complete list of all tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Time Spent</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">
                    <Link to={`/tickets/${ticket.id}`} className="hover:underline">
                      {ticket.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{ticket.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                  </TableCell>
                  <TableCell>{ticket.assignee?.name || 'Unassigned'}</TableCell>
                  <TableCell>{ticket.reporter?.name || 'Unknown'}</TableCell>
                  <TableCell>
                    {ticket.totalTimeSpent
                      ? `${Math.floor(ticket.totalTimeSpent / 60)}h ${ticket.totalTimeSpent % 60}m`
                      : '0h'}
                  </TableCell>
                  <TableCell>
                    <Link to={`/tickets/${ticket.id}`}>
                      <button className="text-primary hover:underline text-sm">View</button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

