import Sessions from "@/components/educator/sessions";
import { getSessionsAction } from "@/utils/graphql/sessions/action";

const EducatorSessions = async () => {
  const res = await getSessionsAction({
  "input": {
    "limit": 10,
    "name": "",
    "page": 1,
    "filter": "UPCOMING"
  }
});

  const educatorSessionsList  = res?.getSessions || [];

  return (
    <Sessions educatorSessions={educatorSessionsList} />
  )
}

export default EducatorSessions;
