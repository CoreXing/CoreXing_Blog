<script lang="ts">
  import type { NavItemType } from "../navbar/NavTypes";

  interface Props {
    menu?: NavItemType[];
  }

  const { menu }: Props = $props();

  const getMenuIcon = (item: any): string => {
    return item?.icon ?? "";
  };

  const renderNavItems = (items: NavItemType[]) => {
    return items.map((item) => ({
      data: item,
      isDropdown:
        item.dropbox?.enable &&
        item.dropbox?.items &&
        item.dropbox.items.length > 0,
    }));
  };

  const menuItems = $derived(renderNavItems(menu || []));
</script>

<style>
  /* 保留状态关联样式，无法用原子类替代 */
  .menu .item {
    border-radius: 0.9375rem;
    margin-bottom: 0.625rem;
    display: block;
    color: var(--grey-5);
    transition: all 0.2s ease-in-out;
    list-style: none;
  }

  .menu .item a {
    color: inherit;
    display: block;
    line-height: 3;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
  }

  .menu .item .submenu {
    display: none;
    padding: 0;
    list-style: none;
    animation: slideDown 0.3s ease-in-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .menu .item:hover {
    background-color: var(--grey-9-a1);
    color: inherit;
  }

  .menu .item:hover .submenu {
    display: block;
  }

  .menu .item.active {
    background: linear-gradient(
      to right,
      var(--color-pink),
      var(--color-orange)
    );
    color: var(--grey-0);
    box-shadow: 0 0.25rem 0.625rem var(--color-pink-a3);
  }

  .menu .item.active:hover {
    box-shadow: 0 0 0.75rem var(--color-pink);
    color: var(--grey-0);
  }
</style>
