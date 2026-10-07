import { useState } from 'react'
import ProductsPage from '@/pages/ProductsPage'
import {
  AlertTriangle,
  Bell,
  ChevronDown,
  ClipboardList,
  Package,
  User,
} from 'lucide-react'

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import Sidebar from './components/layout/Sidebar'

const stockSummary = {
  products: 32,
  monitored: 5,
  shopping: 8,
}
const monitoredProducts = [
  {
    name: 'Poulet',
    category: 'Viande',
    quantity: '1 kg',
    expiry: 'Demain',
    status: 'urgent',
  },
  {
    name: 'Lait',
    category: 'Produits frais',
    quantity: '2 L',
    expiry: 'Dans 3 jours',
    status: 'warning',
  },
  {
    name: 'Yaourts',
    category: 'Produits frais',
    quantity: '8 unités',
    expiry: 'Dans 5 jours',
    status: 'warning',
  },
]


function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  return (
    <SidebarProvider>
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-background px-4">
          {/* Partie gauche */}
          <div className="flex items-center gap-3">
            <SidebarTrigger />

            <div className="hidden h-5 w-px bg-border sm:block" />

            <div>
              <p className="text-sm font-semibold">
                Tableau de bord
              </p>

              <p className="hidden text-xs text-muted-foreground sm:block">
                Vue d'ensemble de votre gestion alimentaire
              </p>
            </div>
          </div>

          {/* Partie droite */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              aria-label="Notifications"
            >
              <Bell className="size-[18px]" />

              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
            </Button>

            <div className="mx-1 hidden h-6 w-px bg-border sm:block" />

            <Button
              variant="ghost"
              className="gap-2 rounded-lg px-2"
            >
              <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <User className="size-4" />
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium">
                  Thierry
                </p>

                <p className="text-xs text-muted-foreground">
                  Administrateur
                </p>
              </div>

              <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
            </Button>
          </div>
        </header>

        {/* Contenu */}
        {/* Contenu */}
{currentPage === 'products' ? (
  <ProductsPage />
) : (
  <main className="min-h-[calc(100vh-4rem)] bg-muted/30 p-4 sm:p-6">
    {/* Introduction */}
    <section>
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        Vue d'ensemble
      </p>

      <h1 className="mt-1 text-2xl font-semibold tracking-tight">
        Bonjour Thierry
      </h1>

      <p className="mt-1 text-sm text-muted-foreground">
        Voici ce qui mérite votre attention aujourd'hui.
      </p>
    </section>

    {/* Résumé du stock */}
    <section className="mt-6 border-y bg-background">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 sm:px-5">
        <span className="text-sm font-medium">
          Votre stock
        </span>

        <span className="text-sm text-muted-foreground">
          {stockSummary.products} produits
        </span>

        <span className="text-muted-foreground">·</span>

        <span className="text-sm text-orange-600">
          {stockSummary.monitored} à surveiller
        </span>

        <span className="text-muted-foreground">·</span>

        <span className="text-sm text-muted-foreground">
          {stockSummary.shopping} à acheter
        </span>
      </div>
    </section>

    {/* À surveiller */}
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Surveillance
          </p>

          <h2 className="mt-1 text-lg font-semibold tracking-tight">
            À surveiller
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Les produits dont la date d'expiration approche.
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="hidden text-primary hover:text-primary sm:inline-flex"
        >
          Voir tout
        </Button>
      </div>

      <div className="overflow-hidden border-y bg-background">
        {monitoredProducts.map((product, index) => {
          const isUrgent = product.status === 'urgent'

          return (
            <div
              key={product.name}
              className={`flex items-center justify-between gap-6 px-4 py-4 transition-colors hover:bg-muted/40 sm:px-5 ${
                index !== monitoredProducts.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="flex min-w-0 items-center gap-4">
                <div
                  className={`size-2 shrink-0 rounded-full ${
                    isUrgent ? 'bg-red-500' : 'bg-orange-400'
                  }`}
                />

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {product.name}
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {product.category} · {product.quantity}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p
                  className={`text-sm font-medium ${
                    isUrgent ? 'text-red-600' : 'text-orange-600'
                  }`}
                >
                  {isUrgent
                    ? 'Expire demain'
                    : `Expire ${product.expiry.toLowerCase()}`}
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {product.expiry}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="mt-3 w-full text-primary hover:text-primary sm:hidden"
      >
        Voir tout
      </Button>
    </section>
  </main>
)}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App