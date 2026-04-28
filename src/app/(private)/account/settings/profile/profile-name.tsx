import { ConfigurationPanel } from "@/components/configuration-panel";
import { ProfileNameForm } from "./profile-name-form";
import { getCurrentUser } from "@/lib/session";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserProfileUseCase } from "@/use-cases/users";

export async function ProfileName() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const profile = await getUserProfileUseCase(user.id);

  return (
    <ConfigurationPanel title="Display Name">
      <Suspense fallback={<Skeleton className="w-full h-[200px] rounded" />}>
        <ProfileNameForm profileName={profile.displayName ?? ""} />
      </Suspense>
    </ConfigurationPanel>
  );
}
