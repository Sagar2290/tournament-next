import EventForm from "@/components/event-management/EventForm";
import prisma from "@/lib/prisma";


export default async function Page({ params }: { params: { id: String } }) {

  const { id } = await params;

  const data = await prisma.event.findFirst({
    where: {
      id
    }
  });

  if (!data) {
    return (<div>
      Something went wrong!
    </div>)
  }

  return (
    <div className="card w-full p-3">
      <EventForm data={data} />
    </div>
  );
}
