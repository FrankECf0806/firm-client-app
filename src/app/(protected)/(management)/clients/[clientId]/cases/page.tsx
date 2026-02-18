"use client";

import { useParams } from "next/navigation";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { useAppContext } from "@/providers/AppProvider";
import Link from "next/link";

export default function ClientCasesPage() {
  const params = useParams();
  const clientId = params.clientId as string;

  const { cases } = useAppContext();
  const { cases: casesList } = cases;

  const clientCases = casesList.filter((c) => c.clientId === clientId);

  return (
    <Paper className="p-4">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Case Title</TableCell>
              <TableCell>Practice Area</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Opened</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientCases.map((caseItem) => (
              <TableRow key={caseItem.id} hover>
                <TableCell>
                  <Link
                    href={`/cases/${caseItem.id}`}
                    className="text-primary hover:underline"
                  >
                    {caseItem.title}
                  </Link>
                </TableCell>
                <TableCell>{caseItem.practiceArea}</TableCell>
                <TableCell>
                  <Chip
                    label={caseItem.status}
                    size="small"
                    color={caseItem.status === "ACTIVE" ? "success" : "default"}
                  />
                </TableCell>
                <TableCell>
                  {new Date(caseItem.openedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
