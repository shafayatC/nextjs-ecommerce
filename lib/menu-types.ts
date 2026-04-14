// Shared types for the admin dashboard

export interface MenuItem {
  id: string;
  name: string;
  icon?: string;
  route: string;
  parentId: string | null;
  enabled: boolean;
  roles: string[];
  children: MenuItem[];
}
