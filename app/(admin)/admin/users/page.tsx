import TableData from "@/components/TableData";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserRoundPen } from "lucide-react";
import Link from "next/link";
import DeleteUserForm from "./DeleteUserForm";
import { getAuthUser } from "@/lib/dal";
import { ADMIN_TABLE_HEADS, USER_TABLE_HEADS } from "@/helpers/global";
import { User } from "@/models/User";

const AdminUsers = async () => {
  const authUser = await getAuthUser();
  const isAdmin = authUser?.role === "admin";

  const users = await User.find().lean();

  if (!users?.length) {
    return (
      <>
        <Title value="No Users" />

        <Button asChild variant="secondary">
          <Link href="/admin/users/create">Create User</Link>
        </Button>
      </>
    );
  }

  const heads = isAdmin ? ADMIN_TABLE_HEADS : USER_TABLE_HEADS;
  const lastHeadPosition = isAdmin ? "text-center" : "text-center";

  const getButtons = (userId: string) => {
    const isOwn = authUser?._id.toString() === userId;

    if (isAdmin || isOwn) {
      return (
        <>
          <TableCell className="text-center">
            <Button asChild>
              <Link href={`/admin/users/edit/${userId}`}>
                <UserRoundPen />
                Update
              </Link>
            </Button>
          </TableCell>

          {isAdmin && (
            <TableCell className="text-center">
              <DeleteUserForm id={userId} />
            </TableCell>
          )}
        </>
      );
    }

    return null;
  };

  return (
    <>
      <Title value="User Data" />

      <TableData heads={heads} caption="A list of Users">
        {users?.map((user, index) => {
          const { name, email, role, _id } = user;

          return (
            <TableRow key={index}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{role}</TableCell>
              {getButtons(_id.toString())}
            </TableRow>
          );
        })}
      </TableData>

      {isAdmin && (
        <Button asChild>
          <Link href="/admin/users/create">Create User</Link>
        </Button>
      )}
    </>
  );
};

export default AdminUsers;
