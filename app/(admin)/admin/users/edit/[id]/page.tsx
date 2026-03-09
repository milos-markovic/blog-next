import { getUser } from "@/action/user";
import Title from "@/components/Title";
import UpdateUserForm from "./UpdateUserForm";

const EditUser = async ({ params }: { params: Promise<{ id: object }> }) => {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <>
      <Title value={`Edit User: ${user.name}`} />

      <UpdateUserForm user={user} />
    </>
  );
};

export default EditUser;
