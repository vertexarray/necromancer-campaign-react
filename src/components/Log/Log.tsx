import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../reducers/Reducers";
import { LogContainer, LogMessage } from "./styled";

const Log = ({ log }: { log: string[] }) => {
  return (
    <LogContainer>
      {log.slice(-6).map((message, index) => {
        return (
          <LogMessage style={{ opacity: index / 6 }} key={message}>
            {message}
          </LogMessage>
        );
      })}
    </LogContainer>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    log: state.log as string[],
  };
};

export default connect(mapStateToProps)(Log);
