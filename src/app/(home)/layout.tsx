import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";

// TOOD: Confirm if this is needed
export const dynamic = "force-dynamic";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: HomeLayoutProps) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default Layout;
