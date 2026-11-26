import { useNavigationTransition } from "../context/NavigationTransition";

export default function TransitionLink({ to, label, children, className, ...rest }) {
  const { startTransition } = useNavigationTransition();

  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        startTransition(to, label || children?.toString() || "");
      }}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
