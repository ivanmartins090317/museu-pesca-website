"use client";

import dynamic from "next/dynamic";
import type { Virtual360Props } from "@/types";
import type { CollabProps } from "@/types";

/**
 * Wrapper Client Component para componentes pesados carregados com ssr:false.
 * next/dynamic com ssr:false só pode ser usado dentro de Client Components.
 * Isso garante que Virtual360 (Matterport WebGL) e CollabTeste (3D carousel)
 * não bloqueiam a renderização inicial da página.
 */
const Virtual360Dynamic = dynamic(
  () =>
    import("@/components/sections/Virtual360").then((m) => ({
      default: m.Virtual360,
    })),
  { ssr: false, loading: () => <div className="h-96" /> }
);

const CollabTesteDynamic = dynamic(
  () =>
    import("@/components/sections/Collab_teste").then((m) => ({
      default: m.CollabTeste,
    })),
  { ssr: false, loading: () => <div className="h-64" /> }
);

export function Virtual360Section(props: Virtual360Props) {
  return <Virtual360Dynamic {...props} />;
}

export function CollabTesteSection(props: CollabProps) {
  return <CollabTesteDynamic {...props} />;
}
