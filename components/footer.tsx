import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black/20 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-4 text-[#100d1b] dark:text-white">
            <div className="text-primary">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={48}
                  height={48}
                />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <Link href="/legal">
            <Button variant="ghost"
              className="text-sm text-[#594c9a] dark:text-gray-400 hover:text-primary dark:hover:text-primary transition">
              Politique de confidentialité
            </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/eric-buisson-85b354298"  target="_blank" >
            <Button variant="ghost"
              className="text-sm text-[#594c9a] dark:text-gray-400 hover:text-primary dark:hover:text-primary transition">
              <Linkedin />
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
