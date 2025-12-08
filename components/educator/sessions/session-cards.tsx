import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge, Calendar, Clock, User, Video } from 'lucide-react'

const SessionCards = ({ session }: any) => {
    console.log(session, "Session card data new")

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

                        <div className="flex flex-col gap-2 ml-4">
                            {session.status === "upcoming" ? (
                                <>
                                    <Button size="sm">
                                        <Video className="w-4 h-4 mr-2" />
                                        Start Session
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        Reschedule
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                        Cancel
                                    </Button>
                                </>
                            ) : null}
                        </div>
                    </div>
                </CardContent>
            </Card>

        </>
    )
}

export default SessionCards
