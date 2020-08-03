<script>
    import { Link } from "svelte-routing";

    export let to = "";
    export let className = "";

    function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
        const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

        if (isActive) {
            return { class: className + " active" };
        }

        return {
            class: className
        };
    }

</script>

<Link {className} {to} {getProps}>
    <slot />
</Link>