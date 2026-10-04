import { Sidebar } from "@/components/staff/Sidebar";
import { classroom, currentUser } from "@/lib/sample-data";

export default function StaffLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar user={currentUser} classroom={classroom} />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
