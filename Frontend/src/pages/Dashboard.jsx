import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  FolderKanban, 
  CheckSquare, 
  Users, 
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react'

const stats = [
  {
    title: 'Total Projects',
    value: '12',
    description: '+2 from last month',
    icon: FolderKanban,
    trend: 'up',
  },
  {
    title: 'Active Tasks',
    value: '48',
    description: '+12 from last week',
    icon: CheckSquare,
    trend: 'up',
  },
  {
    title: 'Team Members',
    value: '8',
    description: '+1 new member',
    icon: Users,
    trend: 'up',
  },
  {
    title: 'Completion Rate',
    value: '85%',
    description: '+5% from last month',
    icon: TrendingUp,
    trend: 'up',
  },
]

const recentTasks = [
  { id: 1, title: 'Design new landing page', project: 'Website Redesign', status: 'In Progress', priority: 'High' },
  { id: 2, title: 'Update API documentation', project: 'Backend API', status: 'Pending', priority: 'Medium' },
  { id: 3, title: 'Review pull requests', project: 'Development', status: 'In Progress', priority: 'High' },
  { id: 4, title: 'Prepare presentation', project: 'Client Meeting', status: 'Completed', priority: 'Low' },
]

const timelogs = [
  { id: 1, task: 'Design new landing page', project: 'Website Redesign', date: '2024-01-15', duration: '2h 30m', description: 'Worked on responsive design' },
  { id: 2, task: 'Update API documentation', project: 'Backend API', date: '2024-01-15', duration: '1h 15m', description: 'Updated endpoints documentation' },
  { id: 3, task: 'Review pull requests', project: 'Development', date: '2024-01-14', duration: '3h 45m', description: 'Code review and testing' },
  { id: 4, task: 'Prepare presentation', project: 'Client Meeting', date: '2024-01-14', duration: '1h 20m', description: 'Created slides and notes' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your projects and tasks.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>
              Your latest tasks across all projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {task.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {task.project}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        task.status === 'Completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : task.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                      }`}
                    >
                      {task.status}
                    </span>
                    {task.priority === 'High' && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>
              Tasks that need your attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Q4 Review Meeting</p>
                  <p className="text-xs text-muted-foreground">Due in 2 days</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Project Proposal</p>
                  <p className="text-xs text-muted-foreground">Due in 5 days</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Code Review</p>
                  <p className="text-xs text-muted-foreground">Due in 1 week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Logs Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Time Logs</CardTitle>
          <CardDescription>
            Your recent time tracking entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timelogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium leading-none">
                    {log.task}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {log.project} • {log.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {log.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{log.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              View All Time Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
