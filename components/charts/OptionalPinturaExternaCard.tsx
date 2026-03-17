"use client";

import React from "react";
import { ApiOpcionalResumo } from "@/types";
import { OptionalSummaryCard } from "@/components/charts/OptionalSummaryCard";

interface OptionalPinturaExternaCardProps {
  data: ApiOpcionalResumo;
}

export const OptionalPinturaExternaCard: React.FC<
  OptionalPinturaExternaCardProps
> = ({ data }) => {
  return <OptionalSummaryCard title="Opcional: Pintura Externa" data={data} />;
};

