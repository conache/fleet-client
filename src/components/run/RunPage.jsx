import React from 'react';
import { pathOr } from 'rambda';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux"
import { getTestRun } from '../../reducers/testRuns.reducer';
import RunCard from '../test-run/RunCard';
import LoadingSpinner from '../shared/LoadingSpinner';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";

const ISSUE = {
  hup: "hup",
  int: "int",
  quit: "quit",
  ill: "ill",
  trap: "trap",
  abrt: "abrt",
  bus: "bus",
  fpe: "fpe",
  usr1: "usr1",
  segv: "segv",
  usr2: "usr2",
  pipe: "pipe",
  alrm: "alarm",
  term: "term",
};
const ISSUE_SIGNAL = {
  [ISSUE.hup]: "SIGHUP",
  [ISSUE.int]: "SIGINT",
  [ISSUE.quit]: "SIGQUIT",
  [ISSUE.ill]: "SIGILL",
  [ISSUE.trap]: "SIGTRAP",
  [ISSUE.abrt]: "SIGABRT",
  [ISSUE.bus]: "SIGBUS",
  [ISSUE.fpe]: "SIGFPE",
  [ISSUE.usr1]: "SIGUSR1",
  [ISSUE.segv]: "SIGSEGV",
  [ISSUE.usr2]: "SIGUSR2",
  [ISSUE.pipe]: "SIGPIPE",
  [ISSUE.alarm]: "SIGALRM",
  [ISSUE.term]: "SIGTERM",
};
const ISSUE_DISPLAY_NAME = {
  [ISSUE.hup]: "signal hang up",
  [ISSUE.int]: "interruption",
  [ISSUE.quit]: "terminal quit",
  [ISSUE.ill]: "illegal instruction",
  [ISSUE.trap]: "trace/breakpoint trap",
  [ISSUE.abrt]: "process abort signal",
  [ISSUE.bus]: "access to an undefined portion of a memory object",
  [ISSUE.fpe]: "erroneous arithmetic operation",
  [ISSUE.usr1]: "user-defined signal 1",
  [ISSUE.segv]: "invalid memory reference",
  [ISSUE.usr2]: "user-defined signal 2",
  [ISSUE.pipe]: "write on a pipe with no one to read it",
  [ISSUE.alarm]: "alarm clock",
  [ISSUE.term]: "termination signal",
};

class RunPage extends React.Component {
  tableColumns = [{ id: 'signal', label: 'Signal' },
  { id: 'issueName', label: 'Issue name' },
  { id: 'issue', label: 'Code' },
  { id: 'inputBinUrl', label: "Input binary" },
  ];

  componentDidMount() {
    this.props.getTestRun(this.props.runId);
  }

  isTableDataLoading() {
    return this.props.requestingTestRunId === this.props.testRun.id;
  }

  getNoEntriesTableContent() {
    return <div className="no-entries">
      <FindInPageOutlinedIcon className="no-entries-icon" />
      <div className="no-entries-label">No issues found</div>
    </div>
  }

  getTableRows() {
    const { testRun } = this.props;
    const runIssues = testRun.runIssues || [];

    return runIssues.map((row) => <TableRow role="checkbox" tabIndex={-1} key={row.code}>
      {this.tableColumns.map((column) => {
        let value = "";
        if (column.id === "signal") {
          value = ISSUE_SIGNAL[row.issue];
        } else if (column.id === "issueName") {
          value = ISSUE_DISPLAY_NAME[row.issue]
        } else {
          value = row[column.id] || "unknown";
        }

        return <TableCell key={column.id} align={column.align}>{
          column.id === "inputBinUrl" ? <a className="download-link" href={value} download>
            <GetAppRoundedIcon /><div className="label">Download</div>
          </a> : value
        }</TableCell>
      })}
    </TableRow>);
  }

  render() {
    const { testRun } = this.props;

    if (!testRun) {
      return <LoadingSpinner />;
    }

    return <React.Fragment>
      <div className="header-section">
        <RunCard testRun={testRun} clickable={false} />
      </div>
      <Paper className="content-section">
        <TableContainer className="table-container">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {this.tableColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className={"table-cell"}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {this.isTableDataLoading() ? <LoadingSpinner /> 
              : <TableBody>
                {this.getTableRows()}
              </TableBody>
            }
          </Table>
          {!this.isTableDataLoading() && this.getTableRows().length === 0 ? this.getNoEntriesTableContent() : null}
        </TableContainer>
      </Paper>
    </React.Fragment>
  }
}

function mapStateToProps(state, ownProps) {
  const { runId } = ownProps;
  const testRun = pathOr([], ["testRuns", "items"], state).find(testRun => testRun.id === parseInt(runId));
  return {
    testRun: testRun,
    requestingTestRunId: pathOr(null, ["testRuns", "requestingTestRunId"], state),
    file: pathOr([], ["files"], state).find(file => file.id === testRun?.fileId)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTestRun }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RunPage)
