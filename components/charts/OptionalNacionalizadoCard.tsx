"use client";

import React from "react";
import { ApiOpcionalResumo } from "@/types";
import { OptionalSummaryCard } from "@/components/charts/OptionalSummaryCard";

interface OptionalNacionalizadoCardProps {
  data: ApiOpcionalResumo;
}

export const OptionalNacionalizadoCard: React.FC<OptionalNacionalizadoCardProps> =
  ({ data }) => {
    return <OptionalSummaryCard title="Opcional: Nacionalizado" data={data} />;
  };

