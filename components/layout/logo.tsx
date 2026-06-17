import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="SQUALL home">
      <Image src="/SquallLogo.png" alt="SQUALL" width={44} height={44} className="h-11 w-11 object-contain" priority />
      <span className="hidden text-xl font-black tracking-wide text-white sm:inline">SQUALL</span>
    </Link>
  );
}
