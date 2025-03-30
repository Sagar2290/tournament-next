import OrganisationEditForm from "@/components/organisation/organisationEditForm";

interface OrganisationData {
  name: string | null;
  phone: number | null;
  email: string | null;
  city: string | null;
}

export default async function Page({ params }: { params: { id: string } }) {
  // First await the params
  const { id } = await params;
  
  let data: OrganisationData | null = null;
  console.log("params", id);
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/organisation/${id}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {      
      data = await response.json();
    } else {
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