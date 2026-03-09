import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const TableData = ({
  children,
  heads,
  caption,
  actionsHeadSpan = 2,
}: {
  children: React.ReactNode;
  heads: string[];
  caption?: string;
  actionsHeadSpan?: number;
}) => {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader className="bg-accent">
        <TableRow>
          {heads?.map((head, index) => (
            <TableHead
              colSpan={heads.length - 1 === index ? actionsHeadSpan : 1}
              key={index}
              className={`${heads.length - 1 === index && "text-center"}`}
            >
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="bg-card/40 dark:bg-card">{children}</TableBody>
    </Table>
  );
};

export default TableData;
