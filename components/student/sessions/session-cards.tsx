import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, User, Video } from "lucide-react"

type SessionStatus =
  | "UPCOMING"
  | "COMPLETED"
  | "CANCELLED"
  | "EXPIRED"

interface Educator {
  first_name: string
  last_name: string
}

interface Session {
  id: string
  title: string
  description?: string
  status: SessionStatus
  created_at: string
  time: string
  duration_min: number
  educator: Educator
}

interface SessionProps {
  session: Session
}

const STATUS_CONFIG: Record<
  SessionStatus,
  { label: string; className: string }
> = {
  UPCOMING: {
    label: "Upcoming",
    className: "bg-blue-500 text-white",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-green-500 text-white",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-400 text-black",
  },
  EXPIRED: {
    label: "Expired",
    className: "bg-red-500 text-white",
  },
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

const SessionCards = ({ session }: SessionProps) => {
  const statusConfig = STATUS_CONFIG[session.status]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{session.title}</h3>
                <p className="mt-1 flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" aria-hidden="true" />
                  {session.educator.first_name}{" "}
                  {session.educator.last_name}
                </p>
              </div>

              <span
                className={`rounded-md px-2 py-1 text-xs font-medium capitalize ${statusConfig.className}`}
              >
                {statusConfig.label}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {formatDate(session.created_at)}
              </span>

              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {session.time} ({session.duration_min} min)
              </span>
            </div>

            <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
              <strong>Notes:</strong>{" "}
              {session.description || "No description"}
            </p>
          </div>

          {session.status === "UPCOMING" && (
            <div className="ml-4 flex flex-col gap-2">
              <Button size="sm">
                <Video className="mr-2 h-4 w-4" aria-hidden="true" />
                Join session
              </Button>

              <Button size="sm" variant="ghost">
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default SessionCards
