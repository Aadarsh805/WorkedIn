import { createGlobalStyle } from "styled-components";
import "@fontsource/sora"
import "@fontsource/akaya-telivigala"

const GlobalStyles = createGlobalStyle`

*,*::before,*::after{
    margin: 0;
    padding: 0;
}

body{
    font-family: "Sora", sans-serif;
    overflow-x: hidden;
}

h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}

a{
    text-decoration: none;
    color: inherit;
}
`

export default GlobalStyles



