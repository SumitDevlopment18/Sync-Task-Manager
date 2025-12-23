import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp,
  TrendingDown,
  Clock,
  CheckSquare,
  Users,
  FolderKanban,
  Calendar,
  Download
} from 'lucide-react'

const analyticsData = {
  overview: [
    { label: 'Total Projects', value: '12', change: '+2', trend: 'up' },
    { label: 'Completed Tasks', value: '156', change: '+24', trend: 'up' },
    { label: 'Team Members', value: '8', change: '+1', trend: 'up' },
    { label: 'Hours Logged', value: '1,245', change: '+156', trend: 'up' },
  ],
  projectPerformance: [
    { name: 'Website Redesign', progress: 65, tasks: 23, hours: 120, budget: '$45,000' },
    { name: 'Backend API', progress: 80, tasks: 40, hours: 95, budget: '$30,000' },
    { name: 'Mobile App', progress: 15, tasks: 5, hours: 25, budget: '$60,000' },
    { name: 'Development', progress: 45, tasks: 18, hours: 85, budget: '$25,000' },
  ],
  timeDistribution: [
    { category: 'Development', hours: 450, percentage: 36 },
    { category: 'Design', hours: 280, percentage: 22 },
    { category: 'Testing', hours: 220, percentage: 18 },
    { category: 'Meetings', hours: 180, percentage: 14 },
    { category: 'Documentation', hours: 115, percentage: 10 },
  ],
  weeklyActivity: [
    { day: 'Mon', tasks: 12, hours: 8.5 },
    { day: 'Tue', tasks: 15, hours: 9.2 },
    { day: 'Wed', tasks: 18, hours: 8.8 },
    { day: 'Thu', tasks: 14, hours: 7.5 },
    { day: 'Fri', tasks: 10, hours: 6.5 },
    { day: 'Sat', tasks: 5, hours: 3.0 },
    { day: 'Sun', tasks: 2, hours: 1.5 },
  ],
}

export default function Analytics() {
  const maxHours = Math.max(...analyticsData.weeklyActivity.map(d => d.hours))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            View insights and analytics for your projects
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsData.overview.map((item) => {
          const TrendIcon = item.trend === 'up' ? TrendingUp : TrendingDown
          return (
            <Card key={item.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.label}
                </CardTitle>
                <TrendIcon className={`h-4 w-4 ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className={item.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {item.change}
                  </span>
                  <span>from last month</span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Project Performance */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Project Performance</CardTitle>
            <CardDescription>
              Progress and metrics for active projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {analyticsData.projectPerformance.map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.tasks} tasks • {project.hours}h • {project.budget}
                      </p>
                    </div>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Distribution */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Time Distribution</CardTitle>
            <CardDescription>
              How time is spent across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.timeDistribution.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-muted-foreground">{item.hours}h ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
          <CardDescription>
            Tasks and hours logged this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2">
              {analyticsData.weeklyActivity.map((day) => (
                <div key={day.day} className="space-y-2">
                  <div className="text-center text-sm font-medium">{day.day}</div>
                  <div className="relative h-32 bg-muted rounded-md overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full bg-primary rounded-t-md transition-all"
                      style={{ height: `${(day.hours / maxHours) * 100}%` }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-2">
                      <span className="text-xs font-medium text-foreground">{day.hours}h</span>
                      <span className="text-xs text-muted-foreground">{day.tasks} tasks</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Total Tasks:</span>
                  <span className="font-medium">{analyticsData.weeklyActivity.reduce((sum, d) => sum + d.tasks, 0)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Total Hours:</span>
                  <span className="font-medium">{analyticsData.weeklyActivity.reduce((sum, d) => sum + d.hours, 0).toFixed(1)}h</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Productivity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>
              Team members with highest task completion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Mike Johnson', tasks: 52, hours: 145 },
                { name: 'David Brown', tasks: 60, hours: 180 },
                { name: 'John Doe', tasks: 45, hours: 120 },
              ].map((member, index) => (
                <div key={member.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.hours}h logged</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{member.tasks} tasks</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>
              Overview of project completion rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: 'Completed', count: 3, color: 'bg-green-500' },
                { status: 'In Progress', count: 7, color: 'bg-blue-500' },
                { status: 'Planning', count: 2, color: 'bg-yellow-500' },
              ].map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="font-medium">{item.status}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.count} projects</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
