

import { StudentNav } from "@/components/navigation/student-nav"
import Sessions from "@/components/student/sessions"
import { getSessionsAction } from "@/utils/graphql/sessions/action"

const StudentSessions = async () => {
  const res = await getSessionsAction({});
  console.log(res, "res");
  
  return (
    <div className="min-h-screen bg-background">
      <StudentNav />
      <Sessions/>
    </div>
  )
}

export default StudentSessions;
