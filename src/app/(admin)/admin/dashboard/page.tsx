import OrdersOverviewChart from '@/components/ui/OrdersOverviewChart'
import { capitalizeFirstLetterOfEachWord } from '@/lib/constants'
import { format } from 'date-fns'
import { FileText, Package, ShoppingCart, TrendingUp, Trophy, Users } from 'lucide-react'
import { Metadata } from 'next'

type IDashboard = {
    analytics: {
        total_orders: number
        total_products: number
        total_blogs: number
        total_installers: number
    }
    order_overview: { month: string; Orders: number }[]
    sales_by_category: { category: string; orders: number }[]
    new_orders: {
        id: number
        product_name: string
        email: string
        phone: string
        fullnames: string
        additionalMessage: string
        qty: number
        created_at: string
    }[]
    top_products: { product_name: string; total_qty: number | string }[]
}

export const metadata: Metadata = {
    title: 'Admin Dashboard — Felicity Solar',
    description: 'Felicity Solar admin dashboard',
}

const STAT_CARDS = (a: IDashboard['analytics']) => [
    {
        label: 'Total Orders',
        value: a.total_orders,
        icon: ShoppingCart,
        iconBg: 'bg-orange-50',
        iconColor: 'text-primary',
        accentBar: 'bg-primary',
    },
    {
        label: 'Total Products',
        value: a.total_products,
        icon: Package,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-500',
        accentBar: 'bg-blue-400',
    },
    {
        label: 'Blog Articles',
        value: a.total_blogs,
        icon: FileText,
        iconBg: 'bg-violet-50',
        iconColor: 'text-violet-500',
        accentBar: 'bg-violet-400',
    },
    {
        label: 'Total Installers',
        value: a.total_installers,
        icon: Users,
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-500',
        accentBar: 'bg-emerald-400',
    },
]

