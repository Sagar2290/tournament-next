import EventForm from "@/components/event-management/EventForm";


export default async function Page() {
  const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getData = async () => {
    await sleep(5000);
    return {
      name: "Sample Event",
      startDate: "2025-01-01",
      endDate: "2025-01-10",
      dueDate: "2025-01-15",
      address: "123 Main St",
      zipCode: "12345",
      email: "event@example.com",
      country: "US",
    };
  };

  const data = await getData();

  return (
    <div className="card w-full p-3">
      <EventForm data={data} />
    </div>
  );
}
