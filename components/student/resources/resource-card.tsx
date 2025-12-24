import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResourceItem } from "@/types/resources";
import { Download, FileText, Video } from "lucide-react";

const ResourceCard = ({ resource }: { resource: ResourceItem }) => {
    return (
        <Card key={resource.id}>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            {resource.resource_type === "Video" ? (
                                <Video className="w-6 h-6 text-primary" />
                            ) : (
                                <FileText className="w-6 h-6 text-primary" />
                            )}
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                            <CardDescription className="mt-1">{resource.description}</CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary">{resource?.resource_type.replace("_", " ")}</Badge>
                        <span>•</span>
                        <span>{resource?.attachment?.file_type?.toLocaleUpperCase().replace(".", "")}</span>
                    </div>
                    <Button size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}


export default ResourceCard;