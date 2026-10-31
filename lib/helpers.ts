export function titleCase(str: string): string {
    const splitted = str.split(" ");
    const titleCaseArray = splitted.map(str => str[0].toUpperCase() + str.slice(1));

    return titleCaseArray.join(" ");
}

export function microsecondDateToString(dateStr: string): string{
        const fixed = dateStr.replace(/\.\d+/, "");
    const date = new Date(fixed);
    return date.getHours() + ":" + date.getMinutes() + " " + date.toLocaleDateString();
    }