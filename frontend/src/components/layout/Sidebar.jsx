import {
  AlertTriangle,
  ClipboardList,
  LayoutDashboard,
  Package,
  Settings,
  Tags,
} from 'lucide-react'

import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const menuSections = [
  {
    label: 'Accueil',
    items: [
      {
        title: 'Tableau de bord',
        icon: LayoutDashboard,
        page: 'dashboard',
      },
    ],
  },
  {
    label: 'Stock',
    items: [
      {
        title: 'Mes produits',
        icon: Package,
        page: 'products',
      },
      {
        title: 'Catégories',
        icon: Tags,
      },
    ],
  },
  {
    label: 'Planification',
    items: [
      {
        title: 'Liste de courses',
        icon: ClipboardList,
      },
    ],
  },
  {
    label: 'Surveillance',
    items: [
      {
        title: 'À surveiller',
        icon: AlertTriangle,
        badge: 5,
      },
    ],
  },
]

function Sidebar({ currentPage, onNavigate }) {
  return (
    <SidebarUI>
      <SidebarContent>
        {/* Logo / identité */}
        <div className="px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center text-primary">
              FM
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold tracking-tight">
                Food Manager
              </h1>

              <p className="truncate text-xs text-muted-foreground">
                Gestion alimentaire
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {menuSections.map((section) => (
          <SidebarGroup key={section.label} className="px-3">
            <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {section.label}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.page === currentPage}
                      onClick={() => item.page && onNavigate(item.page)}
                      className="h-10 rounded-lg px-3 transition-colors"
                      tooltip={item.title}
                    >
                      <item.icon className="size-[18px]" />
                      <span className="font-medium">
                        {item.title}
                      </span>
                    </SidebarMenuButton>

                    {item.badge && (
                      <SidebarMenuBadge className="right-2 rounded-full bg-destructive px-2 text-[11px] font-semibold text-white">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Paramètres */}
      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-10 rounded-lg px-3 transition-colors"
              tooltip="Paramètres"
            >
              <Settings className="size-[18px]" />
              <span className="font-medium">
                Paramètres
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarUI>
  )
}

export default Sidebar