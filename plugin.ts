import { document } from "https://deno.land/x/xml/utils/types.ts";

export interface Plugin {
    name: string;
    init: () => void;
    render: (document: document) => void;
}
