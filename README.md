国内大模型回答真实性评测（UI）

## dev notes

### table in table

solution:
  1. using `react-table`, see: How to use table inside table? · TanStack/table · Discussion #2294, https://github.com/TanStack/table/discussions/2294
  2. best: place the sub table in a `td` with the span of rows equals to the raw table, see:  [React Table Sub Components Example | TanStack Table Docs](https://tanstack.com/table/v8/docs/examples/react/sub-components)