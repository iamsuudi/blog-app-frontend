import { differenceInDays, formatDistanceToNowStrict } from "date-fns";

export function formatDate(date) {
    if (differenceInDays(date, new Date()) < 3)
        return `${formatDistanceToNowStrict(date)} ago`;
    return new Date(date).toDateString();
}
