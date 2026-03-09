import { countDocuments } from "@/action/dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, StickyNote, Users } from "lucide-react";

const Dashboard = async () => {
  const { countUsers, countPosts, countComments } = await countDocuments();

  return (
    <>
      <h2 className="text-2xl">Dashboard page</h2>

      <div className="grid grid-cols-1 xl:grid-cols-3 mt-20 gap-20">
        <Card className="bg-card/70">
          <CardContent className="flex flex-col items-center justify-center gap-3">
            <p className="flex items-center gap-2">
              <Users />
              Users
            </p>
            {countUsers}
          </CardContent>
        </Card>
        <Card className="bg-card/70">
          <CardContent className="flex flex-col items-center justify-center gap-3">
            <p className="flex items-center gap-2">
              <StickyNote />
              Posts
            </p>
            {countPosts}
          </CardContent>
        </Card>
        <Card className="bg-card/70">
          <CardContent className="flex flex-col items-center justify-center gap-3">
            <p className="flex items-center gap-2">
              <MessageSquare />
              Comments
            </p>
            {countComments}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
