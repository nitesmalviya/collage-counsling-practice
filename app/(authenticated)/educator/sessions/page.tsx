import Sessions from "@/components/educator/sessions";
import { getSessionsAction } from "@/utils/graphql/sessions/action";

const EducatorSessions = async () => {
  const res = await getSessionsAction({});
  const educatorSessionsList  = res?.getSessions || [];
  return (
    <Sessions educatorSessions={educatorSessionsList} />
  )
}

export default EducatorSessions;
