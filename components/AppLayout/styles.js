import css from 'styled-jsx/css'

import { addOpacityToColor } from '../../styles/utils'
import { fonts, colors, breakpoint } from '../../styles/theme'

const backgroundColor = addOpacityToColor(colors.primary, 0.3)

export const globalStyles = css.global`
    html, body {
        background-image: radial-gradient(${backgroundColor} 1px, #fdfdfd 1px), radial-gradient(${backgroundColor} 1px, #fdfdfd 1px);
        background-position: 0 0, 25px 25px;
        background-size: 50px 50px;
        padding: 0;
        margin: 0;
        font-family: ${fonts.base};
    }

    * {
        box-sizing: border-box;
    }
`

export default css`
    div {
        display: grid;
        height: 100vh;
        place-items: center;
    }

    main {
        background: #fff;
        box-shadow: 0 10px 25px rgba(0, 0, 0, .1);
        border-radius: 10px;
        height: 100%;
        width: 100%;
        position: relative;
    }

    @media (min-width: ${breakpoint.mobile}) {
        main {
            height: 90vh;
            width: ${breakpoint.mobile};
        }
    }
`