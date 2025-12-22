import Sessions from "@/components/student/sessions"
import { getSessionsAction } from "@/utils/graphql/sessions/action"

const StudentSessions = async () => {
  const res = await getSessionsAction({
    "input": {
      "limit": 10,
      "name": "",
      "page": 1,
      "filter": "UPCOMING"
    }
  });

  const studentSessionDataList = res?.getSessions || [];

console.log(studentSessionDataList, "res studentSessionDataList");

  return (
    <div className="min-h-screen bg-background">
      <Sessions studentSessions={studentSessionDataList} />
    </div>
  )
}

export default StudentSessions;
