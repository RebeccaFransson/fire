import styled from 'styled-components';
import { bgColors, textColors } from './styles/colors';

export const AppWrapper = styled.div`
    font-family: monospace;
    text-align: center;
    background-color: #${bgColors.lighterPink};   
    height: 100%;
    
    :nth-child(2) h2 {
        background-color: #${bgColors.brightPink};
    }
    :nth-child(3) h2 {
        background-color: #${bgColors.darkPink};
    }
    :nth-child(4) h2 {
        background-color: #${bgColors.darkerPink};
      }
      
    h2 {
        margin: 0;
      }
`;

export const ClickableTitle = styled.h2`
    color: #${textColors.primary};
    cursor: pointer;

    :hover {
        color: #${textColors.secondary};
    }
`;

export const BoxHeader = styled.h3`
    margin: 0;
    width: 100%;
    text-align: left;
`;
