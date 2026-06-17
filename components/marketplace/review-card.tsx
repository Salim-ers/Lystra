import type { Review } from "@/types";
import { formatDateFr, initials } from "@/lib/utils";
import { RatingStars } from "@/components/shared/rating-stars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-2xl border border-lystra-champagne/20 bg-white/60 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar>
            {review.avatarUrl && <AvatarImage src={review.avatarUrl} alt={review.author} />}
            <AvatarFallback>{initials(review.author)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-lystra-ink">{review.author}</p>
            <p className="text-xs text-lystra-gray">{formatDateFr(review.date)}</p>
          </div>
        </div>
        <RatingStars rating={review.rating} showValue={false} />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-lystra-ink/85">{review.comment}</p>

      {review.eventType && (
        <Badge variant="soft" className="mt-4">{review.eventType}</Badge>
      )}
    </article>
  );
}
