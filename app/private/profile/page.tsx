import { auth } from "@/auth";
import SignOutButton from "@/components/auth/signout-button"

const ProFilePage = async () => {
  const session = await auth()
  return (
      <div>
      <h1>Welcome, {session?.user.username}</h1>
        {JSON.stringify(session, null, 2)}
        <SignOutButton />
      </div>
  );
}

export default ProFilePage
