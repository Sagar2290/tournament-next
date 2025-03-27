import OrganisationEditForm from "@/components/organisation/organisationEditForm";

interface OrganisationData {
  name: string | null;
  firstName: string | null;
  email: string | null;
  city: string | null;
}

export default async function Page({ params }: { params: { id: string } }) {

  let data: OrganisationData | null = null;
  //onsole.log("params",params.id)
  try {
    const response = await fetch(`${process.env.PUBLIC_SITE_URL}/api/organizers/4dbb0582-c75c-47d1-9f00-0fe38c8c89a6`);
    if (response.ok) {      
      data = await response.json();
    }else{
      throw new Error('Failed to fetch organizer');
    }
  } catch (error) {
    console.error("Error fetching organizer:", error);
    // You might want to handle this error more gracefully
  }
  

  return (
    <div className="card w-full p-3">
      <OrganisationEditForm data={data || undefined} />
    </div>
  );
}
