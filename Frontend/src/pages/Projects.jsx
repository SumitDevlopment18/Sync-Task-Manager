import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { 
  Plus, 
  Search, 
  FolderKanban,
  Users,
  Calendar,
  TrendingUp,
  MoreVertical,
  Edit,
  Trash2,
  Clock
} from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete redesign of company website with modern UI/UX',
    status: 'In Progress',
    progress: 65,
    teamMembers: 5,
    tasksCompleted: 23,
    totalTasks: 35,
    dueDate: '2024-02-15',
    budget: '$45,000',
    timeSpent: '120h 30m'
  },
  {
    id: 2,
    name: 'Backend API',
    description: 'Development of RESTful API for mobile and web applications',
    status: 'In Progress',
    progress: 80,
    teamMembers: 3,
    tasksCompleted: 40,
    totalTasks: 50,
    dueDate: '2024-02-01',
    budget: '$30,000',
    timeSpent: '95h 15m'
  },
  {
    id: 3,
    name: 'Mobile App',
    description: 'iOS and Android mobile application development',
    status: 'Planning',
    progress: 15,
    teamMembers: 4,
    tasksCompleted: 5,
    totalTasks: 30,
    dueDate: '2024-03-30',
    budget: '$60,000',
    timeSpent: '25h 45m'
  },
  {
    id: 4,
    name: 'Client Meeting',
    description: 'Preparation and presentation materials for client meeting',
    status: 'Completed',
    progress: 100,
    teamMembers: 2,
    tasksCompleted: 8,
    totalTasks: 8,
    dueDate: '2024-01-15',
    budget: '$5,000',
    timeSpent: '15h 20m'
  },
  {
    id: 5,
    name: 'Development',
    description: 'General development tasks and maintenance',
    status: 'In Progress',
    progress: 45,
    teamMembers: 6,
    tasksCompleted: 18,
    totalTasks: 40,
    dueDate: '2024-02-28',
    budget: '$25,000',
    timeSpent: '85h 10m'
  },
]

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showAddProject, setShowAddProject] = useState(false)

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track all your projects
          </p>
        </div>
        <Button onClick={() => setShowAddProject(!showAddProject)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="search-projects" className="text-sm font-medium">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-projects"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status-filter" className="text-sm font-medium">Status</Label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
              >
                <option>All</option>
                <option>Planning</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium opacity-0">Actions</Label>
              <Button variant="outline" className="w-full">
                View All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Project Modal */}
      <Dialog open={showAddProject} onOpenChange={setShowAddProject}>
        <DialogContent className="sm:max-w-[600px]" onClose={() => setShowAddProject(false)}>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Add a new project to track. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" placeholder="Enter project name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-due-date">Due Date</Label>
                <Input id="project-due-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-budget">Budget</Label>
                <Input id="project-budget" type="number" placeholder="Enter budget" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-status">Status</Label>
                <select 
                  id="project-status"
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                >
                  <option>Planning</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Description</Label>
              <textarea
                id="project-description"
                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                placeholder="Enter project description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddProject(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAddProject(false)}>
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Projects Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <FolderKanban className="h-5 w-5" />
                    {project.name}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {project.description}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Team:</span>
                  <span className="font-medium">{project.teamMembers}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{project.timeSpent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Tasks:</span>
                  <span className="font-medium">{project.tasksCompleted}/{project.totalTasks}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Due:</span>
                  <span className="font-medium">{project.dueDate}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Budget: {project.budget}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12 text-muted-foreground">
              No projects found matching your filters.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
