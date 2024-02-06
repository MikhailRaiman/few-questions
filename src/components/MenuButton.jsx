import styled from "styled-components";

const NavButton = styled.button`
    padding: 0.2rem 0.5rem;
    margin: 0 0.8rem;
    border: none;
    border-radius: 6px;
    background-color: transparent;
    color: orange;
    font-family: "Roboto Condensed", sans-serif;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &.active {
        background-color: #7925d3;
        color: #ebe7ef;
    }

    &:hover {
        background-color: #7925d3;
        color: #ebe7ef;
    }
`;

export default function MenuButton({children, isSelected, ...props}) {
    return (
            <NavButton className={isSelected ? 'active' : undefined} {...props}>
                {children}
            </NavButton>
    );
}