import Login from '@/components/login';
import prisma from '@/lib/prisma'
import { Redirect } from '@/components/Redirect';
import { getServerSession } from 'next-auth';

export default async function Home() {

  const session = await getServerSession();
  
  if (!session?.user) {
    return <Redirect to={'/login'} />;
  }
  const users = await prisma.user.findMany();

  return (
    <Redirect to={'/dashboard'} />
  );
}