async function DashboardPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard`, {
        next: { revalidate: 60 },
        credentials: 'include',
    })

    if (!res.ok) {
        return (
            <div className="flex h-full items-center justify-center">
                <p className="font-inter text-sm text-red-500">Failed to load dashboard data.</p>
            </div>
        )
    }

    const response: { data: IDashboard; status: number } = await res.json()

    if (!response?.data) {
        return (
            <div className="flex h-full items-center justify-center">
                <p className="font-inter text-sm text-red-500">An error occurred loading data.</p>
            </div>
        )
    }

    const { analytics, order_overview, new_orders, top_products } = response.data
    const maxOrders = Math.max(...top_products.map((p) => Number(p.total_qty)), 1)

    return (
        <div className="flex flex-col h-full overflow-hidden">

            {/* Top bar */}
            <div className="hidden md:flex shrink-0 h-16 bg-white border-b border-grey-100 items-center px-8">
                <h1 className="font-inter text-grey-900 font-bold text-xl tracking-tight">Dashboard</h1>
                <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-inter font-medium text-grey-500 bg-grey-75 border border-grey-200 rounded-full px-3 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                </span>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 xl:px-8 py-6 xl:py-8 bg-grey-75 space-y-7">

                {/* Welcome */}
                <div>
                    <h2 className="font-inter font-semibold text-2xl text-grey-900 tracking-tight">
                        Welcome back, Admin 👋
                    </h2>
                    <p className="font-inter text-sm text-grey-500 mt-1">
                        {format(new Date(), "EEEE, do MMMM yyyy")}
                    </p>
                </div>

                {/* KPI cards */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                    {STAT_CARDS(analytics).map(({ label, value, icon: Icon, iconBg, iconColor, accentBar }) => (
                        <div key={label} className="bg-white rounded-2xl border border-grey-100 shadow-sm overflow-hidden">
                            <div className={`h-1 w-full ${accentBar}`} />
                            <div className="p-5 flex flex-col gap-4">
                                <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
                                    <Icon size={18} className={iconColor} />
                                </div>
                                <div>
                                    <p className="font-inter text-xs font-medium text-grey-400 uppercase tracking-widest">{label}</p>
                                    <h3 className="font-inter text-[2rem] font-bold text-grey-900 leading-tight mt-1">
                                        {value.toLocaleString()}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts row */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                    {/* Orders chart */}
                    <div className="xl:col-span-2 bg-white rounded-2xl border border-grey-100 shadow-sm overflow-hidden h-[400px]">
                        <OrdersOverviewChart initialData={order_overview} initialYear={new Date().getFullYear()} />
                    </div>

                    {/* Top products */}
                    <div className="bg-white rounded-2xl border border-grey-100 shadow-sm h-[400px] overflow-hidden flex flex-col">
                        <div className="flex items-center gap-2 px-6 pt-6 pb-4 border-b border-grey-100 shrink-0">
                            <Trophy size={15} className="text-primary" />
                            <h2 className="font-inter font-semibold text-sm text-grey-900">Top Selling Products</h2>
                        </div>
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            {top_products.length > 0 ? (
                                <div className="flex flex-col gap-5">
                                    {top_products.map((t, i) => (
                                        <div key={i} className="flex flex-col gap-2">
                                            <div className="flex justify-between items-center gap-3">
                                                <p className="font-inter text-xs font-medium text-grey-700 break-words">{t.product_name}</p>
                                                <span className="font-inter text-xs font-bold text-primary shrink-0">
                                                    {Number(t.total_qty).toLocaleString()} <span className="font-normal text-grey-400">units</span>
                                                </span>
                                            </div>
                                            <div className="w-full h-1.5 bg-grey-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full transition-all duration-500"
                                                    style={{ width: `${Math.round((Number(t.total_qty) / maxOrders) * 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
                                    <TrendingUp size={32} className="text-grey-200" />
                                    <p className="font-inter text-sm text-grey-400">No sales data yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent orders table */}
                {new_orders.length > 0 && (
                    <div className="bg-white rounded-2xl border border-grey-100 shadow-sm overflow-hidden">
                        <div className="flex items-center gap-3 px-6 py-5 border-b border-grey-100">
                            <ShoppingCart size={15} className="text-primary" />
                            <h2 className="font-inter font-semibold text-sm text-grey-900">Recent Orders</h2>
                            <span className="ml-auto font-inter text-xs text-grey-400 bg-grey-75 border border-grey-200 rounded-full px-2.5 py-0.5">
                                {new_orders.length} entries
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm font-inter">
                                <thead>
                                    <tr className="bg-grey-75 text-grey-400 text-[11px] uppercase tracking-wider">
                                        <th className="px-6 py-3 text-left font-semibold w-40">Customer</th>
                                        <th className="px-6 py-3 text-left font-semibold w-[35%]">Product</th>
                                        <th className="px-6 py-3 text-left font-semibold w-12">Qty</th>
                                        <th className="px-6 py-3 text-left font-semibold w-36">Phone</th>
                                        <th className="px-6 py-3 text-left font-semibold w-48">Email</th>
                                        <th className="px-6 py-3 text-left font-semibold w-40">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-grey-100">
                                    {new_orders.map((order) => {
                                        const initials = order.fullnames
                                            .split(' ')
                                            .map((n) => n[0] ?? '')
                                            .join('')
                                            .slice(0, 2)
                                            .toUpperCase()
                                        return (
                                            <tr key={order.id} className="hover:bg-grey-75 transition-colors duration-150">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-orange-100 text-primary text-[11px] font-bold flex items-center justify-center shrink-0">
                                                            {initials}
                                                        </div>
                                                        <span className="text-grey-800 font-medium whitespace-nowrap">
                                                            {capitalizeFirstLetterOfEachWord(order.fullnames)}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-grey-600">
                                                    <span>{order.product_name}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-grey-100 text-grey-700 font-semibold text-xs">
                                                        {order.qty}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-grey-600 whitespace-nowrap">{order.phone}</td>
                                                <td className="px-6 py-4 text-grey-500 whitespace-nowrap">{order.email}</td>
                                                <td className="px-6 py-4 text-grey-400 whitespace-nowrap text-xs">
                                                    {format(new Date(order.created_at), "do MMM yyyy, h:mmaaa")}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {new_orders.length === 0 && (
                    <div className="bg-white rounded-2xl border border-grey-100 shadow-sm p-12 flex flex-col items-center gap-3 text-center">
                        <ShoppingCart size={36} className="text-grey-200" />
                        <p className="font-inter text-sm text-grey-400">No orders yet</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default DashboardPage