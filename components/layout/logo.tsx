import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="SQUALL home">
      <Image src="/SquallLogo.png" alt="SQUALL" width={32} height={32} className="h-8 w-8 object-contain" priority />
      <span className="hidden text-lg font-black tracking-wide text-white sm:inline">SQUALL</span>
    </Link>
  );
}
