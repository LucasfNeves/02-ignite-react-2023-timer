import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box; 
    }

    body {
        /*
         * Buscando variaveis de cores definidas nos temas
         * Styled Components executa oq está dentro de $ {} como função
        */
        background: ${(props) => props.theme['gray-900']}; 
        color: ${(props) => props.theme['gray-300']};

        
    }

    body, input, textarea, butto {
        font-family: 'Roboto', san-serif;
        font-weight: 400;
        font-size: 1rem;
        -webkit-font-smoothing: antialised; // Melhora a qualidade da letra
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']}
    }

   
`
