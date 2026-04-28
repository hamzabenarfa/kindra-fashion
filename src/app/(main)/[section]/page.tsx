import { notFound } from "next/navigation";
const validSections = ["women", "men"];

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!validSections.includes(section)) {
    notFound();
  }
}
