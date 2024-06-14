
interface Buttonprops {
    children: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button ( props: Buttonprops ) {
    return (
        <button onClick={ props.onClick } className={ props.className }>
            { props.children }
        </button>
    )
}
