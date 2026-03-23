<script lang="ts">
  import NavItem from "./NavItem.svelte";

  const baseUrl: string = ((import.meta as any).env?.BASE_URL as string) || "/";
  const baseNoTrailingSlash =
    baseUrl.length > 1 && baseUrl[baseUrl.length - 1] === "/"
      ? baseUrl.slice(0, -1)
      : baseUrl;
  const withBase = (path: string): string => {
    if (!path) return path;
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(path)) return path;
    if (path[0] === "#") return path;
    if (
      path === baseNoTrailingSlash ||
      path.indexOf(`${baseNoTrailingSlash}/`) === 0
    ) {
      return path;
    }
    if (path[0] === "/") return `${baseNoTrailingSlash}${path}`;
    return `${baseUrl}${path}`;
  };

  interface Props {
    href?: string;
    text?: string;
    icon?: string | null;
    class?: string;
  }

  const {
    href = "#",
    text,
    icon = null,
    class: className = "",
  }: Props = $props();

  const iconClasses = $derived(
    icon ? `${icon} icon-nav text-xl vertical-text-bottom inline-block` : "",
  );
  const mergedClass = $derived([className].filter(Boolean).join(" "));
</script>

<NavItem class={mergedClass}>
  <a href={withBase(href)}>
    {#if icon}
      <div class={iconClasses}></div>
    {/if}
    {text}
  </a>
</NavItem>
