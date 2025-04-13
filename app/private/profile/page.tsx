import { auth } from "@/auth"
import SignOutButton from "@/components/auth/signout-button"

const ProFilePage = async () => {
    const session = await auth()
  return (
    <div>
      { JSON.stringify(session) }
      <SignOutButton />
    </div>
  )
}

export default ProFilePage
