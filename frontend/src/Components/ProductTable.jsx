import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

/**
 * Generic table used across the catalog / listing pages.
 *
 * @param {{key:string,label:string}[]} columns
 * @param {object[]} rows  - each row object's values are rendered directly;
 *                            pass pre-built React nodes for image/action cells.
 */
export default function ProductTable({ columns, rows }) {
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ mb: 3, borderColor: "primary.light" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#e0e7ff" }}>
            {columns.map((col) => (
              <TableCell key={col.key} sx={{ fontWeight: 600, color: "#1e3a8a" }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx} hover>
              {columns.map((col) => (
                <TableCell key={col.key} sx={{ color: "text.primary" }}>
                  {row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
