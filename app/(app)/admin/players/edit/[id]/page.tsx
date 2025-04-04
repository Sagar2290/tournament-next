import PlayerEditForm from "@/components/players/playerEditForm";
import prisma from "@/lib/prisma";

interface OrganisationData {
  name: string | null;
  phone: number | null;
  email: string | null;
  city: string | null;
}

export default async function Page({ params }: { params: { id: string } }) {

  const { id } = await params;

  let error = false;
  let organisationDetails: any;
  try {
    organisationDetails = await prisma.user.findUnique({
      where: {
        id: id,
        role: 'player'
      }
    });
  } catch (err) {
    console.error("Error fetching events:", err);
    error = true;
  }

  if (error) {
    return (
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
      </div>
    );
  }

  return (
    <div className="card w-full p-3">
      <PlayerEditForm data={organisationDetails || undefined} />
    </div>
  );
}