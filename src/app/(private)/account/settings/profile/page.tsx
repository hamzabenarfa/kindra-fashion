import { ProfileImage } from "@/components/layout/profile-image";
import { ProfileName } from "@/app/(private)/account/settings/profile/profile-name";
import { Suspense, cache } from "react";
import { getUserProfileUseCase } from "@/use-cases/users";
import { ConfigurationPanel } from "@/components/configuration-panel";
import { ModeToggle } from "@/components/mode-toggle";



export default async function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <ProfileImage />
        <ProfileName />
      </div>


      <ConfigurationPanel title="Theme">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <span className="mb-2 sm:mb-0">Toggle dark mode</span>
          <ModeToggle />
        </div>
      </ConfigurationPanel>
    </div>
  );
}

