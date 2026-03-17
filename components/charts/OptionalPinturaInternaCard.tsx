"use client";

import React from "react";
import { ApiOpcionalResumo } from "@/types";
import { OptionalSummaryCard } from "@/components/charts/OptionalSummaryCard";

interface OptionalPinturaInternaCardProps {
  data: ApiOpcionalResumo;
}

export const OptionalPinturaInternaCard: React.FC<
  OptionalPinturaInternaCardProps
> = ({ data }) => {
  return <OptionalSummaryCard title="Opcional: Pintura Interna" data={data} />;
};

