import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Settings, 
  Calendar,
  FileText,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Projects',
    icon: FolderKanban,
    href: '/dashboard/projects',
  },
  {
    title: 'Tasks',
    icon: FileText,
    href: '/dashboard/tasks',
  },
  {
    title: 'Team',
    icon: Users,
    href: '/dashboard/team',
  },
  {
    title: 'Calendar',
    icon: Calendar,
    href: '/dashboard/calendar',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '/dashboard/analytics',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
  },
]

export function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="grid flex-1 w-full md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr] overflow-hidden">
        <Sidebar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:p-6 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex-1">
              <nav className="grid items-start px-2 pt-4 text-sm font-medium lg:px-4">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 transition-all",
                        isActive ? "" : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                      )}
                      style={isActive ? { 
                        backgroundColor: '#CFE1FD', 
                        color: '#1868DB', 
                        borderRadius: '5px',
                        fontWeight: '600'
                      } : {}}
                    >
                      <Icon className="h-4 w-4" style={isActive ? { color: '#1868DB' } : {}} />
                      {item.title}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

