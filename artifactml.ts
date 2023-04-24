import { parse } from "https://deno.land/x/xml/mod.ts"
import { document } from "https://deno.land/x/xml/utils/types.ts";

export async function readArtifactML(url: string): Promise<document> {
  const artifactML = await fetch(url).then((response) => response.text());
  return parse(artifactML);
}