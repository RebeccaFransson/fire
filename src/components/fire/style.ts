import { styled } from "@mui/material";
import { Flexbox } from "../../style";
import { bgColors } from "../../styles/colors";

/*export const StyledPoint = styled.circle`
  fill: ${(props) => props.color};
`;

export const FireWrapper = styled.div`
    background-color: #${bgColors.girlyPink};
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
`;
export const FireBox = styled.div`
    background-color: #${bgColors.darkPink};
    width: 100%;
    max-width: 550px; 
    margin: 10px;
    padding: 10px;
`;*/

export const FlexBoxSpaceAroundColumn = styled(Flexbox)(({ theme }) => ({
  flexDirection: "column",
}));

export const FlexBoxSpaceAroundRow = styled(Flexbox)(({ theme }) => ({
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-around",
}));

