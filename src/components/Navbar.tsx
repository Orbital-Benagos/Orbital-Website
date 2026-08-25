import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu09Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";

interface NavigationProps {
  name: string;
  link: string;
}

const Navbar = () => {
  const navigations: NavigationProps[] = [
    { name: "Platform", link: "#Platform" },
    { name: "Solution", link: "#Solution" },
    { name: "Capabilities", link: "#Capabilities" },
    { name: "Securities", link: "#Securities" },
    { name: "How you go live", link: "#How you go live" },
    { name: "FAQs", link: "#FAQs" },
  ];

  const [activeLink, setActiveLink] = useState<string>(navigations?.[0]?.name);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <motion.div
      className="bg-transparent absolute top-0 inset-x-0 z-10 px-3 sm:px-6 lg:px-10 2xl:px-0 py-4 h-fit"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="max-w-[1350px] w-full mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="w-30 h-10 relative">
            <Image
              src="/assets/logo white.svg"
              fill
              alt=""
              className="object-contain"
            />
          </div>
        </Link>

        <div className="lg:flex gap-8 items-center hidden">
          {navigations?.map((n: NavigationProps, index: number) => {
            const active = n.name === activeLink;
            return (
              <Link
                href={n.link}
                key={index}
                className="cursor-pointer"
                onClick={() => setActiveLink(n.name)}
              >
                <p
                  className={`text-sm ${active ? "text-white underline underline-offset-12 decoration-[2px] decoration-blue font-medium" : "text-white/40 no-underline font-medium"}`}
                >
                  {n.name}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="lg:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger>
              {" "}
              <HugeiconsIcon
                icon={Menu09Icon}
                className="text-[#878F98] size-6 cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="!w-[350px] flex flex-col bg-[#1D1E1F]">
              <div className="flex flex-col w-fit mx-auto px-14 mt-10">
                {navigations?.map((n: NavigationProps, index: number) => {
                  const active = n.name === activeLink;
                  return (
                    <Link
                      href={n.link}
                      key={index}
                      className={`cursor-pointer w-full text-center py-3 px-2 ${active ? "text-white border-b-2 border-blue font-medium" : "text-white/40 no-underline font-medium"}`}
                      onClick={() => setActiveLink(n.name)}
                    >
                      <p>{n.name}</p>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
