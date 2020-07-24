import styled from "styled-components";

export const ResourceContainer = styled.div`
  margin: 0.3em 1em;
  padding: 0.25em 0.5em;
  color: white;
`;

export const FullResourceContainer = styled(ResourceContainer)`
  animation: fullPulse 1.2s running;

  @keyframes fullPulse {
    0% {
      color: red;
    }
    100% {
      color: white;
    }
  }
`;
