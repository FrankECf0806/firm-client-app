import { Box } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./Sidebar/config";

export function MobileSidebar() {
  const pathname = usePathname();
  const isActive = (p: string) =>
    pathname === p || pathname?.startsWith(`${p}/`);

  return (
    <Box
      className="
                fixed bottom-0 left-0 right-0 z-50
                flex md:hidden justify-around items-center
                bg-white border-t border-primary/15 shadow-lg py-2"
    >
      {navItems.map((item) => {
        const active = isActive(item.path);
        return (
          <Link key={item.path} href={item.path}>
            <Box
              className={`
                                w-10 h-10 flex items-center justify-center rounded-lg
                                transition-all
                                ${active ? "bg-primary text-white" : "text-primary"}
                         `}
            >
              {item.icon}
            </Box>
          </Link>
        );
      })}
    </Box>
  );
}
