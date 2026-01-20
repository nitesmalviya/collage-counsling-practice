import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Trash2, Video } from "lucide-react";
import { ConfirmationBox } from "@/components/ui/confirmation-box"
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { removeResourceAction } from "@/utils/graphql/resources/action";

interface ResourceCardProps {
    resource: ResourceItemType;
    isAdmin?: boolean;
    onDeleted?: (payload: { id: string; message?: string }) => void;
}

const ResourceCard = ({ resource, isAdmin, onDeleted }: ResourceCardProps) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirmDelete = async () => {
        debugger
        if (!resource?.id || isDeleting) return;

        setIsDeleting(true);
        try {
            const res = await removeResourceAction(resource.id);
            if (res?.success) {
                if (onDeleted) onDeleted({ id: resource.id, message: res?.message });
            } else {
                toast({
                    title: "Delete failed",
                    description: res?.message || "Please try again.",
                    variant: "destructive"
                });
                throw new Error(res?.message || "Failed to delete resource");
            }
        } catch (error: unknown) {
            const err = error as { message?: string };
            toast({
                title: "Delete failed",
                description: err?.message || "Please try again.",
                variant: "destructive"
            });
        }
        finally {
            setIsDeleting(false);
        }
    }


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
                    {isAdmin && (
                        <ConfirmationBox
                            trigger={<Button
                                variant="ghost"
                                size="icon"
                                aria-label="Delete resource"
                                className="cursor-pointer"
                                title="Delete resource"
                            >
                                <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>}
                            title="Delete resource?"
                            description={`This action will be permanently delete the resource "${resource.title}".`}
                            confirmText="Delete"
                            cancelText="Cancel"
                            variant="secondary"
                            onConfirm={handleConfirmDelete} />
                    )}
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