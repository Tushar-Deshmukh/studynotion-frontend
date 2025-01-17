import React, { useState } from "react";
import { styled } from "@mui/material";
import TableLoader from "./TableLoader";

const StyledTableContainer = styled("div")(() => ({}));

export default function Table({ data, columns, loading = false }) {
  return (
    <StyledTableContainer>
      <div className="scrollable-x-auto border border-[#161D29] rounded-lg">
        <table className="table table-auto table-border">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="text-left font-aeonik font-thin text-text-lightGray p-6 border-b border-[#161D29]"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableLoader />
            ) : (
              <>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((col) => (
                      <td
                        key={col.accessor}
                        className="font-sans font-normal p-6"
                      >
                        {col.render
                          ? col.render(row[col.accessor], row, rowIndex)
                          : row[col.accessor]}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}
            {data.length === 0 && !loading && <p className="p-4 h-20 text-center">No Data Found</p>}
          </tbody>
        </table>
      </div>
    </StyledTableContainer>
  );
}
