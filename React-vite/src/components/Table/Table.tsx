import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination, {
  tablePaginationClasses,
} from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import CircularProgress from "@mui/material/CircularProgress";
import { TablePaginationActions } from "../TablePaginationActions/TablePaginationActions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fontFamily } from "../../constants";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 16,
    fontWeight: "bold",
    minWidth: "25%",
    maxWidth: "25%",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    minWidth: "25%",
    maxWidth: "25%",
  },
}));

const StyledTablePagination = styled(TablePagination)(() => ({
  [`&.${tablePaginationClasses.root}`]: {
    display: "block",
  },
}));

const theme = createTheme({
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          fontFamily,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          fontFamily,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          fontFamily,
        },
      },
    },
  },
});

interface PaginatedTableProps {
  columns: string[]; // Table column headers
  rows: { [key: string]: React.ReactNode }[]; // Table data using the generic type
  maxHeight?: number;
  minWidth?: number;
  count?: number;
  rowsPerPage?: number;
  isLoading?: boolean;
  showPagination?: boolean;
  page?: number;
  setPage?: (value: number) => void;
}

export default function PaginatedTable({
  rows,
  columns,
  count,
  maxHeight = 400,
  minWidth = 500,
  rowsPerPage = 10,
  showPagination = true,
  isLoading = false,
  page = 0,
  setPage = () => {},
}: PaginatedTableProps) {
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 || rows.length === 0
      ? Math.max(0, (1 + page) * rowsPerPage - rows.length)
      : 0;

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight }}>
          <Table
            sx={{ minWidth }}
            aria-label="custom pagination table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                {columns.map((column, index) => {
                  return (
                    <StyledTableCell key={index}>{column}</StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <CircularProgress />
              ) : (
                (rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value) => (
                      <StyledTableCell component="th" scope="row">
                        {value}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                ))
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {showPagination && (
          <StyledTablePagination
            className="footer"
            rowsPerPageOptions={[rowsPerPage]}
            count={count ?? rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            ActionsComponent={TablePaginationActions}
          />
        )}
      </Paper>
    </ThemeProvider>
  );
}
