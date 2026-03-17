"use client";

import React from "react";
import { ApiOpcionalResumo } from "@/types";
import { OptionalSummaryCard } from "@/components/charts/OptionalSummaryCard";

interface OptionalCosmeticaCardProps {
  data: ApiOpcionalResumo;
}

export const OptionalCosmeticaCard: React.FC<OptionalCosmeticaCardProps> = ({
  data,
}) => {
  return <OptionalSummaryCard title="Opcional: Cosmética" data={data} />;
};

