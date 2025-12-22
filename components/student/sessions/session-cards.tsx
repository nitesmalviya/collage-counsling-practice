import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge, Calendar, Clock, User, Video } from 'lucide-react'

interface Educator {
    first_name: string;
    last_name: string;
}

interface Session {
    id: string;
    title: string;
    description: string;
    status: string;
    created_at: string;
    time: string;
    duration_min: number;
    educator: Educator;
}

interface SessionProps {
    session: Session;
}

const SessionCards = ({ session }: SessionProps) => {

    return (
        <>
            <Card >
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="space-y-3 flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold">{session.title}</h3>
                                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                        <User className="w-4 h-4" />
                                        {session.educator.first_name} {session.educator.last_name}
                                    </p>
                                </div>
                                <Badge>{session.status}</Badge>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(session.created_at).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {session.time} ({session.duration_min} min)
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                                <strong>Notes:</strong> {session.description || "No description"}
                            </p>
                        </div>
                        {session.status === "UPCOMING" ? (
                            <div className="flex flex-col gap-2 ml-4">
                                <>
                                    <Button size="sm">
                                        <Video className="w-4 h-4 mr-2" />
                                        Join session
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                        Cancel
                                    </Button>
                                </>
                            </div>
                        ) : null}
                    </div>
                </CardContent>
            </Card>

        </>
    )
}

export default SessionCards
