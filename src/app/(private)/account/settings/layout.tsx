import { SettingsTab } from "@/app/(private)/account/settings/tabs-section";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { headerStyles } from "@/styles/common";
import { cn } from "@/lib/utils";

export default async function SettingsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={cn(headerStyles, "py-8")}>
        <div>
          <div className="flex justify-between">
            <h1 className="text-4xl">Account Settings</h1>


          </div>
        </div>
      </div>
      <Suspense fallback={<Skeleton className="w-full h-[40px] rounded" />}>
        <SettingsTabWrapper />
      </Suspense>

      <div className="py-12">{children}</div>
    </>
  );
}

async function SettingsTabWrapper() {
  return <SettingsTab />;
}

