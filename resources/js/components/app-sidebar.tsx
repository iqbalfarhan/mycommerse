import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Bike, BookOpen, Box, Database, Grid2X2Check, KeySquare, LayoutGrid, ShoppingCart, Star, Users, Wallet } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
    icon: LayoutGrid,
  },
  {
    title: 'Documentation',
    href: route('documentation'),
    icon: BookOpen,
  },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
  const {
    menus,
    auth: { carts },
  } = usePage<SharedData & { menus: Record<string, boolean> }>().props;

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="space-y-4">
        <NavMain
          items={[
            ...mainNavItems,
            {
              title: 'Keranjang belanja',
              href: route('cart.index'),
              icon: ShoppingCart,
              badge: carts.length,
              available: menus.cart,
            },
            {
              title: 'Riwayat belanja',
              href: route('transaction.index'),
              icon: Wallet,
              available: menus.transaction,
            },
          ]}
          label="Dashboard"
        />
        <NavMain
          items={[
            {
              title: 'Pesanan terbaru',
              href: route('order.index'),
              icon: Wallet,
              available: menus.category,
            },
            {
              title: 'Product category',
              href: route('category.index'),
              icon: Grid2X2Check,
              available: menus.category,
            },
            {
              title: 'Product lists',
              href: route('product.index'),
              icon: Box,
              available: menus.product,
            },
            {
              title: 'Shipping courier',
              href: route('courier.index'),
              icon: Bike,
              available: menus.courier,
            },
            {
              title: 'Review produk',
              href: route('review.index'),
              icon: Star,
              available: menus.courier,
            },
          ]}
          label="Products"
        />
        <NavMain
          items={[
            {
              title: 'User management',
              href: route('user.index'),
              icon: Users,
              available: menus.user,
            },
            {
              title: 'Role & permission',
              href: route('role.index'),
              icon: KeySquare,
              available: menus.role,
            },
            {
              title: 'Adminer database',
              href: '/adminer',
              icon: Database,
              available: menus.adminer,
            },
          ]}
          label="Settings"
        />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
