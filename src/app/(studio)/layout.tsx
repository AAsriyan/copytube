import { StudioLayout } from "@/modules/studio/ui/layouts/home-layout";

interface StudioLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: StudioLayoutProps) => {
  return <StudioLayout>{children}</StudioLayout>;
};

export default Layout;
