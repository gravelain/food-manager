import { Plus, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const products = [
  {
    name: 'Poulet',
    category: 'Viande',
    articleCount: 1,
    expiry: 'Demain',
    expiryLevel: 'critical',
  },
  {
    name: 'Lait',
    category: 'Produits frais',
    articleCount: 2,
    expiry: 'Dans 3 jours',
    expiryLevel: 'warning',
  },
  {
    name: 'Riz',
    category: 'Épicerie',
    articleCount: 1,
    expiry: '—',
    expiryLevel: 'unknown',
  },
  {
    name: 'Yaourts',
    category: 'Produits frais',
    articleCount: 8,
    expiry: 'Dans 5 jours',
    expiryLevel: 'warning',
  },
  {
    name: 'Tomates',
    category: 'Légumes',
    articleCount: 6,
    expiry: 'Dans 8 jours',
    expiryLevel: 'good',
  },
]

const expiryConfig = {
  critical: {
    className: 'font-semibold text-red-600',
    dotClassName: 'bg-red-500',
  },
  warning: {
    className: 'font-semibold text-orange-600',
    dotClassName: 'bg-orange-400',
  },
  good: {
    className: 'font-medium text-emerald-600',
    dotClassName: 'bg-emerald-500',
  },
  unknown: {
    className: 'font-medium text-muted-foreground',
    dotClassName: '',
  },
}

function ProductsPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-muted/30 p-4 sm:p-6">
      <section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Stock
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              Mes produits
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Gérez votre stock et suivez les dates d'expiration.
            </p>
          </div>

          <Button className="gap-2">
            <Plus className="size-4" />
            Ajouter un produit
          </Button>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Rechercher un produit..."
              className="h-10 bg-background pl-9"
            />
          </div>

          <Button
            variant="outline"
            className="h-10 bg-background"
          >
            Toutes les catégories
          </Button>

          <Button
            variant="outline"
            className="h-10 bg-background"
          >
            Filtrer
          </Button>
        </div>
      </section>

      <section className="mt-6 overflow-hidden border-y bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] bg-white text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-left">
                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Produit
                </th>

                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Catégorie
                </th>

                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Articles
                </th>

                <th className="px-5 py-3 font-semibold text-foreground">
                  Expiration
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                const expiry = expiryConfig[product.expiryLevel]

                return (
                  <tr
                    key={product.name}
                    className="border-b bg-white last:border-b-0 hover:bg-muted/30"
                  >
                    <td className="px-5 py-4 font-medium">
                      {product.name}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {product.category}
                    </td>

                    <td className="px-5 py-4">
                      {product.articleCount}
                    </td>

                    <td className="px-5 py-4">
                      <div
                        className={`flex items-center gap-2 ${expiry.className}`}
                      >
                        {expiry.dotClassName && (
                          <span
                            className={`size-2 shrink-0 rounded-full ${expiry.dotClassName}`}
                          />
                        )}

                        <span>
                          {product.expiry}
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-3 text-xs text-muted-foreground">
        {products.length} produits affichés
      </p>
    </main>
  )
}

export default ProductsPage