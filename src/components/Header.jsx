import styled from "styled-components";

const HeaderElement = styled.header`
    // background: radial-gradient(#280a48, #20043d);
    // background: linear-gradient(#d0d6d9, #b1b4ba);
    background-color: lightgrey;
    color: #200d45;
    padding: 10px;
`;

const Div = styled.div`
    font-style: italic;
    text-indent: 3rem;
    font-weight: bold;
    font-size: 1.4rem;
`;

const H3Bold = styled.div`
    font-style: italic;
    font-weight: bold;
    text-indent: 6rem;
    font-size: 1.8rem;
`;

export default function Header({children}) {
    return (
        <HeaderElement>
            <Div>Позвольте задать вам</Div>
            <H3Bold>несколько вопросов...</H3Bold>
            {children}
        </HeaderElement>
    );
}