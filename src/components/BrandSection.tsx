import React from "react";
import { Translations } from "../data/translations";

interface BrandSectionProps {
  t: Translations;
  onOpenTelecom?: () => void;
}

export const BrandSection: React.FC<BrandSectionProps> = ({ t }) => {
  return (
    <div className="flex flex-col justify-center pb-8 lg:pb-16 lg:pr-8">
      {/* Facebook Iconic Wordmark & Slogan */}
      <h1 className="text-5xl sm:text-[58px] font-bold tracking-tight text-[#1877f2] dark:text-[#2d88ff] leading-none mb-3 sm:mb-4 select-none">
        connectbook
      </h1>
      <h2 className="text-2xl sm:text-[28px] leading-snug sm:leading-8 font-normal text-[#1c1e21] dark:text-[#e4e6eb] max-w-[500px]">
        {t.tagline}
      </h2>
    </div>
  );
};
