import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { CommentGetManyOutput } from "@/modules/comments/types";
import { trpc } from "@/trpc/client";
import { useAuth, useClerk } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import {
  MessageSquareIcon,
  MoreVerticalIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface CommentItemProps {
  comment: CommentGetManyOutput["items"][number];
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  const { userId: clerkUserId } = useAuth();
  const clerk = useClerk();
  const utils = trpc.useUtils();

  const remove = trpc.comments.remove.useMutation({
    onSuccess: () => {
      toast.success("Comment deleted");
      utils.comments.getMany.invalidate({ videoId: comment.videoId });
    },
    onError: (error) => {
      toast.error("Failed to remove comment");

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  const like = trpc.commentReactions.like.useMutation({
    onSuccess: () => {
      utils.comments.getMany.invalidate({ videoId: comment.videoId });
    },
    onError: (error) => {
      toast.error("Failed to like comment");

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  const dislike = trpc.commentReactions.dislike.useMutation({
    onSuccess: () => {
      utils.comments.getMany.invalidate({ videoId: comment.videoId });
    },
    onError: (error) => {
      toast.error("Failed to dislike comment");

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  return (
    <div className="flex items-start gap-2 w-full">
      <div className="flex gap-4 w-full">
        <Link href={`/users/${comment.userId}`}>
          <UserAvatar
            imageUrl={comment.user.imageUrl}
            name={comment.user.name}
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/users/${comment.userId}`}>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-medium text-sm pb-0.5">
                {comment.user.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(comment.createdAt, {
                  addSuffix: true,
                })}
              </span>
            </div>
          </Link>
          <p className="text-sm">{comment.value}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                disabled={like.isPending}
                onClick={() => like.mutate({ commentId: comment.id })}
              >
                <ThumbsUpIcon
                  className={cn(
                    "size-4",
                    comment.viewerReaction === "like" && "fill-black"
                  )}
                />
              </Button>
              <span className="text-xs text-muted-foreground">
                {comment.likeCount}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                disabled={dislike.isPending}
                onClick={() => dislike.mutate({ commentId: comment.id })}
              >
                <ThumbsDownIcon
                  className={cn(
                    "size-4",
                    comment.viewerReaction === "dislike" && "fill-black"
                  )}
                />
              </Button>
              <span className="text-xs text-muted-foreground">
                {comment.dislikeCount}
              </span>
            </div>
          </div>
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreVerticalIcon className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>
              <MessageSquareIcon className="size-4" /> Reply
            </DropdownMenuItem>
            {comment.user.clerkId === clerkUserId && (
              <DropdownMenuItem
                onClick={() => remove.mutate({ id: comment.id })}
              >
                <Trash2Icon className="size-4" /> Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
