import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  List,
  LayoutGrid,
  Clock,
  ChevronDown,
  Lock,
  Eye,
  Share2,
  Maximize2,
  X,
  Zap,
  Settings,
  User,
  Calendar,
  Tag,
  Users,
  GitBranch,
  GitCommit,
  MessageSquare,
  History,
  FileText
} from 'lucide-react'

const tasks = [
  { 
    id: 'TASK-8782',
    key: 'PROJ-101',
    type: 'Task',
    summary: 'Design new landing page', 
    title: 'Design new landing page', 
    project: 'Website Redesign', 
    status: 'In Progress', 
    priority: 'High',
    assignee: { name: 'John Doe', initials: 'JD' },
    assigneeInitials: 'JD',
    dueDate: '2024-01-20',
    timeSpent: '4h 30m',
    description: 'Create a modern and responsive landing page design',
    comments: [],
    labels: ['design', 'frontend'],
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-18T14:30:00Z',
    reportedAt: '2024-01-10T09:30:00Z'
  },
  { 
    id: 'TASK-7878',
    key: 'PROJ-102',
    type: 'Bug',
    summary: 'Update API documentation', 
    title: 'Update API documentation', 
    project: 'Backend API', 
    status: 'To Do', 
    priority: 'Medium',
    assignee: { name: 'Jane Smith', initials: 'JS' },
    assigneeInitials: 'JS',
    dueDate: '2024-01-22',
    timeSpent: '1h 15m',
    description: 'Update all API endpoints documentation',
    comments: [{ id: 1, author: 'Jane Smith', text: 'Working on it', date: '2024-01-15T10:00:00Z' }],
    labels: ['documentation', 'api'],
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    reportedAt: '2024-01-12T07:45:00Z'
  },
  { 
    id: 'TASK-7839',
    key: 'PROJ-103',
    type: 'Story',
    summary: 'Review pull requests', 
    title: 'Review pull requests', 
    project: 'Development', 
    status: 'In Progress', 
    priority: 'High',
    assignee: { name: 'Mike Johnson', initials: 'MJ' },
    assigneeInitials: 'MJ',
    dueDate: '2024-01-18',
    timeSpent: '3h 45m',
    description: 'Review and test all pending pull requests',
    comments: [],
    labels: ['review', 'code-quality'],
    createdAt: '2024-01-14T11:00:00Z',
    updatedAt: '2024-01-17T16:20:00Z',
    reportedAt: '2024-01-14T10:30:00Z'
  },
  { 
    id: 'TASK-5562',
    key: 'PROJ-104',
    type: 'Task',
    summary: 'Prepare presentation', 
    title: 'Prepare presentation', 
    project: 'Client Meeting', 
    status: 'Done', 
    priority: 'Low',
    assignee: { name: 'Sarah Williams', initials: 'SW' },
    assigneeInitials: 'SW',
    dueDate: '2024-01-15',
    timeSpent: '2h 20m',
    description: 'Prepare slides for client presentation',
    comments: [{ id: 1, author: 'Sarah Williams', text: 'Completed', date: '2024-01-15T15:00:00Z' }],
    labels: ['presentation', 'client'],
    createdAt: '2024-01-08T09:00:00Z',
    updatedAt: '2024-01-15T15:00:00Z',
    reportedAt: '2024-01-08T08:45:00Z'
  },
  { 
    id: 'TASK-8686',
    key: 'PROJ-105',
    type: 'Bug',
    summary: 'Fix authentication bug', 
    title: 'Fix authentication bug', 
    project: 'Backend API', 
    status: 'In Progress', 
    priority: 'High',
    assignee: { name: 'John Doe', initials: 'JD' },
    assigneeInitials: 'JD',
    dueDate: '2024-01-19',
    timeSpent: '5h 10m',
    description: 'Fix the authentication token refresh issue',
    comments: [{ id: 1, author: 'John Doe', text: 'Investigating the issue', date: '2024-01-16T10:00:00Z' }],
    labels: ['bug', 'authentication', 'critical'],
    createdAt: '2024-01-15T14:00:00Z',
    updatedAt: '2024-01-18T11:30:00Z',
    reportedAt: '2024-01-15T13:30:00Z'
  },
  { 
    id: 'TASK-1280',
    key: 'PROJ-106',
    type: 'Story',
    summary: 'Write unit tests', 
    title: 'Write unit tests', 
    project: 'Development', 
    status: 'To Do', 
    priority: 'Medium',
    assignee: { name: 'Jane Smith', initials: 'JS' },
    assigneeInitials: 'JS',
    dueDate: '2024-01-25',
    timeSpent: '0h 0m',
    description: 'Write comprehensive unit tests for new features',
    comments: [],
    labels: ['testing', 'quality'],
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
    reportedAt: '2024-01-16T09:45:00Z'
  },
]

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [showAddTask, setShowAddTask] = useState(false)
  const [viewMode, setViewMode] = useState('list') // 'list' or 'kanban'
  const [openMenuId, setOpenMenuId] = useState(null)
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [showTaskDetail, setShowTaskDetail] = useState(false)
  const [activityTab, setActivityTab] = useState('Comments')
  const [editingField, setEditingField] = useState(null)
  const [editValue, setEditValue] = useState('')

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status) => {
    switch(status) {
      case 'Done':
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'To Do':
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High':
        return 'text-red-500'
      case 'Medium':
        return 'text-yellow-500'
      case 'Low':
        return 'text-green-500'
      default:
        return 'text-gray-500'
    }
  }

  const getTypeColor = (type) => {
    switch(type) {
      case 'Task':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'Bug':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'Story':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      case 'Feature':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'Documentation':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  // Group tasks by status for kanban view
  const kanbanColumns = [
    { id: 'To Do', title: 'To Do', tasks: filteredTasks.filter(t => t.status === 'To Do' || t.status === 'Pending') },
    { id: 'In Progress', title: 'In Progress', tasks: filteredTasks.filter(t => t.status === 'In Progress') },
    { id: 'Done', title: 'Done', tasks: filteredTasks.filter(t => t.status === 'Done' || t.status === 'Completed') },
  ]

  const activeFiltersCount = (statusFilter !== 'All' ? 1 : 0) + (priorityFilter !== 'All' ? 1 : 0)

  return (
    <div className="space-y-4 w-full max-w-full overflow-hidden">
      {/* Single Header Row with Title, View Toggle, Search, More Filters, and Add Task */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-normal tracking-tight">Tasks</h1>
          <p className="text-muted-foreground text-xs">
            Manage and track all your tasks
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* View Toggle - List/Kanban */}
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-r-none"
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="rounded-l-none"
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Kanban
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-2 flex-1 lg:flex-initial">
            <div className="relative flex-1 sm:flex-initial min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            
            {/* More Filters Dropdown */}
            <DropdownMenu open={moreFiltersOpen} onOpenChange={setMoreFiltersOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 h-9">
                  <Filter className="h-4 w-4" />
                  More Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-1 bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-xs">
                      {activeFiltersCount}
                    </span>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="p-3 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="To Do">To Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Priority</Label>
                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {(statusFilter !== 'All' || priorityFilter !== 'All') && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setStatusFilter('All')
                        setPriorityFilter('All')
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={() => setShowAddTask(true)} className="gap-2 h-9">
              <Plus className="h-4 w-4" />
              Create Task
            </Button>
          </div>
        </div>
      </div>

      {/* Task Detail Modal - Jira Style */}
      <Dialog open={showTaskDetail} onOpenChange={setShowTaskDetail}>
        <DialogContent className="sm:max-w-[1280px] w-[95vw] max-h-[90vh] p-0 shadow-2xl border-0">
          {selectedTask && (
            <div className="overflow-hidden">
              {/* Top Header Bar */}
              <div className="border-b border-border px-6 py-3 bg-background">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-foreground font-medium">{selectedTask.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(selectedTask.status)}`}>
                      {selectedTask.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => setShowTaskDetail(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main Header with Title and Status */}
              <div className="border-b border-border px-6 py-4 bg-background">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 mr-4">
                    {editingField === 'title' ? (
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => {
                          if (editValue.trim()) {
                            setSelectedTask({...selectedTask, title: editValue.trim()})
                          }
                          setEditingField(null)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if (editValue.trim()) {
                              setSelectedTask({...selectedTask, title: editValue.trim()})
                            }
                            setEditingField(null)
                          } else if (e.key === 'Escape') {
                            setEditingField(null)
                          }
                        }}
                        className="text-2xl font-semibold border-0 border-b-2 border-primary rounded-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                        style={{ 
                          fontSize: '1.5rem', 
                          lineHeight: '2rem', 
                          fontWeight: 600,
                          padding: '0.25rem 0.5rem',
                          margin: '0',
                          marginLeft: '-0.5rem',
                          height: '2.5rem',
                          width: '100%'
                        }}
                        autoFocus
                      />
                    ) : (
                      <h1 
                        className="text-2xl font-semibold text-foreground cursor-pointer hover:bg-muted/50 rounded transition-colors"
                        onClick={() => {
                          setEditValue(selectedTask.title)
                          setEditingField('title')
                        }}
                        style={{ 
                          margin: '0',
                          padding: '0.25rem 0.5rem',
                          marginLeft: '-0.5rem',
                          height: '2.5rem',
                          display: 'block',
                          lineHeight: '2rem'
                        }}
                      >
                        {selectedTask.title}
                      </h1>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Select defaultValue={selectedTask.status.toLowerCase().replace(' ', '-')}>
                      <SelectTrigger className="h-9 w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Main Content - Two Column Layout */}
              <div className="flex overflow-hidden" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                {/* Left Panel - Description and Activity */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 border-r border-border">
                  {/* Description Section */}
                  <div className="space-y-3">
                    <h2 className="text-base font-semibold text-foreground">Description</h2>
                    <div className="min-h-[60px] p-3 rounded-md border border-input bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                      <p className="text-sm text-muted-foreground">
                        {selectedTask.description || 'Edit description'}
                      </p>
                    </div>
                  </div>

                  {/* Activity Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-semibold text-foreground">Activity</h2>
                      <div className="flex items-center gap-1 border rounded-md">
                        <Button
                          variant={activityTab === 'All' ? 'default' : 'ghost'}
                          size="sm"
                          className="h-8 rounded-r-none"
                          onClick={() => setActivityTab('All')}
                        >
                          All
                        </Button>
                        <Button
                          variant={activityTab === 'Comments' ? 'default' : 'ghost'}
                          size="sm"
                          className="h-8 rounded-none"
                          onClick={() => setActivityTab('Comments')}
                        >
                          Comments
                        </Button>
                        <Button
                          variant={activityTab === 'History' ? 'default' : 'ghost'}
                          size="sm"
                          className="h-8 rounded-none"
                          onClick={() => setActivityTab('History')}
                        >
                          History
                        </Button>
                        <Button
                          variant={activityTab === 'Work log' ? 'default' : 'ghost'}
                          size="sm"
                          className="h-8 rounded-l-none"
                          onClick={() => setActivityTab('Work log')}
                        >
                          Work log
                        </Button>
                      </div>
                    </div>

                    {/* Comments Area */}
                    {activityTab === 'Comments' && (
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium flex-shrink-0">
                            {selectedTask.assigneeInitials}
                          </div>
                          <div className="flex-1 space-y-3">
                            <textarea
                              placeholder="Add a comment…"
                              className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            />
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" className="h-7 text-xs">
                                🎉 Looks good!
                              </Button>
                              <Button variant="outline" size="sm" className="h-7 text-xs">
                                👋 Need help?
                              </Button>
                              <Button variant="outline" size="sm" className="h-7 text-xs">
                                ⛔ This is blocked...
                              </Button>
                              <Button variant="outline" size="sm" className="h-7 text-xs">
                                🔍 Can you clarify...?
                              </Button>
                              <Button variant="outline" size="sm" className="h-7 text-xs">
                                ✅ This is on track
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              <strong>Pro tip:</strong> press <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">M</kbd> to comment
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Panel - Details */}
                <div className="w-[350px] overflow-y-auto px-6 py-6 space-y-6 bg-muted/20">
                  {/* Details Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-semibold text-foreground">Details</h2>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {/* Assignee */}
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">Assignee</Label>
                        {editingField === 'assignee' ? (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => {
                              setSelectedTask({...selectedTask, assignee: editValue || 'Unassigned'})
                              setEditingField(null)
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                setSelectedTask({...selectedTask, assignee: editValue || 'Unassigned'})
                                setEditingField(null)
                              } else if (e.key === 'Escape') {
                                setEditingField(null)
                              }
                            }}
                            className="h-8 text-sm"
                            autoFocus
                          />
                        ) : (
                          <button
                            className="w-full flex items-center gap-2 hover:bg-muted/50 px-2 py-1.5 rounded transition-colors text-left"
                            onClick={() => {
                              setEditValue(selectedTask.assignee || '')
                              setEditingField('assignee')
                            }}
                          >
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs">
                              <User className="h-4 w-4" />
                            </div>
                            <span className="text-sm text-foreground">{selectedTask.assignee || 'Unassigned'}</span>
                          </button>
                        )}
                        {!selectedTask.assignee && editingField !== 'assignee' && (
                          <Button variant="link" size="sm" className="h-auto p-0 text-xs text-[#1868DB]">
                            Assign to me
                          </Button>
                        )}
                      </div>

                      {/* Parent */}
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">Parent</Label>
                        {editingField === 'parent' ? (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => {
                              setEditingField(null)
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                setEditingField(null)
                              } else if (e.key === 'Escape') {
                                setEditingField(null)
                              }
                            }}
                            className="h-8 text-sm"
                            autoFocus
                            placeholder="Enter parent task ID"
                          />
                        ) : (
                          <button
                            className="w-full text-sm text-foreground hover:bg-muted/50 px-2 py-1.5 rounded transition-colors text-left"
                            onClick={() => {
                              setEditValue('')
                              setEditingField('parent')
                            }}
                          >
                            None
                          </button>
                        )}
                      </div>

                      {/* Due Date */}
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">Due date</Label>
                        {editingField === 'dueDate' ? (
                          <Input
                            type="date"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => {
                              setSelectedTask({...selectedTask, dueDate: editValue || 'None'})
                              setEditingField(null)
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                setSelectedTask({...selectedTask, dueDate: editValue || 'None'})
                                setEditingField(null)
                              } else if (e.key === 'Escape') {
                                setEditingField(null)
                              }
                            }}
                            className="h-8 text-sm"
                            autoFocus
                          />
                        ) : (
                          <button
                            className="w-full flex items-center gap-2 hover:bg-muted/50 px-2 py-1.5 rounded transition-colors text-left"
                            onClick={() => {
                              setEditValue(selectedTask.dueDate || '')
                              setEditingField('dueDate')
                            }}
                          >
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">{selectedTask.dueDate || 'None'}</span>
                          </button>
                        )}
                      </div>

                      {/* Labels */}
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">Labels</Label>
                        {editingField === 'labels' ? (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => {
                              setEditingField(null)
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                setEditingField(null)
                              } else if (e.key === 'Escape') {
                                setEditingField(null)
                              }
                            }}
                            className="h-8 text-sm"
                            autoFocus
                            placeholder="Enter labels (comma-separated)"
                          />
                        ) : (
                          <button
                            className="w-full text-sm text-foreground hover:bg-muted/50 px-2 py-1.5 rounded transition-colors text-left"
                            onClick={() => {
                              setEditValue('')
                              setEditingField('labels')
                            }}
                          >
                            None
                          </button>
                        )}
                      </div>

                      {/* Team */}
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">Team</Label>
                        {editingField === 'team' ? (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => {
                              setEditingField(null)
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                setEditingField(null)
                              } else if (e.key === 'Escape') {
                                setEditingField(null)
                              }
                            }}
                            className="h-8 text-sm"
                            autoFocus
                            placeholder="Enter team name"
                          />
                        ) : (
                          <button
                            className="w-full text-sm text-foreground hover:bg-muted/50 px-2 py-1.5 rounded transition-colors text-left"
                            onClick={() => {
                              setEditValue('')
                              setEditingField('team')
                            }}
                          >
                            None
                          </button>
                        )}
                      </div>

                      {/* Start Date */}
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">Start date</Label>
                        {editingField === 'startDate' ? (
                          <Input
                            type="date"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => {
                              setEditingField(null)
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                setEditingField(null)
                              } else if (e.key === 'Escape') {
                                setEditingField(null)
                              }
                            }}
                            className="h-8 text-sm"
                            autoFocus
                          />
                        ) : (
                          <button
                            className="w-full text-sm text-foreground hover:bg-muted/50 px-2 py-1.5 rounded transition-colors text-left"
                            onClick={() => {
                              setEditValue('')
                              setEditingField('startDate')
                            }}
                          >
                            None
                          </button>
                        )}
                      </div>

                      {/* Reporter */}
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">Reporter</Label>
                        {editingField === 'reporter' ? (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => {
                              setEditingField(null)
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                setEditingField(null)
                              } else if (e.key === 'Escape') {
                                setEditingField(null)
                              }
                            }}
                            className="h-8 text-sm"
                            autoFocus
                            placeholder="Enter reporter name"
                          />
                        ) : (
                          <button
                            className="w-full flex items-center gap-2 hover:bg-muted/50 px-2 py-1.5 rounded transition-colors text-left"
                            onClick={() => {
                              setEditValue('Sumit Chauhan')
                              setEditingField('reporter')
                            }}
                          >
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                              SC
                            </div>
                            <span className="text-sm text-foreground">Sumit Chauhan</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Task Modal - Same as Task Detail Modal */}
      <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
        <DialogContent className="sm:max-w-[1280px] w-[95vw] max-h-[90vh] p-0 shadow-2xl border-0">
          <div className="overflow-hidden">
            {/* Top Header Bar */}
            <div className="border-b border-border px-6 py-3 bg-background">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-foreground font-medium">NEW</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor('Pending')}`}>
                    Pending
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setShowAddTask(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Header with Title and Status */}
            <div className="border-b border-border px-6 py-4 bg-background">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 mr-4">
                  <Input 
                    placeholder="Enter task title" 
                    className="text-2xl font-semibold border-0 rounded-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                    style={{ 
                      fontSize: '1.5rem', 
                      lineHeight: '2rem', 
                      fontWeight: 600,
                      padding: '0.25rem 0.5rem',
                      margin: '0',
                      marginLeft: '-0.5rem',
                      height: '2.5rem',
                      width: '100%'
                    }}
                  />
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Select defaultValue="pending">
                    <SelectTrigger className="h-9 w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="flex overflow-hidden" style={{ maxHeight: 'calc(90vh - 200px)' }}>
              {/* Left Panel - Description and Activity */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 border-r border-border">
                {/* Description Section */}
                <div className="space-y-3">
                  <h2 className="text-base font-semibold text-foreground">Description</h2>
                  <div className="min-h-[60px] p-3 rounded-md border border-input bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                    <p className="text-sm text-muted-foreground">
                      Edit description
                    </p>
                  </div>
                </div>

                {/* Activity Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-foreground">Activity</h2>
                    <div className="flex items-center gap-1 border rounded-md">
                      <Button
                        variant={activityTab === 'All' ? 'default' : 'ghost'}
                        size="sm"
                        className="h-8 rounded-r-none"
                        onClick={() => setActivityTab('All')}
                      >
                        All
                      </Button>
                      <Button
                        variant={activityTab === 'Comments' ? 'default' : 'ghost'}
                        size="sm"
                        className="h-8 rounded-none"
                        onClick={() => setActivityTab('Comments')}
                      >
                        Comments
                      </Button>
                      <Button
                        variant={activityTab === 'History' ? 'default' : 'ghost'}
                        size="sm"
                        className="h-8 rounded-none"
                        onClick={() => setActivityTab('History')}
                      >
                        History
                      </Button>
                      <Button
                        variant={activityTab === 'Work log' ? 'default' : 'ghost'}
                        size="sm"
                        className="h-8 rounded-l-none"
                        onClick={() => setActivityTab('Work log')}
                      >
                        Work log
                      </Button>
                    </div>
                  </div>

                  {/* Comments Area */}
                  {activityTab === 'Comments' && (
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium flex-shrink-0">
                          SC
                        </div>
                        <div className="flex-1 space-y-3">
                          <textarea
                            placeholder="Add a comment…"
                            className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          />
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              🎉 Looks good!
                            </Button>
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              👋 Need help?
                            </Button>
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              ⛔ This is blocked...
                            </Button>
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              🔍 Can you clarify...?
                            </Button>
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              ✅ This is on track
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            <strong>Pro tip:</strong> press <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">M</kbd> to comment
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Panel - Details */}
              <div className="w-[350px] overflow-y-auto px-6 py-6 space-y-6 bg-muted/20">
                {/* Details Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-foreground">Details</h2>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* Assignee */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground">Assignee</Label>
                      {editingField === 'assignee' ? (
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => {
                            setEditingField(null)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setEditingField(null)
                            } else if (e.key === 'Escape') {
                              setEditingField(null)
                            }
                          }}
                          className="h-8 text-sm"
                          autoFocus
                        />
                      ) : (
                        <button
                          className="w-full flex items-center gap-2 hover:bg-muted/50 px-2 py-1.5 rounded transition-colors text-left"
                          onClick={() => {
                            setEditValue('')
                            setEditingField('assignee')
                          }}
                        >
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs">
                            <User className="h-4 w-4" />
                          </div>
                          <span className="text-sm text-foreground">Unassigned</span>
                        </button>
                      )}
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs text-[#1868DB]">
                        Assign to me
                      </Button>
                    </div>

                    {/* Parent */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground">Parent</Label>
                      {editingField === 'parent' ? (
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => {
                            setEditingField(null)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setEditingField(null)
                            } else if (e.key === 'Escape') {
                              setEditingField(null)
                            }
                          }}
                          className="h-8 text-sm"
                          autoFocus
                          placeholder="Enter parent task ID"
                        />
                      ) : (
                        <button
                          className="w-full text-sm text-foreground hover:bg-muted/50 px-2 py-1.5 rounded transition-colors text-left"
                          onClick={() => {
                            setEditValue('')
                            setEditingField('parent')
                          }}
                        >
                          None
                        </button>
                      )}
                    </div>

                    {/* Due Date */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground">Due date</Label>
                      {editingField === 'dueDate' ? (
                        <Input
                          type="date"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => {
                            setEditingField(null)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setEditingField(null)
                            } else if (e.key === 'Escape') {
                              setEditingField(null)
                            }
                          }}
                          className="h-8 text-sm"
                          autoFocus
                        />
                      ) : (
                        <button
                          className="w-full flex items-center gap-2 hover:bg-muted/50 px-2 py-1.5 rounded transition-colors text-left"
                          onClick={() => {
                            setEditValue('')
                            setEditingField('dueDate')
                          }}
                        >
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">None</span>
                        </button>
                      )}
                    </div>

                    {/* Labels */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground">Labels</Label>
                      {editingField === 'labels' ? (
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => {
                            setEditingField(null)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setEditingField(null)
                            } else if (e.key === 'Escape') {
                              setEditingField(null)
                            }
                          }}
                          className="h-8 text-sm"
                          autoFocus
                          placeholder="Enter labels (comma-separated)"
                        />
                      ) : (
                        <button
                          className="w-full text-sm text-foreground hover:bg-muted/50 px-2 py-1.5 rounded transition-colors text-left"
                          onClick={() => {
                            setEditValue('')
                            setEditingField('labels')
                          }}
                        >
                          None
                        </button>
                      )}
                    </div>

                    {/* Team */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground">Team</Label>
                      {editingField === 'team' ? (
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => {
                            setEditingField(null)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setEditingField(null)
                            } else if (e.key === 'Escape') {
                              setEditingField(null)
                            }
                          }}
                          className="h-8 text-sm"
                          autoFocus
                          placeholder="Enter team name"
                        />
                      ) : (
                        <button
                          className="w-full text-sm text-foreground hover:bg-muted/50 px-2 py-1.5 rounded transition-colors text-left"
                          onClick={() => {
                            setEditValue('')
                            setEditingField('team')
                          }}
                        >
                          None
                        </button>
                      )}
                    </div>

                    {/* Start Date */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground">Start date</Label>
                      {editingField === 'startDate' ? (
                        <Input
                          type="date"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => {
                            setEditingField(null)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setEditingField(null)
                            } else if (e.key === 'Escape') {
                              setEditingField(null)
                            }
                          }}
                          className="h-8 text-sm"
                          autoFocus
                        />
                      ) : (
                        <button
                          className="w-full text-sm text-foreground hover:bg-muted/50 px-2 py-1.5 rounded transition-colors text-left"
                          onClick={() => {
                            setEditValue('')
                            setEditingField('startDate')
                          }}
                        >
                          None
                        </button>
                      )}
                    </div>

                    {/* Reporter */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground">Reporter</Label>
                      {editingField === 'reporter' ? (
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => {
                            setEditingField(null)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setEditingField(null)
                            } else if (e.key === 'Escape') {
                              setEditingField(null)
                            }
                          }}
                          className="h-8 text-sm"
                          autoFocus
                          placeholder="Enter reporter name"
                        />
                      ) : (
                        <button
                          className="w-full flex items-center gap-2 hover:bg-muted/50 px-2 py-1.5 rounded transition-colors text-left"
                          onClick={() => {
                            setEditValue('Sumit Chauhan')
                            setEditingField('reporter')
                          }}
                        >
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                            SC
                          </div>
                          <span className="text-sm text-foreground">Sumit Chauhan</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Table View */}
      {viewMode === 'list' && (
        <Card className="rounded-[4px] w-full max-w-full overflow-hidden">
          <CardContent className="p-0 w-full overflow-x-auto max-w-full">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[80px] h-10 px-3 text-xs font-normal whitespace-nowrap">Type</TableHead>
                  <TableHead className="w-[100px] h-10 px-3 text-xs font-normal whitespace-nowrap">Key</TableHead>
                  <TableHead className="w-[200px] h-10 px-3 text-xs font-normal whitespace-nowrap">Summary</TableHead>
                  <TableHead className="w-[120px] h-10 px-3 text-xs font-normal whitespace-nowrap">Status</TableHead>
                  <TableHead className="w-[150px] h-10 px-3 text-xs font-normal whitespace-nowrap">Assignee</TableHead>
                  <TableHead className="w-[120px] h-10 px-3 text-xs font-normal whitespace-nowrap">Due Date</TableHead>
                  <TableHead className="w-[100px] h-10 px-3 text-xs font-normal whitespace-nowrap">Comments</TableHead>
                  <TableHead className="w-[150px] h-10 px-3 text-xs font-normal whitespace-nowrap">Labels</TableHead>
                  <TableHead className="w-[150px] h-10 px-3 text-xs font-normal whitespace-nowrap">Created At</TableHead>
                  <TableHead className="w-[150px] h-10 px-3 text-xs font-normal whitespace-nowrap">Updated At</TableHead>
                  <TableHead className="w-[150px] h-10 px-3 text-xs font-normal whitespace-nowrap">Reported At</TableHead>
                  <TableHead className="w-[50px] h-10 px-3 text-xs font-normal whitespace-nowrap"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center py-8 text-muted-foreground">
                      No tasks found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id} className="hover:bg-muted/50">
                      <TableCell className="px-3 py-2 whitespace-nowrap">
                        <span className={`text-xs px-1.5 py-0.5 rounded ${getTypeColor(task.type)}`}>
                          {task.type}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-2 text-xs whitespace-nowrap">{task.key || task.id}</TableCell>
                      <TableCell className="px-3 py-2 whitespace-nowrap">
                        <div 
                          className="flex items-center gap-2 cursor-pointer hover:text-primary"
                          onClick={() => {
                            setSelectedTask(task)
                            setShowTaskDetail(true)
                          }}
                        >
                          <span className="text-xs text-black">{task.summary || task.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2 whitespace-nowrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs flex-shrink-0">
                            {task.assignee?.initials || task.assigneeInitials}
                          </div>
                          <span className="text-xs">{task.assignee?.name || task.assignee || 'Unassigned'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2 text-xs whitespace-nowrap">{formatDate(task.dueDate)}</TableCell>
                      <TableCell className="px-3 py-2 text-xs whitespace-nowrap">
                        {task.comments?.length || 0} {task.comments?.length === 1 ? 'comment' : 'comments'}
                      </TableCell>
                      <TableCell className="px-3 py-2 whitespace-nowrap">
                        <div className="flex gap-1 overflow-hidden">
                          {task.labels && task.labels.length > 0 ? (
                            task.labels.map((label, idx) => (
                              <span key={idx} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground flex-shrink-0">
                                {label}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground">None</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2 text-xs whitespace-nowrap">{formatDateTime(task.createdAt)}</TableCell>
                      <TableCell className="px-3 py-2 text-xs whitespace-nowrap">{formatDateTime(task.updatedAt)}</TableCell>
                      <TableCell className="px-3 py-2 text-xs whitespace-nowrap">{formatDateTime(task.reportedAt)}</TableCell>
                      <TableCell className="px-3 py-2 whitespace-nowrap">
                        <div className="relative">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => setOpenMenuId(openMenuId === task.id ? null : task.id)}
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                          {openMenuId === task.id && (
                            <>
                              <div 
                                className="fixed inset-0 z-40"
                                onClick={() => setOpenMenuId(null)}
                              />
                              <div className="absolute right-0 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                                <div 
                                  className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent"
                                  onClick={() => {
                                    setOpenMenuId(null)
                                    const task = tasks.find(t => t.id === openMenuId)
                                    if (task) {
                                      setSelectedTask(task)
                                      setShowTaskDetail(true)
                                    }
                                  }}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </div>
                                <div 
                                  className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent text-destructive"
                                  onClick={() => {
                                    setOpenMenuId(null)
                                    // Handle delete
                                  }}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </div>
                                <div 
                                  className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent"
                                  onClick={() => {
                                    setOpenMenuId(null)
                                    const task = tasks.find(t => t.id === openMenuId)
                                    if (task) {
                                      setSelectedTask(task)
                                      setShowTaskDetail(true)
                                    }
                                  }}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                {/* Create Task Row */}
                <TableRow className="hover:bg-muted/50 border-t-2">
                  <TableCell colSpan={12} className="px-3 py-2">
                    <button
                      className="w-full flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
                      onClick={() => setShowAddTask(true)}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create Task</span>
                    </button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="grid gap-4 md:grid-cols-3">
          {kanbanColumns.map((column) => (
            <div key={column.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{column.title}</h3>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {column.tasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <Card 
                    key={task.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      setSelectedTask(task)
                      setShowTaskDetail(true)
                    }}
                  >
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-muted-foreground">{task.id}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(task.type)}`}>
                                {task.type}
                              </span>
                            </div>
                            <h4 className="font-semibold text-sm">{task.title}</h4>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {task.description}
                        </p>
                        <div className="pt-2 border-t flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {task.assigneeInitials}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{task.timeSpent}</span>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {column.tasks.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground border-2 border-dashed rounded-lg">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
