import styled from "styled-components";

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 30%;
`;

export const OrdersColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const OrderButton = styled.button`
  background-color: ${(props) => props.theme.buttonBackground};
  border-radius: 3px;
  display: inline-block;
  cursor: pointer;
  color: ${(props) => props.theme.buttonText};
  font-size: 15px;
  padding: 9px 23px;
  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
  &:active {
    position: relative;
    top: 1px;
  }
  &:disabled {
    background-color: black;
    cursor: default;
  }
`;
