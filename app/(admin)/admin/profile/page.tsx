import { getUser } from "@/action/user";
import { verifySession } from "@/lib/dal";
import UpdateProfileForm from "./updateProfileForm";
import { User } from "@/models/User";

const UserProfile = async () => {
  const { userId } = await verifySession();
  const user = await getUser(userId);

  return (
    <div className="flex flex-col justify-center items-center">
      <UpdateProfileForm user={user} />
    </div>
  );
};

export default UserProfile;
