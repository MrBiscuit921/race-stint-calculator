import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-sm text-zinc-500 bottom-0 fixed bg-neutral-900 w-full h-16 flex items-center justify-center">
      <div className="text-center">
        <p>
          Made with ♥ by{" "}
          <Link
            href="https://github.com/MrBiscuit921"
            className="text-blue-500"
            target="_blank">
            MrBiscuit
          </Link>{" "}
          for{" "}
          <Link
            href="https://robinhanen.wixsite.com/arachnidracing"
            className="text-blue-500"
            target="_blank">
            Arachnid Racing
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
