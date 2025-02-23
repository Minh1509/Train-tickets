import { parse, format } from "date-fns";

export function convertToMySQLTimestamp(date: Date): string {
    return format(date, "yyyy-MM-dd HH:mm:ss");
}

