import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { worklogService } from '@/services/worklogService';
import { Worklog } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function Worklogs() {
  const { user } = useAuth();
  const [worklogs, setWorklogs] = useState<Worklog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorklogs();
  }, []);

  const loadWorklogs = async () => {
    try {
      const data = await worklogService.getAll({ me: true });
      setWorklogs(data);
    } catch (error) {
      console.error('Failed to load worklogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group worklogs by date
  const groupedWorklogs = worklogs.reduce((acc, worklog) => {
    const date = worklog.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(worklog);
    return acc;
  }, {} as Record<string, Worklog[]>);

  const totalTime = worklogs.reduce((sum, w) => sum + w.timeSpent, 0);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">My Worklogs</h2>
        <p className="text-muted-foreground">Track your time spent on tickets</p>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Entries</p>
                <p className="text-2xl font-bold">{worklogs.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-2xl font-bold">
                  {Math.floor(totalTime / 60)}h {totalTime % 60}m
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unique Tickets</p>
                <p className="text-2xl font-bold">
                  {new Set(worklogs.map((w) => w.ticketId)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {worklogs.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No worklogs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You haven't logged any work yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedWorklogs)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([date, logs]) => (
              <Card key={date}>
                <CardHeader>
                  <CardTitle>{format(new Date(date), 'EEEE, MMMM dd, yyyy')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Created</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((worklog) => (
                        <TableRow key={worklog.id}>
                          <TableCell>
                            {worklog.ticket ? (
                              <Link
                                to={`/tickets/${worklog.ticket.id}`}
                                className="text-primary hover:underline font-medium"
                              >
                                {worklog.ticket.title}
                              </Link>
                            ) : (
                              <span className="text-muted-foreground">Ticket deleted</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {Math.floor(worklog.timeSpent / 60)}h {worklog.timeSpent % 60}m
                            </Badge>
                          </TableCell>
                          <TableCell>{worklog.description}</TableCell>
                          <TableCell>
                            {format(new Date(worklog.createdAt), 'HH:mm')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Total for this day:{' '}
                    <span className="font-semibold">
                      {Math.floor(
                        logs.reduce((sum, w) => sum + w.timeSpent, 0) / 60
                      )}{' '}
                      h{' '}
                      {logs.reduce((sum, w) => sum + w.timeSpent, 0) % 60}{' '}
                      m
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}

