"use client";

import React from "react";
import { ApiOpcionalResumo } from "@/types";
import { OptionalSummaryCard } from "@/components/charts/OptionalSummaryCard";

interface OptionalPisoCardProps {
  data: ApiOpcionalResumo;
}

export const OptionalPisoCard: React.FC<OptionalPisoCardProps> = ({ data }) => {
  return <OptionalSummaryCard title="Opcional: Piso" data={data} />;
};

