"use client";

import Image from "next/image";
import { Switch } from "@/components/ui/switch";

export default function LanguageToggle({ language, setLanguage }) {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="https://flagcdn.com/w40/gb.png"
        alt="English"
        width={20}
        height={15}
      />
      <Switch
        checked={language === "tr"}
        onCheckedChange={(checked) => setLanguage(checked ? "tr" : "en")}
      />
      <Image
        src="https://flagcdn.com/w40/tr.png"
        alt="Turkish"
        width={20}
        height={15}
      />
    </div>
  );
}