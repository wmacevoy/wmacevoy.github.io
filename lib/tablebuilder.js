// tabular.js
import React from 'react';

export default class TableBuilder {
  constructor(props = {}) {
    this.attrs = props;    // e.g. { class: "table table-sm table-bordered" }
    this.cells = [];       // each cell = { minRow, maxRow, minCol, maxCol, attrs, content }
    this.grid = new Set(); // track occupied (row,col)
    this.hRules = new Set();
    this.vRules = new Set();
  }

  vRule(col) {
    this.vRules.add(col);
  }
  hRule(row) {
    this.hRules.add(row);
  }
  addCell(minRow, maxRow, minCol, maxCol, attrs = {}, content = null) {
    // Check overlap
    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        const key = `${r},${c}`;
        if (this.grid.has(key)) {
          throw new Error(`Cell overlap at row=${r}, col=${c}`);
        }
        this.grid.add(key);
      }
    }

    this.cells.push({ minRow, maxRow, minCol, maxCol, attrs, content });
  }

  header(minRow, maxRow, minCol, maxCol, attrs = {}, content = null) {
    const combinedAttrs = {
      ...attrs,
      style: { fontWeight: 'bold', textAlign: 'center', ...(attrs.style || {}) },
    };
    this.addCell(minRow, maxRow, minCol, maxCol, combinedAttrs, content);
  }

  fill(attrs,text) {
        // Determine the maximum row/col from the cells
        let maxRow = 0;
        let maxCol = 0;
        for (const cell of this.cells) {
          maxRow = Math.max(maxRow, cell.maxRow);
          maxCol = Math.max(maxCol, cell.maxCol);
        }
    
  }

  generate() {
    // Determine the maximum row/col from the cells
    let maxRow = 0;
    let maxCol = 0;
    for (const cell of this.cells) {
      maxRow = Math.max(maxRow, cell.maxRow);
      maxCol = Math.max(maxCol, cell.maxCol);
    }

    // Build row by row
    const rows = [];
    for (let r = 0; r <= maxRow; r++) {
      const cols = [];
      for (let c = 0; c <= maxCol; c++) {
        // see if there's a cell that starts at (r,c)
        const cell = this.cells.find(
          (x) => x.minRow === r && x.minCol === c
        );
        if (cell) {
          const rowSpan = cell.maxRow - cell.minRow + 1;
          const colSpan = cell.maxCol - cell.minCol + 1;
          cols.push(
            <td
              key={`r${r}c${c}`}
              rowSpan={rowSpan > 1 ? rowSpan : undefined}
              colSpan={colSpan > 1 ? colSpan : undefined}
              {...this.fixAttrs(cell.attrs)}
            >
              {/*
                If cell.content is a string with HTML in it, you could do 
                <div dangerouslySetInnerHTML={{__html: cell.content}} /> 
                but safer is to store your content as React elements.
              */}
              {cell.content}
            </td>
          );
        } else {
          // might be spanned or empty
          const isOccupied = this.grid.has(`${r},${c}`);
            if (!isOccupied) {
              const hStyle = this.hRules.has(r) ? 
                {borderBottom: "none" }:
                {borderBottom: "none", borderTop: "none"};
              const vStyle = this.vRules.has(c) ? 
                {borderRight: "none" }:
                {borderRight: "none", borderLeft: "none"};
              const style = {...vStyle,...hStyle};
                // Insert an empty cell
              cols.push(<td style={style} key={`r${r}c${c}_empty`} />);
          }
        }
      }
      rows.push(<tr key={`row-${r}`}>{cols}</tr>);
    }

    // Convert any class => className, etc.
    const tableProps = this.fixAttrs(this.attrs);

    return (
      <table {...tableProps}>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  // Quick helper to rename "class" -> "className" if needed
  fixAttrs(attrs) {
    const result = { ...attrs };
    if (result.class) {
      result.className = result.class;
      delete result.class;
    }
    // If you have style in a string, you'd convert it to an object, etc.
    return result;
  }
}